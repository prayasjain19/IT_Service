import Header from "@/components/Header/page";
import AboutSection from "@/components/Homepage/About";
import { Toaster } from "react-hot-toast";


export default function Home() {
  return (
    <main>
      <Toaster position="top-right"/>
      <AboutSection />
    </main>
  );
}
