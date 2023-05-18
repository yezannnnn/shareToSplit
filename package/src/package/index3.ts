// 字符串转驼峰方法
import { cssStyle2DomStyle } from '@/utils'
// 路由和store
// import { constantRouterMap } from '@/router'
// import { storeRegisterModule } from '@/store'

import DefaultForm from '@/views/Components/Form/DefaultForm.vue'

const PACKAGE_NAME = 'base'

// options type
interface installOptios {
  router: any
  store?: any
  mitt?: any
}

// install 方法入口
const install = function (Vue: any, options: installOptios) {
  // 注入模块的组件路由
  Vue.component('DefaultForm', DefaultForm)
  // 注入子模块的 stroe module
  // storeRegisterModule()
}

// 判断是否时直接引入文件，如果是，就不用调用Vue.use，script直接引用

export default { install }
