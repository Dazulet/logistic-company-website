import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '../../Context/ThemeContext';
import { TRACKING_DATA } from "../../utils/data";
import { itemVariants } from '../../utils/helper';
import { Search, PackageCheck, PackageX, Truck, Info } from 'lucide-react';

const TrackingSection = () => {
    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);

    const [trackNumber, setTrackNumber] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false); // Чтобы знать, был ли уже поиск

    const handleTrack = () => {
        setSearched(true);
        if (!trackNumber) {
            setError("Пожалуйста, введите трек-номер.");
            setTrackingResult(null);
            return;
        }

        const result = TRACKING_DATA[trackNumber.toUpperCase()]; // Ищем, приводя к верхнему регистру

        if (result) {
            setTrackingResult(result);
            setError('');
        } else {
            setTrackingResult(null);
            setError(`Трек-номер "${trackNumber}" не найден. Попробуйте один из этих: GL-123456, GL-987654, GL-000000`);
        }
    };

    // Функция для иконки статуса
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Доставлен':
                return <PackageCheck className="text-green-500" />;
            case 'В пути':
                return <Truck className="text-blue-500 animate-pulse" />;
            case 'Задержка':
                return <PackageX className="text-red-500" />;
            default:
                return <Info className="text-gray-500" />;
        }
    };

    return (
        <section
            ref={sectionRef}
            id="tracking" // ID для навигации
            className={`py-24 px-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        >
            <div className="max-w-4xl mx-auto">
                {/* Заголовок */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-light mb-4">
                        Отслеживание <span className="font-medium text-blue-500">груза</span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Введите ваш трек-номер, чтобы узнать актуальный статус и историю перемещений вашего отправления.
                    </p>
                </motion.div>

                {/* Форма поиска */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex items-center gap-2 max-w-lg mx-auto mb-12">
                    <input
                        type="text"
                        value={trackNumber}
                        onChange={(e) => setTrackNumber(e.target.value)}
                        placeholder="Например, GL-123456"
                        className={`flex-grow px-4 py-3 border rounded-lg outline-none transition-all duration-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-300'}`}
                    />
                    <button onClick={handleTrack} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-105">
                        <Search size={18} />
                        <span>Найти</span>
                    </button>
                </motion.div>
                
                {/* Результат отслеживания */}
                <AnimatePresence>
                    {searched && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className={`p-8 rounded-2xl border ${isDarkMode ? 'bg-gray-950/50 border-gray-800' : 'bg-gray-50/80 border-gray-200'}`}
                        >
                            {error && <p className="text-center text-red-500">{error}</p>}
                            
                            {trackingResult && (
                                <div>
                                    {/* Основная информация */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 text-center md:text-left">
                                        <div>
                                            <p className="text-sm text-gray-500">Трек-номер</p>
                                            <p className="font-bold text-lg">{trackNumber.toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Маршрут</p>
                                            <p className="font-semibold">{trackingResult.origin} → {trackingResult.destination}</p>
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <p className="text-sm text-gray-500">Текущий статус</p>
                                            <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-lg">
                                                {getStatusIcon(trackingResult.status)}
                                                <span>{trackingResult.status}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* История перемещений (Timeline) */}
                                    <div className="relative pl-8 border-l-2 [isDarkMode ? 'border-gray-700' : 'border-gray-300']">
                                        {trackingResult.history.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ delay: index * 0.1 }}
                                                className="mb-8 relative"
                                            >
                                                <div className={`absolute -left-[34px] top-1 w-4 h-4 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                                                    <div className="absolute inset-0.5 rounded-full bg-blue-500 scale-0 animate-ping-slow" style={{ animationDelay: `${index * 0.2}s` }}/>
                                                    <div className="absolute inset-0.5 rounded-full bg-blue-500"/>
                                                </div>
                                                <p className="font-semibold">{item.status}</p>
                                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.location}</p>
                                                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{item.date}, {item.time}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default TrackingSection;