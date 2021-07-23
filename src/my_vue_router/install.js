/* install.js */

// 导入 View Link
import View from './components/view'
import Link from './components/link'

// 定义一个全局 的Vue
export let _Vue = null

// 导出 install方法
export default function install(Vue) {
  // 保存到全局的Vue
  _Vue = Vue
  // 混入
  Vue.mixin({
    // Vue实例创建完毕之后操做
    beforeCreate() {
      // 这里是new Vue
      if (this.$options.router) {
        // 保存 Vue
        this._routerRoot = this
        // 保存 Vue Router 的实例，以后可以通过Vue Router构造的一些方法
        this._router = this.$options.router
        // 调用Vue Router的init(Vue) 初始化操做
        this._router.init(this)
        // 创建一个代表当前路由 响应式的值_route
        // 其实不建议使用 defineReactive直接创建。。
        // 第一个参数是绑定在谁身上，第二是值名称，第二个是值
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        // 这里是创建 Vue的组件等等
        // 判断是否有父组件 ，有的话就把父组件的 _roterRoot(也就是Vue)给 子组件
        // 没有父组件就把 this 这是也是(Vue) 给子组件
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
    },
  })
  // 注册 Link 和 View
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)
  // 添加 $router 路由对象  Object.defineProperty 参数分别是 为谁添加，属性名，属性值
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      // this._routerRoot代表的是 Vue ,他的_router是 Vue Router实例
      return this._routerRoot._router
    },
  })
  // 添加 $route
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      // 他的_route是就是刚才添加 响应式 的当前 路由
      return this._routerRoot._route
    },
  })
}
