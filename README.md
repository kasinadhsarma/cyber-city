# Cyber Security Platform

## Overview
The Cyber Security Platform is a comprehensive solution designed to collect and manage cybersecurity files, enable real-time chat functionality, and provide tools, training, and job opportunities. The platform features an interactive UI similar to Discord, with a side menu bar for easy navigation.

## Features
- **Chat Functionality**: Real-time messaging with channels and user roles.
- **File Management**: Upload, download, and manage cybersecurity files.
- **User Authentication**: Secure login and registration with role-based access control.
- **AI Integration**: Integration with Google Gemini and OpenAI GPT-4 for advanced AI functionalities.
- **Training and Jobs**: Access to training modules and job opportunity listings.

## Technologies Used
- **Frontend**: React, Chakra UI
- **Backend**: Node.js, Express, SQLite
- **Authentication**: Passport.js, bcrypt, Google OAuth
- **Real-time Communication**: Socket.io
- **Deployment**: Netlify, Vercel (pending)

## Setup and Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/kasinadhsarma/cyber-city.git
   cd cyber-city
   ```

2. Install dependencies for the backend:
   ```bash
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. Create an `.env` file in the root directory and add the following environment variables:
   ```env
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

5. Run the development server:
   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Deployment
### Netlify
The frontend is deployed on Netlify and can be accessed at [Netlify Deployment](http://lambent-peony-4e83b4.netlify.app).

### Vercel
The Vercel deployment is pending. Once completed, the Vercel deployment URL will be provided here.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any inquiries or support, please contact the project maintainer at [email@example.com].
