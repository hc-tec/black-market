// 引入全局变量
// 由于 getApp() 在 .vue 文件中引入会遇到一些问题(把 getApp() 误以为是 Vue 成员)
// 所以这里采用文件分离方法引入全局变量
export default global = getApp().globalData