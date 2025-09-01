// Simplified auth for initial Next.js setup
// Will implement NextAuth properly once basic structure is working

export async function getServerSession() {
  // Placeholder - will implement proper session handling
  return null
}

export function hasRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole)
}