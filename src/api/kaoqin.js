import axios from '@/util/request';

// 发起审批-查询审批流程
export function queryApprovalProcess(data) {
  return axios({
    url: '/api/oa/initiateApplication/queryApprovalProcess',
    method: 'post',
    params: data,
  });
}

// 发起审批-查询模板明细
export function queryTemplateDetails(data) {
  return axios({
    url: '/api/oa/initiateApplication/findTemplateDetailed',
    method: 'post',
    params: data,
  });
}
// 查询是否存在报销单据
export function queryTemplateTable(data) {
  return axios({
    url: '/api/oa/initiateApplication/findTemplateTable',
    method: 'post',
    params: data,
  });
}

// 发起审批-发起审批
export function goTemplate(data) {
  return axios({
    url: '/api/oa/initiateApplication/add',
    method: 'post',
    params: data,
  });
}
// 发起审批-我的审批
export function myApproval(data) {
  return axios({
    url: '/api/oa/waitingForMyApproval/list',
    method: 'post',
    params: data,
  });
}