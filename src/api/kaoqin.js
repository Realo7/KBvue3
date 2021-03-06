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
// 查询所有公司
export function findCompany(data) {
  return axios({
    url: '/api/oa/initiateApplication/findCompany',
    method: 'post',
    params: data,
  });
}
//根据公司ID选取部门
export function findDepartmentBy(data) {
  return axios({
    url: '/api/oa/initiateApplication/findDepartmentByCompanyId',
    method: 'post',
    params: data,
  });
}
//根据部门ID选取人员
export function findUserBy(data) {
  return axios({
    url: '/api/oa/initiateApplication/findUserByDepartmentId',
    method: 'post',
    params: data,
  });
}
//记录的详细
export function detailRecord(data) {
  return axios({
    url: '/api/oa/SinglePage/queryDetails',
    method: 'post',
    params: data,
  });
}
//记录的table 
export function detailRecordTable(data) {
  return axios({
    url: '/api/oa/SinglePage/findApprovalRecordTable',
    method: 'post',
    params: data,
  });
}
//暂时不知道干嘛的
export function detailquerry(data) {
  return axios({
    url: '/api/oa/SinglePage/query',
    method: 'post',
    params: data,
  });
}
//查询单据种类
export function querryDanjuKind(data) {
  return axios({
    url: '/api/oa/initiateApplication/findActivitiFormTemplate',
    method: 'post',
    params: data,
  });
}
//通过userid和key查询单据号
export function querryDanjuNum(data) {
  return axios({
    url: '/api/oa/initiateApplication/findApprovalRecordByUserIdAndKey',
    method: 'post',
    params: data,
  });
}