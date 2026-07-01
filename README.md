# AI Resume Analyzer 🚀

A premium, modern web application built using **React Router (SPA Mode)** and **Puter.js** to provide real-time AI-powered resume parsing, overall scoring, and ATS compatibility feedback.

## Features
- **PDF-to-Image Rendering**: Natively reads uploaded PDF resumes using PDF.js and converts page 1 to a JPEG image, optimized for speed and token usage.
- **Puter.js Cloud Services**:
  - **Puter Auth**: Quick, serverless user sign-in and session management.
  - **Puter Filesystem (FS)**: Uploads and stores the original PDF and the rendered preview image securely.
  - **Puter Key-Value (KV) Store**: Persists user resumes and analysis results.
  - **Puter AI Vision**: Evaluates the resume snapshot against job specifications using `openai/gpt-4o-mini` with real-time feedback generation.
- **Interactive UI**: Gorgeous dark-themed design with smooth gradients, custom score dials, detailed categories breakdown, and a skeleton loading state for preview images.

---

## Tech Stack
- **Core**: React 19, React Router v7, TypeScript
- **Bundler**: Vite
- **Integrations**: Puter.js SDK
- **Dependencies**: `pdfjs-dist` (PDF conversion)

---

## Getting Started

### Prerequisites
- Node.js (version 22.22.0 or greater recommended)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd Ai-Resume-Analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:5173`.

---

## Deployment (Netlify)

This project runs in **SPA (Single Page Application) Mode**. Use the following configurations when deploying to Netlify:

- **Build Command**: `npm run build`
- **Publish Directory**: `build/client`
- **Base Directory**: Leave empty
- **Routing Redirects**: Supported automatically via the included [public/_redirects](file:///Users/shadow/Desktop/Ai-Resume-Analyzer/public/_redirects) file.

---

## Self-Hosting Puter

If you want to run this application against a fully self-hosted Puter environment:

1. Clone and run the Puter server:
   ```bash
   git clone --depth 1 https://github.com/HeyPuter/puter ~/Desktop/puter-server
   cd ~/Desktop/puter-server
   npm install
   npm start
   ```

2. Add your own AI Provider API keys in `~/Desktop/puter-server/config.json`.

3. Point this application to your local Puter instance by changing the script source in [app/root.tsx](file:///Users/shadow/Desktop/Ai-Resume-Analyzer/app/root.tsx):
   ```html
   <!-- Replace the cloud script tag: -->
   <script src="https://js.puter.com/v2/"></script>
   
   <!-- With: -->
   <script src="http://puter.localhost:4100/sdk/puter.dev.js"></script>
   ```

---

Built with ❤️ using [React Router](https://reactrouter.com) and [Puter.js](https://puter.com). ✨
