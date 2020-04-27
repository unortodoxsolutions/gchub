import { hubAPI as api } from './client'
import { getDateParams } from './query-params'

export function create (data) {
  return api.post('/ticket', data, {
    headers: {
      // 'Content-Type': 'multipart/form-data'
      'Content-Type': 'application/json'
    }
  })
}

export function list ({ page = 1, pageSize = 10, since, until }) {
  return api.get('/ticket', {
    params: {
      page,
      page_size: pageSize,
      created_at: getDateParams(since, until)
    }
  })
}

export function read (ticketID) {
  return api.get(`/ticket/${ticketID}`)
}

export function update (ticketID, data) {
  return api.patch(`/ticket/${ticketID}`, data)
}
