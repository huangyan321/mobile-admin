import request from '@/utils/request'

export function addCategory(data) {
  return request({
    url: '/rest/categories',
    method: 'post',
    data
  })
}
export function getCategoryList() {
  return request({
    url: '/rest/categories',
    method: 'get',
  })
}
export function getOneCategory(id) {
  return request({
    url: `/rest/categories/${id}`,
    method: 'get',
  })
}
export function editOneCategory(id,data) {
  return request({
    url: `/rest/categories/${id}`,
    method: 'put',
    data
  })
}
export function deleteOneCategory(id) {
  return request({
    url: `/rest/categories/${id}`,
    method: 'delete',
  })
}