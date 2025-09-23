'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Auto-close navbar when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <header className="text-white shadow-lg sticky top-0 z-50" style={{background: 'linear-gradient(to right, #52303f, #7c5367)'}}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={1000} height={100} className="h-10 w-40" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="transition-colors duration-300 font-medium" style={{color: '#d4af37'}} onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#d4af37'}>
              Beranda
            </Link>
            <Link href="/#services" className="transition-colors duration-300 font-medium" style={{color: '#d4af37'}} onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#d4af37'}>
              Layanan
            </Link>
            <Link href="/#about" className="transition-colors duration-300 font-medium" style={{color: '#d4af37'}} onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#d4af37'}>
              Tentang Kami
            </Link>
            <Link href="/#gallery" className="transition-colors duration-300 font-medium" style={{color: '#d4af37'}} onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#d4af37'}>
              Galeri
            </Link>
            <Link href="/blog" className="transition-colors duration-300 font-medium" style={{color: '#d4af37'}} onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#d4af37'}>
              Blog
            </Link>
            <Link href="/#contact" className="transition-colors duration-300 font-medium" style={{color: '#d4af37'}} onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#d4af37'}>
              Kontak
            </Link>
          </nav>

          {/* CTA Button */}
          <button className="hidden md:block px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{background: 'linear-gradient(to right, #d1c7cc, #f3f0f2)', color: '#52303f'}} onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = 'linear-gradient(to right, #f3f0f2, #d1c7cc)'} onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = 'linear-gradient(to right, #d1c7cc, #f3f0f2)'} data-aos="fade-left" data-aos-delay="400">
            Konsultasi Gratis
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <>          
          {/* Mobile Navigation Menu */}
          <nav 
            className={`fixed top-0 left-0 right-0 z-50 md:hidden shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
            style={{
              background: 'linear-gradient(to right, #52303f, #7c5367)',
              paddingTop: '80px' // Space for the header
            }}
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-opacity-20 transition-all duration-200"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex flex-col space-y-2 px-6 py-4">
              <Link 
                href="/" 
                className="transition-colors duration-300 font-medium text-lg py-3 px-2 rounded-lg hover:bg-white hover:bg-opacity-10" 
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} 
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                href="/#services" 
                className="transition-colors duration-300 font-medium text-lg py-3 px-2 rounded-lg hover:bg-white hover:bg-opacity-10" 
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} 
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}
                onClick={() => setIsMenuOpen(false)}
              >
                Layanan
              </Link>
              <Link 
                href="/#about" 
                className="transition-colors duration-300 font-medium text-lg py-3 px-2 rounded-lg hover:bg-white hover:bg-opacity-10" 
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} 
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang Kami
              </Link>
              <Link 
                href="/#gallery" 
                className="transition-colors duration-300 font-medium text-lg py-3 px-2 rounded-lg hover:bg-white hover:bg-opacity-10" 
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} 
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}
                onClick={() => setIsMenuOpen(false)}
              >
                Galeri
              </Link>
              <Link 
                href="/blog" 
                className="transition-colors duration-300 font-medium text-lg py-3 px-2 rounded-lg hover:bg-white hover:bg-opacity-10" 
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} 
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/#contact" 
                className="transition-colors duration-300 font-medium text-lg py-3 px-2 rounded-lg hover:bg-white hover:bg-opacity-10" 
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} 
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </Link>
              <button 
                className="px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg mt-3 w-fit mx-2" 
                style={{background: 'linear-gradient(to right, #d1c7cc, #f3f0f2)', color: '#52303f'}} 
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = 'linear-gradient(to right, #f3f0f2, #d1c7cc)'} 
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = 'linear-gradient(to right, #d1c7cc, #f3f0f2)'}
                onClick={() => setIsMenuOpen(false)}
              >
                Konsultasi Gratis
              </button>
            </div>
          </nav>
        </>
      </div>
    </header>
  );
};

export default Header;