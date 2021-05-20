import axios from '@/util/request';

// 查询系统中所有可用用户
export function getUserList() {
  return axios({
    url: '/userlist',
    method: 'get',
  });
}

// 钉钉jsapi 鉴权
export function authenticate(url) {
  return axios({
    url: '/jsapi_signature',
    method: 'post',
    data: {
      url,
    },
  });
}

// 从一言 API 获取句子
export function getYiYan() {
  return axios({
    url: 'https://v1.hitokoto.cn/?c=i&encode=json',
    method: 'get',
  });
}
//查询所有公司/api/oa/initiateApplication/findCompany
export function findCompany(data) {
  return axios({
    url: '/api/oa/initiateApplication/findCompany',
    method: 'post',
    params: data,
  });
}
//根据公司id查询部门/api/oa/initiateApplication/findDepartmentByCompanyId
export function findDepartment(data) {
  return axios({
    url: '/api/oa/initiateApplication/findDepartmentByCompanyId',
    method: 'post',
    params: data,
  });
}
// 根据部门ID查询人员/api/oa/initiateApplication/findUserByDepartmentId
export function findUser(data) {
  return axios({
    url: '/api/oa/initiateApplication/findUserByDepartmentId',
    method: 'post',
    params: data,
  });
}