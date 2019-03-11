import Cookies from 'js-cookie'
export const state = {
  pageOpenedList: [
    {
      meta: {title: '首页'},
      name: 'dashboard_index',
      path: '/dashboard',
      arg: {},
      query: {}
    }
  ],
  sidebarStatus: 0, // 展开
  headVisetedShow: true, // 顶部访问历史tab 是否显示
  currentPageName: '', // 当前路由name
  language: Cookies.get('language') || 'zh',
  currentUserInfo: null, // 当前用户信息
  errorLog: []
}
