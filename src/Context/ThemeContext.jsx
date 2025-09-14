import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
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

  // --- НОВОЕ: Формируем общий объект value ---
  // Теперь он будет содержать и тему, и валюту
  const value = {
    isDarkMode: theme === "dark",
    toggleTheme,
    currency,
    toggleCurrency,
    USD_RATE,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);