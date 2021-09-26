import request from '@/utils/request'

export function addItem(data) {
  return request({
    url: '/admin/rest/items',
    method: 'post',
    data
  })
}
export function getItemList() {
  return request({
    url: '/admin/rest/items',
    method: 'get',
  })
}
export function getOneItem(id) {
  return request({
    url: `/admin/rest/items/${id}`,
    method: 'get',
  })
}
export function editOneItem(id,data) {
  return request({
    url: `/admin/rest/items/${id}`,
    method: 'put',
    data
  })
}
export function deleteOneItem(id) {
  return request({
    url: `/admin/rest/items/${id}`,
    method: 'delete',
  })
}