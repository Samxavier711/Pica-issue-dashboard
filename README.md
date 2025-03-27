# Pica Issue Dashboard

## 🚀 Project Overview
Pica Issue Dashboard is a web-based tool designed to assist developers in debugging errors efficiently. It integrates with **Pica** to:
1. **Fetch possible solutions** for errors.
2. **Allow users to submit errors** via a React-based frontend.
3. **Send notifications on Slack** to alert team members for assistance.
4. **Showcase knowledge of Pica connectors** and API integrations.

---

## 📂 Project Structure
```
/pica-issue-dashboard
│── backend/                # Flask backend
│   ├── app.py              # Main Flask application
│   ├── .env                # Environment variables (DO NOT COMMIT)
│── frontend/               # React frontend
│   ├── src/
│   │   ├── dashboard.js    # dashboard elements
│   │   ├── App.js          # Main React file
│── README.md               # Project documentation
│── .gitignore              # Files to ignore in Git
```

---

## 🛠️ Installation & Setup
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/Pica-Issue-Dashboard.git
cd Pica-Issue-Dashboard
```

### **2️⃣ Backend Setup (Flask Server)**
#### Install Dependencies
```sh

YOU have to install all the imports as to reduce file size NOde modules and venv -everything is deleted
```
#### Setup Environment Variables
Create a `.env` file in the `backend/` folder and add:
```sh

PICA_API_KEY=your-pica-api-key
OPENAI_API_KEY=your-openai-api-key
SLACK_connector_key=your-slack-webhook-url
```
#### Run the Flask Server
```sh
python app.py
```
By default, the server runs at **`http://127.0.0.1:5000`**.

---

### **3️⃣ Frontend Setup (React Dashboard)**
#### Install Dependencies
```sh
cd frontend
npm install
```
#### Run React Development Server
```sh
npm start
```
By default, the frontend runs at **`http://localhost:3000`**.

---

## 🎯 Features
### **1️⃣ Fetch Possible Solutions for Errors**
- Users enter an error message.
- The backend calls OpenAI via Pica to get potential solutions.
- The response is displayed on the frontend.

### **2️⃣ Notify Team on Slack**
- If the error persists, users can click "Notify on Slack."
- The backend sends a Slack message via Pica.
- Team members are alerted instantly.

---

## 📡 API Endpoints
### **1️⃣ Fetch Possible Solutions**
**Endpoint:** `/search_issue`  
**Method:** `POST`  
**Request Body:**
```json
{
    "error_message": "TypeError: Cannot read property 'x' of undefined"
}
```
