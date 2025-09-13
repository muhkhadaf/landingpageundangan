'use client';

import { Heart, Phone, Mail, MapPin, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Layanan', href: '#services' },
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'Kontak', href: '#contact' }
  ];

  const services = [
    { name: 'Undangan Pernikahan', href: '#services' },
    { name: 'Hantaran Pernikahan', href: '#services' },
    { name: 'Paket Lengkap', href: '#services' },
    { name: 'Konsultasi Gratis', href: '#contact' }
  ];

  const socialMedia = [
    { icon: Instagram, name: 'Instagram', href: '#', color: 'hover:text-pink-400' },
    { icon: Facebook, name: 'Facebook', href: '#', color: 'hover:text-blue-400' },
    { icon: Twitter, name: 'Twitter', href: '#', color: 'hover:text-sky-400' }
  ];

  return (
    <footer className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center space-x-2 mb-6">
              <Heart className="h-8 w-8 text-yellow-400" fill="currentColor" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                Eternal Bliss
              </span>
            </div>
            <p className="text-emerald-100 leading-relaxed mb-6">
              Wedding vendor terpercaya yang menghadirkan undangan dan hantaran pernikahan 
              berkualitas premium untuk mewujudkan hari bahagia Anda.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400" />
                <span className="text-emerald-100">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400" />
                <span className="text-emerald-100">info@eternalbliss.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400" />
                <span className="text-emerald-100">Jl. Mawar No. 123, Jakarta</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-xl font-bold text-yellow-400 mb-6">Menu Utama</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-emerald-100 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-xl font-bold text-yellow-400 mb-6">Layanan Kami</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href}
                    className="text-emerald-100 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors duration-300"></span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-xl font-bold text-yellow-400 mb-6">Tetap Terhubung</h3>
            <p className="text-emerald-100 mb-4">
              Dapatkan tips pernikahan dan penawaran spesial langsung di email Anda.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-emerald-600 text-white placeholder-emerald-200 border border-emerald-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button className="bg-yellow-500 hover:bg-yellow-400 text-emerald-800 px-4 py-2 rounded-r-lg font-semibold transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold text-emerald-100 mb-4">Ikuti Kami</h4>
              <div className="flex space-x-4">
                {socialMedia.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-emerald-100 ${social.color} transition-all duration-300 hover:bg-emerald-500 transform hover:-translate-y-1`}
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-600">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-emerald-200 text-sm">
              © {currentYear} Eternal Bliss Wedding Vendor. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-emerald-200 hover:text-yellow-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-emerald-200 hover:text-yellow-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-emerald-200 hover:text-yellow-400 transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gradient-to-r from-green-500 to-green-400 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group">
          <MessageCircle className="h-6 w-6 group-hover:animate-pulse" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;