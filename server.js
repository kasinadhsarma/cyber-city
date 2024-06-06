const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const upload = multer({ dest: 'uploads/' });

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}));
app.use(express.json());

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// User registration route
app.post('/api/register', (req, res) => {
  const { username, password, role } = req.body;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    });
  });
});

// User authentication routes
app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully', user: req.user });
});

app.get('/api/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Configure Passport Local Strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.get('SELECT * FROM users WHERE username = ?', [username], function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) { return done(err); }
        if (!result) { return done(null, false, { message: 'Incorrect password.' }); }
        return done(null, user);
      });
    });
  }
));

// Serialize user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(function(id, done) {
  db.get('SELECT * FROM users WHERE id = ?', [id], function(err, user) {
    done(err, user);
  });
});

const db = new sqlite3.Database('platform.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the platform database.');
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('message', (msg) => {
    const userRole = socket.request.user.role; // Get the user's role from the session
    db.get('SELECT access_roles FROM channels WHERE name = ?', [msg.room], (err, row) => {
      if (err) {
        console.error(err.message);
        return;
      }
      if (row && row.access_roles.includes(userRole)) {
        io.to(msg.room).emit('message', msg);
      } else {
        console.log(`User with role ${userRole} is not allowed to send messages to room: ${msg.room}`);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.post('/api/upload', upload.array('files'), (req, res) => {
  res.json({ files: req.files });
});

app.post('/api/tools', (req, res) => {
  const { name, description, link } = req.body;
  db.run('INSERT INTO tools (name, description, link) VALUES (?, ?, ?)', [name, description, link], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get('/api/tools', (req, res) => {
  db.all('SELECT * FROM tools', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ tools: rows });
  });
});

app.post('/api/training', (req, res) => {
  const { title, description, content, type } = req.body;
  db.run('INSERT INTO training (title, description, content, type) VALUES (?, ?, ?, ?)', [title, description, content, type], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get('/api/training', (req, res) => {
  db.all('SELECT * FROM training', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ training: rows });
  });
});

app.post('/api/jobs', (req, res) => {
  const { title, description, company, link } = req.body;
  db.run('INSERT INTO jobs (title, description, company, link) VALUES (?, ?, ?, ?)', [title, description, company, link], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get('/api/jobs', (req, res) => {
  db.all('SELECT * FROM jobs', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ jobs: rows });
  });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// New API endpoints for channel management
app.post('/api/channels', (req, res) => {
  const { name, access_roles } = req.body;
  db.run('INSERT INTO channels (name, access_roles) VALUES (?, ?)', [name, access_roles], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get('/api/channels', (req, res) => {
  const userRole = req.user.role; // Use the authenticated user's role from the session
  db.all('SELECT * FROM channels WHERE access_roles LIKE ?', [`%${userRole}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ channels: rows });
  });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// New API endpoints for cybersecurity file management
app.post('/api/cybersecurity-files', upload.single('file'), (req, res) => {
  const { originalname, filename, mimetype, size } = req.file;
  const { category, viewable_by, downloadable_by } = req.body;
  const uploadedAt = new Date().toISOString();
  db.run('INSERT INTO cybersecurity_files (originalname, filename, mimetype, size, category, viewable_by, downloadable_by, uploadedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [originalname, filename, mimetype, size, category, viewable_by, downloadable_by, uploadedAt], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

app.get('/api/cybersecurity-files', (req, res) => {
  const userRole = req.user.role; // Use the authenticated user's role from the session
  db.all('SELECT * FROM cybersecurity_files WHERE viewable_by LIKE ?', [`%${userRole}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ files: rows });
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
