# CodeBinX - A Modern Code Sharing Platform

CodeBinX is a full-stack application designed as a modern, user-friendly alternative to Pastebin or Sourcebin. It allows users to easily share snippets of code or text, with features for both anonymous users and registered accounts. The frontend aims for a sleek, Apple-inspired design with smooth animations, while the backend provides a robust and secure API.

## 📋 Core Features

**General:**
* Share text and code snippets ("bins").
* Responsive design for a seamless experience on all devices.

**Frontend (React & Tailwind CSS):**
* Apple-inspired, clean, and minimalist user interface.
* Smooth animations and transitions for an enhanced user experience.
* Intuitive navigation.
* Integrated code editor for creating and viewing bins with syntax highlighting.
* User registration and login forms.
* Google OAuth sign-in option.
* Dashboard for registered users to manage their bins and profile.
* Dark mode support.

**Backend (Node.js, Express, MongoDB):**
* Secure RESTful API.
* User authentication:
    * Local registration (username, email, password).
    * Local login with email and password.
    * Google OAuth 2.0 integration.
    * JWT (JSON Web Tokens) for session management.
* Bin Management:
    * Create, retrieve, update, and delete bins.
    * Support for anonymous and user-owned bins.
    * Optional password protection for bins.
    * View count tracking.
    * Configurable bin expiration with automatic cleanup of expired bins.
* User Account Features:
    * Update user profiles.
    * View user statistics (total bins, views, etc.).
    * Secure account deletion (includes deletion of associated bins).
* Security: Input validation, rate limiting, security headers (Helmet), CORS.
* Logging: HTTP request logging and application-level event logging.

## 🔨 Tech Stack

**Frontend:**
* **Framework/Library:** React
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Build Tool:** Vite (or Create React App)
* **Routing:** React Router
* **State Management:** Context API (potentially Zustand, Jotai, or Redux Toolkit for larger state needs)
* **Data Fetching:** React Query (TanStack Query) or SWR (recommended) / Axios or Fetch API
* **Animation:** Framer Motion (recommended), CSS Transitions

**Backend:**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** MongoDB (with Mongoose ODM)
* **Authentication:** Passport.js (handling JWT and Google OAuth 2.0 strategies)
* **Password Hashing:** `bcryptjs`
* **Input Validation:** `express-validator`
* **Unique IDs:** `nanoid` (for Bin IDs)
* **Scheduled Jobs:** `node-cron`
* **Core Libraries:** `helmet`, `compression`, `cors`, `morgan`, `express-rate-limit`, `dotenv`

## 📋 Project Structure

CodeBinX/
├── backend/     
├── frontend/ 
├── .gitignore
└── README.md    


## ⚙ Prerequisites

* Node.js (v18.x or later recommended)
* npm (v8.x or later) or yarn
* MongoDB (running locally or a cloud instance like MongoDB Atlas)
* Git

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/dewstouh/codebinx
    cd CodeBinX
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    ```
    * Create a `.env` file in the `backend/` directory. Copy the contents of `backend/.env.example` (you should create this file) and fill in your actual credentials and settings. Key variables include:
        * `PORT` (e.g., `5000`)
        * `MONGODB_URI`
        * `JWT_SECRET`
        * `JWT_EXPIRES_IN`
        * `GOOGLE_CLIENT_ID`
        * `GOOGLE_CLIENT_SECRET`
        * `CORS_ORIGIN` (URL of your frontend, e.g., `http://localhost:5173`)
        * (See `backend/README.md` or source code for a full list)
    * Ensure your MongoDB server is running and accessible.
    * Create a `logs/` directory inside `backend/` if it doesn't exist: `mkdir logs`

3.  **Frontend Setup:**
    ```bash
    cd ../frontend # or cd frontend from the root
    npm install
    ```
    * Create a `.env` file in the `frontend/` directory. Copy the contents of `frontend/.env.example` (you should create this file) and fill in your settings. Key variables include:
        * `VITE_API_BASE_URL` (or `REACT_APP_API_BASE_URL` for CRA) pointing to your backend API (e.g., `http://localhost:5000/api`).
        * Potentially other frontend-specific API keys if needed.

## 🏃‍♂️ Running the Application

You'll need to run both the backend and frontend servers concurrently in separate terminal windows.

1.  **Start the Backend Server:**
    ```bash
    cd backend
    npm run dev
    ```
    The backend will typically run on the port specified in `backend/.env` (e.g., `http://localhost:5000`).

2.  **Start the Frontend Development Server:**
    ```bash
    cd ../frontend # or cd frontend from the root
    npm run dev
    ```
    The frontend development server will typically open in your browser (e.g., `http://localhost:5173` for Vite or `http://localhost:3000` for CRA).

## ✅ Available Scripts

Each sub-project (`backend/` and `frontend/`) has its own `package.json` with specific scripts. Refer to them for details. Common scripts include:

* **Backend:**
    * `npm run dev`: Starts the backend server in development mode (usually with `nodemon` and `ts-node`).
    * `npm run build`: Compiles TypeScript to JavaScript for production (e.g., using `tsc && tsc-alias`).
    * `npm start`: Runs the compiled backend code.
    * `npm run lint`: Lints the backend codebase.
* **Frontend:**
    * `npm run dev`: Starts the frontend development server (e.g., Vite or CRA).
    * `npm run build`: Bundles the frontend application for production.
    * `npm run lint`: Lints the frontend codebase.

## 💛 Contributing

Thanks for using my project! If you would like to support me, you can do it by donating [through PayPal!](https://paypal.me/elmundodeniby).

## 🔰 License

This project is under the MIT License

---

*Remember to create separate, more detailed `README.md` files within the `backend/` and `frontend/` directories that are specific to their setup, architecture, and scripts.*