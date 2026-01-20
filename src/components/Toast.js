import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Auto-hide after 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-10 right-10 bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-4 animate-bounce-in">
      <CheckCircle size={24} />
      <span className="font-bold">{message}</span>
      <button onClick={onClose} className="hover:text-gray-200">
        <X size={20} />
      </button>
    </div>
  );
};

export default Toast;