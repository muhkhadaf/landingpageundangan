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
    <footer className="text-white" style={{background: 'linear-gradient(to bottom right, #52303f, #7c5367, #3d1f2a)'}}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center space-x-2 mb-6">
              <Heart className="h-8 w-8" fill="currentColor" style={{color: '#d4af37'}} />
              <span className="text-2xl font-bold bg-clip-text text-transparent" style={{background: 'linear-gradient(to right, #d4af37, #f4e4a6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                Eternal Bliss
              </span>
            </div>
            <p className="leading-relaxed mb-6" style={{color: '#f3f0f2'}}>
              Wedding vendor terpercaya yang menghadirkan undangan dan hantaran pernikahan 
              berkualitas premium untuk mewujudkan hari bahagia Anda.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" style={{color: '#d4af37'}} />
                <span style={{color: '#f3f0f2'}}>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" style={{color: '#d4af37'}} />
                <span style={{color: '#f3f0f2'}}>info@eternalbliss.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5" style={{color: '#d4af37'}} />
                <span style={{color: '#f3f0f2'}}>Jl. Mawar No. 123, Jakarta</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-xl font-bold mb-6" style={{color: '#d4af37'}}>Menu Utama</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="transition-colors duration-300 flex items-center group" style={{color: '#f3f0f2'}} onMouseEnter={(e) => {const target = e.target as HTMLAnchorElement; target.style.color = '#d4af37';}} onMouseLeave={(e) => {const target = e.target as HTMLAnchorElement; target.style.color = '#f3f0f2';}}
                  >
                    <span className="w-2 h-2 rounded-full mr-3 transition-colors duration-300" style={{backgroundColor: '#7c5367'}} onMouseEnter={(e) => {const target = e.target as HTMLElement; target.style.backgroundColor = '#d4af37';}} onMouseLeave={(e) => {const target = e.target as HTMLElement; target.style.backgroundColor = '#7c5367';}}></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-xl font-bold mb-6" style={{color: '#d4af37'}}>Layanan Kami</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href}
                    className="transition-colors duration-300 flex items-center group" style={{color: '#f3f0f2'}} onMouseEnter={(e) => {const target = e.target as HTMLAnchorElement; target.style.color = '#d4af37';}} onMouseLeave={(e) => {const target = e.target as HTMLAnchorElement; target.style.color = '#f3f0f2';}}
                  >
                    <span className="w-2 h-2 rounded-full mr-3 transition-colors duration-300" style={{backgroundColor: '#7c5367'}} onMouseEnter={(e) => {const target = e.target as HTMLElement; target.style.backgroundColor = '#d4af37';}} onMouseLeave={(e) => {const target = e.target as HTMLElement; target.style.backgroundColor = '#7c5367';}}></span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-xl font-bold mb-6" style={{color: '#d4af37'}}>Tetap Terhubung</h3>
            <p className="mb-4" style={{color: '#f3f0f2'}}>
              Dapatkan tips pernikahan dan penawaran spesial langsung di email Anda.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Anda"
                  className="flex-1 px-4 py-2 rounded-l-lg text-white border transition-colors" style={{backgroundColor: '#7c5367', borderColor: '#52303f'}} onFocus={(e) => {const target = e.target as HTMLInputElement; target.style.outline = '2px solid #d4af37'; target.style.borderColor = '#d4af37';}} onBlur={(e) => {const target = e.target as HTMLInputElement; target.style.outline = 'none'; target.style.borderColor = '#52303f';}}
                />
                <button className="px-4 py-2 rounded-r-lg font-semibold transition-colors duration-300" style={{backgroundColor: '#d4af37', color: '#52303f'}} onMouseEnter={(e) => {const target = e.target as HTMLButtonElement; target.style.backgroundColor = '#f4e4a6';}} onMouseLeave={(e) => {const target = e.target as HTMLButtonElement; target.style.backgroundColor = '#d4af37';}}>
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{color: '#f3f0f2'}}>Ikuti Kami</h4>
              <div className="flex space-x-4">
                {socialMedia.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1" style={{backgroundColor: '#7c5367', color: '#f3f0f2'}} onMouseEnter={(e) => {const target = e.target as HTMLElement; target.style.backgroundColor = '#52303f'; target.style.color = social.name === 'Instagram' ? '#ec4899' : social.name === 'Facebook' ? '#60a5fa' : '#0ea5e9';}} onMouseLeave={(e) => {const target = e.target as HTMLElement; target.style.backgroundColor = '#7c5367'; target.style.color = '#f3f0f2';}}
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
      <div className="border-t" style={{borderColor: '#7c5367'}}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm" style={{color: '#f8f6f7'}}>
              © {currentYear} Eternal Bliss Wedding Vendor. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="transition-colors duration-300" style={{color: '#f8f6f7'}} onMouseEnter={(e) => {const target = e.target as HTMLAnchorElement; target.style.color = '#d4af37';}} onMouseLeave={(e) => {const target = e.target as HTMLAnchorElement; target.style.color = '#f8f6f7';}}>
                Privacy Policy
              </a>
              <a href="#" className="transition-colors duration-300" style={{color: '#f8f6f7'}} onMouseEnter={(e) => {const target = e.target as HTMLAnchorElement; target.style.color = '#d4af37';}} onMouseLeave={(e) => {const target = e.target as HTMLAnchorElement; target.style.color = '#f8f6f7';}}>
                Terms of Service
              </a>
              <a href="#" className="transition-colors duration-300" style={{color: '#f8f6f7'}} onMouseEnter={(e) => {const target = e.target as HTMLAnchorElement; target.style.color = '#d4af37';}} onMouseLeave={(e) => {const target = e.target as HTMLAnchorElement; target.style.color = '#f8f6f7';}}>
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group" style={{background: 'linear-gradient(to right, #22c55e, #4ade80)'}}>
          <MessageCircle className="h-6 w-6 group-hover:animate-pulse" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;