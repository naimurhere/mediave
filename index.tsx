import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global error handler for module loading or syntax errors
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Critical error during app boot:", message, "at", source, lineno, colno);
  const root = document.getElementById('root');
  if (root && root.innerHTML === "") {
    root.innerHTML = `<div style="padding: 40px; color: #ef4444; font-family: sans-serif; text-align: center;">
      <h2 style="font-weight: 900;">App Failed to Load</h2>
      <p style="color: #94a3b8;">${message}</p>
      <p style="font-size: 12px; margin-top: 20px;">Check browser console for details.</p>
    </div>`;
  }
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);