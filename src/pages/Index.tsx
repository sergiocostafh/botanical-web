
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Courses from "@/components/Courses";
import Shop from "@/components/Shop";
import Publications from "@/components/Publications";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-botanical-white">
      <Header />
      <Hero />
      <About />
      <Courses />
      <Shop />
      <Publications />
      <Footer />
    </div>
  );
};

export default Index;
