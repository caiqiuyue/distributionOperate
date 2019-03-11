<template>
  <div class="app-main"
    :class="{hideSidebar: isCollapse}"
    style="height: calc(100%);">
    <keep-alive include="channel,orderQuick">
      <router-view />
    </keep-alive>
    <!--<GoodsRegist :dialogState="registState"></GoodsRegist>-->
  </div>
</template>

<script>
// import GoodsRegist from '../Retailer/goodsRegist'
export default {
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    },
    isCollapse () {
      return this.$store.state.sidebarStatus
    },
    cachePage () {
      return this.$store.state.pageOpenedList.map(item => item.name)
    },
    registState () {
      return this.$store.getters.goodsRegDialogState
    }
  },
  components: {
    // GoodsRegist
  }
}
</script>

<style lang="scss">
@import '../../styles/layout/appmain.scss';
</style>
