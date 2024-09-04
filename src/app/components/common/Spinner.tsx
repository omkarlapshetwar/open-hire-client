import React from 'react';

interface SpinnerProps {
  className?: string;
  color?: 'white' | 'purple';
}

const Spinner: React.FC<SpinnerProps> = ({ className = '', color = 'purple' }) => {
  const spinnerColor = color === 'white' ? 'border-white' : 'border-purple-600';

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 ${spinnerColor}`}></div>
    </div>
  );
};

export default Spinner;