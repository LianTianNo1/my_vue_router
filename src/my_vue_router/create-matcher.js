/* create-matcher.js */

// 导入具体的路由解析规则
import createRouteMap from './create-route-map'
// 导入 createRoute
import createRoute from './util/route'

// 导出解析路由规则 传入的是规则
export default function createMatcher(router) {
  // pathList 路由的列表  pathMap 路由与组件的对应关系 nameMap这里没有考虑，先完成个简单的
  // 具体的解析规则是使用  createRouteMap
  const { pathList, pathMap } = createRouteMap(router)
  // match是 从pathMap 根据path获取 相应的路由记录
  function match(path) {
    // 取出path对应的记录
    const record = pathMap[path]
    // 判断记录是否存在
    if (record) {
      return createRoute(record, path)
    }
    return createRoute(null, path)
  }
  // 添加动态路由
  function addRoutes(router) {
    // 添加动态路由肯定也要解析路由规则
    createRouteMap(router, pathList, pathMap)
  }
  // 返回match 和 addRoutes
  return {
    match,
    addRoutes,
  }
}
