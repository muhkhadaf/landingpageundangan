'use client';

import { Heart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white shadow-lg sticky top-0 z-50" data-aos="fade-down" data-aos-duration="1000">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" data-aos="fade-right" data-aos-delay="200">
            <Heart className="h-8 w-8 text-yellow-400" fill="currentColor" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Eternal Bliss
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" data-aos="fade-down" data-aos-delay="300">
            <Link href="/" className="hover:text-yellow-400 transition-colors duration-300 font-medium">
              Beranda
            </Link>
            <Link href="/#services" className="hover:text-yellow-400 transition-colors duration-300 font-medium">
              Layanan
            </Link>
            <Link href="/#about" className="hover:text-yellow-400 transition-colors duration-300 font-medium">
              Tentang Kami
            </Link>
            <Link href="/#gallery" className="hover:text-yellow-400 transition-colors duration-300 font-medium">
              Galeri
            </Link>
            <Link href="/blog" className="hover:text-yellow-400 transition-colors duration-300 font-medium">
              Blog
            </Link>
            <Link href="/#contact" className="hover:text-yellow-400 transition-colors duration-300 font-medium">
              Kontak
            </Link>
          </nav>

          {/* CTA Button */}
          <button className="hidden md:block bg-gradient-to-r from-yellow-500 to-yellow-400 text-emerald-800 px-6 py-2 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" data-aos="fade-left" data-aos-delay="400">
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
          <nav className="md:hidden mt-4 pb-4 border-t border-emerald-500 pt-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="hover:text-yellow-400 transition-colors duration-300 font-medium">
                Beranda
              </Link>
              <Link href="/#services" className="hover:text-yellow-400 transition-colors duration-300 font-medium">
                Layanan
              </Link>
              <Link href="/#about" className="hover:text-yellow-400 transition-colors duration-300 font-medium">
                Tentang Kami
              </Link>
              <Link href="/#gallery" className="hover:text-yellow-400 transition-colors duration-300 font-medium">
                Galeri
              </Link>
              <Link href="/blog" className="hover:text-yellow-400 transition-colors duration-300 font-medium">
                Blog
              </Link>
              <Link href="/#contact" className="hover:text-yellow-400 transition-colors duration-300 font-medium">
                Kontak
              </Link>
              <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-emerald-800 px-6 py-2 rounded-full font-semibold hover:from-yellow-400 hover:to-yellow-300 transition-all duration-300 shadow-lg mt-2">
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