const app = getApp()
import { throttle } from '../../utils/tool'
Component({
    behaviors: [],
    externalClasses: [],
    options: {
        multipleSlots: true,
        pureDataPattern: /^_/
    },
    properties: {
        // 显示,仅由上层组件控制
        show: {
            type: Boolean,
            value: false,
        },
        // 仅当使用animate api时有效  该功能暂时未实现
        duration: {
            type: Number,
            value: 300,
        },
        // 是否使用微信的动画api，会比css+settimeout更精确? 该功能暂时未实现
        // 微信api的动画，与css动画不同，初始css状态需要进行合理控制否则会出现严重闪烁
        // 而常规css，初始形态，在第一次渲染时，载入，和animate 的css状态混合，不会出现闪烁
        // 究其原因，还是js操纵动画，与css样式的时间差问题，css总是最优先渲染的
        useWxAnimate: {
            type: Boolean,
            value: false

        }

    },
    data: {
        // 唯一的显示状态，由父组件传入，父组件维护，不再维护两套
        // 防止出现，父子层级的显示控制变量不一致的问题
        // 由此，蒙层点击事件，也禁止直接操作组件内状态，而是转为抛出一个点击事件
        containerRender: false
    },
    observers: {
        'show'(n) {
            // 组件初始化时，也会触发show组件的监听
            // console.log('触发show字段监听', n, this.data.show)
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
            // console.log('lifetimes created')
        },
        attached() {
            // 大多数工作在此进行
            // console.log('this.data.duration', this.data)
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
        triggerOverlayTap() {
            this.triggerEvent('overlaytap')
        },
        doHide: throttle(function () {
            if (!this.data.containerRender) return
            setTimeout(() => {
                // 动画结束后，再彻底销毁
                this.setData({
                    containerRender: false
                })

            }, 300);
        }, 300),
        doShow: throttle(function () {
            if (this.data.containerRender) return
            this.setData({
                containerRender: true
            })
        }, 300)
    }

})