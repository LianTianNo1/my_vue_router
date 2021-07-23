/* ./components/link.js */

// 导出 link
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  // 渲染
  render(h) {
    // 转化为虚拟DOM
    return h(
      // 便签名
      'a',
      // 便签属性
      {
        domProps: {
          href: '#' + this.to,
        },
      },
      // 标签里面的内容 这里是 默认插槽
      [this.$slots.default]
    )
  },
}
