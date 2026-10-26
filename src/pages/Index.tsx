import Hero from "../components/Hero";
import Experience from "../components/Experience";
import SelectedWorks from "../components/SelectedWorks";
import Skills from "../components/Skills";
import Explorations from "../components/Explorations";
import Achievements from "../components/Achievements";
import Leadership from "../components/Leadership";
import Education from "../components/Education";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

export default function Index() {
  return (
    <main className="relative">
      <Hero />
      <Experience />
      <SelectedWorks />
      <Skills />
      <Explorations />
      <Achievements />
      <Leadership />
      <Education />
      <Stats />
      <Footer />
    </main>
  );
}
