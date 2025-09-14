import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import { useTheme } from '../../Context/ThemeContext';
import { CASES } from "../../utils/data"; // Импортируем наши кейсы
import { containerVariants, itemVariants } from '../../utils/helper';
import { ArrowRight } from 'lucide-react';

const CasesSection = () => {
    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Выделим "главный" кейс, если он есть
    const featuredCase = CASES.find(c => c.featured);
    const regularCases = CASES.filter(c => !c.featured);

    return (
        <section
            ref={sectionRef}
            id="cases" // ID для навигации
            className={`py-24 px-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} relative overflow-hidden`}
        >
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className={`text-sm uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-4`}
                    >
                        Наш опыт в действии
                    </motion.div>
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-5xl font-light mb-6"
                    >
                        Реализованные <span className="text-blue-500 font-medium">Проекты</span>
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto font-light`}
                    >
                        Ознакомьтесь с примерами успешно выполненных задач, которые демонстрируют нашу экспертизу и подход к работе.
                    </motion.p>
                </motion.div>

                {/* Cases Grid */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Featured Case (Главный кейс, занимает больше места) */}
                    {featuredCase && (
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="lg:col-span-2 flex flex-col md:flex-row rounded-2xl border overflow-hidden group transition-all duration-300
                                       hover:shadow-lg hover:shadow-blue-500/10
                                       [isDarkMode ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700' : 'bg-white/80 border-gray-200 hover:border-gray-300']"
                        >
                            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                                <img src={featuredCase.image} alt={featuredCase.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="md:w-1/2 p-8 flex flex-col justify-center">
                                <div className="text-sm text-blue-500 uppercase tracking-wider font-medium mb-2">{featuredCase.category}</div>
                                <h3 className="text-2xl font-medium mb-4">{featuredCase.title}</h3>
                                <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {featuredCase.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {featuredCase.tags.map(tag => (
                                        <span key={tag} className={`px-3 py-1 text-xs rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>{tag}</span>
                                    ))}
                                </div>
                                <a href={featuredCase.liveUrl} className="text-blue-500 font-medium inline-flex items-center group-hover:gap-3 transition-all duration-300">
                                    Подробнее <ArrowRight size={16} className="ml-2" />
                                </a>
                            </div>
                        </motion.div>
                    )}

                    {/* Regular Cases (Остальные кейсы) */}
                    {regularCases.map(project => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="rounded-2xl border overflow-hidden group transition-all duration-300
                                       hover:shadow-lg hover:shadow-blue-500/10
                                       [isDarkMode ? 'bg-gray-900/50 border-gray-800 hover:border-gray-700' : 'bg-white/80 border-gray-200 hover:border-gray-300']"
                        >
                            <div className="h-48 overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-6">
                                <div className="text-xs text-blue-500 uppercase tracking-wider font-medium mb-2">{project.category}</div>
                                <h3 className="text-lg font-medium mb-3">{project.title}</h3>
                                <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {project.description}
                                </p>
                                <a href={project.liveUrl} className="text-blue-500 font-medium inline-flex items-center text-sm group-hover:gap-2 transition-all duration-300">
                                    Читать кейс <ArrowRight size={14} className="ml-1" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CasesSection;