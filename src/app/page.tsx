import About from '@/components/About';
import BlogSection from '@/components/BlogSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import TemplateSection from '@/components/TemplateSection';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10" style={{
        backgroundColor: '#e5e5f7',
        opacity: 0.8,
        backgroundImage: 'linear-gradient(#37c58c 1px, transparent 1px), linear-gradient(to right, #37c58c 1px, #e5e5f7 1px)',
        backgroundSize: '20px 20px'
      }}></div>
      
      <Header />
      <Hero />
      <TemplateSection />
      <Services />
      <About />
      <Contact />
      <BlogSection />
      <Footer />
    </div>
  );
}
