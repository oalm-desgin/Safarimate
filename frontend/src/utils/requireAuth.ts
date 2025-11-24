export const requireAuth = (): boolean => {
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = '/login'
    return false
  }
  return true
}

