import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import { run } from './services/pricePointService.ts';
import * as itemNameService from './services/itemNameService.ts';
import * as recipeService from './services/recipeService.ts';
import 'bootstrap/dist/css/bootstrap.min.css';

run();
await itemNameService.init();
await recipeService.init();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// setInterval(() => {
//   console.log(albionData);
// }, 5000);
