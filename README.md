
# Chai Code Persona AI: AI Teaching Assistants

<img width="1918" height="1073" alt="image" src="https://github.com/user-attachments/assets/c14f8e9e-a55d-4dc6-a73b-ec9b5c5deebf" />


This project is an advanced AI chat application that brings two of India's most popular coding educators, **Hitesh Choudhary** and **Piyush Garg**, to life as AI Teaching Assistants. Built with React, Vite, and the Google Gemini API, it showcases how Large Language Models can be instructed to adopt specific personas with remarkable accuracy.

The application features a real-time **"LLM-as-Judge"** evaluation system, where a second AI analyzes and scores every response for its authenticity, tone, and relevance, providing instant feedback on the quality of the persona simulation.

## ✨ Key Features

-   **Dual AI Personas**: Engage in conversations with AI versions of Hitesh Choudhary (Chai aur Code) and Piyush Garg, each with a unique, pre-defined personality and communication style.
-   **Real-time AI Judge**: Every AI response is evaluated on-the-fly for persona authenticity, tone accuracy, and content relevance, with scores displayed in the UI.
-   **Interactive Chat Mode**: Have a one-on-one conversation with your chosen AI persona.
-   **Dynamic Comparison Mode**: Enter a single prompt and receive side-by-side responses from both personas to directly compare their styles and perspectives.
-   **Performance Analytics**: Track key metrics like response time and average quality score across your session.
-   **Fully Responsive**: A sleek, modern UI that works beautifully on desktop, tablet, and mobile devices.
-   **Export Functionality**: Save your chats and comparisons as formatted `.txt` files for later review.

---

## 📸 Screenshots & Pages Explained

### 1. Chat Mode

This is the primary interface for interacting with a single AI persona.

<img width="1918" height="1072" alt="image" src="https://github.com/user-attachments/assets/40dd4119-d5fd-4bdb-a014-7c5db5764a2c" />


-   **Left Panel (Controls)**: Select your desired AI persona (Hitesh or Piyush). You can also click on "Sample Questions" to populate the chat input with a predefined prompt.
-   **Center Panel (Chat Window)**: This is where the conversation takes place. Your messages appear on the right, and the AI's responses, complete with their photo avatar and a timestamp, appear on the left.
-   **Right Panel (AI Judge Evaluation)**: This panel provides a real-time analysis of the AI's most recent message. It displays an "Overall Quality" score and a breakdown of "Quality Metrics" like Persona Authenticity, Tone, and Relevance.

### 2. Comparison Mode

This mode allows for a direct, side-by-side comparison of how both personas respond to the same prompt.

<img width="1918" height="1076" alt="image" src="https://github.com/user-attachments/assets/368f5403-0924-45e7-ae4d-c314e926bae2" />


-   **Left Panel (Controls)**: In this mode, persona selection is disabled. Clicking a "Sample Question" will trigger a comparison for both AIs.
-   **Center Panel (Persona Comparison)**: This view features two columns, one for Hitesh and one for Piyush. After a prompt is submitted, both personas generate a response simultaneously, which appear in their respective columns. It also includes an input field at the bottom to ask custom comparison questions.
-   **Right Panel (Performance Analytics)**: The evaluation panel adapts to show aggregated data for your comparison session. It displays "Judge Feedback" for the last response and "Performance Analytics" such as average quality and the total number of messages generated.

### 3. Mobile Responsive View

The application is fully optimized for mobile devices, ensuring a seamless experience on any screen size.

<img width="1222" height="1078" alt="image" src="https://github.com/user-attachments/assets/52cc8499-9126-4c13-bc0b-e199fb615ada" />


-   **Stacked Layout**: On smaller screens, the three panels stack vertically, allowing you to scroll through all the content.
-   **Adaptive Components**: The header, footer, and other UI elements become more compact to save space while keeping all functionality accessible.
-   **Optimized Space Usage**: On mobile devices, the AI Judge Evaluation panel is hidden to maximize space for the chat and comparison content.

---

## 🧠 Core Concepts Explained

### Persona Simulation

The core of this project is its ability to simulate personalities accurately. This is achieved by providing a detailed **System Instruction** to the Google Gemini model.

In `src/constants.ts`, each persona has a `systemInstruction` prompt that acts as its "brain." It defines their:
-   **Identity**: Who they are (e.g., "You are Hitesh Choudhary...").
-   **Expertise**: What they talk about (e.g., "practical, real-world advice, project-based learning...").
-   **Tone & Style**: How they talk (e.g., "direct, knowledgeable, and slightly informal... uses the phrase 'Chai aur Code'").
-   **Rules**: What they should and should not do (e.g., "Use **bold** text to emphasize key technical terms...").

This detailed instruction guides the model to generate responses that are consistently in character.

### LLM-as-Judge

To ensure the quality of the persona simulation, this project implements an "LLM-as-Judge" technique. When a persona generates a response, a second, separate call is made to the Gemini API with a specific task: to evaluate that response.

The `JUDGE_SYSTEM_INSTRUCTION` in `src/constants.ts` commands the second AI to act as an impartial evaluator. It is asked to score the response on several metrics and return its analysis in a structured JSON format, which is then displayed in the UI. This creates a powerful, real-time feedback loop.

---

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   `npm` or `yarn`

### 1. Clone the Repository

```bash
git remote add origin https://github.com/Samrat880/Persona-AI.git
cd Persona-AI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

You need a Google Gemini API key to run this project.

1.  Create a file named `.env.local` in the root of the project.
2.  Add your API key to this file:

    ```
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

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
    -   Go to your project's **Settings** tab.
    -   Click on **Environment Variables**.
    -   Add a new variable with the name `GEMINI_API_KEY` and paste your Gemini API key as the value.
4.  **Deploy**: Click the "Deploy" button. Vercel will build and deploy your application. You'll receive a live URL once it's complete.

If you see a "Configuration Error" on your deployed site, it means the environment variable was not set correctly. Double-check the name and value in your Vercel project settings.
