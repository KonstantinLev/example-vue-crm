export default {
  bind(el, {value, arg = 'bottom'}) {
    console.log(arg)
    M.Tooltip.init(el, {html: value, position: arg})
  },
  unbind(el) {
    const tooltip = M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}