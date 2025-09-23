'use client';

import {
    ChevronLeft,
    ChevronRight,
    FileText,
    Gift,
    LayoutDashboard,
    LogOut,
    Menu,
    Package,
    Star,
    X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface AdminSidebarProps {
  children: React.ReactNode;
}

const AdminSidebar = ({ children }: AdminSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/admin',
      icon: LayoutDashboard,
      label: 'Dashboard',
      exact: true
    },
    {
      href: '/admin/templates',
      icon: Package,
      label: 'Templates',
      exact: false
    },
    {
      href: '/admin/packages',
      icon: Gift,
      label: 'Packages',
      exact: false
    },
    {
      href: '/admin/hantaran',
      icon: Gift,
      label: 'Hantaran',
      exact: false
    },
    {
      href: '/admin/services',
      icon: Package,
      label: 'Services',
      exact: false
    },
    {
      href: '/admin/service-cta',
      icon: FileText,
      label: 'Service CTA',
      exact: false
    },
    {
      href: '/admin/testimonials',
      icon: Star,
      label: 'Testimonials',
      exact: false
    },
    {
      href: '/admin/blog',
      icon: FileText,
      label: 'Blog',
      exact: false
    }
  ];

  const isActive = (item: typeof menuItems[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  const handleLogout = async () => {
    try {
      // Call logout API to clear session
      await fetch('/api/auth/admin', {
        method: 'DELETE',
        credentials: 'include'
      });
      
      // Clear localStorage
      localStorage.removeItem('admin-user');
      
      // Redirect to login page
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, still redirect to login
      localStorage.removeItem('admin-user');
      window.location.href = '/admin/login';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-10 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-white shadow-lg transition-all duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          )}
          <div className="flex items-center space-x-2">
            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
            {/* Desktop collapse button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1 rounded-md hover:bg-gray-100"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                  ${active 
                    ? 'bg-emerald-100 text-emerald-700 border-r-2 border-emerald-500' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`
              flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
              text-red-600 hover:bg-red-50 hover:text-red-700 w-full
            `}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="font-medium">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminSidebar;