/* create-route-map.js */

// 导出具体的路由解析
/**
 *
 * @param {*} routes 路由规则
 * @param {*} oldPathList 路由列表
 * @param {*} oldPathMap 路由和组件的对应关系
 */
export default function createRouteMap(routes, oldPathList, oldPathMap) {
  // 传入了就是添加动态路由 没有传入就默认为空
  const pathList = oldPathList || []
  const pathMap = oldPathMap || []

  // 遍历规则操作
  routes.forEach((route) => {
    // 记录路由 也是核心的解析路由 为了分工明确写的外面
    addRouteRecord(route, pathList, pathMap)
  })

  // 返回新的路由列表 和 路由对应关系
  return {
    pathList,
    pathMap,
  }
}

/**
 *
 * @param {*} route 路由规则
 * @param {*} pathList 路由列表
 * @param {*} pathMap 路由和组件之间的对应关系
 * @param {*} parentRecord  父路由
 */
function addRouteRecord(route, pathList, pathMap, parentRecord) {
  // 路由地址 判断是否存在父级的路由 有的话拼接父级路由和当前路由的path 没有就是当前route.path
  const path = parentRecord ? `${parentRecord.path}${route.path}` : route.path
  // record作为一个路由记录 记录了路由地址,组件,父级路由   用于路由对应关系去对应相对应的path
  const record = {
    path,
    component: route.component,
    parent: parentRecord,
  }
  // 判断是否在路由列表中 存在当前路由，不存在进行添加当前路由，更新路由列表
  if (!pathList[path]) {
    // 向路由列表中添加路由
    pathList.push(path)
    // 向路由对应关系中 添加path 相对应的记录
    pathMap[path] = record
  }
  // 判断当前的 路由是否有子路由，有的话进行递归
  if (route.children) {
    route.children.forEach((childRoute) => {
      // 就简单说下最后一个参数 就是父级路由记录
      addRouteRecord(childRoute, pathList, pathMap, record)
    })
  }
}
