// export function generateInitials(name) {
//   // Check if the name is a string
//   if (typeof name !== 'string') {
//     console.error('Invalid input. Please provide a valid string.');
//     return null; // or any default value based on your requirements
//   }

//   // Trim the name to remove any leading or trailing spaces
//   const trimmedName = name.trim();

//   // Check if the trimmed name is not an empty string
//   if (trimmedName === '') {
//     console.error('Empty input. Please provide a non-empty string.');
//     return null; // or any default value based on your requirements
//   }

//   // Split the name into individual words
//   const words = trimmedName.split(' ');

//   // Initialize variables to store initials
//   let firstInitial = words[0][0].toUpperCase();
//   let secondInitial = "";

//   // Get the second initial from the last word
//   if (words.length > 1) {
//     secondInitial = words[1][0].toUpperCase();
//   }

//   // Return the generated initials
//   return firstInitial + secondInitial;
// }

export function generateInitials(name) {
    // Check if the name is a string
    if (typeof name !== 'string') {
      console.error('Invalid input. Please provide a valid string.');
      return null; // or any default value based on your requirements
    }
  
    // Trim the name to remove any leading or trailing spaces
    const trimmedName = name.trim();
  
    // Check if the trimmed name is not an empty string
    if (trimmedName === '') {
      console.error('Empty input. Please provide a non-empty string.');
      return null; // or any default value based on your requirements
    }
  
    // Split the name into individual words
    const words = trimmedName.split(' ');
  
    // Initialize variables to store initials
    let firstInitial = words[0][0].toUpperCase();
    let secondInitial = "";
  
    // Get the second initial from the last word
    if (words.length > 1) {
      secondInitial = words[1][0].toUpperCase();
    }
  
    // Return the generated initials
    return firstInitial + secondInitial;
  }
  

  
   
  