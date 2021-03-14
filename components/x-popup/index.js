const app = getApp()
Component({
    behaviors: [],
    externalClasses: [],
    options: {
        multipleSlots: true,
        pureDataPattern: /^_/
    },
    properties: {
        show: {
            type: Boolean,
            value: false,
        },
        maskClosable: {
            type: Boolean,
            value: false
        },
        duration: {
            type: Number,
            value: 300,
        }
    },
    data: {
        display: false,
        inited: false,
        _isAnimating: [], // 当前正在执行的动画
    },
    observers: {
        'show'(n) {
            // 组件初始化时，也会触发show组件的监听
            console.log('触发show字段监听', n, this.data.show)
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
        clickMask() {
            // console.log('this.props', this.data.maskClosable)
            if (!this.data.maskClosable) {
                return
            }
            if (!this.data.display) {
                return
            }
            this.doHide()
        },
        // 以动画的形式，显示
        doShow() {
            // console.log('doShow', this.data.duration, this.data.display, this.data._isAnimating)
            // if (this.data.display) {
            //     return
            // }
            this.setData({
                inited: true,
                display: true,
            })
            wx.nextTick(() => {
                // console.log('show nexttick start')
                this.showAnimate()
            })
            // console.log('doShow after setData', this.data.duration, this.data.display)
            // this.showAnimate()

        },
        showAnimate() {
            console.log('start show ainmate')
            const _this = this
            // 动画
            this.animate('.popupContainer .mask', [
                {
                    opacity: 0,
                    // ease: 'ease-in'
                },
                {
                    opacity: 0.4,
                    // ease: 'ease-in'
                }
            ], this.data.duration, () => {
                // console.log('mask animate has finish')
                // _this.clearAnimation('.popupContainer .mask')
            })
            this.animate('.popupContainer .wrapper', [
                {
                    translate3d: ['0', '100%', '0'],
                    ease: 'ease'
                },
                {
                    translate3d: ['0', '0', '0'],
                    ease: 'ease'
                }
            ], this.data.duration, () => {
                // console.log('wrapper animate has finish')
                // _this.clearAnimation('.popupContainer .wrapper', { opacity: false })
            })
            // console.log('animate after')

        },
        // 以动画的形式，隐藏
        doHide() {

            // console.log('doHide', this.data._isAnimating)
            if (!this.data.display) {
                return
            }

            // console.log('order 1')
            this.hideAnimate()
            // this.hideAnimate2()
            // console.log('order 2')
            // this.setData({
            //     display: false,
            // })
            // console.log('order 3')



        },
        hideAnimate() {
            const _this = this
            console.log('_this.data._isAnimating', _this.data._isAnimating)
            if (_this.data._isAnimating.length > 0) {
                // console.log('is animating')
                return
            }
            // this.setData({
            //     _isAnimating: true
            // })
            this.data._isAnimating = []
            // 动画
            _this.data._isAnimating.push(1)
            this.animate('.popupContainer .mask', [
                {
                    opacity: 0.4,
                    // ease: 'ease-in'
                },
                {
                    opacity: 0,
                    // ease: 'ease-in'
                }
            ], this.data.duration, () => {
                _this.data._isAnimating.pop()
                _this.closeAll()
                // _this.clearAnimation('.popupContainer .mask')
                // console.log('animate hide has finish')
                // console.log('order 5')
            })
            _this.data._isAnimating.push(1)
            this.animate('.popupContainer .wrapper', [
                {
                    translate3d: ['0', '0', '0'],
                    ease: 'ease-out'
                },
                {
                    translate3d: ['0', '100%', '0'],
                    ease: 'ease-out'
                }
            ], this.data.duration, () => {
                // console.log('wrapper animate has finish')
                _this.data._isAnimating.pop()
                _this.closeAll()
                // _this.clearAnimation('.popupContainer .wrapper')
            })


            // console.log('order 6')
        },
        closeAll() {
            console.log('start close all', this.data._isAnimating)
            if (this.data._isAnimating.length === 0) {
                this.setData({
                    display: false
                })
                this.data._isAnimating = []
            }
            else {

            }
        }


    }

})