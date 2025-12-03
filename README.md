# Employee Management Portal (MERN Stack)

This is a full-stack, two-tier web application designed for secure user authentication and management of employee records. It follows a traditional architecture with separate client and server directories, demonstrating proficiency with the MERN stack.

This was completely built in Ubuntu OS and works best in Ubuntu OS.

## Key Features & Technical Achievements

| Feature | Description | Technical Implementation |
| :--- | :--- | :--- |
| **Secure Authentication** | Implements standard security for login/registration and maintains user sessions. | **JSON Web Tokens (JWT)** for session management and **bcrypt** for irreversible password hashing. |
| **Protected API** | Ensures unauthorized users cannot access or modify employee data. | Dedicated **Authentication Middleware** secures all backend CRUD operations. |
| **Data Persistence** | Reliable storage and flexible retrieval of employee and user data. | **MongoDB** as the database layer, integrated using the **Mongoose** ODM. |
| **Architecture** | Structured for clear separation of concerns. | Classic **Client-Server** architecture with separate `server` (Node/Express) and `client` (React) directories. |
| **CORS Management** | Defines secure access between the frontend and backend. | Configured **CORS** middleware to manage cross-origin requests between ports 5000 and 5173. |

---

##  Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Backend** | **Node.js** & **Express** | API gateway and server-side logic (Port 5000). |
| **Database** | **MongoDB** & **Mongoose** | Flexible, document-based data storage. |
| **Frontend** | **React** & **Vite** | Component-based user interface (Port 5173). |
| **Environment** | **Ubuntu** | Stable host operating system used for reliable deployment. |

---

##  How to Run the Project

Follow these steps to set up and run the application locally on your Ubuntu environment.

### Prerequisites

You must have the following installed: **Node.js**, **npm**, and the **MongoDB Server** (running locally).

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone [Your Repository HTTPS Link Here]
    cd employee-management-portal
    ```

2.  **Install Dependencies in both folders:**
    ```bash
    cd server
    npm install
    cd ../client
    npm install
    ```

3.  **Setup Environment Variables (Critical for Security):**
    * Create a file named **`.env`** in the **`server`** folder.
    * Add the required variables:
        ```
        PORT=5000
        MONGODB_URI=mongodb://127.0.0.1:27017/employee_portal 
        JWT_SECRET=your_strong_secret_key_here
        ```

### Running the Application

This requires **three separate terminal windows** to run simultaneously.

1.  **Start MongoDB Server (Window 1):**
    ```bash
    mongod
    ```
    (Wait for: `waiting for connections on port 27017`)

2.  **Start the Backend API (Window 2):**
    ```bash
    cd server/src
    node server.js
    ```
    (Wait for: `MongoDB Connected...` and `Server started on port 5000`)

3.  **Start the React Client (Window 3):**
    ```bash
    cd client
    npm run dev
    ```
    (Wait for the local URL: `➜ Local: http://localhost:5173/`)

Open your browser to the client URL (`http://localhost:5173/`) to view the application.

---
*Developed by **Deekshith gowda kv***
