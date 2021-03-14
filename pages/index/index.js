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
  },
  overlayTap(e) {
    // console.log('==========点击组件蒙层，父组件接受事件', e);
    this.setData({
      showPop: false
    })

  }

})
