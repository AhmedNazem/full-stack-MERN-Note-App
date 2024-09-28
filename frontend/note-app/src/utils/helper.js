export const validateEmail = (email) => {
  // Define the regex pattern for a valid email address
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test if the provided email matches the pattern
  return emailPattern.test(email);
};

export const getInitials = (name) => {
  const trimWord = name.trim();
  if (!trimWord) return "";
  const words = trimWord.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};
