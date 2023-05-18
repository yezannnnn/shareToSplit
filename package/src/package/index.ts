// 字符串转驼峰方法
import { cssStyle2DomStyle } from '@/utils'
// 路由和store
// import { asyncRouterMap } from '@/router'
// import { storeRegisterModule } from '@/store'

import { Layout, getParentLayout } from '@/utils/routerHelper'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

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

const PACKAGE_NAME = 'base'

// 定义组件数组
interface pageComponentType {
  name: string
  component: any
}
const pageComponent: Array<pageComponentType> = []
// 动态引入目录
// 匹配除 components 以为的文件夹下 index.vue
import.meta.glob('/src/**/!(components)/**/*.vue')
const vueModules = import.meta.glob('../views/**/!(components)/**/*.vue', {
  eager: true
}) as unknown as any
// 获取路径

const pathList: Array<string> = []
for (const key in vueModules) {
  pathList.push(key)
}

const modulesPage: any = []
// 动态无限层级拼接名称方法
const generateComponentNames = (path) => {
  const pathSegments = path.split('/')
  const fileName = pathSegments[pathSegments.length - 1].replace('.vue', '')
  return `${pathSegments[2].toLowerCase()}-${fileName.toLowerCase()}`
}

// 拼接动态对象
pathList.forEach((i: any) => {
  const arr = i.split('/')
  // 名称截取如：views/pub/branch/index.vue 得 [views,pub,branch,index.vue] 取 pub及brnach
  console.log(generateComponentNames(i))
  const name = cssStyle2DomStyle(generateComponentNames(i)) as any
  modulesPage[name] = vueModules[i].default
  pageComponent.push({ name: name, component: vueModules[i].default })
})
console.log(modulesPage)
// options type
interface installOptios {
  router: any
  store?: any
  mitt?: any
}

// install 方法入口
const install = function (Vue: any, options: installOptios) {
  // 注入模块的组件路由
  if (options.router) {
    asyncRouterMap.forEach((s: any) => {
      options.router.push(s)
    })
    console.log(options.router)
  }
  // 注入子模块的 stroe module
  // storeRegisterModule()
  pageComponent.forEach((item) => {
    Vue.component(item.name, item.component)
  })
}

// 判断是否时直接引入文件，如果是，就不用调用Vue.use，script直接引用
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install, ...vueModules }
