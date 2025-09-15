// components/section/TeamSection.jsx

import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import { useTheme } from '../../Context/ThemeContext';
import { TEAM_MEMBERS } from "../../utils/data";
import { containerVariants, itemVariants } from '../../utils/helper';
import { useTranslation, Trans } from 'react-i18next';

const TeamSection = () => {
    const { isDarkMode } = useTheme();
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            id="team"
            className={`py-24 px-6 ${isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}`}
        >
            <div className="max-w-6xl mx-auto">
                {/* Заголовок (уже исправлен с Trans) */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.div variants={itemVariants} className={`text-sm uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-4`}>
                        {t("teamSection.subtitle")}
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-light mb-6">
                        <Trans i18nKey="teamSection.title">
                           Команда <span className="text-blue-500 font-medium">профессионалов</span>
                        </Trans>
                    </motion.h2>
                    <motion.p variants={itemVariants} className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {t("teamSection.description")}
                    </motion.p>
                </motion.div>

                {/* Карточки команды */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {TEAM_MEMBERS.map((member) => {
                        // ИЗМЕНЕНИЕ ЗДЕСЬ: Мы больше не генерируем ключ из имени
                        const memberKey = member.id; 
                        return (
                            <motion.div
                                // Также лучше использовать стабильный id в качестве ключа для React
                                key={member.id} 
                                variants={itemVariants}
                                whileHover={{ y: -8, scale: 1.03 }}
                                className={`rounded-2xl border overflow-hidden text-center group transition-all duration-300
                                       hover:shadow-xl hover:shadow-blue-500/10
                                       ${isDarkMode ? 'bg-gray-900/50 border-gray-800 hover:border-blue-500/20' : 'bg-white/80 border-gray-200 hover:border-blue-500/20'}`}
                            >
                                <div className="pt-8 px-8">
                                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 
                                                [isDarkMode ? 'border-gray-700' : 'border-gray-200'] 
                                                group-hover:border-blue-500 transition-colors duration-300">
                                        <img src={member.image} alt={t(`teamSection.members.${memberKey}.name`)} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-xl font-medium mb-1">{t(`teamSection.members.${memberKey}.name`)}</h3>
                                    <p className="text-blue-500 text-sm font-semibold mb-4">{t(`teamSection.members.${memberKey}.position`)}</p>
                                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {t(`teamSection.members.${memberKey}.description`)}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default TeamSection;