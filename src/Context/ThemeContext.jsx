// Context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // <-- ДОБАВИТЬ ЭТУ СТРОКУ

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
   const { i18n } = useTranslation(); // Теперь useTranslation будет определен
  // --- Управление темой (остается без изменений) ---
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // --- НОВОЕ: Управление валютой ---
  const [currency, setCurrency] = useState("KZT"); // По умолчанию - тенге

  // Условный курс, который мы будем использовать для конвертации
  const USD_RATE = 450; 

  // Функция для переключения валюты
  const toggleCurrency = () => {
    setCurrency(prev => (prev === "KZT" ? "USD" : "KZT"));
  };

  // --- НОВОЕ: Управление языком ---
  // Инициализируем текущим языком i18n ИЛИ значением по умолчанию 'ru'
  const [language, setLanguage] = useState(i18n.language || 'ru'); 

  useEffect(() => {
    // Обновляем язык i18n при изменении состояния language
    // Или при изменении i18n.language, если оно было установлено извне (например, LanguageDetector)
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
    // Сохраняем язык в localStorage, если хотите сохранять выбор пользователя
    localStorage.setItem("i18nextLng", language);
  }, [language, i18n]);

  // Дополнительный useEffect для синхронизации с i18n.language, если он изменится извне
  // Например, если i18next-browser-languagedetector определит другой язык
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      setLanguage(lng);
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "ru" ? "en" : "ru"));
  };

  // --- НОВОЕ: Формируем общий объект value ---
  const value = {
    isDarkMode: theme === "dark",
    toggleTheme,
    currency,
    toggleCurrency,
    USD_RATE,
    language,       
    toggleLanguage, 
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);