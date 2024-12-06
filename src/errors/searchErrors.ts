export class SearchError extends Error {
    status: number;
  
    constructor(message: string, status: number) {
      super(message);
      this.status = status;
      this.name = 'SearchError';
      Error.captureStackTrace(this, this.constructor);
    }
}