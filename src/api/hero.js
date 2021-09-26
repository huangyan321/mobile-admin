import request from '@/utils/request'

export function addHero(data) {
  return request({
    url: '/rest/heroes',
    method: 'post',
    data
  })
}
export function getHeroList() {
  return request({
    url: '/rest/heroes',
    method: 'get',
  })
}
export function getOneHero(id) {
  return request({
    url: `/rest/heroes/${id}`,
    method: 'get',
  })
}
export function editOneHero(id,data) {
  return request({
    url: `/rest/heroes/${id}`,
    method: 'put',
    data
  })
}
export function deleteOneHero(id) {
  return request({
    url: `/rest/heroes/${id}`,
    method: 'delete',
  })
}