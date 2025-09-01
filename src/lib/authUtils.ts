// Auth utility functions
export function isUnauthorizedError(error: any): boolean {
  return error?.status === 401 || error?.response?.status === 401
}