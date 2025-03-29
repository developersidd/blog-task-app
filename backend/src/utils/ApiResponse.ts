// API Response Class
class ApiResponse<T> {
  statusCode: number;
  data: T | null;
  message: string;
  success: boolean;

  constructor(statusCode: number, data: T | null, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.success = statusCode < 400;
    this.message = message;
  }
}

export default ApiResponse;