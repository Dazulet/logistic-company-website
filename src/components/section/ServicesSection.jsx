import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from "framer-motion";

import { useTheme } from '../../Context/ThemeContext';

// 1. ИЗМЕНЕНИЕ: Импортируем SERVICES вместо SKILLS_CATEGORY. Убираем TECH_STACK.
import { SERVICES, STATS } from "../../utils/data";
import { containerVariants, itemVariants } from '../../utils/helper';

const ServicesSection = () => {
    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section
            ref={sectionRef}
            id="services" // 2. ИЗМЕНЕНИЕ: ID секции теперь "services" для соответствия навигации
            className={` py-24 px-6 ${isDarkMode ? " bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
                } relative overflow-hidden`}
        >
            {/* Background Elements */}
            <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
                <div
                    className={`absolute top-40 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-blue-500" : "bg-blue-400"
                        }`} />
                <div
                    className={`absolute bottom-40 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-purple-500" : "bg-purple-400"
                        }`} />
            </motion.div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className={`text-sm uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-600"
                            } mb-4`}
                    >
                        Наши ключевые компетенции
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-5xl font-light mb-6"
                    >
                        Наши <span className="text-blue-500 font-medium">Услуги</span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"
                            } max-w-2xl mx-auto font-light`}
                    >
                        Мы предлагаем полный спектр логистических решений для эффективного управления вашими поставками.
                    </motion.p>
                </motion.div>

                {/* 3. ИЗМЕНЕНИЕ: Отображаем карточки услуг вместо шкал навыков */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {SERVICES.map((service) => (
                        <motion.div
                            key={service.title}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`p-8 rounded-2xl border flex flex-col items-start text-left ${isDarkMode
                                ? "bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-gray-700"
                                : "bg-white/80 border-gray-200 backdrop-blur-sm hover:border-gray-300"
                                }`}
                        >
                            {/* Service Icon */}
                            <div
                                className={`p-4 rounded-xl mb-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"
                                    }`}
                            >
                                <service.icon size={28} className="text-blue-500" />
                            </div>
                            
                            {/* Service Content */}
                            <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                            <p
                                className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"
                                    }`}
                            >
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 4. ИЗМЕНЕНИЕ: Секция статистики осталась, так как она релевантна */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
                >
                    {STATS.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            className="text-center"
                        >
                            <div className="text-3xl md:text-4xl font-light text-blue-500 mb-2">{stat.number}</div>
                            <div
                                className={`text-sm uppercase tracking-wider ${isDarkMode ? "text-gray-400" : "text-gray-600"
                                    }`}
                            >
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;