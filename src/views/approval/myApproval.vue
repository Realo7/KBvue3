<template>
  <div class="content">
    <van-empty v-if="!result.list"
               description="当前没有审批" />
    <van-tabs v-if="result.list"
              v-model:active="active"
              @change="detail()">
      <!-- 标签数量超过 5 个时，标签栏可以在水平方向上滚动，切换时会自动将当前标签居中。 -->
      <van-tab v-for="item in result.list"
               :key="item.id"
               :name="item.listNo"
               :title="item.userName+'的'+item.type">
        <div style="min-height:15.5rem">

          {{item.name}}
          <van-cell-group>
            <van-cell title="申请时间"
                      :value="item.dt" />
            <van-cell title="编号"
                      :value="item.listNo" />
            <van-cell title="申请ID"
                      :value="item.id" />
            <van-cell title="申请状态"
                      :value="item.state" />
            <van-cell title="申请类型"
                      :value="item.type" />
            <van-cell title="申请用户"
                      :value="item.userName" />
            <van-cell title="申请用户ID"
                      :value="item.userId" />
          </van-cell-group>
          <van-cell title="图片">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <van-grid :border="false"
                        :column-num="2">
                <van-grid-item v-for="item in imgList"
                               :key="item">
                  <van-image width="100"
                             height="100"
                             :src="item.relativePath" />
                </van-grid-item>
              </van-grid>

            </template>
          </van-cell>
          <van-cell title="附件">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #default>
              <div v-for="item in fileList"
                   :key="item">
                <a :href="item.relativePath">{{item.oldName}}-------</a>
              </div>
            </template>
            <template #right-icon>
              <div v-for="item in fileList"
                   :key="item">
                <div>大小:{{item.fileSize}}</div>
              </div>
            </template>
          </van-cell>
          <van-field v-model="message"
                     rows="2"
                     autosize
                     label="留言"
                     type="textarea"
                     maxlength="50"
                     placeholder="请输入留言"
                     show-word-limit />
          <div style="margin:1rem">
            <van-button round
                        block
                        type="primary"
                        @click="gopassApproval(item.id,'通过')">
              通过申请
            </van-button>
            <van-divider />
            <van-button round
                        block
                        type="primary"
                        @click="gopassApproval(item.id,'驳回')">
              拒绝申请
            </van-button>
          </div>

        </div>

      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

import { Notify, Dialog } from 'vant'
import { myApproval, passApproval, detailRecord } from '@/api/kaoqin.js'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    let obj = ref()
    const result = reactive({})
    let message = ref('')
    let detailResult = ref([])
    let imgList = ref([])
    let fileList = ref([])
    const qhid = computed(() => store.state.qhid)
    const qhusername = computed(() => store.state.qhusername)
    const active = ref('')
    // 获取待审批列表
    const getMyApproval = () => {
      let fashe = {
        userId: qhid.value,
        userName: qhusername.value,
        pageNum: 1,
        pageSize: 50
      }
      console.log(fashe)
      myApproval(fashe)
        .then(res => {
          console.log(res)
          //   获取了列表之后渲染到result.list.value里面
          if (res.code != 200) {
            Notify({ type: 'waring', message: res.msg })
          }
          if (res.result) {
            console.log('获取的列表' + res.result.list)
            result.list = res.result.list
            console.log('--------' + result.list[0].listNo)
            detail(result.list[0].listNo)
          }
        })
        .catch(err => {
          Notify({ type: 'warning', message: '获取待审批列表错误' })
          console.log(err)
        })
    }
    //通过/驳回申请
    const gopassApproval = (id, string) => {
      // 提示确认
      let fashe = {
        userId: qhid.value,
        userName: qhusername.value,
        id: id,
        radio: string,
        dis: message.value
      }
      passApproval(fashe)
        .then(res => {
          if (res.code != 200) {
            Notify({ type: 'waring', message: res.msg })
          }
          console.log(res)
          Dialog.alert({
            title: '成功',
            message: res.msg,
            confirmButtonText: '回到首页'
          }).then(() => {
            router.replace({
              path: '/'
            })
          })
        })
        .catch(err => {
          Notify({ type: 'warning', message: '通过/驳回申请错误,请尝试返回首页重新审批' })
          console.log(err)
        })
    }
    //申请详情
    const detail = listNo => {
      imgList.value = []
      fileList.value = []
      let fashe = { listNo: active.value }
      detailRecord(fashe)
        .then(res => {
          console.log('=======' + JSON.stringify(res))
          detailResult.value = res.result
          console.log(detailResult.value)
          for (let item of detailResult.value) {
            console.log(item)
            switch (item.type) {
              case '图片':
                let imgsrr = JSON.parse(item.value)
                console.log(imgsrr)
                for (let i = 0; i < imgsrr.length; i++) {
                  imgsrr[i].relativePath =
                    'http://192.168.8.117:8080/MES_System/api/oa/myApplicationInquiry/imgs/' + imgsrr[i].relativePath
                  imgList.value.push(imgsrr[i])
                }
                break
              case '附件':
                let filesrr = JSON.parse(item.value)
                console.log(filesrr)
                for (let i = 0; i < filesrr.length; i++) {
                  filesrr[i].relativePath =
                    'http://192.168.8.117:8080/MES_System/api/oa/myApplicationInquiry/downloadFile/' +
                    filesrr[i].relativePath +
                    '/' +
                    filesrr[i].oldName

                  fileList.value.push(filesrr[i])
                }

                break
              case 'applyCompanyName':
                break
            }
            switch (item.key) {
              case 'applyUserName':
                item.key = '用户名'
                break
              case 'applyDepartmentName':
                item.key = '部门'
                break
              case 'applyCompanyName':
                item.key = '公司'
                break
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    onMounted(() => {
      getMyApproval()
    })
    return { active, result, gopassApproval, message, detail, imgList, fileList }
  }
}
</script>
<style >
.content {
  padding-bottom: 1rem;
}
</style>