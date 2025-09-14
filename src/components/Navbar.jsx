import React from 'react'
import { useState } from 'react'
import {
    motion, AnimatePresence,
} from "framer-motion";
import { Truck, Sun, Moon, Menu, X } from "lucide-react"; // Изменили Code2 на Truck для логистической компании

import { useTheme } from "../Context/ThemeContext"

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        }
    };

    // Обновленный список навигационных элементов для логистической компании
    const navItems = [
        { name: "Главная", id: "home" },
        { name: "Услуги", id: "services" }, // Соответствует ServicesSection
        { name: "О компании", id: "about-company" }, // Соответствует AboutCompanySection
        { name: "Калькулятор", id: "calculator" }, // Можно добавить, если будет секция
        // { name: "Трекинг", id: "tracking" }, // Можно добавить, если будет секция
        { name: "Кейсы", id: "cases" }, // Можно добавить, если будет секция
        { name: "Контакты", id: "contact-us" }, // Соответствует ContactUsSection
    ];

    return <motion.nav
        style={{ opacity: 1 }}
        className={`fixed top-0 w-full z-50 px-6 py-4 ${isDarkMode ? "bg-gray-950/80" : "bg-gray-50/80"
            } backdrop-blur-md border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"
            }`}
    >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo and Company Name */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
            >
                <Truck size={24} className="text-blue-500" />{" "} {/* Иконка для логистики */}
                <span className="text-lg ml-1 font-semibold">Global Cargo</span> {/* Название компании */}
            </motion.div>

            {/* Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                    <motion.button
                        key={item.id}
                        whileHover={{ y: -2 }}
                        onClick={() => scrollToSection(item.id)}
                        className={`text-sm uppercase tracking-wider transition-colors ${isDarkMode
                                ? "text-gray-400 hover:text-white"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        {item.name}
                    </motion.button>
                ))}

                {/* Theme Toggle Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme} // Используем toggleTheme напрямую
                    className={`p-2 rounded-full transition-colors${isDarkMode
                            ? "text-gray-400 hover:text-white hover:bg-gray-800"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                        }`}
                >
                    {isDarkMode
                        ? <Sun size={18} className="text-yellow-400" />
                        : <Moon size={18} className="text-blue-600" />}
                </motion.button>
            </div>

            {/* Mobile Menu Button & Theme Toggle (Mobile) */}
            <div className="md:hidden flex items-center space-x-4">
                {/* Theme Toggle Button for mobile */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme}
                    className={`p-2 rounded-full transition-colors${isDarkMode
                            ? "text-gray-400 hover:text-white hover:bg-gray-800"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                        }`}
                >
                    {isDarkMode
                        ? <Sun size={18} className="text-yellow-400" />
                        : <Moon size={18} className="text-blue-600" />}
                </motion.button>
                {/* Mobile Menu Icon */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-2 rounded-full transition-colors${isDarkMode
                            ? "text-gray-400 hover:text-white hover:bg-gray-800"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                        }`}
                >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
            </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`md:hidden mt-4 p-4 rounded-lg ${isDarkMode ? "bg-gray-900" : "bg-white"
                        } border ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
                >
                    {navItems.map((item) => (
                        <motion.button
                            key={item.id}
                            whileHover={{ x: 5 }}
                            onClick={() => scrollToSection(item.id)}
                            className={`block w-full text-left py-2 text-sm uppercase tracking-wider transition-colors ${isDarkMode
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}>
                            {item.name}
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    </motion.nav>
}

export default Navbar