# AI Battle Arena ⚔️

AI Battle Arena is a web application where different AI models (like Mistral, Google Gemini, and Cohere Command) compete against each other to solve programming and reasoning problems. A judge model evaluates their solutions and awards scores based on correctness, elegance, and efficiency.

## Architecture

The project is structured as a monorepo:
*   **`Frontend/`**: A React application built with Vite and TailwindCSS.
*   **`Backend/`**: A Node.js API built with Express, TypeScript, and LangChain/LangGraph.

---

## Local Setup

### 1. Prerequisites
Ensure you have **Node.js (v18+)** installed.

### 2. Backend Setup
1. Navigate to the backend directory:
    ```bash
    cd Backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file based on `.env.example` and add your API keys:
    ```env
    PORT=3000
    GOOGLE_API_KEY=your_gemini_api_key
    MISTRAL_API_KEY=your_mistral_api_key
    COHERE_API_KEY=your_cohere_api_key
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd Frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the Vite dev server:
    ```bash
    npm run dev
    ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment Guide 🚀

This repository is pre-configured for automated deployments to **Render** and **Vercel**.

### Option A: Deploying to Render (Recommended for Fullstack)

Render can host both the frontend and the backend automatically using the included `render.yaml` blueprint.

1. Push your code to a remote Git repository (GitHub, GitLab, etc.).
2. Log in to [Render](https://render.com/).
3. Click **New +** and select **Blueprint**.
4. Connect your Git repository. Render will automatically detect `render.yaml` and configure two services:
    *   **Frontend**: `ai-battle-arena-frontend` (Static Site)
    *   **Backend**: `ai-battle-arena-backend` (Node Web Service)
5. Under the **Backend** service settings on Render, add the following environment variables:
    *   `GOOGLE_API_KEY`
    *   `MISTRAL_API_KEY`
    *   `COHERE_API_KEY`
6. Once the Backend service is deployed, copy its URL (e.g., `https://ai-battle-arena-backend.onrender.com`).
7. Go to the **Frontend** service settings on Render, and add an environment variable:
    *   `VITE_API_URL` = (Your copied Backend URL)
8. Re-deploy the Frontend to apply the new API URL.

---

### Option B: Deploying to Vercel (Frontend Only)

Vercel is excellent for hosting the static React frontend with global CDN performance.

1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New Project** and import your Git repository.
3. In the project setup, set the **Root Directory** to `Frontend`.
4. Vercel will automatically detect that it is a Vite project and configure the build commands.
5. In the **Environment Variables** section, add:
    *   `VITE_API_URL` = (Your deployed backend URL from Render or elsewhere)
6. Click **Deploy**.
