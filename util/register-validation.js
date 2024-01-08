function validateSignUp(name, email, password, confirmPassword) {
   return (
      name &&
      email &&
      password &&
      confirmPassword &&
      email.includes("@") &&
      password.trim().length >= 6 &&
      password === confirmPassword
   );
}

module.exports = validateSignUp;
