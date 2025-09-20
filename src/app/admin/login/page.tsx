'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Important for cookies
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message
        setSuccess('Login berhasil! Mengalihkan ke dashboard...');
        
        // Store user data in localStorage for client-side access
        localStorage.setItem('admin-user', JSON.stringify(data.user));
        
        // Wait a bit to ensure cookie is set and show success message
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Try router.push first, then fallback to window.location if needed
        try {
          await router.push('/admin');
          // If router.push doesn't work, use window.location as fallback
          setTimeout(() => {
            if (window.location.pathname === '/admin/login') {
              window.location.href = '/admin';
            }
          }, 500);
        } catch {
           console.error('Router push failed');
           window.location.href = '/admin';
        }
      } else {
        // More specific error messages
        if (response.status === 401) {
          setError('Email atau password salah. Silakan periksa kredensial Anda.');
        } else if (response.status === 404) {
          setError('Akun admin tidak ditemukan.');
        } else {
          setError(data.error || 'Login gagal. Silakan coba lagi.');
        }
      }
    } catch {
      setError('Terjadi kesalahan jaringan. Periksa koneksi internet Anda dan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          {/* Animation Section - Mobile First */}
           <div className="flex lg:hidden flex-1 bg-gradient-to-br from-purple-500 to-purple-600 items-center justify-center py-2" style={{background: 'linear-gradient(to bottom right, #7c5367, #52303f)'}}>
             <div className="w-64 h-64">
               <DotLottieReact
                 src="https://lottie.host/0373309a-7ade-45dc-8990-5f2ddc14df85/nEHB8JNJ2B.lottie"
                 loop
                 autoplay
               />
             </div>
           </div>
           
           {/* Login Form Section */}
           <div className="flex-1 p-6 lg:p-8 max-w-md lg:max-w-none">
            <div className="space-y-8">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: '#7c5367'}}>
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Admin Login
                </h2>
                <p className="text-gray-600">
                  Sign in to access the admin dashboard
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="border px-4 py-3 rounded-lg text-sm" style={{backgroundColor: '#f3f0f2', borderColor: '#d1c7cc', color: '#52303f'}}>
                    {success}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:border-transparent" style={{'--tw-ring-color': '#7c5367'} as React.CSSProperties}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10 w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:border-transparent" style={{'--tw-ring-color': '#7c5367'} as React.CSSProperties}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2" style={{backgroundColor: '#7c5367', '--tw-ring-color': '#7c5367'} as React.CSSProperties} onMouseEnter={(e) => {const target = e.target as HTMLButtonElement; target.style.backgroundColor = '#52303f'}} onMouseLeave={(e) => {const target = e.target as HTMLButtonElement; target.style.backgroundColor = '#7c5367'}}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      'Sign in'
                    )}
                  </button>
                </div>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Protected admin area. Authorized personnel only.
                </p>
              </div>
            </div>
          </div>
          
          {/* Animation Section - Desktop */}
          <div className="hidden lg:flex flex-1 items-center justify-center" style={{background: 'linear-gradient(to bottom right, #7c5367, #52303f)'}}>
            <div className="w-96 h-96">
              <DotLottieReact
                src="https://lottie.host/0373309a-7ade-45dc-8990-5f2ddc14df85/nEHB8JNJ2B.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;