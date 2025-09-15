import React from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Mail, Phone, MapPin } from "lucide-react"
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useTheme } from '../../Context/ThemeContext'
import { useTranslation } from 'react-i18next'; // <-- ИМПОРТИРУЕМ useTranslation

import COMPANY_HERO_PIC from "../../assets/images/logistics_hero.png"
// import COMPANY_LOGO_SIGNATURE from "../../assets/images/logo_signature.svg" // Удалено, если не используется

import { containerVariants, itemVariants } from '../../utils/helper'

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation(); // <-- ИСПОЛЬЗУЕМ useTranslation

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]); // Эффект параллакса при скролле

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Главная секция */}
      <motion.section
        id="home" // ID для навигации
        style={{ y: heroY }}
        className="min-h-screen flex items-center justify-center relative px-6 pt-10"
      >
        {/* Фоновые анимированные элементы */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${
              isDarkMode ? "bg-blue-500" : "bg-blue-400"
            }`}
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className={`absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-10 ${
              isDarkMode ? "bg-purple-500" : "bg-purple-400"
            }`}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full z-10 mt-20">
          {/* Мобильный макет - центрированный */}
          <div className="block lg:hidden">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center"
            >
              {/* Изображение компании/логотип для мобильных */}
              <motion.div variants={imageVariants} className="mb-8">
                <div className="w-32 h-32 mx-auto relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`w-full h-32 rounded-2xl overflow-hidden border-4 ${
                      isDarkMode ? "border-gray-800" : "border-gray-300"
                    } shadow-2xl`}
                  >
                    <img
                      src={COMPANY_HERO_PIC} // Используем новое изображение
                      alt="Global Cargo"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  {/* Декоративное кольцо */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-2 rounded-2xl border border-blue-500/20"
                  />
                </div>
              </motion.div>

              {/* Контент для мобильных */}
              <motion.div
                variants={textVariants}
                className={`text-sm uppercase tracking-widest ${
                  isDarkMode ? "text-gray-500" : "text-gray-600"
                } mb-4`}
              >
                {t("heroSection.subtitle")}
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-5xl font-light mb-6 leading-tight"
              >
                <span className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {t("heroSection.title1")}
                </span>
                <span className="text-blue-500 font-medium ml-2">{t("heroSection.title2")}</span>
                <br />
                <span className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {t("heroSection.title3")}
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className={`text-base md:text-lg ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } mb-8 max-w-xl mx-auto font-light leading-relaxed`}
              >
                {t("heroSection.description")}
              </motion.p>

              {/* Кнопки CTA для мобильных */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection("services")} // Скролл к секции "Услуги"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300"
                >
                  {t("heroSection.buttonServices")}
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection("contact-us")} // Скролл к секции "Контакты"
                  className={`border ${
                    isDarkMode
                      ? "border-gray-700 hover:border-gray-600 text-gray-300"
                      : "border-gray-300 hover:border-gray-400 text-gray-700"
                  } px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300`}
                >
                  {t("heroSection.buttonContact")}
                </motion.button>
              </motion.div>

              {/* Социальные ссылки для мобильных */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center space-x-6 mb-8"
              >
                {[
                  { icon: FaFacebookF, href: "#" },
                  { icon: FaInstagram, href: "#" },
                  { icon: FaLinkedinIn, href: "#" },
                  { icon: Phone, href: "#" },
                  { icon: Mail, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className={`p-3 rounded-full transition-colors ${
                      isDarkMode
                        ? "text-gray-400 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>

              {/* Ключевые направления/сфера деятельности для мобильных */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center items-center space-x-6 text-xs uppercase tracking-widest flex-wrap"
              >
                <span className={`${isDarkMode ? "text-gray-600" : "text-gray-500"}`}>
                  {t("heroSection.keywords.auto")}
                </span>
                <span className={`${isDarkMode ? "text-gray-700" : "text-gray-400"}`}>
                  .
                </span>
                <span className={`${isDarkMode ? "text-gray-600" : "text-gray-500"}`}>
                  {t("heroSection.keywords.air")}
                </span>
                <span className={`${isDarkMode ? "text-gray-700" : "text-gray-400"}`}>
                  .
                </span>
                <span className={`${isDarkMode ? "text-gray-600" : "text-gray-500"}`}>
                  {t("heroSection.keywords.sea")}
                </span>
                <span className={`${isDarkMode ? "text-gray-700" : "text-gray-400"}`}>
                  .
                </span>
                <span className={`${isDarkMode ? "text-gray-600" : "text-gray-500"}`}>
                  {t("heroSection.keywords.warehouse")}
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Десктопный макет - разделенный */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Левая колонка - контент */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-left"
            >
              <motion.div
                variants={textVariants}
                className={`text-sm uppercase tracking-widest ${
                  isDarkMode ? "text-gray-500" : "text-gray-600"
                } mb-6`}
              >
                {t("heroSection.missionSubtitle")}
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl xl:text-7xl font-light mb-8 leading-tight"
              >
                <span className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {t("heroSection.missionTitle1")}
                </span>
                <span className="text-blue-500 font-medium"> {t("heroSection.missionTitle2")} </span>
                <span className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {t("heroSection.missionTitle3")}
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className={`text-xl ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } mb-12 font-light leading-relaxed max-w-lg`}
              >
                {t("heroSection.missionDescription")}
              </motion.p>

              {/* Кнопки CTA для десктопа */}
              <motion.div variants={itemVariants} className="flex gap-6 mb-8">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection("services")} // Скролл к секции "Услуги"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300"
                >
                  {t("heroSection.buttonServices")}
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection("contact-us")} // Скролл к секции "Контакты"
                  className={`border ${
                    isDarkMode
                      ? "border-gray-700 hover:border-gray-600 text-gray-300"
                      : "border-gray-300 hover:border-gray-400 text-gray-700"
                  } px-8 py-4 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300`}
                >
                  {t("heroSection.buttonContact")}
                </motion.button>
              </motion.div>

              {/* Социальные ссылки для десктопа */}
              <motion.div variants={itemVariants} className="flex space-x-6 mb-12">
                {[
                  { icon: FaFacebookF, href: "#" },
                  { icon: FaInstagram, href: "#" },
                  { icon: FaLinkedinIn, href: "#" },
                  { icon: Phone, href: "#" },
                  { icon: Mail, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className={`p-3 rounded-full transition-colors ${
                      isDarkMode
                        ? "text-gray-400 hover:text-white hover:bg-gray-800"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Правая колонка - изображение */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageVariants}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                  {/* Ключевые направления/сфера деятельности для десктопа */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center space-x-8 text-xs uppercase tracking-widest absolute -top-16 -left-28"
                    >
                      <span className={`${isDarkMode ? "text-gray-600" : "text-gray-500"}`}>
                        {t("heroSection.keywords.auto")}
                      </span>
                      <span className={`${isDarkMode ? "text-gray-700" : "text-gray-400"}`}>
                        .
                      </span>
                      <span className={`${isDarkMode ? "text-gray-600" : "text-gray-500"}`}>
                        {t("heroSection.keywords.air")}
                      </span>
                      <span className={`${isDarkMode ? "text-gray-700" : "text-gray-400"}`}>
                        .
                      </span>
                      <span className={`${isDarkMode ? "text-gray-600" : "text-gray-500"}`}>
                        {t("heroSection.keywords.sea")}
                      </span>
                      <span className={`${isDarkMode ? "text-gray-700" : "text-gray-400"}`}>
                        .
                      </span>
                      <span className={`${isDarkMode ? "text-gray-600" : "text-gray-500"}`}>
                        {t("heroSection.keywords.warehouse")}
                      </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`w-80 h-96 rounded-3xl overflow-hidden border-4 ${
                      isDarkMode ? "border-gray-800" : "border-gray-300"
                    } shadow-2xl`}
                  >
                    <img
                      src={COMPANY_HERO_PIC}
                      alt="Global Cargo"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Декоративные элементы */}
                   <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 rounded-3xl border border-blue-500/20"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 rounded-3xl border border-blue-500/10"
                  />

              </div>
            </motion.div>
          </div>
        </div>

        {/* Индикатор прокрутки */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown
            size={20}
            className={isDarkMode ? "text-gray-600" : "text-gray-400"}
          />
          {/* Добавляем текст для индикатора прокрутки */}
          <span className={`block text-xs mt-2 ${isDarkMode ? "text-gray-500" : "text-gray-700"}`}>
            {t("heroSection.scrollIndicator")}
          </span>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default HeroSection;