'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import Toast, { ToastMessage, ToastType } from './Toast';

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string, duration?: number) => void;
  showSuccess: (title: string, message?: string, duration?: number) => void;
  showError: (title: string, message?: string, duration?: number) => void;
  showWarning: (title: string, message?: string, duration?: number) => void;
  showInfo: (title: string, message?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const showToast = (type: ToastType, title: string, message?: string, duration?: number) => {
    const id = generateId();
    const newToast: ToastMessage = {
      id,
      type,
      title,
      message,
      duration: duration || 5000
    };

    setToasts(prev => [...prev, newToast]);
  };

  const showSuccess = (title: string, message?: string, duration?: number) => {
    showToast('success', title, message, duration);
  };

  const showError = (title: string, message?: string, duration?: number) => {
    showToast('error', title, message, duration);
  };

  const showWarning = (title: string, message?: string, duration?: number) => {
    showToast('warning', title, message, duration);
  };

  const showInfo = (title: string, message?: string, duration?: number) => {
    showToast('info', title, message, duration);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const value = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            toast={toast}
            onClose={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;