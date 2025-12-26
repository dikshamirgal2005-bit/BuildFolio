# 🚀 BuildFolio - Instant Portfolio Builder

BuildFolio is a powerful, React-based web application designed to help students and professionals create stunning, shareable portfolio websites in minutes—without writing a single line of code.

---

## 🎯 Problem Statement (PS)
In today's competitive job market, having a personal portfolio is essential. However, **many college students and early-career professionals struggle to create one because:**
1.  **Lack of Coding Skills:** Building a website from scratch is difficult for non-CS students.
2.  **Complex Tools:** Existing website builders (Wix, WordPress) are often bloated, expensive, or have a steep learning curve.
3.  **Time Constraints:** Students need a quick way to showcase their skills, projects, and achievements without spending days on design.

**BuildFolio solves this by providing a streamlined, fill-in-the-blanks interface that instantly generates a professional portfolio.**

---

## 📖 Project Description
BuildFolio acts as a "No-Code" editor specifically tailored for academic and professional use. Users simply enter their details (Bio, Projects, Skills) on one side of the screen and see a **Live Preview** on the other. 

It features persistent storage, allowing users to save their progress locally, and a unique **Firebase Deployment** system that generates a public, shareable link instantly.

---

## ✨ Key Features & Implementation
Here is a summary of the features implemented in this project:

### 1. 🔐 User Authentication
* **Custom Signup Flow:** tailored for students, capturing fields like **College Name**, **Stream**, **Mobile Number**, and Email.
* **Secure Login:** Standard Email/Password authentication.

### 2. 🎨 Interactive Dashboard
* **Welcome Hero Section:** Personalized greeting from the AI assistant.
* **Smart Navigation:** * **"Create Portfolio":** Instantly loads a **Blank Canvas** for a fresh start.
    * **"Edit Portfolio":** Intelligently detects previously saved work in Local Storage and resumes exactly where the user left off.

### 3. 🖥️ Split-Screen Editor
* **Real-Time Preview:** The screen is divided into an **Input Panel** (left) and a **Live Preview** (right). Changes appear instantly.
* **Theme Switcher:** An integrated sidebar allowing users to swap between **20+ professional backgrounds** (Modern, Dark, Gradient, Minimal) with a single click.

### 4. 🤖 AI Assistance
* **Auto-Fill Content:** Integrated "✨ Auto-Fill" buttons that generate professional summaries for the "About Me," "Project Descriptions," and "Achievement" sections based on the user's selected role.

### 5. 🚀 One-Click Deployment (Firebase)
* **Custom Vanity URLs:** Users can choose a custom link name (e.g., `?p=john-doe`).
* **Duplicate Check:** The app checks Firestore to ensure the link name isn't taken.
* **Instant Publish:** Uploads the portfolio data to **Firebase Firestore**.
* **Auto-Copy:** Upon success, the live link is automatically copied to the user's clipboard.

### 6. 💾 Data Persistence
* **Local Storage:** "Save" button saves drafts to the browser, ensuring data isn't lost on refresh.
* **Export Code:** A "Source Code" tab allows developers to copy the raw HTML/CSS for manual hosting.

---

## 🛠️ Tech Stack
* **Frontend:** React.js (Hooks: `useState`, `useEffect`)
* **Styling:** Custom CSS3 (Flexbox, Grid, Animations, Responsive Design)
* **Backend / Database:** Firebase Firestore (NoSQL)
* **Storage:** Browser Local Storage (for draft saving)

---

## 🚀 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/buildfolio.git](https://github.com/your-username/buildfolio.git)
    cd buildfolio
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    npm install firebase
    ```

3.  **Start the Development Server:**
    ```bash
    npm start
    ```
    The app will open at `http://localhost:3000`.

---

## 📂 Project Structure

```text
src/
├── App.js          # Main application logic (Auth, Editor, Preview, Routing)
├── App.css         # Styling for Layouts, Themes, and Components
├── index.js        # React Entry point
└── ...