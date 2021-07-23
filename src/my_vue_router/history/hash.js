/* /history/hash */

// 导入 base中的 History
import History from './base'

// 继承了 History
export default class HashHistory extends History {
  constructor(router) {
    super(router)
    // 确保第一次访问的时候路由加上 #/
    ensuerSlash()
  }
  // 监听URL的改变 设置当前的current
  setUpListener() {
    // 监听 hash的变化
    window.addEventListener('hashchange', () => {
      // 改变 this.current
      this.transitionTo(this.getCurrentLocation())
    })
  }
  // 获取当前的URL的hash 当然这里要去除 #
  getCurrentLocation() {
    // 这里不建议写成这个 return window.location.hash.slice(1) 有兼容问题
    let href = window.location.href
    const index = href.indexOf('#')
    // 当没有 #的时候 直接返回 空字符串
    if (index < 0) return ''
    // 获取 #后面的地址
    href = href.slice(index + 1)
    return href
  }
}

// 确保第一次加上 #/
function ensuerSlash() {
  // 如果存在 hash的话就不行加 /
  if (window.location.hash) {
    return
  }
  // 如果没有hash值 只要给 hash 加上一个 / 它会自动加上 /#/
  window.location.hash = '/'
}
