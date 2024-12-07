export class UnsupportedFileTypeError extends Error {
    public statusCode: number;
  
    constructor(message = 'Unsupported file type') {
      super(message);
      this.statusCode = 400; // HTTP 400 Bad Request
      Object.setPrototypeOf(this, UnsupportedFileTypeError.prototype);
    }
  }
  