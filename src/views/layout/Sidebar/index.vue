<template>
  <div class="sidebar-wrap" :class="{hideSidebar: isCollapse}">
    <div class="sidebar-logo">
      <img src="../../../assets/img/logo.png" alt="">
    </div>
    <el-menu
      ref="sidebar"
      default-active="order_quick"
      @select="handleSelect"
      mode="vertical"
      :collapse-transition="false"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :collapse="isCollapse"
      select="onSelect"
    >
      <template v-for="item in routers">
        <template v-if="item.children && item.children.length > 1">
          <el-submenu :index="item.name" :key="item.name" >
            <template slot="title">
              <svg-icon :name="item.icon" :size="16"></svg-icon>
             <span>{{ item.title }}</span>
            </template>
            <router-link :to="item.path+'/'+items.path" :key="items.path" class="route-link"
                         v-for="items in item.children">
              <el-menu-item :index="items.name||items.path" v-if="!items.meta.hidden">
                <span>{{ items.meta.title }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
        <template v-else-if="item.children && item.children.length === 1">
          <router-link :to="item.path+'/'+items.path" :key="items.path" class="route-link"
                       v-for="items in item.children">
            <el-menu-item :index="items.name||items.path">
              <svg-icon :name="item.icon" :size="16"></svg-icon>
              <span slot="title">{{items.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
        <template v-else>
          <router-link :to="item.path" :key="item.path" class="route-link">
            <el-menu-item :index="item.name||item.path">
                <svg-icon :name="item.icon" :size="16"></svg-icon>
                <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'
import { generateTitle } from '@/utils/i18n'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      generateTitleTrans: generateTitle
    }
  },
  computed: {
    ...mapGetters('permiss', [
      'routers'
    ]),
    getOpendPage () {
      return this.$store.state.pageOpenedList
    },
    isCollapse () {
      return !!this.$store.state.sidebarStatus
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push({
        name: key
      })
      setTimeout(() => {
        localStorage.setItem('pageOpenedList', JSON.stringify(this.$store.state.pageOpenedList))
      }, 200)
    }
  },
  mounted () {
  },
  created () {
    // tagvisited 触发左侧边栏展开
    EventBus.$on('openSidebar', (name) => {
      this.$nextTick(() => {
        setTimeout(() => {
          if (!this.isCollapse) { // 侧边栏展开时生效
            this.$refs.sidebar.open(name)
          }
        })
      })
    })
  }
}
</script>

<style lang="scss">
@import './sidebar.scss';
</style>
