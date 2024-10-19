export const truncateDate = (date) => {
  const res = new Date(date);
  return res.toLocaleDateString('en-SE');
};

export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
