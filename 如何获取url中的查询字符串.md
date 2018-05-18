function queryUrlParameter(str) {
    let obj = {}
    let reg = /([^?=&#]+)=([^?=&#]+)/g;
    str.replace(reg, function () {
        obj[arguments[1]] = arguments[2]
    })
    //如果加上hash
    // reg = /#([^?&=#]+)/g
    // if (reg.test(str)) {
    //     str.replace(reg, function () {
    //         obj.hash = arguments[1]
    //     })
    // }
    return obj
}
console.log(queryUrlParameter('http://www.baidu.com?a=1&b=2#12222'))  //{ a: '1', b: '2'}
