import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Sun, Moon, Menu, X, Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';

// Импорты для Redux и React Router
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice'; // Убедитесь, что путь к authSlice правильный

// Контекст для темы, языка, валюты
import { useTheme } from "../Context/ThemeContext";

const Navbar = () => {
    // Хуки для темы, языка и валюты
    const { isDarkMode, toggleTheme, language, toggleLanguage, toggleCurrency, currency } = useTheme();
    // Хуки для Redux (состояние)
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    // Хук для навигации
    const navigate = useNavigate();
    // Хук для перевода
    const { t } = useTranslation();
    // Локальное состояние для мобильного меню
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/'); // Перенаправляем на главную после выхода
    };

    const scrollToSection = (sectionId) => {
        // Если мы на другой странице, сначала переходим на главную
        navigate('/');
        // Небольшая задержка, чтобы React успел перерендерить страницу
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false);
            }
        }, 100);
    };

    const navItems = [
        { name: t("navbar.home"), id: "home" },
        { name: t("navbar.services"), id: "services" },
        { name: t("navbar.calculator"), id: "calculator" },
        { name: t("navbar.aboutCompany"), id: "about-company" },
        { name: t("navbar.team"), id: "team" },
        { name: t("navbar.tracking"), id: "tracking" },
        { name: t("navbar.contactUs"), id: "contact-us" },
    ];


    return (
        <motion.nav
            style={{ opacity: 1 }}
            className={`fixed top-0 w-full z-50 px-6 py-4 ${isDarkMode ? "bg-gray-950/80" : "bg-gray-50/80"} backdrop-blur-md border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Логотип */}
                <Link to="/" className="flex-shrink-0">
                    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 cursor-pointer">
                        <Truck size={24} className="text-blue-500" />
                        <span className={`text-lg ml-1 font-semibold ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>Global Cargo</span>
                    </motion.div>
                </Link>

                {/* Навигация для десктопа */}
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
                </div>

                {/* Правый блок: Управление и Авторизация */}
                <div className="hidden md:flex items-center space-x-2">
                    {/* Кнопки управления */}
                    <motion.button
                        onClick={toggleCurrency}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                        title={currency === 'KZT' ? t("calculatorSection.showInUSD") : t("calculatorSection.showInKZT")}
                    >
                        <span className="font-semibold text-sm">
                            {currency === 'KZT' ? '₸' : '$'}
                        </span>
                    </motion.button>

                    <motion.button
                        onClick={toggleLanguage}
                        className={`p-2 rounded-full flex items-center gap-1 transition-colors ${isDarkMode ?"text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                        title={language === 'ru' ? 'Switch to English' : 'Переключить на Русский'}
                    >
                        <Globe size={18} />
                        <span className="font-semibold text-sm">{language.toUpperCase()}</span>
                    </motion.button>

                    <motion.button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-200 text-black"
                            }`}
                    >
                        {isDarkMode
                            ? <Sun size={18} className="text-yellow-400" />
                            : <Moon size={18} className="text-blue-600" />
                        }
                    </motion.button>


                    {/* Кнопки авторизации */}
                    {token ? (
                        <motion.button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-red-600">
                            Выйти
                        </motion.button>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link to="/login">
                                <motion.button className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-blue-600">
                                    Вход
                                </motion.button>
                            </Link>
                            {/* <Link to="/register">
                                <motion.button className={`border px-3 py-2 rounded-md text-sm font-semibold ${isDarkMode ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}>
                                    Регистрация
                                </motion.button>
                            </Link> */}
                        </div>
                    )}
                </div>

                {/* Иконка мобильного меню */}
                <div className="md:hidden flex items-center">
                    <motion.button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-full transition-colors  ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>
            </div>

            {/* Выпадающее мобильное меню */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`md:hidden mt-4 overflow-hidden rounded-lg border  ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                    >
                        <div className="p-4">
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`block w-full text-left py-2 text-sm uppercase ...`}>
                                    {item.name}
                                </motion.button>
                            ))}
                            <div className="border-t my-4"></div>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2">
                                  <motion.button
                        onClick={toggleCurrency}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                        title={currency === 'KZT' ? t("calculatorSection.showInUSD") : t("calculatorSection.showInKZT")}
                    >
                        <span className="font-semibold text-sm">
                            {currency === 'KZT' ? '₸' : '$'}
                        </span>
                    </motion.button>

                    <motion.button
                        onClick={toggleLanguage}
                        className={`p-2 rounded-full flex items-center gap-1 transition-colors ${isDarkMode ?"text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
                        title={language === 'ru' ? 'Switch to English' : 'Переключить на Русский'}
                    >
                        <Globe size={18} />
                        <span className="font-semibold text-sm">{language.toUpperCase()}</span>
                    </motion.button>
<motion.button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-gray-800 text-white" : "hover:bg-gray-200 text-black"
                            }`}
                    >
                        {isDarkMode
                            ? <Sun size={18} className="text-yellow-400" />
                            : <Moon size={18} className="text-blue-600" />
                        }
                    </motion.button>                                </div>
                                {token ? (
                                    <motion.button onClick={handleLogout} className="bg-red-500 text-white ...">Выйти</motion.button>
                                ) : (
                                    <div className="flex space-x-2">
                                        <Link to="/login"><motion.button className="bg-blue-500 ...">Вход</motion.button></Link>
                                        <Link to="/register"><motion.button className="border ...">Регистрация</motion.button></Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;