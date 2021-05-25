<template>
  <div class="content">
    <div v-for="item in detail"
         :key="item.id">
      <van-field input-align="right"
                 v-if="item.key!=='图片'&&item.key!=='附件'"
                 v-model="item.value"
                 clickable
                 readonly
                 :name="item.key"
                 :label="item.key" />
    </div>
    <van-cell center
              title="图片">
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
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { detailquerry, detailRecordTable, detailRecord } from '@/api/kaoqin.js'
import { Notify, Dialog } from 'vant'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    let detail = ref([])
    let listNo = ref()
    const querrydetail = listno => {
      console.log(listno)
      let fashe = { listNo: listno }
      detailquerry(fashe)
        .then(res => {
          if (res.code != 200) {
            // 提示
            Notify({ type: 'waring', message: res.msg })
          } else {
            console.log('拿到这个结果好像没有用的样子')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    const recordDetail = listno => {
      let fashe = { listNo: listno }
      detailRecord(fashe)
        .then(res => {
          if (res.code != 200) {
            // 提示
            Notify({ type: 'waring', message: res.msg })
          } else {
            console.log(res)
            detail.value = res.result
            for (let item of detail.value) {
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
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    const recordTable = listno => {
      let fashe = { listNo: listno }
      detailRecordTable(fashe)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    const imgList = ref([])
    const fileList = ref([])
    onBeforeMount(() => {
      listNo.value = route.query.listNo
      console.log(listNo.value)
      recordDetail(listNo.value)
      querrydetail(listNo.value)
      recordTable(listNo.value)
    })
    onMounted(() => {
      //  = router.currentRoute._value.params.listNo
    })

    return {
      detail,
      imgList,
      fileList
    }
  }
}
</script>

<style lang='scss' scoped>
.content {
  box-sizing: border-box;
  width: 100%;
  min-height: 90vh;
  padding: 46px 20px 20px;
  background: #fff;
}
</style>