import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../store/authSlice';
import { useTheme } from '../../Context/ThemeContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const { isDarkMode } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading("Выполняется вход...");

        try {
            // --- ГЛАВНОЕ ИЗМЕНЕНИЕ: Отправляем запрос на /api/auth/login ---
            const response = await fetch('https://keruen-logistics-backend-production.up.railway.app/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const jwtToken = await response.text(); // Получаем JWT-токен из ответа
                dispatch(login(jwtToken)); // Сохраняем JWT-токен в Redux
                toast.update(toastId, { render: "Вход выполнен успешно!", type: 'success', isLoading: false, autoClose: 3000 });
                navigate('/'); // Перенаправляем на главную
            } else {
                const errorText = await response.text();
                toast.update(toastId, { render: errorText || `Ошибка входа (${response.status})`, type: 'error', isLoading: false, autoClose: 5000 });
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.update(toastId, { render: "Ошибка сети. Попробуйте позже.", type: 'error', isLoading: false, autoClose: 5000 });
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = `w-full p-2 border rounded mb-4 ${isDarkMode ? 'bg-gray-700 ...' : 'bg-white ...'}`;
    const buttonStyle = `w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-400`;

    return (
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <form onSubmit={handleLogin} className={`p-8 border rounded-lg ...`}>
                <h1 className="text-2xl font-bold text-center mb-6">Вход для сотрудников</h1>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Логин" className={inputStyle} required disabled={isLoading} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" className={inputStyle} required disabled={isLoading} />
                <button type="submit" className={buttonStyle} disabled={isLoading}>
                    {isLoading ? "Вход..." : "Войти"}
                </button>
                <p className="text-center mt-4 text-sm">
                    Нет аккаунта?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Зарегистрироваться
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;