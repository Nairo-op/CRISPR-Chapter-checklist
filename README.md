# Chapter Checklist React App

- This project is a checklist website app created for CRISPR Learning mentors who wish to track their progress efficiently.
- To see the current deployment [click Here](https://crispr-chapter-checklist-dashboard.vercel.app/).
- You can install the app and change the chapter names using the instructions given below.
- Your progress will be locally saved on your browser, so stick to using one browser.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the URL shown in the terminal.

4. You can change the chapter names and subject name in (root-folder => src => App.jsx), under an object defined as SUBJECT_CONFIG. 

## Project files

- `src/main.jsx` - application entry point
- `src/App.jsx` - main React component
- `src/index.css` and `src/App.css` - styling
- `vite.config.js` - Vite configuration
