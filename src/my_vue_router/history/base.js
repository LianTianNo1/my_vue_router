/* history/base.js */

// 导入 我们上面写好的 createRoute
import createRoute from '../util/route'

// 导出 History
export default class History {
  // router 是路由对象 也就是 VUe-Router的一个实例
  constructor(router) {
    // 赋值给自己的 router
    this.router = router
    // 默认的的当前路径为 /
    this.current = createRoute(null, '/')
    // cb 一个回调函数，它的作用就是修改 响应式路由的值 ，对应的视图然后就刷新
    this.cb = null
  }
  // 通过 listen来修改 cb的值
  listen(cb) {
    this.cb = cb
  }
  // 将要跳转的链接
  // path 是路由的地址, onComplete是一个回调
  transitionTo(path, onComplete) {
    // 获取当前的应该跳转的路由  调用的是 Vue-Router中 this.matcher中收到的match方法
    // 在这里 this.router就是 Vue-Router的一个实例 所以写成
    // this.router.matcher.match(path)
    this.current = this.router.matcher.match(path)
    // cb 存在就修改响应式路由的值
    this.cb && this.cb(this.current)
    // 回调存在触发回调
    onComplete && onComplete()
  }
}
