import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}