# 🚀 Toy Robot Simulator – Deployment & Running Instructions

This project includes both a **React (Vite + TypeScript) client** and a **NestJS (TypeScript) server** with a **SQLite** persistence layer. Everything is containerized to make the setup simple and consistent across environments.

---

## 📦 Running the Application

### Option 1: Use the Hosted Deployment (Recommended)

To save setup time, the project is already deployed using Docker on Render:

- **Client Application:** https://toy-robot-simulator-1.onrender.com
- **API Swagger Documentation:** https://toy-robot-simulator.onrender.com/api

These links give you full access to the UI and API without installing anything locally.

---

### Option 2: Run Locally (for development)

To run the project locally, ensure you have the following installed:

- **Node.js / NVM**
- **SQLite**
- **Dependencies for both client + server** (via `npm install`)

Then:

```bash
# Client
cd client
npm install
npm run dev

# Server
cd server
npm install
npm run start:dev
```

---

## 🚧 Under Construction! Might add more commits Monday morning for missing AC.

The following were my shortcomings mostly due to time contraints.

- **No access to Figma so I color picked the colors and used an icon lib for the robot and chevron.**
- **No client or server side unit test yet.**
- **No time to setup more robust endpoints with better error handling.**
- **I was seeing an issue where the last saved position would be a move or two behind. This may have been due running React in strict mode during development or race conditions when saving to the server.**
- **I'd still like to clean up the front end code more but it's in a decently organized state for now**
