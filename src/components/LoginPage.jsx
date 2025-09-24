import React, { useState } from 'react';
import { useTheme } from '../Context/ThemeContext';

// Функция 'onLogin' будет передана из App.jsx
const LoginPage = ({ onLogin }) => {
    const { isDarkMode } = useTheme();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Basic Authentication: кодируем "username:password" в Base64
        const token = btoa(`${username}:${password}`);
        onLogin(token); // Передаем токен в App.jsx для сохранения
    };
    
    // Стили можно вынести
    const inputStyle = `w-full p-2 border rounded mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`;
    const buttonStyle = 'w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600';

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleLogin} className={`p-8 border rounded-lg w-full max-w-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <h1 className="text-2xl font-bold text-center mb-6">Вход для сотрудников</h1>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Логин" className={inputStyle} required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" className={inputStyle} required />
                <button type="submit" className={buttonStyle}>Войти</button>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;