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
    data,
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
//审批记录
// userId: 82
// pageNum: 1
// pageSize: 10
// s: 1621424583095
export function myApprovalRecord(data) {
  return axios({
    url: '/api/oa/MyApprovalRecord/list',
    method: 'post',
    params: data,
  });
}
//我的申请api/oa/myApplicationInquiry/list
export function querryMyApply(data) {
  return axios({
    url: '/api/oa/myApplicationInquiry/list',
    method: 'post',
    params: data,
  });
}
//通过申请

export function passApproval(data) {
  return axios({
    url: '/api/oa/waitingForMyApproval/Approved',
    method: 'post',
    params: data,
  });
}
// 查询申请详细
export function queryDetails(data) {
  return axios({
    url: '/api/oa/myApplicationInquiry/queryDetails',
    method: 'post',
    params: data,
  });
}
// 查询进度记录
export function recordNote(data) {
  return axios({
    url: '/api/oa/myApplicationInquiry/findApprovalRecordNote',
    method: 'post',
    params: data,
  });
}
// 查询申请单据
export function recordTable(data) {
  return axios({
    url: '/api/oa/myApplicationInquiry/findApprovalRecordTable',
    method: 'post',
    params: data,
  });
}