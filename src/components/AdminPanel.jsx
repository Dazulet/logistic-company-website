import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../Context/ThemeContext';

// --- ИМПОРТ ДЛЯ УВЕДОМЛЕНИЙ ---
import { toast } from 'react-toastify';

const AdminPanel = () => {
    const { isDarkMode } = useTheme();
    const token = useSelector((state) => state.auth.token);
    
    // Состояния для полей ввода
    const [trackingNumber, setTrackingNumber] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [updateTN, setUpdateTN] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');

    // Состояние message больше не нужно

    const handleCreateShipment = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Создание груза..."); // Показываем индикатор загрузки

        const response = await fetch('https://keruen-logistics-backend-production.up.railway.app/api/tracking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ trackingNumber, origin, destination }),
        });

        if (response.ok) {
            const data = await response.json();
            // Обновляем уведомление на "успех"
            toast.update(toastId, { render: `Груз ${data.trackingNumber} успешно создан!`, type: "success", isLoading: false, autoClose: 5000 });
            setTrackingNumber('');
            setOrigin('');
            setDestination('');
        } else {
            const errorText = await response.text();
            // Обновляем уведомление на "ошибку"
            toast.update(toastId, { render: errorText || `Ошибка при создании (${response.status})`, type: "error", isLoading: false, autoClose: 5000 });
        }
    };

    const handleAddHistory = async (e) => {
        e.preventDefault();
        const toastId = toast.loading("Обновление статуса..."); // Показываем индикатор загрузки

        const response = await fetch(`https://keruen-logistics-backend-production.up.railway.app/api/tracking/${updateTN.toUpperCase()}/history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ statusDescription: status, location }),
        });

        if (response.ok) {
            toast.update(toastId, { render: `Статус для ${updateTN.toUpperCase()} обновлен!`, type: "success", isLoading: false, autoClose: 5000 });
            setUpdateTN('');
            setStatus('');
            setLocation('');
        } else {
            const errorText = await response.text();
            toast.update(toastId, { render: errorText || `Ошибка обновления (${response.status})`, type: "error", isLoading: false, autoClose: 5000 });
        }
    };

    const inputStyle = `w-full p-2 border rounded mb-2 ${isDarkMode ? 'bg-gray-700 ...' : 'bg-white ...'}`;
    const buttonStyle = 'w-full p-2 bg-blue-500 ...';

    return (
        <section className={`py-12 px-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h1 className="text-center text-2xl font-bold mb-6">Панель Управления</h1>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                <form onSubmit={handleCreateShipment} className="p-4 border rounded-lg">
                    <h2 className="text-xl font-bold mb-4">1. Создать новую отправку</h2>
                    <input type="text" value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)} placeholder="Трек-номер (GL-XXXXXX)" className={inputStyle} required />
                    <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="Откуда (Город, Страна)" className={inputStyle} required />
                    <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Куда (Город, Страна)" className={inputStyle} required />
                    <button type="submit" className={buttonStyle}>Создать</button>
                </form>

                <form onSubmit={handleAddHistory} className="p-4 border rounded-lg">
                    <h2 className="text-xl font-bold mb-4">2. Обновить статус</h2>
                    <input type="text" value={updateTN} onChange={e => setUpdateTN(e.target.value)} placeholder="Трек-номер для обновления" className={inputStyle} required />
                    <input type="text" value={status} onChange={e => setStatus(e.target.value)} placeholder="Новый статус (напр. 'Прошел таможню')" className={inputStyle} required />
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Местоположение (напр. 'Хоргос')" className={inputStyle} required />
                    <button type="submit" className={buttonStyle}>Обновить статус</button>
                </form>
            </div>
            {/* Текстовое сообщение об успехе/ошибке больше не нужно */}
        </section>
    );
};

export default AdminPanel;