"""
At the command line, only need to run once to install the package via pip:

$ pip install google-generativeai
"""

from pathlib import Path
import hashlib
import google.generativeai as genai

genai.configure(api_key="AIzaSyC3ePPmuMYogAHFceXfokvC2xcrY34aRUM")

# Set up the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 0,
  "max_output_tokens": 8192,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_NONE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_NONE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_NONE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_NONE"
  },
]

model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

uploaded_files = []
def upload_if_needed(pathname: str) -> list[str]:
  path = Path(pathname)
  hash_id = hashlib.sha256(path.read_bytes()).hexdigest()
  try:
    existing_file = genai.get_file(name=hash_id)
    return [existing_file.uri]
  except:
    pass
  uploaded_files.append(genai.upload_file(path=path, display_name=hash_id))
  return [uploaded_files[-1].uri]

def extract_video_frames(pathname: str) -> list:
  # See https://github.com/google-gemini/cookbook/blob/main/quickstarts/Video.ipynb
  return []

convo = model.start_chat(history=[
  {
    "role": "user",
    "parts": extract_video_frames("AI Model Training/Screencast from 2024-05-01 22-37-16.webm")
  },
  {
    "role": "user",
    "parts": [" i want to create a own model of pentration testing first on tryhackme rooms after utilse the grokmodel or gemini API key train themodel"]
  },
  {
    "role": "model",
    "parts": ["## Building Your Own Penetration Testing Model: Combining TryHackMe and Large Language Models\n\nWhile directly integrating TryHackMe rooms with large language models like GrokModel or Gemini isn't currently possible, there are ways to leverage both to enhance your penetration testing skills and potentially build a custom knowledge base. \n\nHere's a potential approach:\n\n**Phase 1: Learning and Data Gathering**\n\n1. **TryHackMe Immersion:**\n    * **Start with Beginner Rooms:** Begin with introductory rooms on TryHackMe to solidify your foundational knowledge in networking, Linux, basic security concepts, and common attack techniques. \n    * **Progress to Advanced Rooms:** Gradually move towards more complex rooms covering various aspects of penetration testing like web application security, privilege escalation, and post-exploitation.\n    * **Document Your Journey:** Take meticulous notes throughout your TryHackMe experience. Capture key commands, methodologies, thought processes, and solutions encountered in each room. This documentation becomes your training data.\n\n2. **Utilizing Large Language Models:**\n    * **Knowledge Base Augmentation:** Use GrokModel or Gemini to research specific topics or tools you encounter in TryHackMe rooms. Ask questions, clarify doubts, and explore alternative approaches.\n    * **Creative Problem Solving:** If stuck, describe the challenge you're facing to the LLM and see if it can offer potential solutions or insights. \n    * **Information Synthesis:**  Use the LLM to summarize your notes and findings from TryHackMe rooms, creating a concise and organized knowledge repository. \n\n**Phase 2: Model Training and Refinement (Advanced)**\n\n1. **Data Preparation:**\n    * **Format and Structure:** Organize your TryHackMe notes and LLM interactions into a structured format suitable for machine learning. This might involve creating labeled datasets or text files with specific prompts and responses. \n    * **Cleaning and Preprocessing:** Ensure your data is clean and consistent. Remove irrelevant information, correct errors, and format text appropriately.\n\n2. **Model Selection:**\n    * **Choose an LLM:**  Evaluate and choose a suitable large language model based on factors like accessibility, training capabilities, and alignment with your project goals. \n    * **Fine-tuning Options:**  Explore the LLM's fine-tuning capabilities. This allows you to specialize the model on your specific penetration testing data, making it more relevant and effective.\n\n3. **Training and Evaluation:**\n    * **Training Process:** Follow the chosen LLM's guidelines for fine-tuning. This typically involves providing your prepared data and specifying training parameters. \n    * **Evaluation and Refinement:**  Test the model's performance on new TryHackMe challenges or real-world scenarios.  Identify weaknesses and refine the training data or process to improve accuracy. \n\n**Phase 3: Application and Enhancement**\n\n1. **Custom Knowledge Assistant:** Utilize your trained model as a personalized penetration testing assistant. Ask questions, seek guidance, and receive tailored suggestions based on your accumulated knowledge.\n2. **Automated Report Generation:**  Explore the model's ability to generate penetration testing reports based on your methodology and findings.\n3. **Continuous Learning:** Keep your model updated by incorporating new experiences and insights from ongoing TryHackMe challenges and real-world penetration testing engagements.\n\n**Considerations:**\n\n* **Technical Expertise:** Phase 2 requires advanced knowledge in machine learning and natural language processing. Consider collaborating with experts in these fields if needed.\n* **Data Privacy:** Be mindful of sensitive information when documenting your TryHackMe experiences.  Anonymize or redact any confidential data before using it for training.\n* **Ethical Hacking:** Always adhere to ethical hacking principles and obtain proper authorization before conducting penetration testing activities.\n\n**Alternative Approaches:**\n\n* **Penetration Testing Frameworks:** Explore established frameworks like Metasploit, Burp Suite, or Cobalt Strike. These frameworks provide structured methodologies and tools for conducting penetration tests.\n* **Threat Intelligence Platforms:** Utilize threat intelligence platforms like MISP or ThreatConnect to stay informed about the latest vulnerabilities, exploits, and attacker tactics.\n\nRemember, building a sophisticated penetration testing model is an ongoing process. By combining the hands-on learning from TryHackMe with the power of large language models, you can gradually develop a personalized and valuable tool for enhancing your cybersecurity expertise."]
  },
  {
    "role": "user",
    "parts": ["first of all i am creating dataset of videos after seeing pattern it will recognise how is my idea"]
  },
  {
    "role": "model",
    "parts": ["## Creating a Penetration Testing Dataset from Videos: Recognizing Patterns\n\nUsing videos to build a penetration testing dataset is an innovative approach with great potential. Here's how you can structure this project:\n\n**Data Collection and Annotation:**\n\n1. **Video Sources:**\n    * **TryHackMe Walkthroughs:** Utilize walkthrough videos available on TryHackMe or other platforms where experts demonstrate penetration testing methodologies on various vulnerable machines.\n    * **CTF Recordings:** Leverage recordings of Capture the Flag (CTF) competitions, where participants showcase their skills in real-time problem-solving scenarios. \n    * **Conference Talks and Tutorials:** Include videos from cybersecurity conferences or online tutorials that delve into specific penetration testing techniques.\n\n2. **Pattern Identification and Annotation:**\n    * **Manual Annotation:**  Watch the videos and manually label key segments with relevant tags.  Examples of tags:\n        * **Reconnaissance Techniques:**  Nmap scans, web enumeration, directory brute-forcing.\n        * **Vulnerability Identification:**  SQL injection, cross-site scripting (XSS), buffer overflows.\n        * **Exploitation Techniques:**  Metasploit modules, custom scripts, social engineering tactics.\n        * **Privilege Escalation:** Kernel exploits, misconfigurations, password cracking.\n        * **Post-Exploitation:** Maintaining access, lateral movement, data exfiltration.\n    * **Tools and Timestamps:**  Note the specific tools and timestamps used in each segment to allow for easy reference and retrieval.\n\n3. **Data Structure:**\n    * **Video Segmentation:** Split each video into smaller segments based on the identified patterns and timestamps. This creates manageable data units for analysis and potential model training.\n    * **Metadata Creation:**  Build a metadata file for each video segment, including information like the source video, timestamps, associated tags, tools used, and any additional notes.\n\n**Pattern Recognition and Analysis:**\n\n1. **Frequency Analysis:** Analyze the frequency of different patterns and tools across the dataset. This highlights commonly used techniques and potential areas for further exploration.\n2. **Sequencing and Dependencies:**  Identify common sequences of actions or dependencies between different penetration testing stages. This reveals typical workflows and potential attack chains.\n3. **Tool Usage Analysis:** Analyze how different tools are utilized within the context of specific vulnerabilities or attack scenarios. This deepens your understanding of tool capabilities and potential applications.\n\n**Potential Applications:**\n\n* **Building a Knowledge Base:** Create a searchable repository of penetration testing techniques and tool usage based on the identified patterns. This allows for quick reference and knowledge sharing among your team or community.\n* **Predictive Modeling (Advanced):**  Train a machine learning model on the labeled dataset to predict potential attack paths or recommend tools based on observed patterns.\n* **Educational Resource Development:** Design training materials or tutorials focusing on the most frequent and impactful penetration testing patterns and tools. \n* **Automated Vulnerability Detection:**  Explore the possibility of developing tools that automatically detect specific patterns in system logs or network traffic, indicating potential security breaches. \n\n**Challenges:**\n\n* **Manual Effort:** Annotating videos is time-consuming and requires expertise in penetration testing. Consider utilizing crowdsourcing or semi-automated annotation tools to alleviate the workload.\n* **Data Quality:** Ensure the accuracy and consistency of your annotations. Inaccurate or inconsistent data can lead to misleading analysis and unreliable model training. \n* **Model Training Complexity:** Building and training a reliable predictive model demands significant expertise in machine learning and a large, high-quality dataset.\n\nBy meticulously building your dataset and analyzing the patterns within penetration testing videos, you can gain valuable insights into attacker methodologies and develop innovative tools for bolstering your cybersecurity defenses. Remember, this is an iterative process requiring continuous refinement and adaptation as you encounter new threats and techniques."]
  },
])

convo.send_message("YOUR_USER_INPUT")
print(convo.last.text)
for uploaded_file in uploaded_files:
  genai.delete_file(name=uploaded_file.name)