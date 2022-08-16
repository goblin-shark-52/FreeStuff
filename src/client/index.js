import React from 'react';
import App from './components/App';
import { createRoot } from 'react-dom/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const projectName = 'Free Stuff!';

// document.getElementById('#title').innerHTML = projectName;
// document.getElementById('#h1').innerHTML = projectName;

const root = createRoot(document.getElementById('root'));

root.render(<App />);


// AMG: added sample change here