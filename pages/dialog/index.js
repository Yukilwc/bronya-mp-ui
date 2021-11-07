/*
 * @Author: 李文超
 * @Date: 2021-07-20 17:21:23
 * @LastEditors: 李文超
 * @LastEditTime: 2021-07-20 17:23:30
 * @Description: file content
 * @FilePath: \sanco-mp\pages\exclusiveCustomer\index.js
 */
// pages/exclusiveCustomer/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    showOl: false,
    showSkin1Dialog: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  closeTap() {
    console.log('==========关闭点击trigger',)
    this.setData({
      showDialog: false
    })
  },
  showTap() {
    this.setData({
      showDialog: true
    })
  },
  closeSkin1DialogTap() {
    console.log('==========关闭点击trigger',)
    this.setData({
      showSkin1Dialog: false
    })
  },
  showSkin1DialogTap() {
    this.setData({
      showSkin1Dialog: true
    })
  },

  showOlTap() {
    console.log('==========',)
    this.setData({
      showOl: true
    })

  },
  closeOl() {
    this.setData({
      showOl: false
    })
  }


})