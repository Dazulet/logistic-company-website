// App.jsx
import { ThemeProvider } from './Context/ThemeContext'
import Navbar from './components/Navbar'
import HeroSection from './components/section/HeroSection'
import ServicesSection from './components/section/ServicesSection'
import AboutCompanySection from './components/section/AboutCompanySection'
import TrackingSection from './components/section/TrackingSection';
import TeamSection from './components/section/TeamSection'; // 1. Импортируем

import CalculatorSection from './components/section/CalculatorSection';
import CasesSection from './components/section/CasesSection';
import ContactUsSection from "./components/section/ContactUsSection";


const App = () => {

  return (
    <ThemeProvider>
      <div>
        <CalculatorSection />
        <TrackingSection />
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <AboutCompanySection />


        {/* <CasesSection /> */}
        <TeamSection />
        <ContactUsSection />
      </div>
    </ThemeProvider>
  )
}

export default App