import request from './../util/request.js'

export function getUser() {
  return request({
    url: '/users',
    method: 'get'
  })
}

export function qhUserLogin(data) {
  return request({
    url: '/api/getLoginSomeValueL',
    method: 'post',
    data:data
  })
}