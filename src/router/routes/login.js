export default {
  path: '/login',
  name: 'login',
  title: '登录',
  meta: {
    title: '运营平台-系统登录',
    isLocal: true // 是否被注入tagview组件 true 不注入tagview组件
  },
  component: () => import('@/views/login/login.vue')
}
