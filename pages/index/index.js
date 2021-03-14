// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    showPop: false,
  },
  switchPop() {
    this.setData({
      showPop: !this.data.showPop
    })
  }

})
