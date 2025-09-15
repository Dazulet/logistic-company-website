import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../../Context/ThemeContext";
import { COMPANY_JOURNEY, COMPANY_VALUES } from "../../utils/data";
import { containerVariants, itemVariants } from "../../utils/helper";
import { useTranslation, Trans } from "react-i18next";

const AboutCompanySection = () => {
    const { isDarkMode } = useTheme();
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const timelineInView = useInView(timelineRef, { once: true, margin: "-50px" });
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const yTransform = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const timelineVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
    const steplineVariants = { hidden: { x: -50, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } } };
    
    return (
        <section
            id="about-company"
            ref={sectionRef}
            className={`py-24 px-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} relative overflow-hidden`}
        >
            <motion.div style={{ y: yTransform }} className="absolute inset-0 overflow-hidden">
                <div className={`absolute top-40 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-blue-500" : "bg-blue-400"}`} />
                <div className={`absolute bottom-40 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-5 ${isDarkMode ? "bg-purple-500" : "bg-purple-400"}`} />
            </motion.div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants} className="text-center mb-20">
                    <motion.div variants={itemVariants} className={`text-sm uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-4`}>
                        {t('aboutCompanySection.subtitle')}
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-light mb-6">
                        <Trans i18nKey="aboutCompanySection.title">
                           О компании <span className=" text-blue-500 font-medium"> Global Cargo</span>
                        </Trans>
                    </motion.h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants} className="space-y-8">
                        <motion.div variants={itemVariants} className={`p-8 rounded-2xl border ${isDarkMode ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm" : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"}`}>
                            <h3 className="text-2xl font-medium mb-6">{t('aboutCompanySection.missionTitle')}</h3>
                            <p className={`text-lg leading-relaxed mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                {t('aboutCompanySection.missionText1')}
                            </p>
                            <p className={`text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                {t('aboutCompanySection.missionText2')}
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="">
                            <h3 className="text-xl font-medium mb-6">{t('aboutCompanySection.valuesTitle')}</h3>
                            <div className="grid gap-4">
                                {COMPANY_VALUES.map((value) => (
                                    <motion.div key={value.id} variants={itemVariants} whileHover={{ x: 4 }} className={`flex items-center space-x-4 p-4 rounded-xl ${isDarkMode ? "bg-gray-800/30 hover:bg-gray-800/50" : "bg-gray-50/50 hover:bg-gray-100/50"} transition-all duration-300`}>
                                        <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
                                            <value.icon size={20} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">{t(`aboutCompanySection.values.${value.id}.title`)}</h4>
                                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t(`aboutCompanySection.values.${value.id}.description`)}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                         <motion.div variants={itemVariants} className="text-center py-8">
                            <div className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-4`}>
                                {t('aboutCompanySection.signatureText')}
                            </div>
                            <div className="text-2xl font-semibold text-blue-500 mt-2">
                                {t('aboutCompanySection.signatureCompany')}
                            </div>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div ref={timelineRef} initial="hidden" animate={timelineInView ? "visible" : "hidden"} variants={timelineVariants} className="relative">
                        <h3 className="text-2xl font-medium mb-8 text-center lg:text-left">{t('aboutCompanySection.historyTitle')}</h3>
                        <div className={`absolute left-8 top-16 bottom-0 w-px ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`} />
                        <div className="space-y-8">
                            {COMPANY_JOURNEY.map((step) => (
                                <motion.div key={step.id} variants={steplineVariants} whileHover={{ x: 4 }} className="relative flex items-start space-x-6 group">
                                    <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <step.icon size={24} className="text-white" />
                                    </div>
                                    <div className={`flex-grow p-6 rounded-xl border transition-all duration-300 backdrop-blur-sm ${isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/80 border-gray-200 group-hover:border-gray-300"}`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-xl font-semibold">{t(`aboutCompanySection.journeySteps.${step.id}.title`)}</h4>
                                            <span className={`text-sm px-3 py-1 rounded-full ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"}`}>{step.year}</span>
                                        </div>
                                        <div className={`text-sm font-medium mb-3 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>{t(`aboutCompanySection.journeySteps.${step.id}.company`)}</div>
                                        <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-3`}>{t(`aboutCompanySection.journeySteps.${step.id}.description`)}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants} className="lg:col-span-2 text-center mt-20">
                    <motion.div variants={itemVariants} className="flex flex-col items-center space-y-6">
                        <p className={`text-lg mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            {t('aboutCompanySection.ctaText')}
                        </p>
                        <motion.button
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => scrollToSection('contact-us')}
                            className={`bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300`}
                        >
                            {t('aboutCompanySection.ctaButton')}
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default AboutCompanySection;