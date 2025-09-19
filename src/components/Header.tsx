'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="text-white shadow-lg sticky top-0 z-50" style={{background: 'linear-gradient(to right, #52303f, #7c5367)'}} data-aos="fade-down" data-aos-duration="1000">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" data-aos="fade-right" data-aos-delay="200">
            <Image src="/logo.png" alt="Logo" width={1000} height={100} className="h-10 w-40" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" data-aos="fade-down" data-aos-delay="300">
            <Link href="/" className="transition-colors duration-300 font-medium" style={{'--hover-color': '#d1c7cc'} as React.CSSProperties} onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}>
              Beranda
            </Link>
            <Link href="/#services" className="transition-colors duration-300 font-medium" onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}>
              Layanan
            </Link>
            <Link href="/#about" className="transition-colors duration-300 font-medium" onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}>
              Tentang Kami
            </Link>
            <Link href="/#gallery" className="transition-colors duration-300 font-medium" onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}>
              Galeri
            </Link>
            <Link href="/blog" className="transition-colors duration-300 font-medium" onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}>
              Blog
            </Link>
            <Link href="/#contact" className="transition-colors duration-300 font-medium" onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}>
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4" style={{borderColor: '#7c5367'}}>
            <div className="flex flex-col space-y-3">
              <Link href="/" className="transition-colors duration-300 font-medium" onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}>
                Beranda
              </Link>
              <Link href="/#services" className="transition-colors duration-300 font-medium" onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}>
                Layanan
              </Link>
              <Link href="/#about" className="transition-colors duration-300 font-medium" onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}>
                Tentang Kami
              </Link>
              <Link href="/#gallery" className="transition-colors duration-300 font-medium" onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}>
                Galeri
              </Link>
              <Link href="/blog" className="transition-colors duration-300 font-medium" onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}>
                Blog
              </Link>
              <Link href="/#contact" className="transition-colors duration-300 font-medium" onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#d1c7cc'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = 'white'}>
                Kontak
              </Link>
              <button className="px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg mt-2" style={{background: 'linear-gradient(to right, #d1c7cc, #f3f0f2)', color: '#52303f'}} onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = 'linear-gradient(to right, #f3f0f2, #d1c7cc)'} onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = 'linear-gradient(to right, #d1c7cc, #f3f0f2)'}>
                Konsultasi Gratis
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;