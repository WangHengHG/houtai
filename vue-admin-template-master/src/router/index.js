import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout引入最外层骨架的一级路由组件 */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 路由的配置, 为什么不同的用户登录我们的项目, 菜单(路由) 都是一样的
//因为路由都是固定的, 能看见的操作的菜单都是一样的
//需要把项目中的路由进行拆分

//常量路由: 不管用户是什么角色, 都可以看见
//什么角色(超级管理员, 普通员工): 登录, 首页, 404
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },


]

//异步路由: 不同的用户(角色), 需要过滤筛选出的路由, 称之为异步路由
export const asyncRoutes = [
  {
    path: '/product',
    component: Layout,
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'el-icon-goods'
    },
    children: [
      {
        path: 'tradmark',
        name: 'Tradmark',
        component: ()=> import('@/views/product/tradeMark'),
        meta: {title: '品牌管理'}
      },
      {
        path: 'attr',
        name: 'Attr',
        component: ()=> import('@/views/product/Attr'),
        meta: {title: '平台属性管理'}
      },
      {
        path: 'spu',
        name: 'Spu',
        component: ()=> import('@/views/product/Spu'),
        meta: {title: 'Spu管理'}
      },
      {
        path: 'sku',
        name: 'Sku',
        component: ()=> import('@/views/product/Sku'),
        meta: {title: 'Sku管理'}
      },
    ]
  },
  //权限管理相关路由
  {
    path: '/acl',
    name: 'Acl',
    component: Layout,
    meta: {
      title: '权限管理',
      icon: 'el-icon-suitcase'
    },
    children: [
      {
        path:'user/list',
        name: 'User',
        component: ()=> import('@/views/acl/user/list'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path:'role/list',
        name: 'Role',
        component: ()=> import('@/views/acl/role/list'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'role/auth/:id',
        name: 'RoleAuth',
        component: ()=> import('@/views/acl/role/roleAuth'),
        meta: {
          title: '角色授权',
          activeMenu: '/acl/role/list'
        },
        hidden: true
      },
      {
        path: 'permission',
        name: 'Permission',
        component: ()=> import('@/views/acl/permission/list'),
        meta: {
          title:'菜单管理',
        }
      }
    ]
  },
  //测试管理路由
  {
    path: '/test',
    component: Layout,
    name: 'Test',
    meta: {
      title: '测试管理',
      icon: 'el-icon-goods'
    },
    children: [
      {
        path: 'test1',
        name: 'Test1',
        component: ()=> import('@/views/test/test1'),
        meta: {title: '测试管理1'}
      },
      {
        path: 'attr',
        name: 'Attr',
        component: ()=> import('@/views/test/test2'),
        meta: {title: '测试管理2'}
      },

    ]
  },
]
//任意路由: 路径发生错误的时候重定向404
export const anyRoutes = { path: '*', redirect: '/404', hidden: true }

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  //如果路由根据不同的用户可以展示不同的菜单
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
