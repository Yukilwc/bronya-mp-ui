/*
 * @Author: 李文超
 * @Date: 2021-03-05 15:23:35
 * @LastEditors: 李文超
 * @LastEditTime: 2021-03-05 15:23:36
 * @Description: file content
 * @FilePath: \minapp-demo\utils\tool.js
 */
// 节流
export const throttle = (fn, delay) => {
  // 初始为可以执行
  let valid = true
  return function () {
    console.log('==========throttle this', this)
    if (!valid) {
      // 节流期间内，不执行
      return false
    }
    // 可以执行，先开启节流开关
    valid = false
    fn.apply(this, arguments)
    setTimeout(() => {
      valid = true
    }, delay)
  }
}
// 防抖函数
export const debounce = (fn,delay)=> {
  let timer
  return function () {
    let context = this
    let args = arguments
    // console.log('==========防抖清空触发',args)
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
    console.log('==========防抖执行触发',args)
      fn.apply(context,args)
    },delay);
  }
}