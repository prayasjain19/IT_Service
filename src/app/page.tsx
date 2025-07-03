
import ContactPage from "@/components/Contact/Contact";
import AboutSection from "@/components/Homepage/About";
import HomeSection from "@/components/Homepage/Hero";
import ServicesPage from "@/components/services/page";
import { Toaster } from "react-hot-toast";


export default function Home() {
  return (
    <main>
      <Toaster position="top-right"/>
      <HomeSection />
      <AboutSection />
      <ServicesPage />
      <ContactPage />
    </main>
  );
}
