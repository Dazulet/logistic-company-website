import { StrictMode } from 'react'
import React from 'react'; 
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from 'react-dom/client'; // <-- ИСПРАВЛЕНИЕ: Добавляем этот импорт

import App from './App.jsx'
import './i18n';
import { store } from './store'; // <-- Импортируем хранилище
import { Provider } from 'react-redux'; // <-- Импортируем Provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Оборачиваем App в Provider, чтобы все компоненты имели доступ к Redux */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
