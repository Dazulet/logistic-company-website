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
    {
        icon: Truck,
        title: "Автомобильные перевозки",
        description: "Гибкая и быстрая доставка грузов по дорогам СНГ и Европы. Полный контроль на всех этапах маршрута.",
    },
    {
        icon: Ship,
        title: "Морские и речные перевозки",
        description: "Экономически выгодные решения для межконтинентальной доставки крупных партий и негабаритных грузов.",
    },
    {
        icon: Plane,
        title: "Авиаперевозки",
        description: "Максимальная скорость доставки для срочных, ценных и скоропортящихся грузов в любую точку мира.",
    },
    {
        icon: Warehouse,
        title: "Складские услуги и фулфилмент",
        description: "Ответственное хранение, обработка, комплектация и упаковка заказов для вашего бизнеса и e-commerce.",
    },
];

// --- Секция "О компании" - Этапы развития (замена JOURNEY_STEPS) ---
export const COMPANY_JOURNEY = [
    {
        year: "2015",
        title: "Основание компании",
        company: "Global Cargo",
        description:
            "Начали свой путь с организации локальных автомобильных перевозок, заложив фундамент надежности и качества.",
        icon: Flag,
        color: "bg-blue-500",
    },
    {
        year: "2018",
        title: "Запуск международных перевозок",
        company: "Выход на новые рынки",
        description:
            "Расширили географию, успешно реализовав первые проекты по доставке грузов из Европы и Китая.",
        icon: Briefcase,
        color: "bg-green-500",
    },
    {
        year: "2021",
        title: "Открытие нового склада класса А+",
        company: "Расширение инфраструктуры",
        description:
            "Запустили современный складской комплекс для предоставления полного спектра услуг по хранению и обработке грузов.",
        icon: Warehouse,
        color: "bg-purple-500",
    },
    {
        year: "2024",
        title: "Награда 'Логист года'",
        company: "Признание в отрасли",
        description:
            "Получили престижную отраслевую награду за инновационные решения и высокий уровень клиентского сервиса.",
        icon: Award,
        color: "bg-yellow-500",
    },
];

// --- Секция "О компании" - Наши ценности (замена PASSIONS) ---
export const COMPANY_VALUES = [
    {
        icon: ShieldCheck,
        title: "Надежность",
        description: "Гарантируем сохранность вашего груза и соблюдение всех обязательств.",
    },
    {
        icon: TrendingUp,
        title: "Эффективность",
        description: "Оптимизируем маршруты и процессы для экономии вашего времени и средств.",
    },
    {
        icon: Users,
        title: "Индивидуальный подход",
        description: "Разрабатываем решения, учитывая уникальные потребности каждого клиента.",
    },
    {
        icon: Clock,
        title: "Пунктуальность",
        description: "Строго соблюдаем сроки доставки, чтобы ваш бизнес работал без сбоев.",
    },
];

// --- Примеры кейсов / Наши проекты (замена PROJECTS) ---
export const CASES = [
    {
        id: 1,
        title: "Оптимизация автоперевозок для ритейл-сети",
        description:
            "Разработали и внедрили комплексную логистическую схему, сократившую расходы на доставку на 15% и время в пути на 1 день.",
        image: CASE_IMG_1,
        tags: ["Автоперевозки", "Ритейл", "Оптимизация"],
        liveUrl: "#", // Ссылка на подробное описание кейса
        category: "Автомобильные перевозки",
    },
    {
        id: 2,
        title: "Ответственное хранение для e-commerce",
        description:
            "Организовали фулфилмент-центр, обеспечивающий обработку до 5000 заказов в сутки с точностью сборки 99.9%.",
        image: CASE_IMG_2,
        tags: ["Склад", "E-commerce", "Фулфилмент"],
        liveUrl: "#",
        featured: true, // Выделенный кейс
        category: "Складские услуги",
    },
    {
        id: 3,
        title: "Мультимодальная доставка оборудования из Китая",
        description:
            "Скомбинировали морской, железнодорожный и автомобильный транспорт для доставки негабаритного груза, сэкономив клиенту 20% по сравнению с авиаперевозкой.",
        image: CASE_IMG_3,
        tags: ["Мультимодальные", "Негабаритный груз", "Китай"],
        liveUrl: "#",
        category: "Международные перевозки",
    },
];

// --- Статистика компании (замена STATS) ---
export const STATS = [
    { number: "1,200+", label: "Довольных клиентов" },
    { number: "9+", label: "Лет на рынке" },
    { number: "500k+", label: "Тонн груза доставлено" },
    { number: "40+", label: "Стран в охвате" },
];

// --- Социальные сети ---
export const SOCIAL_LINKS = [
    {
        name: "Facebook",
        icon: FaFacebookF,
        url: "https://facebook.com/yourcompany",
        color: "hover:text-blue-600",
        bgColor: "hover:bg-blue-600/10",
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        url: "https://instagram.com/yourcompany",
        color: "hover:text-pink-500",
        bgColor: "hover:bg-pink-500/10",
    },
    {
        name: "LinkedIn",
        icon: FaLinkedinIn,
        url: "https://linkedin.com/company/yourcompany",
        color: "hover:text-blue-700",
        bgColor: "hover:bg-blue-700/10",
    },
    {
        name: "Telegram",
        icon: FaTelegramPlane,
        url: "https://t.me/yourcompany",
        color: "hover:text-cyan-500",
        bgColor: "hover:bg-cyan-500/10",
    },
    {
        name: "WhatsApp",
        icon: FaWhatsapp,
        url: "https://wa.me/77077030009", // Замените на реальный номер
        color: "hover:text-green-500",
        bgColor: "hover:bg-green-500/10",
    },
];

// --- Контактная информация ---
export const CONTACT_INFO = [
    {
        icon: MapPin,
        label: "Головной офис",
        value: "г. Алматы, ул. Абая 100", // Замените на реальный адрес
    },
    {
        icon: Mail,
        label: "Email",
        value: "info@globalcargo.kz", // Замените на реальный email
    },
    {
        icon: Phone,
        label: "Телефон",
        value: "+7 707 703 0009", // Замените на реальный телефон
    },
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
      auto: {
        baseRate: 10000,
        kgRate: 150,
        distanceRate: 20000,
        baseTimeDays: 2,
        timePerDistanceFactor: 1.5,
      },
      air: {
        baseRate: 50000,
        kgRate: 800,
        distanceRate: 45000,
        baseTimeDays: 1,
        timePerDistanceFactor: 0.5,
      },
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
    name: "Иван Петров",
    position: "Генеральный директор",
    description: "Более 15 лет опыта в международной логистике. Определяет стратегическое развитие компании.",
    image: "https://i.pravatar.cc/300?u=ivan",
  },
  {
    name: "Мария Смирнова",
    position: "Руководитель отдела продаж",
    description: "Поможет найти оптимальное и выгодное решение для любой вашей логистической задачи.",
    image: "https://i.pravatar.cc/300?u=maria",
  },
  {
    name: "Алексей Новиков",
    position: "Директор по операциям",
    description: "Обеспечивает бесперебойную и своевременную доставку каждого груза.",
    image: "https://i.pravatar.cc/300?u=alexey",
  },
];

// --- Данные для секции "Сертификаты и лицензии" ---
export const LICENSES = [
    {
        name: "Лицензия на международные перевозки",
        image: "https://via.placeholder.com/400x550.png/0F172A/94A3B8?text=Лицензия+№1",
        description: "Подтверждает наше право на осуществление международных автомобильных перевозок грузов."
    },
    {
        name: "Сертификат ISO 9001:2015",
        image: "https://via.placeholder.com/400x550.png/0F172A/94A3B8?text=Сертификат+ISO",
        description: "Гарантирует, что система менеджмента качества в нашей компании соответствует мировым стандартам."
    },
    {
        name: "Членство в АНЭК",
        image: "https://via.placeholder.com/400x550.png/0F172A/94A3B8?text=Свидетельство+АНЭК",
        description: "Свидетельство о членстве в Ассоциации Национальных Экспедиторов Республики Казахстан."
    }
];