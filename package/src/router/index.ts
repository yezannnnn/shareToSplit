import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { Layout, getParentLayout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard/analysis',
    name: 'Root',
    meta: {
      hidden: true
    }
  },
  {
    path: '/redirect',
    component: Layout,
    name: 'Redirect',
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/views/Redirect/Redirect.vue'),
        meta: {}
      }
    ],
    meta: {
      hidden: true,
      noTagsView: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'Login',
    meta: {
      hidden: true,
      title: t('router.login'),
      noTagsView: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404.vue'),
    name: 'NoFind',
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  }
]

export const asyncRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/Com',
    component: Layout,
    name: 'ComponentsDemo',
    meta: {
      title: t('router.component'),
      icon: 'bx:bxs-component',
      alwaysShow: true
    },
    children: [
      {
        path: 'form',
        component: getParentLayout(),
        redirect: '/Com/form/default-form',
        name: 'Form',
        meta: {
          title: t('router.form'),
          alwaysShow: true,
          // 重要moduleInComponent 相当于告诉 主框架要渲染组件名称
          moduleInComponent: 'comDefaultform'
        },
        children: [
          {
            path: 'default-form',
            component: () => import('@/views/Com/Form/DefaultForm.vue'),
            name: 'DefaultForm',
            meta: {
              title: t('router.defaultForm'),
              // 重要moduleInComponent 相当于告诉 主框架要渲染组件名称
              moduleInComponent: 'comDefaultform'
            }
          },
          {
            path: 'use-form',
            component: () => import('@/views/Com/Form/UseFormDemo.vue'),
            name: 'UseForm',
            meta: {
              title: 'UseForm',
              moduleInComponent: 'comUseformdemo'
            }
          },
          {
            path: 'ref-form',
            component: () => import('@/views/Com/Form/RefForm.vue'),
            name: 'RefForm',
            meta: {
              title: 'RefForm',
              moduleInComponent: 'comRefform'
            }
          }
        ]
      },
      {
        path: 'table',
        component: getParentLayout(),
        redirect: '/Com/table/default-table',
        name: 'TableDemo',
        meta: {
          title: t('router.table'),
          alwaysShow: true,
          moduleInComponent: 'comDefaulttable'
        },
        children: [
          {
            path: 'default-table',
            component: () => import('@/views/Com/Table/DefaultTable.vue'),
            name: 'DefaultTable',
            meta: {
              title: t('router.defaultTable'),
              moduleInComponent: 'comDefaulttable'
            }
          },
          {
            path: 'use-table',
            component: () => import('@/views/Com/Table/UseTableDemo.vue'),
            name: 'UseTable',
            meta: {
              title: 'UseTable',
              moduleInComponent: 'comUsetabledemo'
            }
          },
          {
            path: 'ref-table',
            component: () => import('@/views/Com/Table/RefTable.vue'),
            name: 'RefTable',
            meta: {
              title: 'RefTable',
              moduleInComponent: 'comReftable'
            }
          }
        ]
      },
      {
        path: 'editor-demo',
        component: getParentLayout(),
        redirect: '/Com/editor-demo/editor',
        name: 'EditorDemo',
        meta: {
          title: t('router.editor'),
          alwaysShow: true,
          moduleInComponent: 'comEditor'
        },
        children: [
          {
            path: 'editor',
            component: () => import('@/views/Com/Editor/Editor.vue'),
            name: 'Editor',
            meta: {
              title: t('router.richText'),
              moduleInComponent: 'comEditor'
            }
          }
        ]
      },
      {
        path: 'search',
        component: () => import('@/views/Com/Search.vue'),
        name: 'Search',
        meta: {
          title: t('router.search'),
          moduleInComponent: 'comSearch'
        }
      },
      {
        path: 'descriptions',
        component: () => import('@/views/Com/Descriptions.vue'),
        name: 'Descriptions',
        meta: {
          title: t('router.descriptions'),
          moduleInComponent: 'comDescriptions'
        }
      },
      {
        path: 'image-viewer',
        component: () => import('@/views/Com/ImageViewer.vue'),
        name: 'ImageViewer',
        meta: {
          title: t('router.imageViewer'),
          moduleInComponent: 'comImageViewer'
        }
      },
      {
        path: 'dialog',
        component: () => import('@/views/Com/Dialog.vue'),
        name: 'Dialog',
        meta: {
          title: t('router.dialog'),
          moduleInComponent: 'comDialog'
        }
      },
      {
        path: 'icon',
        component: () => import('@/views/Com/Icon.vue'),
        name: 'Icon',
        meta: {
          title: t('router.icon'),
          moduleInComponent: 'comIcon'
        }
      },
      {
        path: 'echart',
        component: () => import('@/views/Com/Echart.vue'),
        name: 'Echart',
        meta: {
          title: t('router.echart'),
          moduleInComponent: 'comEchart'
        }
      },
      {
        path: 'count-to',
        component: () => import('@/views/Com/CountTo.vue'),
        name: 'CountTo',
        meta: {
          title: t('router.countTo'),
          moduleInComponent: 'comCountTo'
        }
      },
      {
        path: 'qrcode',
        component: () => import('@/views/Com/Qrcode.vue'),
        name: 'Qrcode',
        meta: {
          title: t('router.qrcode'),
          moduleInComponent: 'comQrcode'
        }
      },
      {
        path: 'highlight',
        component: () => import('@/views/Com/Highlight.vue'),
        name: 'Highlight',
        meta: {
          title: t('router.highlight'),
          moduleInComponent: 'comHighlight'
        }
      },
      {
        path: 'infotip',
        component: () => import('@/views/Com/Infotip.vue'),
        name: 'Infotip',
        meta: {
          title: t('router.infotip'),
          moduleInComponent: 'comInfotip'
        }
      },
      {
        path: 'input-password',
        component: () => import('@/views/Com/InputPassword.vue'),
        name: 'InputPassword',
        meta: {
          title: t('router.inputPassword'),
          moduleInComponent: 'comInputpassword'
        }
      },
      {
        path: 'sticky',
        component: () => import('@/views/Com/Sticky.vue'),
        name: 'Sticky',
        meta: {
          title: t('router.sticky'),
          moduleInComponent: 'comSticky'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRouterMap as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
