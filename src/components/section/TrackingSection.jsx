import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '../../Context/ThemeContext';
import { itemVariants } from '../../utils/helper';
import { Search, PackageCheck, PackageX, Truck, Info } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'; // Убедитесь, что toast импортирован

// Этот объект остается полезным для перевода ОСНОВНОГО статуса груза
const statusKeyMap = {
    "В пути": "inTransit",
    "Доставлен": "delivered",
    "Задержка": "delayed",
};

const TrackingSection = () => {
    const { isDarkMode } = useTheme();
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const token = useSelector((state) => state.auth.token);

    const [trackNumber, setTrackNumber] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    
    // --- ИЗМЕНЕНИЕ: Состояние 'error' полностью удалено. ---
    // Вся обратная связь теперь идет через react-toastify.

    const handleTrack = async () => {
        // Проверка авторизации
        if (!token) {
            toast.info("Для отслеживания груза необходимо войти в систему.");
            return;
        }

        // Проверка на пустое поле
        if (!trackNumber) {
            toast.warn(t("trackingSection.pleaseEnterNumber", "Пожалуйста, введите трек-номер."));
            return;
        }
        
        setSearched(true);
        setIsLoading(true);
        setTrackingResult(null); // Сбрасываем предыдущий результат

        try {
            const response = await fetch(`https://keruen-logistics-backend-production.up.railway.app/api/tracking/${trackNumber.toUpperCase()}`);
            if (response.ok) {
                const data = await response.json();
                setTrackingResult(data);
                toast.success(`Найден груз ${trackNumber.toUpperCase()}`);
            } else {
                // Если сервер ответил ошибкой (например, 404), показываем уведомление
                toast.error(t("calculatorSection.errors.notFound", { trackNumber }));
            }
        } catch (err) {
            console.error("Network error:", err);
            toast.error("Ошибка сети. Не удалось подключиться к серверу отслеживания.");
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Доставлен': return <PackageCheck className="text-green-500" />;
            case 'В пути': return <Truck className="text-blue-500 animate-pulse" />;
            case 'Задержка': return <PackageX className="text-red-500" />;
            default: return <Info className="text-gray-500" />;
        }
    };

    return (
        <section ref={sectionRef} id="tracking" className={`py-24 px-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <div className="max-w-4xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-light mb-4">
                        <Trans i18nKey="trackingSection.title">
                            Отслеживание <span className="font-medium text-blue-500">груза</span>
                        </Trans>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {t("trackingSection.description")}
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex items-center gap-2 max-w-lg mx-auto mb-12">
                    <input
                        type="text"
                        value={trackNumber}
                        onChange={(e) => setTrackNumber(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                        placeholder={!token ? "Войдите, чтобы отслеживать" : t("trackingSection.placeholder")}
                        className={`flex-grow px-4 py-3 border rounded-lg outline-none transition-all duration-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-300'}`}
                        disabled={!token || isLoading}
                    />
                    <button onClick={handleTrack} disabled={!token || isLoading} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-105 disabled:bg-blue-400 disabled:scale-100">
                        {isLoading ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                            <Search size={18} />
                        )}
                        <span>{isLoading ? t("submitting", "Поиск...") : t("trackingSection.findButton")}</span>
                    </button>
                </motion.div>

                <AnimatePresence>
                    {/* --- ИЗМЕНЕНИЕ: Блок результатов показывается только если есть результат и нет загрузки --- */}
                    {searched && token && !isLoading && trackingResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className={`p-8 rounded-2xl border min-h-[10rem] ${isDarkMode ? 'bg-gray-950/50 border-gray-800' : 'bg-gray-50/80 border-gray-200'}`}
                        >
                            {/* Отображение ошибки удалено отсюда, так как оно теперь в toast */}
                            <div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 text-center md:text-left">
                                    <div>
                                        <p className="text-sm text-gray-500">{t("trackingSection.trackNumberLabel")}</p>
                                        <p className="font-bold text-lg">{trackingResult.trackingNumber.toUpperCase()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">{t("trackingSection.routeLabel")}</p>
                                        <p className="font-semibold">{trackingResult.origin} → {trackingResult.destination}</p>
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <p className="text-sm text-gray-500">{t("trackingSection.currentStatusLabel")}</p>
                                        <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-lg">
                                            {getStatusIcon(trackingResult.status)}
                                            <span>{t(`trackingSection.status.${statusKeyMap[trackingResult.status]}`, trackingResult.status)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative pl-8 border-l-2 [isDarkMode ? 'border-gray-700' : 'border-gray-300']">
                                    {trackingResult.history.map((item, index) => {
                                        const eventDate = new Date(item.timestamp);
                                        const formattedDate = eventDate.toLocaleDateString('ru-RU');
                                        const formattedTime = eventDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

                                        return (
                                            <motion.div
                                                key={item.id}
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ delay: index * 0.1 }}
                                                className="mb-8 relative"
                                            >
                                                <div className={`absolute -left-[34px] top-1 w-4 h-4 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                                                    <div className="absolute inset-0.5 rounded-full bg-blue-500 scale-0 animate-ping-slow" style={{ animationDelay: `${index * 0.2}s` }} />
                                                    <div className="absolute inset-0.5 rounded-full bg-blue-500" />
                                                </div>
                                                <p className="font-semibold">{item.statusDescription}</p>
                                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.location}</p>
                                                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>{formattedDate}, {formattedTime}</p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default TrackingSection;