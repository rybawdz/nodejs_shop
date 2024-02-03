class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.message = message;
    }
  }
  // może trochę na siłe dodane ale mi nazwa AuthError
  // nie pasowała do walidacji formularza zakupu
  export default ValidationError;
  