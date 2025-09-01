// Simplified storage for initial Next.js setup
export const storage = {
  async getHostels() {
    return []
  },
  async getUserByEmail(email: string) {
    return null
  },
  async createUser(userData: any) {
    return userData
  }
}