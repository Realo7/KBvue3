import { authenticate } from '@/api/common' // jsapi 鉴权时获取签名信息
import * as dd from 'dingtalk-jsapi/entry/union' // 按需应用，微应用部分
import requestAuthCode from 'dingtalk-jsapi/api/runtime/permission/requestAuthCode' // 登陆用临时授权码
import choose from 'dingtalk-jsapi/api/biz/contact/choose' // PC 通讯录选人
import complexPicker from 'dingtalk-jsapi/api/biz/contact/complexPicker' // PC 通讯录选人
import ding20 from 'dingtalk-jsapi/api/biz/ding/create'
import config from '@/config/index.js'
//DING 2.0发ding

/**
 * 鉴权
 * @param url 前端当前的url
 */
function ddconfig(url) {
  console.log(url)
  return authenticate(url).then(res => {
    console.log(res.result)
    dd.config({
      agentId: res.result.agentId, // 必填，微应用ID
      corpId: res.result.corpId, // 必填，企业ID
      timeStamp: res.result.timeStamp, // 必填，生成签名的时间戳
      nonceStr: res.result.nonceStr, // 必填，生成签名的随机串
      signature: res.result.signature, // 必填，签名
      type: 0,
      jsApiList: [
        'runtime.info',
        'biz.contact.choose',
        'device.notification.confirm',
        'device.notification.alert',
        'device.notification.prompt',
        'biz.ding.post',
        'biz.util.openLink',
        'biz.ding.create',
        'biz.contact.complexPicker'
      ] // 必填，需要使用的jsapi列表，注意：不要带dd。
    })
    dd.error(function (err) {
      console.log(JSON.stringify(err))
      Toast('dd error: ' + JSON.stringify(err))
    }) //该方法必须带上，用来捕获鉴权出现的异常信息，否则不方便排查出现的问题
  })
}

// PC通讯录选人
export function contactChoose(url) {
  return new Promise((resolve, reject) => {
    ddconfig(url)
      .then(res => {
        console.log(res)
        choose({
          users: '',
          multiple: true, // 是否多选：true多选 false单选； 默认true
          corpId: config.corpId, // 企业id
          max: 10 // 人数限制，当multiple为true才生效，可选范围1-1500
        }).then(res => {
          const rew = JSON.parse(JSON.stringify(res).replace(/emplId/g, 'userid'))
          resolve(rew)
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 手机选人
export function chooseUserFromPart(url) {
  return new Promise((resolve, reject) => {
    ddconfig(url)
      .then(res => {
        console.log(res)
        dd.ready(() => {
          complexPicker({
            title: '测试标题', //标题
            corpId: config.corpId, //企业的corpId
            multiple: true, //是否多选
            limitTips: '超出了', //超过限定人数返回提示
            maxUsers: 1000, //最大可选人数
            pickedUsers: [], //已选用户
            pickedDepartments: [], //已选部门
            disabledUsers: [], //不可选用户
            disabledDepartments: [], //不可选部门
            requiredUsers: [], //必选用户（不可取消选中状态）
            requiredDepartments: [], //必选部门（不可取消选中状态）
            appId: config.AgentId, //微应用Id，企业内部应用查看AgentId
            permissionType: 'GLOBAL', //可添加权限校验，选人权限，目前只有GLOBAL这个参数
            responseUserOnly: false, //返回人，或者返回人和部门
            startWithDepartmentId: 0 //仅支持0和-1
          }).then(res => {
            console.log('++__++' + res)
            resolve(res)
          })
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}
//手机发ding
export function GoDing20(url) {
  return new Promise((resolve, reject) => {
    ddconfig(url)
      .then(res => {
        console.log(res)
        dd.ready(() => {
          // 上线修改
          ding20({
            users: [''],
            corpId: config.corpId, //企业的corpId
            type: 1,
            alertType: 2,
            alertDate: { format: 'yyyy-MM-dd HH:mm', value: '2021-05-01 08:00' },
            text: '请处理我的审批',
            bizType: 0
          }).then(res => {
            console.log('++__++' + res)
            resolve(res)
          })
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 获取登陆用临时授权码
export function getAuthCode(corpId) {
  return requestAuthCode({
    corpId
  }).catch(err => {
    console.log(err)
  })
}
