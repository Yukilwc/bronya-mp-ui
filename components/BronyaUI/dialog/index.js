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
            value: '3000'

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
        },
        // y轴偏移值
        yOffset: {
            type: String,
            value: "-5%"
        },
        // 蒙层点击关闭
        overlay: {
            type: Boolean,
            value: true
        },
        // 皮肤
        skin: {
            type: String,
            value: ""
        }
    },
    data: {
        render: false,
        visible: false,
        isPending: false,
    },
    observers: {
        'show'(n) {
            // console.log('observes', n, this.data.show)
            if (n) {
                if (this.data.visible) return
                this.doShow()
            }
            else {
                if (!this.data.visible) return
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
            // this.setData({
            //     $_locale: wx.$i18n.getLocale()
            // })

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
        doShow() {
            this.setData({
                isPending: true
            })
            this.triggerEvent('show')
            this.setData({
                visible: true,
                render: true,
            })
        },
        doHide() {
            this.setData({
                isPending: true
            })
            this.triggerEvent('close')
            this.setData({
                visible: false,
            })
        },
        aniEnd() {
            console.log('==========dialog ani end', this.data.show)
            this.setData({
                isPending: false
            })
            if (!this.data.show) {
                this.setData({
                    render: false
                })
                this.triggerEvent('closed')
            }
        },

        overlayTap() {
            if (this.data.overlay) {
                this.setData({
                    show: false
                })

            }
        }
    }

})