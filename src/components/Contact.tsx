'use client';

import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      info: "info@eternalbliss.com",
      subInfo: "Respon dalam 24 jam",
      color: "yellow"
    },
    {
      icon: MapPin,
      title: "Alamat",
      info: "Jl. Mawar No. 123, Jakarta",
      subInfo: "Kunjungi showroom kami",
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
            <MessageCircle className="h-8 w-8 mr-2" style={{color: '#d1c7cc'}} />
            <span className="font-semibold text-lg" style={{color: '#52303f'}}>
              Hubungi Kami
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-aos="fade-up" data-aos-delay="200">
            <span style={{background: 'linear-gradient(to right, #52303f, #7c5367)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              Konsultasi
            </span>
            <br />
            <span style={{color: '#d1c7cc'}}>Gratis Sekarang</span>
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

            {/* Map Placeholder */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Lokasi Showroom</h4>
              <div className="rounded-2xl p-8 text-center" style={{background: 'linear-gradient(to bottom right, #f3f0f2, #f8f6f7)'}}>
                <MapPin className="h-16 w-16 mx-auto mb-4" style={{color: '#7c5367'}} />
                <p className="font-semibold" style={{color: '#52303f'}}>Peta Lokasi</p>
                <p className="text-sm" style={{color: '#7c5367'}}>Jl. Mawar No. 123, Jakarta</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div data-aos="fade-left" data-aos-delay="500">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Form Konsultasi</h3>
              <p className="text-gray-600 mb-8">Isi form di bawah ini dan tim kami akan menghubungi Anda dalam 24 jam</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl transition-colors" style={{'--focus-ring-color': '#7c5367', '--focus-border-color': '#7c5367'} as React.CSSProperties} onFocus={(e) => {const target = e.target as HTMLInputElement; target.style.outline = '2px solid #7c5367'; target.style.borderColor = '#7c5367';}} onBlur={(e) => {const target = e.target as HTMLInputElement; target.style.outline = 'none'; target.style.borderColor = '#d1d5db';}}
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl transition-colors" onFocus={(e) => {const target = e.target as HTMLInputElement; target.style.outline = '2px solid #7c5367'; target.style.borderColor = '#7c5367';}} onBlur={(e) => {const target = e.target as HTMLInputElement; target.style.outline = 'none'; target.style.borderColor = '#d1d5db';}}
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nomor Telepon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl transition-colors" onFocus={(e) => {const target = e.target as HTMLInputElement; target.style.outline = '2px solid #7c5367'; target.style.borderColor = '#7c5367';}} onBlur={(e) => {const target = e.target as HTMLInputElement; target.style.outline = 'none'; target.style.borderColor = '#d1d5db';}}
                      placeholder="08123456789"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                      Layanan yang Diminati
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    >
                      <option value="">Pilih layanan</option>
                      <option value="undangan">Undangan Pernikahan</option>
                      <option value="hantaran">Hantaran Pernikahan</option>
                      <option value="paket">Paket Lengkap</option>
                      <option value="konsultasi">Konsultasi Umum</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Pesan / Pertanyaan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl transition-colors resize-none" onFocus={(e) => {const target = e.target as HTMLTextAreaElement; target.style.outline = '2px solid #7c5367'; target.style.borderColor = '#7c5367';}} onBlur={(e) => {const target = e.target as HTMLTextAreaElement; target.style.outline = 'none'; target.style.borderColor = '#d1d5db';}}
                    placeholder="Ceritakan tentang pernikahan impian Anda..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center" style={{background: 'linear-gradient(to right, #7c5367, #52303f)'}} onMouseEnter={(e) => {const target = e.target as HTMLButtonElement; target.style.background = 'linear-gradient(to right, #52303f, #3d1f2a)';}} onMouseLeave={(e) => {const target = e.target as HTMLButtonElement; target.style.background = 'linear-gradient(to right, #7c5367, #52303f)';}}
                >
                  <Send className="h-5 w-5 mr-2" />
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;