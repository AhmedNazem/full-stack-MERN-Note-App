export const validateEmail = (email) => {
  // Define the regex pattern for a valid email address
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test if the provided email matches the pattern
  return emailPattern.test(email);
};

export const getInitials = (name) => {
  if (!name) return ""; // Return early if no name is provided

  const words = name.trim().split(" "); // Trim and split in one line
  let initials = words
    .filter((word) => word.length > 0) // Filter out any empty words due to extra spaces
    .slice(0, 2) // Get the first two words
    .map((word) => word[0].toUpperCase()) // Get the first letter and convert to uppercase
    .join(""); // Join the initials

  return initials; // Return the resulting initials
};
