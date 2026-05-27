# CampusDrive – Smart Campus Recruitment & Placement Management System

CampusDrive is a centralized, mobile-first placement management and communication platform designed to streamline college recruitment drives. Built with a robust **"Build Profile Once ➔ Apply Everywhere"** USP, it allows students to create an unified ATS-scored profile and apply for eligible job campaigns in 1-click. 

This repository contains the **complete React Native Expo Mobile Frontend** with full navigation, clean styling, modular design, and simulated database workflows.

---

## 🛠 Tech Stack

- **Core Framework**: React Native with [Expo SDK 56](https://expo.dev/)
- **Programming Language**: TypeScript (strict-mode type safety)
- **Navigation System**: React Navigation 6 (Stack + Native-Stack + Bottom-Tabs)
- **UI Design System**: Vanilla StyleSheet presets with unified global styles
- **Icons**: Lucide Icons (`lucide-react-native`)
- **State Simulator**: Local React state-controllers mapping real-time shortlists and alerts

---

## 🔑 Demo Access Credentials

The mobile app includes pre-populated demo accounts for three distinct user roles. Selecting a role on the login card auto-fills these parameters for quick evaluations:

| Role | Email / Mobile | Password | Redirect Dashboard |
| :--- | :--- | :--- | :--- |
| **Student** | `student@campusdrive.demo` | `demo123` | Student Dashboard (`Bhushan Shimpi`) |
| **TPO (Admin)** | `tpo@campusdrive.demo` | `demo123` | TPO Admin Dashboard (`Dr. R. K. Patil`) |
| **Placement Coordinator** | `coordinator@campusdrive.demo` | `demo123` | Coordinator Dashboard (`Amit Sharma`) |

---

## 📂 Project Directory Structure

```text
Mob/
├── App.tsx                   # Main entry point (loads NavigationContainer)
├── app.json                  # Expo config file
├── package.json              # App dependencies & run scripts
├── tsconfig.json             # TypeScript path alias configurations
└── src/
    ├── app/
    │   └── AppNavigator.tsx  # Root navigator router connecting all screens
    ├── components/           # Reusable UI component elements
    │   ├── AppButton.tsx     # Custom buttons with loading states & styles
    │   ├── AppCard.tsx       # Standard card layout with shadows and footers
    │   ├── AppHeader.tsx     # Clean header with back-action and bell badges
    │   ├── Badge.tsx         # Status chips (Applied, Shortlisted, Selected)
    │   ├── EmptyState.tsx    # Illustrative block for empty search feeds
    │   ├── ProgressBar.tsx   # Completion loaders (used for student profile)
    │   ├── StatCard.tsx      # Stat counters showing analytics KPIs
    │   ├── SectionHeader.tsx # Spacing headlines with action links
    │   ├── SearchInput.tsx   # Text input magnifier with clean clear triggers
    │   └── Timeline.tsx      # Recruitment funnel pipeline tracker nodes
    ├── config/
    │   ├── colors.ts         # Brand corporate color definitions
    │   └── constants.ts      # Dropdown values & login secrets
    ├── data/
    │   └── mockData.ts       # 50 students database, 8 drives, message history
    ├── navigation/           # Navigation routers
    │   ├── AuthNavigator.tsx
    │   ├── StudentNavigator.tsx
    │   ├── TPONavigator.tsx
    │   ├── CoordinatorNavigator.tsx
    │   └── types.ts          # Compile-safe parameter typings
    ├── shared/
    │   ├── types/
    │   │   └── index.ts      # Domain TypeScript interface models
    │   └── utils/
    │       └── formatters.ts # Currency, date, and text initials helpers
    └── styles/
        └── globalStyles.ts   # Presets for borders, shadows, text, inputs
```

---

## ⚡ Role-Based Screen Workflows

### 👨‍🎓 1. Student Portal
- **Dashboard**: Greeting banner, 95% profile completion tracking, drives stats, pending interview alerts, latest announcements, and quick-action shortcuts.
- **Profile Builder**: Multi-step registration wizard (Personal ➔ Academic ➔ Skills ➔ Projects ➔ Preferences).
- **Document Vault**: Simulated ATS resume PDF uploader with marksheet & certification status chips.
- **Placement Drives Feed**: Categorized directory (Eligible / Applied / All Drives) with search magnifying filters.
- **Drive Profile**: Details of requirements, job descriptions, rounds, and eligibility checklist comparison.
- **One-Click Apply**: Summarized dossier check sheet allowing instant submission.
- **Success Page**: Celebration card detailing Application ID and community chats gateway.
- **Recruitment Communities**: List of active corporate channels to chat with peer candidates.
- **Community Chat Rooms**: Tabbed views (General chat, Official Announcements, Pinned Files, Round Dates).
- **Application Milestone Tracker**: Expandable recruitment pipeline tracker tracing live status.
- **Alerts center**: Categorized list of notifications.

### 🏛 2. TPO Admin Portal
- **Dashboard**: KPI board, active drive registries, hiring ratio banner charts, and campaign actions.
- **Campaigns Feed**: Administration card view of drive applicant numbers, CGPA filters, and close triggers.
- **Create Campaign Form**: Dropdown parameters, work modes, and targeted passing year fields.
- **Student Database**: Directory of 50 student records with action shortcuts (Audit verify profile, override eligibility).
- **Applications Feed**: Evaluation queue allowing TPOs to dynamically Shortlist, Advance, or Reject candidates.
- **Recruitment Analytics**: Custom native bars graphing departmental rates, hiring metrics, and funnels.
- **Broadcast Alert Campaigns**: Target push notifications to customized candidate lists.

### 💼 3. Placement Coordinator Portal
- **Dashboard**: Pending audit counters, assigned campaigns tracker, and today's schedule.
- **Student Verifications**: Card reviews comparing PRN registers with resume PDFs (Verify, Request Update, Flag).
- **Update Stage Form**: Advance selected student cohorts into Aptitude/Tech/HR rounds with custom notes.
- **Create Announcements**: Broadcast and pin announcements inside targeted community chats.

---

## 🚀 How to Launch Locally

### 1. Install dependencies
Navigate to the `Mob` folder and download all required packages:
```bash
npm install
```

### 2. Start the bundler
Launch Expo Metro Bundler:
```bash
npm start
```
- Tap `a` to run on an connected Android Emulator or device.
- Tap `i` to run on an iOS Simulator.
- Tap `w` to launch on the browser web emulator.

---

## 🔒 Current Limitations
- **Mock Data**: No persistent database. State updates (applications, verifications, chat additions) survive inside local React context states during active sessions.
- **File Uploads**: Resume and certificate uploads are simulated with loaders and status indicators.
- **Auth**: Authentication processes are simulated using standard parameters.
