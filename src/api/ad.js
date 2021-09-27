import request from '@/utils/request'

export function addAd(data) {
  return request({
    url: '/rest/ads',
    method: 'post',
    data
  })
}
export function getAdList(params) {
  return request({
    url: '/rest/ads',
    method: 'get',
    params
  })
}
export function getOneAd(id) {
  return request({
    url: `/rest/ads/${id}`,
    method: 'get',
  })
}
export function editOneAd(id, data) {
  return request({
    url: `/rest/ads/${id}`,
    method: 'put',
    data
  })
}
export function deleteOneAd(id) {
  return request({
    url: `/rest/ads/${id}`,
    method: 'delete',
  })
}
