import { ErrorResponse } from './types';

export default class CustomError extends Error {
  errors: ErrorResponse;

  constructor(obj: ErrorResponse) {
    super(JSON.stringify(obj));
    this.name = 'TwitterAPIError';
    this.errors = obj;
  }
}
