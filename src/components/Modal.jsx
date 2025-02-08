import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4 transform animate-fadeIn"
        style={{
          animation: 'fadeIn 0.3s ease-out',
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;