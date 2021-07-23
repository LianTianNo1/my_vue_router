// 导入 install
import install from './install'
// 导入解析路由
import createMatcher from './create-matcher'
// 导入 HashHistory
import HashHistory from './history/hash'
// 导入 HTML5History
import HTML5History from './history/html5'

// 导出自己写的 VueRouter
export default class VueRouter {
  // 实现构造函数功能
  constructor(options) {
    // 获取options中的routes路由规则 没有就为空数组
    this._routes = options.routes || []
    // 解析路由 传入规则 这里还返回了两个方法 match,addRoutes 用matcher接收一下之后有用
    this.matcher = createMatcher(this._routes)
    // 获取模式 没有就默认为 hash 模式
    this.mode = options.mode || 'hash'
    // 使用 if 或者 分支都行 根据不同的模式执行不同的路由跳转功能等等
    switch (this.mode) {
      case 'history':
        this.history = new HTML5History(this)
        break
      case 'hash':
        // 模式的实例使用 this.history接收等下用的上
        // 传入的this是 VueRouter
        this.history = new HashHistory(this)
        break
      default:
        throw new Error('该模式不存在')
    }
  }
  // 初始化
  init(Vue) {
    // 拿到模式的实例
    const history = this.history
    // 进行跳转  第一个参数是path ,第二个是回调函数
    history.transitionTo(history.getCurrentLocation, () =>
      // 监听URL的改变 设置当前的current
      history.setUpListener()
    )
    // 修改 响应式的 route
    history.listen((route) => {
      Vue._route = route
    })
  }
}
// 为VueRouter 添加 install方法
VueRouter.install = install
