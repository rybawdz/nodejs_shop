class AuthError extends Error {
  constructor(message) {
    super(message);
    this.message = message; // (2)
  }
}

export default AuthError;
