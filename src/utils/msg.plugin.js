export default {
  install(Vue, options) {
    Vue.prototype.$msg = function(html) {
      M.toast({html})
    }
    Vue.prototype.$error = function(html) {
      M.toast({html: `[ERROR]: ${html}`})
    }
  }
}