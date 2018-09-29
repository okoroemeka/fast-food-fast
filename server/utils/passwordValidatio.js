const passwordStrength = (password) => {
  const specialChar = [/[a-z]/, /[A-Z]/, /[1-9]/, /[$@#&!]/];
  let strength = 0;
  specialChar.map((iterator) => {
    const regex = new RegExp(iterator);
    if (regex.test(password)) {
      strength += 25;
    }
  });
  return strength;
};

export default passwordStrength;
