import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Leistungen from './sections/Leistungen';
import Prozess from './sections/Prozess';
import Foerderung from './sections/Foerderung';
import Konfigurator from './sections/Konfigurator';
import UeberUns from './sections/UeberUns';
import Referenzen from './sections/Referenzen';
import Kontakt from './sections/Kontakt';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Leistungen />
        <Prozess />
        <Foerderung />
        <Konfigurator />
        <UeberUns />
        <Referenzen />
        <Kontakt />
      </main>
      <Footer />
    </>
  );
}
