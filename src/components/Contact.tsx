'use client';

import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.');
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telepon",
      info: "+62 812-3456-7890",
      subInfo: "Senin - Sabtu, 09:00 - 18:00",
      color: "emerald"
    },
    {
      icon: Mail,
      title: "Email",
      info: "nandainvitation@gmail.com",
      subInfo: "Respon dalam 24 jam",
      color: "yellow"
    },
    {
      icon: MapPin,
      title: "Alamat",
      info: "Jl. Citanduy RT.005 RW.009 No.3, Kel. Cipayung, Kec. Ciputat, Kota Tangerang Selatan - Banten",
      color: "emerald"
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      info: "09:00 - 18:00 WIB",
      subInfo: "Senin - Sabtu",
      color: "yellow"
    }
  ];

  return (
    <section id="contact" className="py-20" style={{background: 'linear-gradient(to bottom, white, #f3f0f2)'}}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4" data-aos="fade-up" data-aos-delay="100">
            <MessageCircle className="h-8 w-8 mr-2" style={{color: '#d4af37'}} />
            <span className="font-semibold text-lg" style={{color: '#d4af37'}}>
              Hubungi Kami
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="200">
            <span style={{background: 'linear-gradient(to right, #52303f, #7c5367)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              Konsultasi
            </span>
            <br />
            <span style={{color: '#d4af37'}}>Gratis Sekarang</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">
            Siap mewujudkan pernikahan impian Anda? Hubungi tim profesional kami untuk 
            konsultasi gratis dan dapatkan penawaran terbaik.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div data-aos="fade-right" data-aos-delay="400">
            <h3 className="text-3xl font-bold text-gray-800 mb-8">Informasi Kontak</h3>
            
            <div className="space-y-6 mb-12">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                         style={{backgroundColor: contact.color === 'emerald' ? '#f3f0f2' : '#f8f6f7'}}>
                      <IconComponent className="h-6 w-6" style={{color: contact.color === 'emerald' ? '#7c5367' : '#b8a5b0'}} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{contact.title}</h4>
                      <p className="text-gray-700 font-medium">{contact.info}</p>
                      <p className="text-gray-500 text-sm">{contact.subInfo}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Hubungi Langsung</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center" style={{background: 'linear-gradient(to right, #7c5367, #52303f)'}} onMouseEnter={(e) => {const target = e.target as HTMLButtonElement; target.style.background = 'linear-gradient(to right, #52303f, #3d1f2a)';}} onMouseLeave={(e) => {const target = e.target as HTMLButtonElement; target.style.background = 'linear-gradient(to right, #7c5367, #52303f)';}}>
                  <Phone className="h-5 w-5 mr-2" />
                  Telepon Sekarang
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-500 to-green-400 text-white px-6 py-3 rounded-full font-semibold hover:from-green-600 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp
                </button>
              </div>
            </div>

          </div>
          {/* Lottie Animation */}
          <div data-aos="fade-left" data-aos-delay="500">
            <div className="bg-white rounded-3xl p-8 shadow-xl flex items-center justify-center">
              <DotLottieReact 
                src="https://lottie.host/9dea089b-40a0-4ea0-9514-57694750cfa7/axUUNVtHFQ.lottie" 
                loop 
                autoplay 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;