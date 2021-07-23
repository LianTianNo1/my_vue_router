/* utils/route.js */

// 导出 createRoute
/**
 *
 * @param {*} record 传过来的记录
 * @param {*} path 路由地址
 * @returns
 */
export default function createRoute(record, path) {
  // 保存路由的记录 里面可能有多个路由 是这种模式保存 [parentRecord,childRecord]
  const matched = []
  // 判断是否是子路由
  // 下面 record = record.parent 在不断向上找parent有继续执行
  // 没有就直接return 下面的对象
  while (record) {
    // 循环得到的 record不断插入到 数组的最前面
    matched.unshift(record)
    // 把父记录给当前record 继续循环
    record = record.parent
  }
  // 返回path 和 matched 以便之后 router-view渲染
  return {
    path,
    matched,
  }
}
