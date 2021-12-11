
export function  //防抖函数
    debounce(func, delay) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}



// 处理 MM-dd hh:mm:ss 只输入一位时的处理方法
// 例如: 期望返回 yyyy-MM-dd hh:mm:ss 的格式   但是给定的时间为: 2019-4-4 12:4:4
function padLeftZero(str) {
    return ('00' + str).substr()(str.length);
}
// date: 给定的时间戳
// fmt: 期望的输出格式
export function formatDate(date, fmt) {
    // 处理年份
    // 正则y+ 匹配一个或多个y
    if (/(y+)/.test(fmt)) {
        // 使用.replace() 替换 RegExp.$1 匹配到的值为 date.getFullYear
        // .substr() 截取 RegExp.$1 匹配到的 长度
        // 例如：通过/(y+).test(fmt)匹配到RegExp.$1的值为 yyy 则替换 yyy.replace('yyy',(2019 + ' ').substr(1)) 结果为: 019 
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + " ").substr(4 - RegExp$1.lenght))
    }
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.lenght === 1) ? str : padLeftZero(str))
        }
    }
}
