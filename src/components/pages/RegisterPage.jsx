import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    
    // --- ИЗМЕНЕНИЕ: Добавляем состояние для username ---
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendCode = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading("Отправка запроса...");

        try {
            const response = await fetch('https://keruen-logistics-backend-production.up.railway.app/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // --- ИЗМЕНЕНИЕ: Отправляем все три поля ---
                body: JSON.stringify({ username, phone, password }),
            });

            if (response.ok) {
                const message = await response.text();
                toast.update(toastId, { render: message, type: 'success', isLoading: false, autoClose: 5000 });
                setStep(2); // Переходим к шагу ввода кода
            } else {
                const errorText = await response.text();
                toast.update(toastId, { render: errorText || `Ошибка (${response.status})`, type: 'error', isLoading: false, autoClose: 5000 });
            }
        } catch (err) {
            console.error("Registration error:", err);
            toast.update(toastId, { render: "Ошибка сети. Попробуйте позже.", type: 'error', isLoading: false, autoClose: 5000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading("Проверка кода...");

        try {
            const response = await fetch('https://keruen-logistics-backend-production.up.railway.app/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, code }),
            });
            
            if (response.ok) {
                const message = await response.text();
                toast.update(toastId, { render: message, type: 'success', isLoading: false, autoClose: 5000 });
                toast.success("Регистрация завершена! Теперь вы можете войти.");
                navigate('/login');
            } else {
                const errorText = await response.text();
                toast.update(toastId, { render: errorText || `Ошибка (${response.status})`, type: 'error', isLoading: false, autoClose: 5000 });
            }
        } catch (err) {
            console.error("Verification error:", err);
            toast.update(toastId, { render: "Ошибка сети. Попробуйте позже.", type: 'error', isLoading: false, autoClose: 5000 });
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = `w-full p-2 border rounded mb-4 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`;
    const buttonStyle = `w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-400`;

    return (
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className={`p-8 border rounded-lg w-full max-w-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h1 className="text-2xl font-bold text-center mb-6">Регистрация</h1>
                {step === 1 && (
                    <form onSubmit={handleSendCode}>
                        {/* --- ИЗМЕНЕНИЕ: Добавлено поле Username --- */}
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Имя пользователя (логин)" className={inputStyle} required disabled={isLoading} />
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Номер телефона" className={inputStyle} required disabled={isLoading} />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Придумайте пароль" className={inputStyle} required disabled={isLoading} />
                        <button type="submit" className={buttonStyle} disabled={isLoading}>
                            {isLoading ? "Отправка..." : "Отправить код"}
                        </button>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={handleRegister}>
                        <p className="text-center mb-4 text-sm">Код подтверждения отправлен на номер {phone}.</p>
                        <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Код из SMS" className={inputStyle} required disabled={isLoading} />
                        <button type="submit" className={buttonStyle} disabled={isLoading}>
                            {isLoading ? "Проверка..." : "Зарегистрироваться"}
                        </button>
                    </form>
                )}
                 <p className="text-center mt-4 text-sm">
                    Уже есть аккаунт?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;