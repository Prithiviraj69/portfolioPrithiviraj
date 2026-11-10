# Prithiviraj Elumalai - Full Stack Systems Engineering Portfolio

An executive, high-performance personal engineering portfolio & dynamic content management platform architected with Node.js, Express, MongoDB, and modern high-tech UI design.

## 🚀 Key Highlights & Architectural Overview

- **Subject-Grounded Executive UI/UX:** Styled following Anthropic's intentional visual engineering guidelines with dark obsidian aesthetics, subtle borders, and zero generic template cliches.
- **Dynamic Content Management System (CMS):** Complete authenticated Admin Console (`/auth/login` → `/admin/dashboard`) allowing real-time editing of:
  - Personal bio, contact credentials & localized coordinates
  - 3+ Years Production Experience timeline
  - MCA Academic credentials & linguistic fluency
  - Categorized Technical Proficiencies (Backend, Frontend, Databases, Security & PKI, Cloud)
  - Production Project Case Studies with live deployment and source URLs
  - Direct inquiry and messaging mailbox
- **Direct Resume Serving:** Automated direct download route (`/resume`) and embedded PDF viewer.
- **Resilient Database Layer:** Dual-mode database connection supporting local MongoDB instances and an automatic zero-config memory server fallback for standalone environments.

## 🛠️ Technology Stack

- **Runtime & Backend:** Node.js, Express.js
- **Templates & Views:** EJS (Embedded JavaScript Templates)
- **Database & ODM:** MongoDB, Mongoose
- **Security & Authentication:** JWT (JSON Web Tokens), bcryptjs, HTTP-only cookies
- **Styling & Assets:** Custom High-Tech CSS3 Token System, Devicon, FontAwesome 6, Google Fonts (*Plus Jakarta Sans* & *Fira Code*)
- **File Management:** Local fallback upload storage with Cloudinary adapter support

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Prithiviraj69/portfolioPrithiviraj.git
cd portfolioPrithiviraj
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file from `.env.example`:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=your_secret_key
ADMIN_SETUP_KEY=admin123
```

### 4. Seed Profile & Project Data
```bash
node seedData.js
```

### 5. Launch Application
```bash
npm start
```
Visit `http://localhost:3000` in your browser.

## 🔐 Admin Console
- **Login Route:** `http://localhost:3000/auth/login`
- **Default Credentials:** Populated via `node seedData.js`

---
Engineered by **Prithiviraj Elumalai**.
