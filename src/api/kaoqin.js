import axios2 from '@/util/request2';

// 发起审批-查询审批流程
export function queryApprovalProcess(data) {
  return axios2({
    url: '/api/oa/initiateApplication/queryApprovalProcess',
    method: 'post',
    params: data,
  });
}

// 发起审批-查询模板明细
export function queryTemplateDetails(data) {
  return axios2({
    url: '/api/oa/initiateApplication/findTemplateDetailed',
    method: 'post',
    params: data,
  });
}

// 发起审批-发起审批
export function GoApproval(data) {
  return axios2({
    url: '/api/oa/initiateApplication/add',
    method: 'post',
    params: data,
  });
}
