import React, { useState, useRef } from 'react';
import { motion } from "framer-motion";
import { useTheme } from '../../Context/ThemeContext';
import { TARIFF_CALCULATOR_CONFIG } from "../../utils/data";
import { containerVariants, itemVariants } from '../../utils/helper';
import { Calculator, Zap, Clock } from 'lucide-react';
import { useTranslation,Trans  } from 'react-i18next'; // 1. Импортируем useTranslation

const CalculatorSection = () => {
    const { isDarkMode, currency, toggleCurrency, USD_RATE } = useTheme();
    const { t } = useTranslation(); // 2. Инициализируем функцию перевода
    const sectionRef = useRef(null);

    const [formData, setFormData] = useState({ from: TARIFF_CALCULATOR_CONFIG.locations[0].id, to: TARIFF_CALCULATOR_CONFIG.locations[1].id, weight: '10', length: '50', width: '50', height: '50', cargoType: TARIFF_CALCULATOR_CONFIG.cargoTypes[0].name, transportMode: 'auto' });
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const handleInputChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
    const setTransportMode = (mode) => { setFormData(prev => ({ ...prev, transportMode: mode })); };
    const handleCalculate = () => { if (formData.from === formData.to) { setError(t("calculatorSection.errors.sameLocation")); setResult(null); return; } const weightNum = parseFloat(formData.weight); if (!weightNum || weightNum <= 0) { setError(t("calculatorSection.errors.invalidWeight")); setResult(null); return; } setError(''); const config = TARIFF_CALCULATOR_CONFIG; const fromLocation = config.locations.find(loc => loc.id === formData.from); const toLocation = config.locations.find(loc => loc.id === formData.to); const cargoType = config.cargoTypes.find(ct => ct.name === formData.cargoType); const transportMode = config.transportModes[formData.transportMode]; const volume = (parseFloat(formData.length) * parseFloat(formData.width) * parseFloat(formData.height)) / config.volumetricDivisor; const chargeableWeight = Math.max(weightNum, volume); const distanceCost = transportMode.distanceRate * ((fromLocation.distanceFactor + toLocation.distanceFactor) / 2); const weightCost = chargeableWeight * transportMode.kgRate; const totalCostKZT = (transportMode.baseRate + distanceCost + weightCost) * cargoType.multiplier; const distanceTime = transportMode.timePerDistanceFactor * ((fromLocation.distanceFactor + toLocation.distanceFactor) / 2); const minDays = Math.floor(transportMode.baseTimeDays + distanceTime); const maxDays = minDays + 1; const deliveryTime = `${minDays}-${maxDays} ${t('days') || 'дней'}`; setResult({ costKZT: totalCostKZT, chargeableWeight: chargeableWeight.toFixed(2), deliveryTime: deliveryTime }); };

    const displayCost = result ? (currency === 'USD' ? result.costKZT / USD_RATE : result.costKZT) : 0;
    const currencySymbol = currency === 'USD' ? '$' : '₸';

    return (
        <section
            ref={sectionRef}
            id="calculator"
            className={`py-24 px-6 ${isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"} relative`}
        >
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center mb-16">
                    <motion.div variants={itemVariants} className={`text-sm uppercase tracking-widest ${isDarkMode ? "text-gray-500" : "text-gray-600"} mb-4`}>
                        {t("calculatorSection.subtitle")}
                    </motion.div>
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-light mb-6">
                        <Trans i18nKey="calculatorSection.title">
                           Калькулятор <span className="text-blue-500 font-medium">тарифов</span>
                        </Trans>
                    </motion.h2>
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Левая колонка: Форма ввода */}
                    <div className="lg:col-span-2 p-8 rounded-2xl border space-y-6 [isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white/80 border-gray-200']">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectInput label={t("calculatorSection.fromLabel")} name="from" value={formData.from} onChange={handleInputChange} options={TARIFF_CALCULATOR_CONFIG.locations.map(l => ({ value: l.id, label: `${l.city}, ${l.country}` }))} />
                            <SelectInput label={t("calculatorSection.toLabel")} name="to" value={formData.to} onChange={handleInputChange} options={TARIFF_CALCULATOR_CONFIG.locations.map(l => ({ value: l.id, label: `${l.city}, ${l.country}` }))} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <NumberInput label={t("calculatorSection.weightLabel")} name="weight" value={formData.weight} onChange={handleInputChange} />
                            <NumberInput label={t("calculatorSection.lengthLabel")} name="length" value={formData.length} onChange={handleInputChange} />
                            <NumberInput label={t("calculatorSection.widthLabel")} name="width" value={formData.width} onChange={handleInputChange} />
                            <NumberInput label={t("calculatorSection.heightLabel")} name="height" value={formData.height} onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectInput label={t("calculatorSection.cargoTypeLabel")} name="cargoType" value={formData.cargoType} onChange={handleInputChange} options={TARIFF_CALCULATOR_CONFIG.cargoTypes.map(ct => ({ value: ct.name, label: ct.name }))} />
                            <div>
                                <Label isDarkMode={isDarkMode}>{t("calculatorSection.transportModeLabel")}</Label>
                                <div className="flex gap-2">
                                    <TransportButton label={t("calculatorSection.autoMode")} isActive={formData.transportMode === 'auto'} onClick={() => setTransportMode('auto')} />
                                    <TransportButton label={t("calculatorSection.airMode")} isActive={formData.transportMode === 'air'} onClick={() => setTransportMode('air')} />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleCalculate} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-102">
                            <Calculator size={18} />
                            {t("calculatorSection.calculateButton")}
                        </button>
                    </div>

                    {/* Правая колонка: Результат */}
                    <div className="p-8 rounded-2xl border h-full [isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white/80 border-gray-200']">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-medium flex items-center gap-2">
                                <Zap size={20} className="text-blue-500" />{t("calculatorSection.resultTitle")}
                            </h3>
                            <button onClick={toggleCurrency} className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}>
                                {currency === 'KZT' ? t("calculatorSection.showInUSD") : t("calculatorSection.showInKZT")}
                            </button>
                        </div>

                        {error && <div className="p-4 rounded-lg bg-red-500/10 text-red-500 text-sm">{error}</div>}

                        {result && !error && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                <div>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t("calculatorSection.estimatedCost")}</p>
                                    <p className="text-3xl font-bold text-blue-500">
                                        {new Intl.NumberFormat('ru-RU').format(displayCost.toFixed(0))} {currencySymbol}
                                    </p>
                                </div>
                                <div>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t("calculatorSection.estimatedDeliveryTime")}</p>
                                    <p className="text-lg font-medium flex items-center gap-2">
                                        <Clock size={16} />
                                        {result.deliveryTime}
                                    </p>
                                </div>
                                <div>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t("calculatorSection.calculatedWeight")}</p>
                                    <p className="text-lg font-medium">{result.chargeableWeight} кг</p>
                                </div>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'} pt-4`}>
                                    {t("calculatorSection.disclaimer")}
                                </p>
                            </motion.div>
                        )}
                        {!result && !error && (
                            <div className="text-center py-10">
                                <p className={isDarkMode ? 'text-gray-500' : 'text-gray-600'}>{t("calculatorSection.fillAllFields")}</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Вспомогательные компоненты (остаются без изменений)
const InputWrapper = ({ children }) => <div className="relative">{children}</div>;
const Label = ({ children, isDarkMode }) => <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{children}</label>;
const baseInputStyles = (isDarkMode) => `w-full px-3 py-2 border rounded-lg outline-none transition-all duration-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-800/50 border-gray-700 text-white' : 'bg-white/80 border-gray-300 text-gray-900'}`;
const SelectInput = ({ label, name, value, onChange, options }) => { const { isDarkMode } = useTheme(); return (<InputWrapper> <Label isDarkMode={isDarkMode}>{label}</Label> <select name={name} value={value} onChange={onChange} className={baseInputStyles(isDarkMode)}> {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)} </select> </InputWrapper>); };
const NumberInput = ({ label, name, value, onChange }) => { const { isDarkMode } = useTheme(); return (<InputWrapper> <Label isDarkMode={isDarkMode}>{label}</Label> <input type="number" name={name} value={value} onChange={onChange} className={baseInputStyles(isDarkMode)} placeholder="0" /> </InputWrapper>); };
const TransportButton = ({ label, isActive, onClick }) => { const { isDarkMode } = useTheme(); const activeStyles = isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white'; const inactiveStyles = isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'; return (<button onClick={onClick} className={`flex-1 p-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${isActive ? activeStyles : inactiveStyles}`}> {label} </button>); };

export default CalculatorSection;