import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '../../Context/ThemeContext';
import { TRACKING_DATA } from "../../utils/data";
import { itemVariants } from '../../utils/helper';
import { Search, PackageCheck, PackageX, Truck, Info } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next'; // 1. Импортируем useTranslation

// Объект для сопоставления статусов из data.js с ключами перевода
const statusKeyMap = {
    "В пути": "inTransit",
    "Доставлен": "delivered",
    "Задержка": "delayed",
    "Передан курьеру для доставки": "transferredToCourier",
    "Прибыл на сортировочный центр": "arrivedAtSortingCenter",
    "Покинул сортировочный центр": "leftSortingCenter",
    "Принят в отделении": "acceptedAtBranch",
    "Доставлен и вручен получателю": "deliveredToRecipient",
    "Прошел таможенное оформление": "customsCleared",
    "Отправлен из страны отправителя": "shippedFromOriginCountry",
    "Задержка на таможне": "customsDelay",
    "Прибыл в страну назначения": "arrivedInDestinationCountry"
};

const TrackingSection = () => {
    const { isDarkMode } = useTheme();
    const { t } = useTranslation(); // 2. Инициализируем функцию перевода
    const sectionRef = useRef(null);

    const [trackNumber, setTrackNumber] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const handleTrack = () => {
        setSearched(true);
        if (!trackNumber) {
            setError(t("trackingSection.pleaseEnterNumber")); // Пример нового ключа
            setTrackingResult(null);
            return;
        }

        const result = TRACKING_DATA[trackNumber.toUpperCase()];

        if (result) {
            setTrackingResult(result);
            setError('');
        } else {
            setTrackingResult(null);
            setError(t("trackingSection.errorPrefix", { trackNumber: trackNumber }));
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
        <section
            ref={sectionRef}
            id="tracking"
            className={`py-24 px-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        >
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
                        placeholder={t("trackingSection.placeholder")}
                        className={`flex-grow px-4 py-3 border rounded-lg outline-none transition-all duration-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-300'}`}
                    />
                    <button onClick={handleTrack} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-105">
                        <Search size={18} />
                        <span>{t("trackingSection.findButton")}</span>
                    </button>
                </motion.div>

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
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 text-center md:text-left">
                                        <div>
                                            <p className="text-sm text-gray-500">{t("trackingSection.trackNumberLabel")}</p>
                                            <p className="font-bold text-lg">{trackNumber.toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">{t("trackingSection.routeLabel")}</p>
                                            <p className="font-semibold">{trackingResult.origin} → {trackingResult.destination}</p>
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <p className="text-sm text-gray-500">{t("trackingSection.currentStatusLabel")}</p>
                                            <div className="flex items-center justify-center md:justify-start gap-2 font-bold text-lg">
                                                {getStatusIcon(trackingResult.status)}
                                                {/* 3. Используем t() для перевода статуса */}
                                                <span>{t(`trackingSection.status.${statusKeyMap[trackingResult.status]}`)}</span>
                                            </div>
                                        </div>
                                    </div>

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
                                                    <div className="absolute inset-0.5 rounded-full bg-blue-500 scale-0 animate-ping-slow" style={{ animationDelay: `${index * 0.2}s` }} />
                                                    <div className="absolute inset-0.5 rounded-full bg-blue-500" />
                                                </div>
                                                {/* 4. Используем t() для перевода статусов в истории */}
                                                <p className="font-semibold">{t(`trackingSection.status.${statusKeyMap[item.status]}`)}</p>
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