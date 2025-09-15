import React from 'react'
import { useState } from 'react'
import {
    motion, AnimatePresence,
} from "framer-motion";
import { Truck, Sun, Moon, Menu, X, Globe } from "lucide-react"; // ДОБАВИЛИ Globe для языка

import { useTheme } from "../Context/ThemeContext"
import { useTranslation } from 'react-i18next'; // <-- ИМПОРТИРУЕМ useTranslation

const Navbar = () => {
    const { isDarkMode, toggleTheme, language, toggleLanguage, toggleCurrency, currency } = useTheme(); // <-- language, toggleLanguage, toggleCurrency, currency
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useTranslation(); // <-- ИСПОЛЬЗУЕМ useTranslation

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        }
    };

    // Обновленный список навигационных элементов для логистической компании
    const navItems = [
        { name: t("navbar.calculator"), id: "calculator" },
        { name: t("navbar.tracking"), id: "tracking" },
        { name: t("navbar.home"), id: "home" },
        { name: t("navbar.services"), id: "services" },
        { name: t("navbar.aboutCompany"), id: "about-company" },
        // { name: t("navbar.cases"), id: "cases" },
        { name: t("navbar.team"), id: "team" },
        { name: t("navbar.contactUs"), id: "contact-us" },
    ];

    return (
        <motion.nav
            style={{ opacity: 1 }}
            className={`fixed top-0 w-full z-50 px-6 py-4 ${isDarkMode ? "bg-gray-950/80" : "bg-gray-50/80"} backdrop-blur-md border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                    <Truck size={24} className="text-blue-500" />
                    <span className="text-lg ml-1 font-semibold">Global Cargo</span>
                </motion.div>

                <div className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <motion.button
                            key={item.id}
                            whileHover={{ y: -2 }}
                            onClick={() => scrollToSection(item.id)}
                            className={`text-sm uppercase tracking-wider transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                        >
                            {item.name}
                        </motion.button>
                    ))}

                    {/* КНОПКА ВАЛЮТЫ */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleCurrency}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                        title={currency === 'KZT' ? t("calculatorSection.showInUSD") : t("calculatorSection.showInKZT")}
                    >
                        <span className="font-semibold text-sm">
                            {currency === 'KZT' ? '₸' : '$'}
                        </span>
                    </motion.button>
                    
                    {/* КНОПКА ЯЗЫКА */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleLanguage}
                        className={`p-2 rounded-full transition-colors flex items-center gap-1 ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                        title={language === 'ru' ? 'Switch to English' : 'Переключить на Русский'}
                    >
                        <Globe size={18} />
                        <span className="font-semibold text-sm">{language.toUpperCase()}</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                    >
                        {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-600" />}
                    </motion.button>
                </div>

                <div className="md:hidden flex items-center space-x-2">
                    {/* КНОПКА ВАЛЮТЫ */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleCurrency}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                        title={currency === 'KZT' ? t("calculatorSection.showInUSD") : t("calculatorSection.showInKZT")}
                    >
                        <span className="font-semibold text-sm">
                            {currency === 'KZT' ? '₸' : '$'}
                        </span>
                    </motion.button>

                    {/* КНОПКА ЯЗЫКА */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleLanguage}
                        className={`p-2 rounded-full transition-colors flex items-center gap-1 ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                        title={language === 'ru' ? 'Switch to English' : 'Переключить на Русский'}
                    >
                        <Globe size={18} />
                        <span className="font-semibold text-sm">{language.toUpperCase()}</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                    >
                        {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-600" />}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`md:hidden mt-4 p-4 rounded-lg ${isDarkMode ? "bg-gray-900" : "bg-white"} border ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
                    >
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                whileHover={{ x: 5 }}
                                onClick={() => scrollToSection(item.id)}
                                className={`block w-full text-left py-2 text-sm uppercase tracking-wider transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                            >
                                {item.name}
                            </motion.button>
                        ))}
                        {/* КНОПКИ ВАЛЮТЫ И ЯЗЫКА В МОБИЛЬНОМ МЕНЮ */}
                        <div className="flex justify-start gap-4 mt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleCurrency}
                                className={`p-2 rounded-full transition-colors ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                                title={currency === 'KZT' ? t("calculatorSection.showInUSD") : t("calculatorSection.showInKZT")}
                            >
                                <span className="font-semibold text-sm">
                                    {currency === 'KZT' ? '₸' : '$'}
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleLanguage}
                                className={`p-2 rounded-full transition-colors flex items-center gap-1 ${isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"}`}
                                title={language === 'ru' ? 'Switch to English' : 'Переключить на Русский'}
                            >
                                <Globe size={18} />
                                <span className="font-semibold text-sm">{language.toUpperCase()}</span>
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;