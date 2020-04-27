// import { api, currentUserID } from './client'
import { hubAPI as api } from './client'
import { getDateParams } from './query-params'

export function list ({ page, pageSize, since, until }) {
  const params = {
    page,
    page_size: pageSize,
    created_at: getDateParams(since, until)
  }

  return api.get('/transaction', { params })
}

export function read (transactionID) {
  return api.get(`/transaction/${transactionID}`)
}

export function update (transactionID, data) {
  return api.post(`/transaction/${transactionID}/save`, data)
}
