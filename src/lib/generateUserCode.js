export default function generateUserCode(prefix, fullName) {
    // Extract initials from fullName
    const initials = fullName
      .split(' ')
      .map(name => name[0])
      .join('').toUpperCase();
  
    // Get current date and time components
    const now = new Date();
    const year = now.getFullYear().toString().slice(2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    // Combine components to form the unique code
    const uniqueCode = `${prefix}-${initials}-${year}${month}${day}${hours}${minutes}${seconds}`;
  
    return uniqueCode;
  }