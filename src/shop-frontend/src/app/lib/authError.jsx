class ValidationError extends Error {
  constructor(type) {
    super("error");
    this.type = type; // (2)
  }
}