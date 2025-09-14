// App.jsx
import { ThemeProvider } from './Context/ThemeContext'
import Navbar from './components/Navbar'
import HeroSection from './components/section/HeroSection'
import ServicesSection from './components/section/ServicesSection'
import AboutCompanySection from './components/section/AboutCompanySection'
import CalculatorSection from './components/section/CalculatorSection'; // 1. Импортируем новый компонент
import CasesSection from './components/section/CasesSection'; 
import ContactUsSection from "./components/section/ContactUsSection";


const App = () => {

  return (
    <ThemeProvider>
      <div>         
        <CalculatorSection /> {/* 2. Добавляем компонент сюда */}

        <Navbar />
        <HeroSection/>
        <ServicesSection/>
        <AboutCompanySection/>
        <CasesSection /> 
        <ContactUsSection/>
      </div>
    </ThemeProvider>
  )
}

export default App