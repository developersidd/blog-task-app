// API Error Class
class ApiError extends Error {
  statusCode: number;
  data: null;
  errors: any[];
  success: boolean;

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: any[] = [],
    stack = ""
  ) {
    super(message);
    this.data = null;
    this.statusCode = statusCode;
    this.errors = errors;
    this.message = message;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;