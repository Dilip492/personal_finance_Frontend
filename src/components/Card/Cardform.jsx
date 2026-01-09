import React, { useState, useEffect } from 'react';

import { 
  formatCardNumber, 
  formatExpiryDate, 
  validateCardNumber, 
  validateExpiryDate, 
  validateCVV,
  validateCardHolder
} from './Formutils';
import Carddisplay from './Carddisplay';



const Cardform = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [focused, setFocused] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle card number input
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 16) {
      setCardNumber(value);
    }
  };
  
  // Handle expiry date input
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 4) {
      if (value.length > 2) {
        value = `${value.slice(0, 2)}/${value.slice(2)}`;
      }
      setExpiryDate(value);
    }
  };
  
  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    
    if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    if (!validateCardHolder(cardHolder)) {
      newErrors.cardHolder = 'Please enter your full name';
    }
    
    if (!validateExpiryDate(expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date';
    }
    
    if (!validateCVV(cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      // Here you would typically send the data to your payment processor
      // For this example, we'll just simulate a successful submission
      console.log('Form submitted with:', { cardNumber, cardHolder, expiryDate, cvv });
      
    //   setTimeout(() => {
    //     alert('Payment information saved successfully!');
    //     // Reset form after successful submission
    //     setCardNumber('');
    //     setCardHolder('');
    //     setExpiryDate('');
    //     setCvv('');
    //     setIsSubmitting(false);
    //   }, 1500);
    } else {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8 transform transition-all duration-300">
        <Carddisplay
          cardNumber={cardNumber}
          cardHolder={cardHolder}
          expiryDate={expiryDate}
          cvv={cvv}
          focused={focused}
        />
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Payment Details</h2>
        
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            value={formatCardNumber(cardNumber)}
            onChange={handleCardNumberChange}
            onFocus={() => setFocused('cardNumber')}
            onBlur={() => setFocused(null)}
            className={`w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 transition-all duration-200 ${
              errors.cardNumber 
                ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
            }`}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name
          </label>
          <input
            id="cardHolder"
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            onFocus={() => setFocused('cardHolder')}
            onBlur={() => setFocused(null)}
            className={`w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 transition-all duration-200 ${
              errors.cardHolder 
                ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
            }`}
            placeholder="John Smith"
          />
          {errors.cardHolder && (
            <p className="mt-1 text-sm text-red-600">{errors.cardHolder}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              onFocus={() => setFocused('expiryDate')}
              onBlur={() => setFocused(null)}
              className={`w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 transition-all duration-200 ${
                errors.expiryDate 
                  ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
              }`}
              placeholder="MM/YY"
              maxLength={5}
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              id="cvv"
              type="text"
              value={cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 4) {
                  setCvv(value);
                }
              }}
              onFocus={() => setFocused('cvv')}
              onBlur={() => setFocused(null)}
              className={`w-full px-3 py-2 border rounded-md focus:ring focus:ring-opacity-50 transition-all duration-200 ${
                errors.cvv 
                  ? 'border-red-300 focus:ring-red-200 focus:border-red-400' 
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
              }`}
              placeholder="123"
              maxLength={4}
            />
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-all duration-200 ${
            isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Save Card Details'
          )}
        </button>
      </form>
    </div>
  );
};

export default Cardform;