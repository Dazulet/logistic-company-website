import {
    Truck,
    Ship,
    Plane,
    Warehouse,
    Flag,
    Briefcase,
    Users,
    Award,
    ShieldCheck,
    TrendingUp,
    Clock,
    MapPin,
    Mail,
    Phone,
} from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTelegramPlane,
    FaWhatsapp,
} from "react-icons/fa";

// Изображения для кейсов (убедитесь, что они существуют в /assets/images/)
import CASE_IMG_1 from "../assets/images/case_auto.png";
import CASE_IMG_2 from "../assets/images/case_warehousing.png";
import CASE_IMG_3 from "../assets/images/case_ecommerce.png";


// --- Секция "Наши услуги" (замена SKILLS_CATEGORY) ---
export const SERVICES = [
    { id: "autoTransport", icon: Truck },
    { id: "seaRiverTransport", icon: Ship },
    { id: "airFreight", icon: Plane },
    { id: "warehousing", icon: Warehouse },
];

// --- Секция "О компании" - Этапы развития (замена JOURNEY_STEPS) ---
export const COMPANY_JOURNEY = [
    { id: "foundation", year: "2015", icon: Flag, color: "bg-blue-500" },
    { id: "internationalLaunch", year: "2018", icon: Briefcase, color: "bg-green-500" },
    { id: "newWarehouse", year: "2021", icon: Warehouse, color: "bg-purple-500" },
    { id: "award", year: "2024", icon: Award, color: "bg-yellow-500" },
];

// --- Секция "О компании" - Наши ценности (замена PASSIONS) ---
export const COMPANY_VALUES = [
    { id: "reliability", icon: ShieldCheck },
    { id: "efficiency", icon: TrendingUp },
    { id: "individualApproach", icon: Users },
    { id: "punctuality", icon: Clock },
];

// --- Примеры кейсов / Наши проекты (замена PROJECTS) ---
export const CASES = [
    {
        id: "case1",
        image: CASE_IMG_1,
        tags: ["Автоперевозки", "Ритейл", "Оптимизация"],
        liveUrl: "#",
    },
    {
        id: "case2",
        image: CASE_IMG_2,
        tags: ["Склад", "E-commerce", "Фулфилмент"],
        liveUrl: "#",
        featured: true,
    },
    {
        id: "case3",
        image: CASE_IMG_3,
        tags: ["Мультимодальные", "Негабаритный груз", "Китай"],
        liveUrl: "#",
    },
];

// --- Статистика компании (замена STATS) ---
export const STATS = [
    { id: "clients", number: "1,200+" },
    { id: "years", number: "9+" },
    { id: "tons", number: "500k+" },
    { id: "countries", number: "40+" },
];

// --- Социальные сети ---
export const SOCIAL_LINKS = [
    { name: "Facebook", icon: FaFacebookF, url: "", color: "hover:text-blue-600", bgColor: "hover:bg-blue-600/10" },
    { name: "Instagram", icon: FaInstagram, url: "", color: "hover:text-pink-500", bgColor: "hover:bg-pink-500/10" },
    { name: "Telegram", icon: FaTelegramPlane, url: "", color: "hover:text-cyan-500", bgColor: "hover:bg-cyan-500/10" },
    { name: "WhatsApp", icon: FaWhatsapp, url: "https://wa.me/77077030009", color: "hover:text-green-500", bgColor: "hover:bg-green-500/10" },
];

// --- Контактная информация ---
export const CONTACT_INFO = [
    { id: "office", icon: MapPin, value: "г. Алматы, ул. Абая 100" },
    { id: "email", icon: Mail, value: "info@globalcargo.kz" },
    { id: "phone", icon: Phone, value: "+7 707 703 0009" },
];


// --- Конфигурация для "Умного калькулятора тарифов" ---
export const TARIFF_CALCULATOR_CONFIG = {
    locations: [
      { id: "ALA", city: "Алматы", country: "Казахстан", distanceFactor: 1.0 },
      { id: "AST", city: "Астана", country: "Казахстан", distanceFactor: 1.2 },
      { id: "SHM", city: "Шымкент", country: "Казахстан", distanceFactor: 1.1 },
      { id: "MSK", city: "Москва", country: "Россия", distanceFactor: 2.5 },
      { id: "IST", city: "Стамбул", country: "Турция", distanceFactor: 4.0 },
      { id: "PEK", city: "Пекин", country: "Китай", distanceFactor: 4.5 },
      { id: "DXB", city: "Дубай", country: "ОАЭ", distanceFactor: 3.8 },
      { id: "FRA", city: "Франкфурт", country: "Германия", distanceFactor: 5.0 },
    ],
    cargoTypes: [
      { name: "Стандартный", multiplier: 1.0 },
      { name: "Хрупкий (требует спец. упаковки)", multiplier: 1.25 },
      { name: "Опасный (ADR)", multiplier: 1.6 },
    ],
    transportModes: {
      auto: { baseRate: 10000, kgRate: 150, distanceRate: 20000, baseTimeDays: 2, timePerDistanceFactor: 1.5 },
      air: { baseRate: 50000, kgRate: 800, distanceRate: 45000, baseTimeDays: 1, timePerDistanceFactor: 0.5 },
    },
    volumetricDivisor: 5000,
};

// --- "Фейковая" база данных для имитации трекинга груза ---
export const TRACKING_DATA = {
  "GL-123456": {
    status: "В пути",
    origin: "Алматы, Казахстан",
    destination: "Астана, Казахстан",
    history: [
      { date: "14.09.2025", time: "09:30", status: "Передан курьеру для доставки", location: "г. Астана" },
      { date: "14.09.2025", time: "08:10", status: "Прибыл на сортировочный центр", location: "г. Астана" },
      { date: "12.09.2025", time: "19:25", status: "Покинул сортировочный центр", location: "г. Алматы" },
      { date: "12.09.2025", time: "14:00", status: "Принят в отделении", location: "г. Алматы" },
    ]
  },
  "GL-987654": {
    status: "Доставлен",
    origin: "Стамбул, Турция",
    destination: "Шымкент, Казахстан",
    history: [
      { date: "13.09.2025", time: "12:45", status: "Доставлен и вручен получателю", location: "г. Шымкент" },
      { date: "13.09.2025", time: "09:00", status: "Передан курьеру для доставки", location: "г. Шымкент" },
      { date: "11.09.2025", time: "16:20", status: "Прошел таможенное оформление", location: "г. Алматы" },
      { date: "09.09.2025", time: "22:15", status: "Отправлен из страны отправителя", location: "г. Стамбул" },
    ]
  },
  "GL-000000": {
    status: "Задержка",
    origin: "Пекин, Китай",
    destination: "Караганда, Казахстан",
    history: [
        { date: "13.09.2025", time: "11:00", status: "Задержка на таможне", location: "Хоргос" },
        { date: "11.09.2025", time: "08:40", status: "Прибыл в страну назначения", location: "Хоргос" },
        { date: "08.09.2025", time: "15:00", status: "Отправлен из страны отправителя", location: "г. Пекин" },
    ]
  }
};

// --- Данные для секции "Команда" ---
export const TEAM_MEMBERS = [
  {
    id: "ivan",
    name: "Иван Петров",
    image: "https://i.pravatar.cc/300?u=ivan",
  },
  {
    id: "maria",
    name: "Мария Смирнова",
    image: "https://i.pravatar.cc/300?u=maria",
  },
  {
    id: "alexey",
    name: "Алексей Новиков",
    image: "https://i.pravatar.cc/300?u=alexey",
  },
];

// --- Данные для секции "Сертификаты и лицензии" ---
export const LICENSES = [
    { name: "Лицензия на международные перевозки", image: "https://via.placeholder.com/400x550.png/0F172A/94A3B8?text=Лицензия+№1", description: "Подтверждает наше право на осуществление международных автомобильных перевозок грузов." },
    { name: "Сертификат ISO 9001:2015", image: "https://via.placeholder.com/400x550.png/0F172A/94A3B8?text=Сертификат+ISO", description: "Гарантирует, что система менеджмента качества в нашей компании соответствует мировым стандартам." },
    { name: "Членство в АНЭК", image: "https://via.placeholder.com/400x550.png/0F172A/94A3B8?text=Свидетельство+АНЭК", description: "Свидетельство о членстве в Ассоциации Национальных Экспедиторов Республики Казахстан." }
];