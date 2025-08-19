# 🔮 AI Astrologer  

An interactive astrology application built with **Next.js, Radix UI, TailwindCSS, and Gemini API**.  
This app allows users to:  

- Enter their **birth details** (Name, Date, Time, Place).  
- Get **personalized astrology insights** through a **chat-like interface**.  
- Explore a detailed **Rāsi Chart** with planetary positions.  
- Ask **follow-up questions** about love, career, health, etc. in real-time.  

---

## 🚀 Features  

### ✨ Birth Details Collection  
- Collects **only 4 required fields** for chat:  
  - Name  
  - Date of Birth  
  - Time of Birth  
  - Place of Birth  

### 💬 AI Chat (Astrologer Mode)  
- After entering details, the bot welcomes you:  
  *“✨ I have your birth details. What would you like to explore first — love, career, health, or something else?”*  
- Real-time chat with the **Gemini API**.  
- Short, sweet, astrologer-like responses (not too long, not too short).  
- Uses **Markdown rendering** for neat formatting.  

### 🌌 Rāsi Chart  
- Enter extra details:  
  - Latitude  
  - Longitude  
  - Timezone (e.g., `5.5` for IST)  
- Displays planetary positions in a **styled table**:  
  - Planet  
  - Current Sign  
  - Degree  
  - Retrograde status  

### 🎨 UI/UX Highlights  
- Full-screen layout (like ChatGPT).  
- Tabs always visible (`Chat` and `Rāsi Chart`).  
- Gradient backgrounds & blurred panels for a mystical feel.  
- Chat bubbles with user/assistant styles.  
- Smooth hover/scale effects for buttons.  

---

## 🛠️ Tech Stack  

- **Next.js** (App Router)  
- **React** (with Hooks)  
- **TailwindCSS** (styling & gradients)  
- **Radix UI Tabs** (for navigation)  
- **React-Markdown** (for rendering AI responses)  
- **Gemini API** (for astrology chat responses)  
- **Custom Astrology API (/api/planets)** (for chart generation)  

---

## 📂 Project Structure  

```

ai-astrologer/
│
├── app/
│   ├── page.tsx         # Main UI (Chat + Rasi Chart)
│   ├── api/
│   │   ├── astrology/   # Handles chat with Gemini API
│   │   └── planets/     # Handles planetary chart API
│
├── public/              # Static assets
├── styles/              # Tailwind styles (if extended)
├── package.json
└── README.md

````

---

## ⚙️ Setup Instructions  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/saipy10/Vedaz-Assignment.git
cd Vedaz-Assignment
````

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
ASTROLOGY_API_KEY=your_https://freeastrologyapi.com/_api_key_here
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

App will be running at: **[https://vedaz-assignment.vercel.app/](https://vedaz-assignment.vercel.app/)**

---

## 📡 API Routes

### 🔮 `/api/astrology`

* **Input**: `{ birthDetails, messages }`
* **Output**: `{ answer }` from Gemini API

### 🌠 `/api/planets`

* **Input**: `{ name, date, time, place, latitude, longitude, timezone }`
* **Output**: JSON with planetary data `{ output: { planets } }`

---

## 🎯 Usage Flow

1. Start app → Enter **Name, Date, Time, Place**.
2. Bot greets you → “What would you like to know?”
3. Ask free-text questions (love, career, health).
4. Switch to **Rāsi Chart tab** → Enter Latitude, Longitude, Timezone.
5. Get your **planetary chart**.

---

## 📸 Screenshots

### 🟣 Chat Interface
<img width="1361" height="679" alt="image" src="https://github.com/user-attachments/assets/efa5bb1a-c9a6-4484-bd24-5bd2d6ed941c" />


### 🌌 Rāsi Chart

<img width="1350" height="673" alt="image" src="https://github.com/user-attachments/assets/c32e8649-ae79-4eec-910b-f09946c098ce" />


---

## 🔧 Future Improvements

* Add **Dasha (planetary periods) analysis**.
* Generate **visual Rāsi Chart diagrams**.
* Add **multiple language support (Sanskrit/Hindi)**.
* Persistent sessions (save chats in DB).

