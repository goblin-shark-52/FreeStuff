import React from 'react';
import App from './components/App';
import { createRoot } from 'react-dom/client';
import "./app.scss";

const projectName = 'Free Stuff!';

// document.getElementById('#title').innerHTML = projectName;
// document.getElementById('#h1').innerHTML = projectName;

const root = createRoot(document.getElementById('root'));

root.render(<App />);
