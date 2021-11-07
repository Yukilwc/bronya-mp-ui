/*
 * @Author: 李文超
 * @Date: 2021-03-05 09:49:31
 * @LastEditors: 李文超
 * @LastEditTime: 2021-07-09 11:29:04
 * @Description: file content
 * @FilePath: \sanco-mp\components\TopArc\index.js
 */
//   "usingComponents": {
//     "fa-popup": "/components/fa-popup/index"


//   }
// import { debounce } from '../../utils/tool'
const app = getApp()
Component({
    behaviors: [],
    externalClasses: [],
    options: {
        // multipleSlots: true,
        pureDataPattern: /^_/
    },
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        dur: {
            type: Number,
            value: 350
        },
        timing: {
            type: String,
            value: 'ease'
        },
        zIndex: {
            type: String,
            value: '2000'

        },
        // 是否联动导航栏一起切换
        navChange: {
            type: Boolean,
            value: true,
        },
        nav: {
            type: Object,
            value: {
                overlay: {
                    frontColor: '#ffffff',
                    backgroundColor: '#332c3f',

                },
                noOverlay: {
                    frontColor: '#ffffff',
                    backgroundColor: '#806d9e',
                }
            }
        }
    },
    data: {
        render: false,
        visible: false
    },
    observers: {
        // 可以起到初始化和后续监听的功能
        'show'(n) {
            console.log('observes', n)
            if (n) {
                this.doShow()
            }
            else {
                this.doHide()
            }
        }
    },
    lifetimes: {
        created() {
            // 此时不可调用setData
            console.log('权限组件构建 created')
        },
        attached() {
            // if (this.data.show) {
            //     this.doShow()
            // }
            // else {
            //     this.doHide()
            // }
        },
        moved() {
            // console.log('lifetimes moved')

        },
        ready() {
            // console.log('lifetimes ready')

        },
        detached() {
            // console.log('lifetimes detached')

        }

    },
    pageLifetimes: {
        show() {
            // this.setData({
            //     $_locale: wx.$i18n.getLocale()
            // })
        },
        hide() {
            // console.log('pageLifetimes hide')

        },
        resize() {
            // console.log('pageLifetimes resize')

        }

    },
    methods: {
        changeNavColor(val) {
            if (!this.data.navChange) return
            if (val) {
                wx.setNavigationBarColor({
                    ...this.data.nav.overlay,
                    animation: {
                        duration: this.data.dur,
                        // duration: 3000,
                        timingFunc: 'linear'
                    },
                    success: (result) => {

                    },
                    fail: () => { },
                    complete: () => { }
                });

            }
            else {
                wx.setNavigationBarColor({
                    ...this.data.nav.noOverlay,
                    animation: {
                        duration: this.data.dur,
                        timingFunc: 'linear'
                    },
                    success: (result) => {

                    },
                    fail: () => { },
                    complete: () => { }
                });

            }
        },
        doShow() {
            this.triggerEvent('show')
            this.changeNavColor(true)
            this.setData({
                render: true,
                visible: true
            })
        },
        doHide() {
            this.triggerEvent('close')
            this.changeNavColor(false)
            this.setData({
                visible: false
            })
        },
        aniEnd() {
            console.log('==========ani end', this.data.visible)
            if (!this.data.visible) {
                this.setData({
                    render: false
                })
                this.triggerEvent('closed')
            }
        },
        overlayTap() {
            this.triggerEvent('overlaytap')
        }
    }

})