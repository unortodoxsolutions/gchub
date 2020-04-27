const userSubjectHeader = 'x-getcns-subject'
const userRoleHeader = 'x-getcns-role'

const userHeaders = [
  userSubjectHeader,
  userRoleHeader
]

export function saveUserDetails (httpResponse) {
  userHeaders.forEach(h => localStorage.setItem(h, httpResponse.headers[h]))
}

export function currentUserID () {
  const sub = localStorage.getItem(userSubjectHeader)
  if (!sub) return 0

  const id = parseInt(sub.split(':').pop())
  if (isNaN(id)) return 0

  return id
}

export function currentUserRoles () {
  const roles = localStorage.getItem(userRoleHeader)
  if (!roles) return []
  return roles.split(',').map(s => s.trim())
}
