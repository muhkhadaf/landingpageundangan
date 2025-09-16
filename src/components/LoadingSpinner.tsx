import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  message = 'Loading...' 
}) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} mb-4`}>
        <DotLottieReact
          src="https://lottie.host/d972e762-6956-4c0d-96ef-660ac954632c/ejLOzg0F6B.lottie"
          loop
          autoplay
        />
      </div>
      {message && (
        <p className="text-gray-600 text-center font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;