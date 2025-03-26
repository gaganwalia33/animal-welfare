import React from 'react';
import { X } from 'lucide-react';

interface GoogleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleFormModal: React.FC<GoogleFormModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full h-[80vh] relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeFfJyvIa3lk8UvRkETo6DvxS6U0cEWED05DjmpesII8mmNgQ/viewform?usp=sharing"
          width="100%"
          height="100%"
          className="border-0"
        >
          Loading form...
        </iframe>
      </div>
    </div>
  );
};

export default GoogleFormModal;