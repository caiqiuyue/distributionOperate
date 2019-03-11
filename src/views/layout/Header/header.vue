<template>
  <div class="header-wrap">
    <el-row :gutter="20">
      <el-col :span="2">
        <svg-icon
          class="header-icon"
          :size="18"
          name="switch"
          :class="{collapse: collapse}"
          @click.native="changeTab">
        </svg-icon>
      </el-col>
    </el-row>
    <el-dropdown trigger="click" size="small" class="user-info" @command="handleCommand">
          <span class="el-dropdown-link">
            <!--<svg-icon name="boy" :size="14" class="avatar"></svg-icon>-->
             <img class="user-portrait" :src="imageUrl" alt="">
            {{userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="dashboard">回到首页</el-dropdown-item>
        <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import _ from 'lodash'
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      userName: Cookie.getJSON('user').loginId,
      entry: {
        goodsNo: '',
        brandName: '',
        season: '',
        color: '',
        sex: -1,
        modelName: '',
        minPrice: '',
        maxPrice: ''
      },
      dialogState: {
        show: false
      },
      registState: {
        show: false
      }
    }
  },
  computed: {
    collapse () {
      return this.$store.state.sidebarStatus
    },
    cartInfo() {
      return this.$store.getters['shopping/cartInfo']
    },
    imageUrl() {
      return this.$store.getters['message/imageUrl']
    },
    userRole() {
      return this.$store.state.user.role
    }
  },
  components: {
  },
  mounted () {

  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    getSearchShop () {
      let data = Object.assign({}, this.entry)
      if (data.sex === -1) {
        delete data.sex
      }
      this.$store.commit('shopping/SET_ENTRY', data)
      this.$bus.$emit('refreshGoods')
      this.$router.push({
        name:'order_quick'
      })
    },
    searchDetail () {
      this.dialogState.show = true
    },
    goodsRegist () {
      this.$store.commit('GOODS_REGIST', {
        show: true
      })
    },
    submit () {
      this.dialogState.show = false
      this.getSearchShop()
    },
    reset () {
      this.entry = {
        goodsNo: '',
        brandName: '',
        season: '',
        color: '',
        sex: -1,
        marketTime: '',
        minPrice: '',
        maxPrice: ''
      }
    },
    cancel () {
      this.dialogState.show = false
    },
    showCart() {
      this.$router.push({
        name:'cart'
      })
    },
    changeTab () {
      this.$store.commit('setSidebar')
    },
    handleCommand (item) {
      switch (item) {
        case 'loginout':
          Cookie.remove('user')
          Cookie.remove('role')
          this.$store.commit('clearAllTags')
          this.$store.commit('user/RESET_ROLE') // 清除角色
          this.$store.commit('permiss/RM_ROUTES') // 清空routes for sidebar
          localStorage.removeItem('pageOpenedList')
          setTimeout(() => {
            // 为了修复直接通过vue-router 无刷新退出 导致 Duplicate named routes definition bug
            // 刷新是为了清空 路由源保留的路由状态
            location.reload()
          }, 0)
          break
        case 'dashboard':
          this.$router.push({
            name: 'dashboard_index'
          })
          break
        default:
      }
    },
  },

}
</script>

<style lang="scss">
@import './header.scss';
@import '../../../styles/mixin.scss';
</style>
