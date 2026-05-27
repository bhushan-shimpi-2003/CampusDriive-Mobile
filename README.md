# CampusDrive

**CampusDrive** is a Smart Campus Recruitment & Placement Management System. It is built as a startup-scale SaaS platform utilizing a modern, module-wise monorepo architecture. 

## 🏗️ Architecture

The project is structured into a monorepo containing the following layers:

- `Web/`: The Web application for Coordinators, TPOs, and Principals.
- `Mob/`: The Mobile application for Students.
- `BE/`: The centralized Node.js/Express.js backend API.
- `docs/`: Project documentation, architectural decisions, and standards.
- `shared/`: Shared interfaces, constants, and utilities.

## 🚀 Tech Stack

### Web (Frontend)
- **Framework:** React.js + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Network:** Axios

### Mob (Mobile)
- **Framework:** React Native + Expo
- **Language:** TypeScript
- **UI Library:** React Native Paper
- **Navigation:** React Navigation (Native, Stack, Bottom Tabs)
- **Storage:** AsyncStorage

### BE (Backend)
- **Framework:** Node.js + Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT & bcryptjs
- **Third-Party Integrations:** Firebase Admin, Socket.io, Cloudinary
- **Security:** Helmet, Express Rate Limit, CORS

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (Atlas or local)
- Expo CLI (for mobile)

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:bhushan-shimpi-2003/CampusDriive-Mobile.git
   cd CampusDriive-Mobile
   ```

2. **Install dependencies:**
   Since this is a monorepo, you must install dependencies for each layer:
   ```bash
   # Root (for npm-run-all)
   npm install
   
   # Web
   cd Web && npm install && cd ..
   
   # Mob
   cd Mob && npm install && cd ..
   
   # Backend
   cd BE && npm install && cd ..
   ```

3. **Environment Setup:**
   Duplicate the `.env.example` file in the root, `Web/`, `Mob/`, and `BE/` directories and rename them to `.env`. Fill in your local variables (MongoDB URIs, Firebase keys, JWT secrets).

### Running the Application Locally

You can run the entire stack simultaneously from the root directory using `npm-run-all`, or run them individually.

**Run Everything:**
```bash
# Starts Web and Backend concurrently
npm run dev

# You will need to start Mob separately in another terminal
npm run dev:mob
```

**Run Individually:**
- **Web:** `npm run dev:web`
- **Mobile:** `npm run dev:mob` (or `cd Mob && npx expo start -c -w`)
- **Backend:** `npm run dev:be`

## 📁 Module-Wise Structure Strategy
All projects (`Web`, `Mob`, `BE`) follow a strict module-wise separation of concerns. Inside their respective `src/modules` folders, features are encapsulated (e.g., `auth`, `student`, `placement`). Each module contains its own controllers/pages, services, and hooks. Ensure you maintain this structure when contributing new features.

---
*Maintained by the CampusDrive Team.*
