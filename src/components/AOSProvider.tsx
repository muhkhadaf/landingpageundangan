'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AOSProviderProps {
  children: React.ReactNode;
}

const AOSProvider: React.FC<AOSProviderProps> = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100,
      delay: 0,
    });

    // Refresh AOS on route changes
    const handleRouteChange = () => {
      AOS.refresh();
    };

    // Listen for route changes if using Next.js router
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return <>{children}</>;
};

export default AOSProvider;