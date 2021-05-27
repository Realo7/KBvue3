<template>
  <!-- <div style="height: 100px; text-align: center">
    <van-button icon="plus" type="primary" @click="dingChoose()">摇人</van-button>
    <br />
    <br />
    <van-button icon="plus" type="primary" @click="goDing">发通知</van-button>
  </div> -->
  <div style="margin: 100px 15px 0px 15px">
    <van-field
      v-model="kindPicker.name"
      readonly
      clickable
      name="picker"
      label="申请类型"
      placeholder="点击选择申请类型"
      @click="state.showPicker1 = true"
    />
    <van-empty v-if="key_value == ''" description="暂时没有该申请单的字段"> </van-empty>
    <van-form @submit="onSubmit">
      <div v-show="key_value != ''">
        <van-field
          v-model="CompanyPicker.companyName"
          readonly
          clickable
          name="company"
          label="选择公司"
          placeholder="点击选择公司"
          @click="state.showCompany = true"
        />
        <van-field
          v-model="groupPicker.name"
          readonly
          clickable
          name="Group"
          label="选择部门"
          placeholder="点击选择部门"
          @click="state.showGroup = true"
        />
        <van-field
          v-model="memberPicker.userName"
          readonly
          clickable
          name="Member"
          label="选择人员"
          placeholder="点击选择人员"
          @click="state.showMember = true"
        />
      </div>
      <!-- item.type==='时间'?dateclick(item,index):state.showPicker2=false -->
      <van-field
        v-for="(item, index) in key_value"
        :key="item.id"
        v-model="item.value"
        clickable
        :type="item.type == '整数' ? 'digit' : 'text'"
        :readonly="item.type == '时间' || item.type == '日期+时间' || item.type == '日期'"
        @click="chooseinputType(item, index)"
        :name="item.key"
        :label="item.key"
        :placeholder="`请填写${item.key}`"
        :rules="[{ required: true, message: `请填写${item.key}` }]"
      />

      <!-- 报销单据 -->
      <van-collapse v-show="key_value != ''" v-model="state.showReimbursement" accordion>
        <van-collapse-item title="相关报表" name="1">
          <div v-if="temTable != ''">
            <!-- :readonly="item.type=='时间'||item.type=='日期+时间'||item.type=='日期'" -->
            <van-field
              v-for="item in temTable"
              :key="item.id"
              v-model="item.value"
              :label="item.key"
              :placeholder="`请填写${item.key}`"
            />
          </div>
          <div v-if="temTable == ''">当前申请没有对应报销表单</div>
        </van-collapse-item>
      </van-collapse>
      <!-- 关联单据 -->
      <van-collapse v-show="key_value != ''" v-model="state.showReimbursement" accordion>
        <van-collapse-item title="关联单据" name="2">
          <van-field
            v-model="kindPicker.danjuKind"
            readonly
            clickable
            label="单据类型"
            placeholder="选择单据类型"
            @click="state.danjuKind = true"
          />
          <van-field
            v-model="kindPicker.danjuNum"
            readonly
            clickable
            label="单据类型"
            placeholder="选择单据类型"
            @click="state.danjuNum = true"
          />
        </van-collapse-item>
      </van-collapse>
      <!-- 上传图片 -->
      <van-field name="uploader" label="上传图片" v-show="key_value != ''">
        <template #input>
          <van-uploader max-size="5242880" v-model="fileList" :after-read="afterRead" />
        </template>
      </van-field>
      <!-- 上传文件 -->
      <van-field name="uploadfiles" label="上传文件" v-show="key_value != ''">
        <template #input>
          <van-uploader max-size="10485760" accept="image/*,.pdf,.doc.,rar,.zip,.docx" v-model="otherFileList">
            <van-button icon="plus" type="primary">上传文件</van-button>
          </van-uploader>
        </template>
      </van-field>
      <!-- 提交按钮 -->
      <div v-if="key_value != ''" style="margin: 16px">
        <van-button round block type="primary" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>

    <!-- 选择人员 -->
    <van-popup v-model:show="state.showMember" position="bottom">
      <van-picker
        :columns="memberColumns"
        :columns-field-names="customMemFieldName"
        @confirm="onMemberConfirm"
        @cancel="state.showMember = false"
      />
    </van-popup>
    <!-- 选择部门 -->
    <van-popup v-model:show="state.showGroup" position="bottom">
      <van-picker
        :columns="groupColumns"
        :columns-field-names="customGroFieldName"
        @confirm="onGroupConfirm"
        @cancel="state.showGroup = false"
      />
    </van-popup>
    <!-- 选择公司 -->
    <van-popup v-model:show="state.showCompany" position="bottom">
      <van-picker
        :columns="companyColumns"
        :columns-field-names="customComFieldName"
        @confirm="onCompanyConfirm"
        @cancel="state.showCompany = false"
      />
    </van-popup>
    <!-- 选择申请类型 -->
    <van-popup v-model:show="state.showPicker1" position="bottom">
      <van-picker
        :columns="columns"
        :columns-field-names="customFieldName"
        @confirm="onConfirm"
        @cancel="state.showPicker1 = false"
      />
    </van-popup>

    <!-- //选择年月日的弹窗 -->
    <van-popup v-model:show="state.showPicker2" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        @confirm="onDataConfirm"
        @cancel="state.showPicker2 = false"
      />
    </van-popup>
    <!-- 选择年月日时间的弹窗 -->
    <van-popup v-model:show="state.showPicker3" position="bottom">
      <van-datetime-picker
        v-model="dateandtime"
        type="datetime"
        title="选择年月日时间"
        :min-date="minDate"
        @confirm="onDataTimeConfirm"
        @cancel="state.showPicker3 = false"
      />
    </van-popup>
    <!-- 选择单据类型的弹窗 -->
    <van-popup v-model:show="state.danjuKind" position="bottom">
      <van-picker
        :columns="danjuKindColumns"
        :columns-field-names="customdanjuKindName"
        @confirm="ondanjuConfirm"
        @cancel="state.danjuKind = false"
      />
    </van-popup>
    <!-- 选择单据号的弹窗 -->
    <van-popup v-model:show="state.danjuNum" position="bottom">
      <van-picker
        :columns="danjuNumColumns"
        :columns-field-names="customdanjuNumName"
        @confirm="ondanjuNumConfirm"
        @cancel="state.danjuNum = false"
      />
    </van-popup>
    <!-- dialog -->
    <van-dialog
      v-model:show="state.showdialog"
      title="提示"
      show-cancel-button
      style="text-align: center"
      confirm-button-text="前往首页"
      cancel-button-text="去通知"
      @cancel="goDing"
      @confirm="gohomepage"
    >
      <van-loading v-show="state.isloading" />
      <div v-show="!state.isloading">{{ passmsg }}</div>
    </van-dialog>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted, reactive, nextTick, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Notify, Dialog, Toast } from 'vant'
import { contactChoose, chooseUserFromPart, GoDing20 } from '@/util/dingtalk.js'
import {
  querryDanjuKind,
  querryDanjuNum,
  findUserBy,
  findDepartmentBy,
  findCompany,
  queryApprovalProcess,
  queryTemplateDetails,
  goTemplate,
  queryTemplateTable
} from '@/api/kaoqin.js'
import moment from 'moment'
import { getUser } from '@/api/home'
import config from '@/config/index.js'
// @ is an alias to /src

export default {
  name: 'goApproval',
  setup() {
    const store = useStore()
    const router = useRouter()
    // let isread = ref(false)
    let minDate = ref(new Date())
    // let maxDate = ref('')
    let currentDate = ref()
    let dateandtime = ref()
    watch(currentDate, (a, b) => {
      console.log('侦听探针' + a + '旧的' + b)
    })
    let selectedindex = ref()
    let key_value = ref([])
    let columns = ref([])
    let danjuKindColumns = ref([])
    let danjuNumColumns = ref([])
    let companyColumns = ref([])
    let groupColumns = ref([])
    let memberColumns = ref([])
    let temTable = ref([])
    let linkList = ref([])
    const picker = ref(null)
    let CompanyPicker = reactive({})
    const groupPicker = reactive({})
    const memberPicker = reactive({})
    let passmsg = ref('')
    const customdanjuKindName = { text: 'name' }
    const customdanjuNumName = { text: 'listNo' }
    const customFieldName = {
      text: 'name'
    }
    const customComFieldName = {
      text: 'companyName'
    }
    const customGroFieldName = {
      text: 'name'
    }
    const customMemFieldName = {
      text: 'userName'
    }
    const kindPicker = reactive({
      name: '',
      pickerid: 0,
      id: 0,
      activitiKey: '',
      danjuKind: '',
      danjuNum: '',
      danjuKey: ''
    })
    const state = reactive({
      showReimbursement: '0',
      showCompany: false,
      showGroup: false,
      showMember: false,
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      isloading: false,
      showdialog: false,
      danjuKind: false,
      danjuNum: false
    })
    const fileList = ref([])
    const otherFileList = ref([])
    const afterRead = file => {
      file.status = 'uploading'
      file.message = '上传中...'
      setTimeout(() => {
        file.status = 'success'
        file.message = '上传成功'
      }, 500)
    }
    const chooseinputType = (item, index) => {
      switch (item.type) {
        case '字符串':
          console.log('1')
          break
        case '长文本':
          console.log('2')
          break
        case '整数':
          console.log('3')
          break
        case '日期':
          console.log('4')
          dateclick(item, index)
          break
        case '时间':
          console.log('5')
          break
        case '日期+时间':
          console.log('6')
          datetimeclick(item, index)
          break
      }
    }
    //查询关联单据
    const getDanjuKind = () => {
      querryDanjuKind()
        .then(res => {
          if (res.code != 200) {
            Notify({ type: 'waring', message: res.msg })
          } else {
            console.log(res)
            danjuKindColumns.value = res.result
          }
        })
        .catch(err => {
          console.log(err)
          Notify({ type: 'warning', message: '获取单据种类列表失败' })
        })
    }
    const getDanjuNum = () => {
      let fashe = {
        userId: store.state.qhid,
        key: kindPicker.danjuKey
      }
      querryDanjuNum(fashe)
        .then(res => {
          if (res.code != 200) {
            Notify({ type: 'waring', message: res.msg })
          } else {
            console.log(res)
            danjuNumColumns.value = res.result
          }
        })
        .catch(err => {
          console.log(err)
          Notify({ type: 'warning', message: '获取单据号列表失败' })
        })
    }
    //查询公司
    const getCompany = () => {
      findCompany()
        .then(res => {
          if (res.code != 200) {
            Notify({ type: 'waring', message: res.msg })
          } else {
            console.log(res)
            companyColumns.value = res.result
          }
        })
        .catch(err => {
          console.log(err)
          Notify({ type: 'warning', message: '获取公司列表失败' })
        })
    }
    //通过选择的公司ID查询部门
    const getGroup = id => {
      findDepartmentBy({ companyId: id })
        .then(res => {
          if (res.code != 200) {
            Notify({ type: 'waring', message: res.msg })
          } else {
            console.log(res)
            groupColumns.value = res.result
          }
        })
        .catch(err => {
          console.log(err)
          Notify({ type: 'warning', message: '获取公司列表失败' })
        })
    }
    const getUser = id => {
      findUserBy({ departmentId: id })
        .then(res => {
          if (res.code != 200) {
            Notify({ type: 'waring', message: res.msg })
          } else {
            memberColumns.value = res.result
            console.log(res)
          }
        })
        .catch(err => {
          console.log(err)
          Notify({ type: 'warning', message: '获取人员列表失败' })
        })
    }
    //点击确认跳转主页
    const gohomepage = () => {
      state.showdialog = false
      router.replace({
        path: '/'
      })
    }
    //点击时间表单框体触发
    const dateclick = (item, index) => {
      console.log(key_value.value[index])
      selectedindex.value = index
      state.showPicker2 = true
    }
    //时间+日期触发
    const datetimeclick = (item, index) => {
      console.log(key_value.value[index])
      selectedindex.value = index
      state.showPicker3 = true
    }
    //日期触发

    // 整数触发
    //选择申请类型弹窗确认
    const onConfirm = value => {
      console.log(value)
      kindPicker.name = value.name
      kindPicker.activitiKey = value.activitiKey
      kindPicker.pickerid = value.formTemplateId
      kindPicker.id = value.id
      console.log('----------------' + JSON.stringify(kindPicker))
      state.showPicker1 = false
      if (kindPicker.pickerid !== 0) {
        getTemplateDetails()
      }
    }
    //确认选择单据种类之后
    const ondanjuConfirm = value => {
      console.log(value)
      kindPicker.danjuKind = value.name
      kindPicker.danjuKey = value.activitiKey
      console.log('----------------' + JSON.stringify(kindPicker))
      state.danjuKind = false
      if (kindPicker.danjuKey != '') {
        getDanjuNum()
      }
    }
    //
    const relationListNo = ref('')
    const ondanjuNumConfirm = value => {
      console.log(value)
      kindPicker.danjuNum = value.listNo
      relationListNo = value.listNo
      state.danjuNum = false
    }

    // 点击时间弹窗确认触发
    const onDataConfirm = value => {
      let re = moment(value).format('YYYY-MM-DD')

      key_value.value[selectedindex.value].value = re
      state.showPicker2 = false
    }
    const onDataTimeConfirm = value => {
      let re = moment(value).format('YYYY-MM-DD HH:mm:ss')

      key_value.value[selectedindex.value].value = re
      state.showPicker3 = false
    }
    // 提交触发,f发起审批
    const onSubmit = values => {
      console.log(JSON.stringify(key_value.value))
      let formData = new FormData()
      for (let i = 0; i < fileList.value.length; i++) {
        formData.append('imgFile', fileList.value[i].file)
      }
      for (let i = 0; i < otherFileList.value.length; i++) {
        formData.append('file', otherFileList.value[i].file)
      }
      formData.append('userId', store.state.qhid)
      formData.append('userName', store.state.qhusername)
      formData.append('name', kindPicker.name)
      formData.append('key', kindPicker.activitiKey)
      formData.append('formTemplateId', kindPicker.pickerid)
      formData.append('detailed', JSON.stringify(key_value.value))
      //报销表单
      formData.append('table', JSON.stringify([{}]))
      formData.append('applyCompanyName', CompanyPicker.companyName)
      formData.append('applyDepartmentName', groupPicker.name)
      formData.append('applyUserName', memberPicker.userName)
      if (relationListNo.value) {
        formData.append('relationListNo', relationListNo.value)
      }

      console.log(formData)
      state.showdialog = true
      goTemplate(formData)
        .then(res => {
          console.log(res)
          console.log(res.code)
          if (res.code != 200) {
            Notify({ type: 'waring', message: '提交错误' })
            passmsg.value = '提交错误'
            return
          } else {
            passmsg.value = '提交成功'
            state.isloading = false
            Notify({ type: 'primary', message: res.msg })
            console.log('@@@@@@@@@@@@@@@@' + res)
          }
        })
        .catch(err => {
          state.isloading = false
          Notify({ type: 'warning', message: '提交错误,请检查网络' })
          console.log(err)
        })
    }
    // 获取申请的类型
    const queryAProcess = () => {
      queryApprovalProcess()
        .then(res => {
          if (res.code != 200) {
            Notify({ type: 'waring', message: res.msg })
          } else {
            columns.value = res.result
          }
        })
        .catch(err => {
          Notify({ type: 'warning', message: '获取申请类型错误' })
          console.log(err)
        })
    }
    //获取是否存在报销单据
    const gettemplateTable = () => {
      let fashe = {
        id: kindPicker.id
      }
      queryTemplateTable(fashe)
        .then(res => {
          if (res.code != 200) {
            Notify({ type: 'waring', message: res.msg })
          } else {
            console.log('查询到的报销单据' + JSON.stringify(res))
            temTable.value = res.result
          }
        })
        .catch(err => {
          console.log(err)
          Notify({ type: 'warning', message: '查询单据表单错误' })
        })
    }
    // 获取申请类型的模板
    const getTemplateDetails = () => {
      let param = {
        id: kindPicker.pickerid
      }
      queryTemplateDetails(param)
        .then(res => {
          if (res.code != 200) {
            Notify({ type: 'waring', message: res.msg })
          } else {
            key_value.value = res.result
            gettemplateTable()
          }
        })

        .catch(err => {
          Notify({ type: 'warning', message: '获取申请模板错误' })
          console.log(err)
        })
    }
    const onCompanyConfirm = value => {
      console.log(value)
      CompanyPicker.companyName = value.companyName
      CompanyPicker.companyAddress = value.companyAddress
      CompanyPicker.id = value.id
      CompanyPicker.companyCode = value.companyCode
      console.log('======' + CompanyPicker)
      console.log('======' + JSON.stringify(CompanyPicker))
      state.showCompany = false
      getGroup(value.id)
    }
    const onGroupConfirm = value => {
      console.log(value)
      groupPicker.name = value.name
      groupPicker.id = value.id
      if (value.number) {
        groupPicker.number = value.number
      }
      state.showGroup = false
      getUser(value.id)
    }
    const onMemberConfirm = value => {
      memberPicker.userName = value.userName
      memberPicker.id = value.id
      state.showMember = false
    }
    onBeforeMount(() => {
      queryAProcess()
      getCompany()
      getDanjuKind()
    })
    // 摇人功能
    const dingChoose = async () => {
      //上线修改
      let rew = await chooseUserFromPart(config.maeiURL)
        .then(res => {
          console.log(res)
          //获取选中人的数组
        })
        .catch(err => {
          console.log(err)
        })
    }
    // 通知功能
    const goDing = async () => {
      console.log(config.maeiURL)
      // 判断是钉钉环境的话
      if ((store.state.isInDing = false)) {
        let rew = await GoDing20(config.maeiURL)
          .then(res => {
            console.log(res)
            Toast.success('通知成功，请等待审批')
            router.replace({
              path: '/home'
            })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        Toast('当前不是钉钉环境，无法发送钉钉通知')
      }
    }
    onMounted(() => {})
    return {
      goDing,
      dingChoose,
      passmsg,
      otherFileList,
      fileList,
      afterRead,
      temTable,
      gohomepage,
      CompanyPicker,
      groupPicker,
      memberPicker,
      onMemberConfirm,
      onGroupConfirm,
      onCompanyConfirm,
      customComFieldName,
      customGroFieldName,
      customMemFieldName,
      currentDate,
      kindPicker,
      onSubmit,
      state,
      columns,
      onConfirm,
      key_value,
      customFieldName,
      getTemplateDetails,
      onDataConfirm,
      minDate,
      dateclick,
      chooseinputType,
      onDataTimeConfirm,
      dateandtime,
      companyColumns,
      groupColumns,
      memberColumns,
      danjuKindColumns,
      danjuNumColumns,
      customdanjuKindName,
      customdanjuNumName,
      ondanjuConfirm,
      ondanjuNumConfirm
    }
  }
}
</script>
<style scoped></style>
