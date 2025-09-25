# Persona AI: Personal AI Assistant

This project is an advanced AI chat application featuring a personalized AI assistant powered by **Yashwanth's persona**. Built with React, TypeScript, Vite, and the Google Gemini API, it showcases modern streaming capabilities and real-time chat functionality similar to ChatGPT.

The application features **real-time streaming responses** that appear character by character with natural typing speed and intelligent punctuation pauses, creating an engaging conversational experience.

## ✨ Key Features

- **Personal AI Assistant**: Engage in conversations with Yashwanth's AI persona, featuring a unique personality and communication style.
- **Real-time Streaming**: ChatGPT-like streaming responses that appear character by character with natural typing speed.
- **Smart Typing Animation**: Intelligent pauses at punctuation marks for realistic conversation flow.
- **Interactive Chat Interface**: Clean, modern chat UI with message bubbles and typing indicators.
- **Scroll Management**: Smart auto-scroll that allows manual scrolling during streaming without interruption.
- **Responsive Design**: Sleek, modern UI that works beautifully on desktop, tablet, and mobile devices.
- **Real-time Updates**: Instant message updates with smooth animations and transitions.

---

## 🎯 Application Interface

### Main Chat Interface

The application features a clean, modern chat interface with:

- **Left Sidebar**: Contains persona information and sample questions to get started
- **Main Chat Area**: Where conversations take place with streaming responses
- **Message Bubbles**: User messages appear on the right (blue), AI responses on the left (gray)
- **Streaming Animation**: Real-time typing with animated cursor during response generation

### Streaming Features

- **Character-by-Character Display**: Text appears naturally like someone typing
- **Smart Punctuation Pauses**: Longer pauses at sentences, shorter at commas
- **Scroll Management**: Users can scroll up to read previous messages while new ones stream
- **Typing Cursor**: Animated cursor (|) shows when AI is actively responding

### Responsive Design

The application is fully optimized for all device sizes:

- **Desktop**: Full sidebar and chat layout
- **Tablet**: Responsive grid that adapts to screen size
- **Mobile**: Optimized layout with proper touch interactions

---

## 🧠 Technical Implementation

### Streaming Architecture

The application implements a sophisticated streaming system that mimics ChatGPT's typing behavior:

#### **Dual-Layer Streaming**:

1. **API Streaming**: Real-time chunks from Google Gemini API using `generateContentStream`
2. **Character Simulation**: Controlled character-by-character display with realistic timing

#### **Smart Typing Algorithm**:

```typescript
// Variable speed with natural pauses
let delay = 20; // Base delay (20ms)

if (char === "." || char === "!" || char === "?") {
  delay = 100; // Sentence endings
} else if (char === "," || char === ";" || char === ":") {
  delay = 50; // Clause pauses
} else if (char === " ") {
  delay = 25; // Word spacing
} else {
  delay = Math.random() * 15 + 15; // 15-30ms per character
}
```

### Persona Configuration

The AI persona is configured in `constants.ts` with:

- **Identity**: Yashwanth's personality and background
- **Communication Style**: Tone, language patterns, and response format
- **System Instructions**: Guidelines for consistent character responses

### State Management

React state handles:

- **Message History**: Array of chat messages with streaming status
- **Streaming Control**: Character queuing and typing simulation
- **UI Updates**: Real-time message updates and scroll management

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- `npm` or `yarn`

### 1. Clone the Repository

```bash
git remote add origin git@github.com:yashwanthN24/my-persona-ai.git
cd my-persona-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

You need a Google Gemini API key to run this project.

1.  Create a file named `.env` in the root of the project.
2.  Add your API key to this file:

    ```
    VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

**Note**: The environment variable must be prefixed with `VITE_` to be accessible in the Vite build process.

### 4. Run the Development Server

```bash
npm run dev
```

The application should now be running on `http://localhost:5173`.

---

## ☁️ Deployment to Vercel

Deploying this project is simple with Vercel.

1.  **Push to GitHub**: Create a new repository on GitHub and push your project code.
2.  **Import to Vercel**: On your Vercel dashboard, click "Add New... -> Project" and import the repository from GitHub. Vercel will automatically detect that you are using Vite.
3.  **Configure Environment Variable**: This is the most important step.
    - Go to your project's **Settings** tab.
    - Click on **Environment Variables**.
    - Add a new variable with the name `VITE_API_KEY` and paste your Gemini API key as the value.
4.  **Deploy**: Click the "Deploy" button. Vercel will build and deploy your application. You'll receive a live URL once it's complete.

If you see a "Configuration Error" on your deployed site, it means the environment variable was not set correctly. Double-check the name and value in your Vercel project settings.

---

## 🚀 Streaming Implementation Features

### Real-time Response Generation

The application provides a ChatGPT-like experience with:

- **Instant Response Start**: Streaming begins immediately when API responds
- **Natural Typing Speed**: 15-30ms per character with realistic variation
- **Smart Punctuation Handling**: Automatic pauses at sentences and clauses
- **Smooth Animations**: CSS transitions and typing cursor effects

### User Experience Enhancements

- **Scroll Freedom**: Users can scroll up during streaming without being forced to bottom
- **Visual Feedback**: Animated typing cursor (|) during active streaming
- **Error Handling**: Graceful fallback for API failures with user-friendly messages
- **Responsive Performance**: Optimized state updates for smooth streaming

### Technical Architecture

```
User Input → API Streaming → Character Queue → Typing Simulation → UI Update
```

The implementation uses a queue-based system where:

1. API chunks are received in real-time
2. Characters are queued for controlled display
3. Typing simulation processes queue with natural delays
4. UI updates smoothly without blocking user interaction

---

## 🛠️ Project Structure

```
src/
├── components/          # React components
│   ├── ChatWindow.tsx   # Main chat interface
│   ├── Message.tsx      # Individual message bubbles
│   ├── ChatInput.tsx    # Message input component
│   └── ...
├── services/            # API integration
│   └── geminiService.ts # Gemini API with streaming
├── types.ts            # TypeScript definitions
├── constants.ts        # Persona configuration
└── App.tsx            # Main application component
```

---

## 🔧 Customization

### Adjusting Streaming Speed

In `App.tsx`, modify the typing delays:

```typescript
// Faster typing
delay = Math.random() * 10 + 10; // 10-20ms per character

// Slower typing
delay = Math.random() * 30 + 20; // 20-50ms per character
```

### Modifying Persona

Update `constants.ts` to customize the AI persona:

```typescript
export const PERSONA_CONFIG = {
  Yashwanth: {
    systemInstruction: "Your custom persona instructions...",
    name: "Your Name",
    avatar: "🤖",
  },
};
```
