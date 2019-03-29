import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/base1',
    component: Layout,
    name: 'base1',
    meta: { title: 'Vue基础', icon: 'example' },
    children: [
      {
        path: 'b1',
        name: 'b1',
        component: () => import('@/views/demo/demo1'),
        meta: { title: 'Base', icon: 'form' }
      },
      {
        path: 'b2',
        name: 'b2',
        component: () => import('@/views/demo/demo2'),
        meta: { title: 'Data', icon: 'form' }
      },
      {
        path: 'b3',
        name: 'b3',
        component: () => import('@/views/demo/demo3'),
        meta: { title: 'Method', icon: 'form' }
      },
      {
        path: 'b4',
        name: 'b4',
        component: () => import('@/views/demo/demo4'),
        meta: { title: 'Components Base', icon: 'form' }
      },
      {
        path: 'b5',
        name: 'b5',
        component: () => import('@/views/demo/demo5'),
        meta: { title: '生命周期', icon: 'form' }
      }
    ]
  },

  {
    path: '/high',
    component: Layout,
    name: 'high',
    meta: { title: 'Vue进阶', icon: 'example' },
    children: [
      {
        path: 'h1',
        name: 'h1',
        component: () => import('@/views/high/high1'),
        meta: { title: 'Filters', icon: 'form' }
      },
      {
        path: 'h2',
        name: 'h2',
        component: () => import('@/views/high/high2'),
        meta: { title: 'Watch', icon: 'form' }
      },
      {
        path: 'h3',
        name: 'h3',
        component: () => import('@/views/high/high3'),
        meta: { title: 'Slot', icon: 'form' }
      },
      {
        path: 'h4',
        name: 'h4',
        component: () => import('@/views/high/high4'),
        meta: { title: 'Components 2', icon: 'form' }
      },
      {
        path: 'h5',
        name: 'h5',
        component: () => import('@/views/high/high5'),
        meta: { title: 'homework', icon: 'form' }
      }
    ]
  },

  {
    path: '/other',
    component: Layout,
    name: 'other',
    meta: { title: 'Vue配套', icon: 'example' },
    children: [
      {
        path: 'o1',
        name: 'o1',
        component: () => import('@/views/other/other1'),
        meta: { title: 'Router', icon: 'form' }
      },
      {
        path: 'o11',
        name: 'o11',
        hidden: true,
        component: () => import('@/views/other/other11'),
        meta: { title: 'Router2', icon: 'form' }
      },
      {
        path: 'o2',
        name: 'o2',
        component: () => import('@/views/other/other2'),
        meta: { title: 'Vuex', icon: 'form' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Element-UI', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/elementui/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/elementui/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      },
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/elementui/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/hw',
    component: Layout,
    name: 'Hw',
    meta: { title: 'Homework', icon: 'example' },
    children: [
      {
        path: 'hw',
        name: 'hw',
        component: () => import('@/views/dashboard/hw'),
        meta: { title: 'Homework', icon: 'table' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
