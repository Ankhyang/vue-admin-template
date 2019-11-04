import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/userManage',
  name: 'system',
  alwaysShow: true,
  meta: { title: '系统管理', icon: 'system' },
  children: [
    {
      path: 'userManage',
      name: 'userManage',
      component: () => import('@/views/system/userManage/index'),
      meta: { title: '用户管理', icon: 'user' }
    },
    {
      path: 'department',
      name: 'department',
      component: () => import('@/views/system/department/index'),
      meta: { title: '部门管理', icon: 'department' }
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/system/role/index'),
      meta: { title: '角色管理', icon: 'role' }
    }
  ]
}

export default systemRouter

