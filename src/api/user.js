import axios from '@/util/request';

// 用户登录
// 该接口在后端集成了获取用户信息，所以会直接返回用户信息
// 在获得了accessToken和userId之后，可以直接调用第二个接口，获取到用户信息
export function login(data) {
  return axios({
    url: '/api/oa/Dingtalk/login',
    method: 'post',
    params: data,
  });
}

// 获取用户信息
export function getInfo(data) {
  return axios({
    url: '/api/oa/Dingtalk/user/get',
    method: 'post',
    params: data,
  });
}
