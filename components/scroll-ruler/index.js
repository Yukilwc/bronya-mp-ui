/*
 * @Author: 李文超
 * @Date: 2021-03-05 09:49:31
 * @LastEditors: 李文超
 * @LastEditTime: 2021-03-05 16:11:20
 * @Description: file content
 * @FilePath: \minapp-demo\components\scroll-ruler\index.js
 */
//   "usingComponents": {
//     "fa-popup": "/components/fa-popup/index"


//   }
import { debounce } from '../../utils/tool'
const app = getApp()
Component({
    behaviors: [],
    externalClasses: [],
    options: {
        multipleSlots: true,
        pureDataPattern: /^_/
    },
    properties: {
        // show: {
        //     type: Boolean,
        //     value: false,
        // },
    },
    data: {
        // display: false,
        // _isAnimating: [], // 当前正在执行的动画
        scrollLeft: 0,
        anchorValue: 0, // 刻度值
        ruler: {
            totalWidthPixel: 0, // 总长度px 计算
            viewWidthPixel: 300,// 显示区域长度px 配置
            start: 0, // 开始刻度 配置
            end: 1000, // 结束刻度 配置
            unit: 10, // 最细粒度单位 配置
            count: '', // 刻度数量
            spanPixel: 15, // 刻度间距像素，配置
            long: 5, // 长刻度出现频率，按index算
            // anchorLeftPixel: 0, // 游标距离左侧距离，计算
        },
        _isDragging: false

    },
    observers: {
        // 'show'(n) {
        //     // console.log('observes', n, this.data.show)
        //     if (n) {
        //         this.doShow()
        //     }
        //     else {
        //         this.doHide()
        //     }
        // }
    },
    lifetimes: {
        created() {
            // 此时不可调用setData
            // console.log('lifetimes created')
        },
        attached() {
            // 大多数工作在此进行
            this.initRuler()
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
            // console.log('pageLifetimes show')
        },
        hide() {
            // console.log('pageLifetimes hide')

        },
        resize() {
            // console.log('pageLifetimes resize')

        }

    },
    methods: {
        initRuler() {
            let { start, end, unit, spanPixel } = this.data.ruler
            let count = (end - start) / unit + 1
            let totalWidthPixel = count * 1 + (count - 1) * spanPixel
            this.setData({
                'ruler.count': count,
                'ruler.totalWidthPixel': totalWidthPixel,
                anchorValue: start
            })
            console.log('==========刻度间距', this.data.ruler)

        },
        dragStart(e) {
            console.log('==========dragStart', e)
            this.data._isDragging = true
        },
        dragging(e) {
            console.log('==========draging', e)
        },
        dragEnd(e) {
            console.log('==========dragEnd', e)
            this.data._isDragging = false
            let scrollLeft = e.detail.scrollLeft
            this.calcScrollNum(scrollLeft)
            // this.calcScrollNum(scrollLeft)

        },
        scroll(e) {
            let scrollLeft = e.detail.scrollLeft
            this.updateAnchorValue(scrollLeft)
            this.calcScrollNum(scrollLeft)
        },
        updateAnchorValue(scrollLeft) {
            let { start, end, unit, spanPixel, totalWidthPixel } = this.data.ruler
            let rate = scrollLeft / totalWidthPixel
            let num = rate * (end - start)
            let spanCount = Math.round(num / unit)
            this.setData({
                anchorValue: start + spanCount * unit
            })
        },
        // 根据滚动距离，计算游标指向的刻度值
        calcScrollNum: debounce(function (scrollLeft) {
            if (this.data._isDragging) {
                return
            }
            let { start, end, unit, spanPixel, totalWidthPixel } = this.data.ruler
            let rate = scrollLeft / totalWidthPixel
            let num = rate * (end - start)
            let spanCount = Math.round(num / unit)
            this.setData({
                scrollLeft: spanCount * spanPixel + spanCount * 1,
                anchorValue: start + spanCount * unit
            })
            // 此处抛出事件给上层组件
            this.triggerEvent('scrollfinalvalue',this.data.anchorValue)
        }, 300)
    }

})