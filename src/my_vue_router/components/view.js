/* ./components/link.js */

// 导出 view
export default {
  render(h) {
    // 获取路由规则对象
    const route = this.$route
    // 定义一个变量，用来等下 取 matched 中的值
    let depth = 0
    // 该组件为 router-view
    this.routerView = true
    // 尝试去获取父组件
    let parent = this.$parent
    // 判断是否有父组件
    while (parent) {
      // 判断该组件是否为 routerView
      if (parent.routerView) {
        depth++
      }
      // 继续向上判断还有无父组件
      parent = parent.$parent
    }
    // 这里的route是 this.$route 就是 _route 响应式值，也就是 current
    // 当初 current 是 调用了 match方法 获取到的 返回值是 matched 和 path
    // matched 里面是多个路由对象 是这种模式保存 [parentRecord,childRecord]
    // 通过 变量depth取出来 举个栗子 ['/login','/login/tab']
    // 因为使用的unshif添加后面的父组件添加到前面
    // depth 一直加 ,直接取出后面即可
    const record = route.matched[depth]
    // 没有记录直接渲染
    if (!record) {
      return h()
    }
    // 有的话就获取记录中的组件
    const component = record.component
    // 最后把组件渲染
    return h(component)
  },
}
