import Main from '@/views/Main'
const Dashboard = () => import('@/views/Dashboard')
// 侧边栏路由一般都放在这里 需要权限校验 1买家 2卖家 3都是
export const baseRoute = [
  {
    path: '',
    component: Main,
    title: 'dashboard',
    icon: 'dashboard',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard_index',
        meta: {
          title: '首页'
        },
        component: Dashboard
      }
    ]
  }
]
