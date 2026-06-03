export type ApiResponse<T> = { success: true; message: string; data: T } | { success: false; message: string; errors?: string[] };

export class AppApiError extends Error {
  errors: string[];
  status?: number;
  constructor(message: string, errors: string[] = [], status?: number) {
    super(message);
    this.name = 'AppApiError';
    this.errors = errors;
    this.status = status;
  }
}
