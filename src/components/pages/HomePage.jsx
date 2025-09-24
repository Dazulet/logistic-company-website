import React from 'react';
import { useSelector } from 'react-redux';

// Импорт компонентов
import Navbar from '../Navbar';
import HeroSection from '../section/HeroSection';
import ServicesSection from '../section/ServicesSection';
import CalculatorSection from '../section/CalculatorSection';
import AboutCompanySection from '../section/AboutCompanySection';
import TeamSection from '../section/TeamSection';
import TrackingSection from '../section/TrackingSection';
import ContactUsSection from '../section/ContactUsSection';
import AdminPanel from '../AdminPanel'; // Админ-панель

const HomePage = () => {
  // Получаем токен из Redux, чтобы решить, показывать ли админку
  const token = useSelector((state) => state.auth.token);
  
  // В будущем, когда на бэкенде будет информация о пользователе,
  // можно будет проверять роль, например:
  // const user = useSelector((state) => state.auth.user);
  // const isAdmin = user?.role === 'ADMIN';

  return (
    <div>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <CalculatorSection />
      <AboutCompanySection />
      <TeamSection />
      <TrackingSection />
      
      {/* --- УСЛОВНЫЙ РЕНДЕРИНГ АДМИН-ПАНЕЛИ --- */}
      {/* Показываем админ-панель только если токен существует */}
      {token && <AdminPanel />}
      
      <ContactUsSection />
    </div>
  );
};

export default HomePage;