import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import gsap from 'gsap';
import { applyGlobalRefreshRate } from './config/refreshRate';

// Apply total website refresh rate (Min 60 / Max 120)
applyGlobalRefreshRate(60, 120);
// Configure GSAP to target a max of 120fps
gsap.ticker.fps(120);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
