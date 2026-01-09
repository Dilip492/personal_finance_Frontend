// Utility functions for credit card form validation and formatting

// Validate card number (using Luhn algorithm)
export const validateCardNumber = (cardNumber) => {
  const sanitizedNumber = cardNumber.replace(/\D/g, '');
  
  if (sanitizedNumber.length < 13 || sanitizedNumber.length > 19) {
    return false;
  }
  
  // Luhn algorithm for credit card validation
  let sum = 0;
  let shouldDouble = false;
  
  // Loop from right to left
  for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedNumber.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

// Format card number with spaces after every 4 digits
export const formatCardNumber = (value)=> {
  const sanitizedValue = value.replace(/\D/g, '');
  const groups = [];
  
  for (let i = 0; i < sanitizedValue.length; i += 4) {
    groups.push(sanitizedValue.slice(i, i + 4));
  }
  
  return groups.join(' ');
};

// Validate expiry date (MM/YY format)
export const validateExpiryDate = (expiryDate)=> {
  // Check format
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
    return false;
  }
  
  const [monthStr, yearStr] = expiryDate.split('/');
  const month = parseInt(monthStr, 10);
  const year = parseInt('20' + yearStr, 10);
  
  // Check if month is valid
  if (month < 1 || month > 12) {
    return false;
  }
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JS months are 0-indexed
  
  // Check if the card is not expired
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }
  
  return true;
};

// Format expiry date to MM/YY
export const formatExpiryDate = (value) => {
  const sanitizedValue = value.replace(/\D/g, '');
  
  if (sanitizedValue.length > 2) {
    return `${sanitizedValue.slice(0, 2)}/${sanitizedValue.slice(2, 4)}`;
  }
  
  return sanitizedValue;
};

// Validate CVV (3-4 digits)
export const validateCVV = (cvv) => {
  const sanitizedCVV = cvv.replace(/\D/g, '');
  return /^\d{3,4}$/.test(sanitizedCVV);
};

// Validate cardholder name (not empty, at least 2 words)
export const validateCardHolder = (name) => {
  if (!name.trim()) return false;
  
  const nameParts = name.trim().split(' ');
  return nameParts.length >= 2 && nameParts.every(part => part.length > 0);
};