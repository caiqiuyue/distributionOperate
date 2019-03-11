<template>
  <div class="ds-notice">
    <el-card class="box-card" v-loading="msg.loading">
      <div slot="header" class="clearfix">
        <span>系统消息</span>
        <div class="el-pagination" v-if="msg.pageInfo.totalPage!=0">
          <button
            type="button"
            :disabled="msg.pageInfo.current==1"
            @click="msgPrev"
            class="btn-prev"><i class="el-icon el-icon-arrow-left"></i></button>
          <span class="number">{{msg.pageInfo.current}}/{{msg.pageInfo.totalPage}}</span>
          <button
            type="button" class="btn-next"
            :disabled="msg.pageInfo.current==msg.pageInfo.totalPage"
            @click="msgNext"
          ><i class="el-icon el-icon-arrow-right"></i></button>
        </div>
      </div>
      <ul>
        <li v-for="item in msg.list" :key="item.noticeId" class="item">
          <a href="javascript:;" @click="deal(item.content)">
            {{item.content}}
            <span>
              {{item.createTime|getDate}}
            </span>
          </a>
        </li>
      </ul>
    </el-card>

  </div>
</template>
<style lang="scss">
</style>
<script>
import Cookie from 'js-cookie'
import {getMessageList} from '@/api/notice'
export default{
  props: {

  },
  components: {

  },
  data () {
    return{
      localRole : Cookie.get('role'),
      msg: {
        loading: false,
        list: [],
        pageInfo: {
          current: 1,
          pageSize: 10,
          totalPage: 0
        },
      },
      msgDisabled: false,

    }
  },
  mounted () {
    this.getMessageList()
  },
  methods: {
    getMessageList () {
      this.msg.loading = true
      getMessageList(this.msg.pageInfo).then(res => {
        this.msg.loading = false
        if (res.code === 0) {
          this.msg.list = res.data.messageList
          this.msg.pageInfo = res.data.pageInfo
        }
      }, e => {
        this.msg.loading = false
      })
    },
    msgPrev () {
      this.msg.pageInfo.current -= 1
      this.getMessageList()
    },
    msgNext () {
      this.msg.pageInfo.current += 1
      this.getMessageList()
    },
    deal (content) {
      if (/申诉/.test(content)) {
        this.$router.push({
          name: 'order_service' // 买家买家一样
        })
      } else if (/一笔订单|您的订单/.test(content)) {
        this.$router.push({
          name: this.localRole === '1' ? 'order_unfinished' : 'shop_unfinished'
        })
      } else if (/已确认收货/.test(content)) {
        this.$router.push({
          name: this.localRole === '1' ? 'order_finished' : 'shop_finished'
        })
      }
    },
  }
}
</script>
