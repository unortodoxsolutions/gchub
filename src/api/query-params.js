export function getDateParams (since, until) {
  let params

  if (since) {
    if (!(since instanceof Date)) {
      throw new Error('since must be a date')
    }
    params = [`gte_${since.toISOString()}`]
  }

  if (until) {
    if (!(until instanceof Date)) {
      throw new Error('until must be a date')
    }
    if (!params) params = []
    params.push(`gte_${since.toISOString()}`)
  }

  return params
}
