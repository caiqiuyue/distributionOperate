<template lang="html">
  <div class="tag-wrap" ref="tagWrap" v-if="headVisetedShow && tagList.length > 0">
    <div class="tag-overflow" ref="tagOver">
      <el-tag
        v-for="items in tagList"
        :key="items.name"
        @click.native="tagClick(items)"
        :closable="true"
        :class="{'current': items.name === currentPageName}"
        @close.prevent="close(items.name)"
        :type="items.type" class="tag"
        @contextmenu.prevent.native="openMenu(items,$event)"
      >
        {{items.meta.title}}
      </el-tag>
    </div>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags(selectedTag)">关闭其他</li>
      <li @click="closeAllTags">关闭全部</li>
    </ul>
  </div>
</template>

<script>
import { baseRoute } from '@/router/sidebar'
import { generateTitle } from '@/utils/i18n'
import { filterName } from '@/utils/tools'
import EventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      currentPageName: this.$route.name,
      generateTitleTrans: generateTitle,
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  methods: {
    tagClick (item) {
      const name = item.name
      const arg = item.arg
      const query = item.query
      // tagvisited 触发左侧边栏展开
      const flag = filterName(baseRoute, name)
      if (flag) {
        EventBus.$emit('openSidebar', flag)
      }
      if (arg) { // 带有params参数
        this.$router.push({
          name: name,
          params: arg
        })
        return
      }
      if (query) { // 带有query参数
        this.$router.push({
          name: name,
          query: query
        })
        return
      }
      if (query && arg) { // 同时带有params&query参数
        this.$router.push({
          name: name,
          params: arg,
          query: query
        })
        return
      }
      this.$router.push({ // 无参数
        name: name
      })
    },
    close (name) {
      const obj = {
        vm: this,
        name: name
      }
      this.$store.commit('closeTagFromOpendList', obj)
    },
    generateRoute() {
      if (this.$route.name) {
        return this.$route;
      }
      return false;
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
    addViewTags() {
      const route = this.generateRoute();
      if (!route) {
        return false;
      }
      this.$store.dispatch("addView", route);
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el);
            break;
          }
        }
      });
    },
    refreshSelectedTag(view) {
      const { path } = view;
      this.$router.replace({
        path: "/redirect" + path
      });
    },
    closeSelectedTag(view) {
      this.close(view.name)
    },
    closeOthersTags(view) {
      this.$store.commit('closeOthersFromOpendList', view.name)
    },
    closeAllTags() {
      const obj = {
        vm: this,
      }
      this.$store.commit('closeAllFromOpendList', obj)
    },
    openMenu(tag, e) {
      console.log(tag)
      this.visible = true;
      this.selectedTag = tag;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      this.left = e.clientX - offsetLeft + 15; // 15: margin right
      this.top = e.clientY;
    },
    closeMenu() {
      this.visible = false;
    }
  },
  watch: {
    '$route' (to) {
      this.currentPageName = to.name
    },
    '$store.state.sidebarStatus': { // 监听侧边栏变化
      handler (status) {
        // 预留位置
      },
      deep: true
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  },
  mounted () {
    setTimeout(() => {
      const rect = this.$refs.tagOver.getBoundingClientRect()
      this.$refs.tagOver.style.width = rect.width + 'px'
    }, 0)
  },
  computed: {
    tagList () {
      return this.$store.state.pageOpenedList
    },
    headVisetedShow () {
      return this.$store.state.headVisetedShow
    }
  }
}
</script>

<style lang="scss">
@import '../../../styles/mixin.scss';
@import './tagview.scss';
</style>
