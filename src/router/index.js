import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
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
export const constantRoutes = [{
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
      meta: {
        title: '仪表盘',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/list',
    meta: {
      title: "分类管理",
      icon: 'form'
    },
    children: [{
        path: 'list',
        name: 'categoryList',
        component: () => import('@/views/category/List'),
        meta: {
          title: '分类列表',
          icon: 'form'
        }
      }, {
        path: 'edit',
        name: 'categoryCreate',
        component: () => import('@/views/category/CategoryEdit'),
        meta: {
          title: '创建分类',
          icon: 'form'
        }
      },
      {
        path: 'edit/:id',
        name: 'categoryEdit',
        component: () => import('@/views/category/CategoryEdit'),
        props: true,
      }
    ]
  },
  {
    path: '/item',
    component: Layout,
    redirect: '/item/list',
    meta: {
      title: "物品管理",
      icon: 'form'
    },
    children: [{
        path: 'list',
        name: 'itemList',
        component: () => import('@/views/item/List'),
        meta: {
          title: '物品列表',
          icon: 'form'
        }
      }, {
        path: 'edit',
        name: 'itemCreate',
        component: () => import('@/views/item/ItemEdit'),
        meta: {
          title: '创建物品',
          icon: 'form'
        }
      },
      {
        path: 'edit/:id',
        name: 'itemEdit',
        component: () => import('@/views/item/ItemEdit'),
        props: true,
      }
    ]
  },
  {
    path: '/hero',
    component: Layout,
    redirect: '/hero/list',
    meta: {
      title: "英雄管理",
      icon: 'form'
    },
    children: [{
        path: 'list',
        name: 'heroList',
        component: () => import('@/views/hero/List'),
        meta: {
          title: '英雄列表',
          icon: 'form'
        }
      }, {
        path: 'edit',
        name: 'heroCreate',
        component: () => import('@/views/hero/HeroEdit'),
        meta: {
          title: '创建英雄',
          icon: 'form'
        }
      },
      {
        path: 'edit/:id',
        name: 'heroEdit',
        component: () => import('@/views/hero/HeroEdit'),
        props: true,
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
