import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext";

// 1. ИЗМЕНЕНИЕ: Импортируем COMPANY_JOURNEY и COMPANY_VALUES вместо старых.
import { COMPANY_JOURNEY, COMPANY_VALUES } from "../../utils/data";
import { containerVariants, itemVariants } from "../../utils/helper";

const AboutCompanySection = () => {
    const { isDarkMode } = useTheme();

    const sectionRef = useRef(null);
    const timelineRef = useRef(null);

    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const timelineInView = useInView(timelineRef, { once: true, margin: "-50px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const yTransform = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const timelineVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const steplineVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };
    return (
        <section
            id="about-company" // 2. ИЗМЕНЕНИЕ: ID секции для навигации
            ref={sectionRef}
            className={`py-24 px-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                } relative overflow-hidden`}
        >
            {/* Background Elements */}
            <motion.div style={{ y: yTransform }} className="absolute inset-0 overflow-hidden">
                <div
                    className={`absolute top-40 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-blue-500" : "bg-blue-400"
                        }`}
                />
                <div
                    className={`absolute bottom-40 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-purple-500" : "bg-purple-400"
                        }`}
                />
            </motion.div>
            <div className="max-w-6xl mx-auto relative z-10">
                {/* 3. ИЗМЕНЕНИЕ: Обновляем тексты заголовков */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className={`text-sm uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-600"
                            } mb-4`}
                    >
                        Узнайте о нас больше
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-light mb-6">
                        О компании
                        <span className=" text-blue-500 font-medium"> Global Cargo</span>
                    </motion.h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* 4. ИЗМЕНЕНИЕ: Обновляем тексты миссии и ценностей */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="space-y-8"
                    >
                        {/* Наша миссия */}
                        <motion.div
                            variants={itemVariants}
                            className={`p-8 rounded-2xl border ${isDarkMode
                                ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                                : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                                }`}
                        >
                            <h3 className="text-2xl font-medium mb-6">Наша миссия</h3>

                            <p
                                className={`text-lg leading-relaxed mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                    }`}
                            >
                                Мы стремимся предоставлять первоклассные логистические услуги, которые помогают нашим клиентам расти и преуспевать. Наша цель — быть не просто исполнителем, а надежным партнером в цепочке поставок.
                            </p>

                            <p
                                className={`text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"
                                    }`}
                            >
                                Основываясь на инновациях, ответственности и индивидуальном подходе, мы строим долгосрочные отношения и обеспечиваем безупречное выполнение каждой задачи.
                            </p>

                        </motion.div>
                        {/* Наши ценности */}
                        <motion.div variants={itemVariants} className="">
                            <h3 className="text-xl font-medium mb-6">Наши ценности</h3>
                            <div className="grid gap-4">
                                {/* 5. ИЗМЕНЕНИЕ: Используем COMPANY_VALUES */}
                                {COMPANY_VALUES.map((value) => (
                                    <motion.div
                                        key={value.title}
                                        variants={itemVariants}
                                        whileHover={{ x: 4 }}
                                        className={`flex items-center space-x-4 p-4 rounded-xl ${isDarkMode
                                            ? "bg-gray-800/30 hover:bg-gray-800/50"
                                            : "bg-gray-50/50 hover:bg-gray-100/50"
                                            } transition-all duration-300`}
                                    >
                                        <div
                                            className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white"
                                                }`}
                                        >
                                            <value.icon size={20} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">{value.title}</h4>
                                            <p
                                                className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"
                                                    }`}
                                            >
                                                {value.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        {/* 6. ИЗМЕНЕНИЕ: Заменяем изображение подписи на текст во избежание ошибок */}
                        <motion.div variants={itemVariants} className="text-center py-8">
                            <div
                                className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-600"
                                    } mb-4`}
                            >
                                Ваш надежный партнер в логистике
                            </div>
                            <div className="text-2xl font-semibold text-blue-500 mt-2">
                                Global Cargo
                            </div>
                        </motion.div>
                    </motion.div>
                    
                    {/* 7. ИЗМЕНЕНИЕ: Используем COMPANY_JOURNEY для истории компании */}
                    <motion.div
                        ref={timelineRef}
                        initial="hidden"
                        animate={timelineInView ? "visible" : "hidden"}
                        variants={timelineVariants}
                        className="relative"
                    >
                        <h3 className="text-2xl font-medium mb-8 text-center lg:text-left">История нашего развития</h3>

                        <div
                            className={`absolute left-8 top-16 bottom-0 w-px ${isDarkMode ? "bg-gray-700" : "bg-gray-300"
                                }`}
                        />

                        <div className="space-y-8">
                            {COMPANY_JOURNEY.map((step) => (
                                <motion.div
                                    key={step.year}
                                    variants={steplineVariants}
                                    whileHover={{ x: 4 }}
                                    className="relative flex items-start space-x-6 group"
                                >
                                    <div
                                        className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <step.icon size={24} className="text-white" />
                                    </div>
                                    <div
                                        className={`flex-grow p-6 rounded-xl border transition-all duration-300 backdrop-blur-sm ${isDarkMode
                                            ? "bg-gray-800/50 border-gray-700"
                                            : "bg-white/80 border-gray-200 group-hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-xl font-semibold">{step.title}</h4>
                                            <span
                                                className={`text-sm px-3 py-1 rounded-full ${isDarkMode
                                                    ? "bg-gray-700 text-gray-300"
                                                    : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {step.year}
                                            </span>
                                        </div>

                                        <div
                                            className={`text-sm font-medium mb-3 ${isDarkMode ? "text-blue-400" : "text-blue-600"
                                                }`}
                                        >
                                            {step.company}
                                        </div>
                                        <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"
                                            } mb-3`}
                                        >
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 8. ИЗМЕНЕНИЕ: Обновляем текст и кнопку CTA */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="text-center mt-20"
                    >
                        <motion.div variants={itemVariants} className="flex flex-col items-center space-y-6">
                            <p
                                className={`text-lg mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                                    }`}
                            >
                                Готовы обсудить ваши логистические задачи?
                            </p>

                            <motion.button
                                whileHover={{ y: -2, scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className={`bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300}`}
                            >
                                Связаться с нами
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default AboutCompanySection;