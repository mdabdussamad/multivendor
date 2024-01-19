export const generateCouponCode = (title = '', expiryDate = '') => {
    // Format title to uppercase and remove spaces
    const formattedTitle = title.toUpperCase().replace(/\s+/g, '');
  
    // Convert expiryDate to a valid Date object
    const dateObject = new Date(expiryDate);
  
    // Check if the conversion was successful and it's a valid Date object
    if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
      throw new Error('Invalid expiryDate. Please provide a valid Date object or date string.');
    }
  
    // Format expiry date to MMDDYYYY
    const formattedExpiryDate = dateObject
      .toISOString()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("");
  
    // Combine formatted title and expiry date to create the coupon code
    const couponCode = `${formattedTitle}-${formattedExpiryDate}`;
  
    return couponCode;
  };
  