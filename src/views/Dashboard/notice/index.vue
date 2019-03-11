<template>
  <div class="ds-notice">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>平台公告</span>
      </div>
      <ul>
        <li v-for="item in list" :key="item.noticeId" class="item">
          <a href="javascript:;" @click="viewPage(item.title,item.noticeUrl)" target="_blank">
            {{item.title}}
            <span>
              {{item.createTime|getDate}}
            </span>
          </a>
        </li>
      </ul>
    </el-card>
    <IframeDialog :dialogState="dialogState"></IframeDialog>
  </div>
</template>
<style lang="scss">

</style>
<script>
import IframeDialog from '@/components/IframeDialog'
import {getNoticeList} from '@/api/notice'
export default {
  props: {

  },
  components: {
    IframeDialog
  },
  data() {
    return {
      list: [],
      status: '',
      dialogState: {
        show: false,
        title: '',
        url: ''
      }
    }
  },
  created () {
    this.getNoticeList()
  },
  methods: {
    getNoticeList () {
      getNoticeList().then(res => {

        if (res.code === 0) {
          this.list = res.data.noticeList
        }
      }, e => {

      })
    },
    viewPage (title, url) {
      this.dialogState = {
        show: true,
        title: title,
        url: url
      }
    }
  }
}
</script>
