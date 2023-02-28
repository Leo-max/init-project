import common from '@/common'
let debounce = function(fn, context, timeout) {
    console.log(fn)
    console.log(timeout)
    let timer;
    // 利用闭包将内容传递出去
    return function() {
        if (timer) {
            // 清除定时器
            clearTimeout(timer)
        }
        // 设置一个新的定时器
        timer = setTimeout(function() {
            console.log(context)
            if (context) {
                fn.apply(context, arguments)
            } else {
                fn(arguments)
            }
        }, timeout)
    }
}

let formatMoney = function(number, places, symbol, thousand, decimal) {
    number = number || 0;
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "$";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}

let getBankIcon = function(bankName) {
        let name = common.BANK_MAP[bankName]
        return './static/images/bankIcon/' + (name ? name : 'zhongguoyinlian') + '.png'
    }
    //星号化姓名银行卡手机号
let convertName = function(name) {
    if (!name) return ''
    let result = name.substr(0, 1) + ' '
    for (var i = 0; i < name.length - 1; i++) {
        result += '*'
    }
    return result
}
let convertBankNo = function(bankNo) {
    if (!bankNo) return ''
    return bankNo.substr(0, 4) + ' **** **** ' + bankNo.substr(bankNo.length - 4)
}
let convertPhone = function(phone) {
    if (!phone) return ''
    return phone.substr(0, 3) + ' ****' + phone.substr(phone.length - 4)
}
let convertIds = function(id) {
    if (!id) return ''
    return id.substr(0, 1) + '****************' + id.substr(id.length - 1)
}
let getReqNo = function() {
    return guid()
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}

let getLast4Num = (num) => {
    let length = num.length
    return num.substr(length - 4)
}
let getUrlParam = (name) => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2]);
        return null;
    }
    //base64加解密
    // 创建Base64对象
let Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) { t = t + String.fromCharCode(r) }
            if (a != 64) { t = t + String.fromCharCode(i) }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = 0;
        var c1 = 0;
        var c2 = 0;
        var c3;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}

function isPC() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
        return true
    } else {
        return false
    }
}
let formatMoneyW = function(money, type) {
    if (/[^0-9\.]/.test(money))
        return "0";
    if (money == null || money == "")
        return "0";
    money = money.toString().replace(/^(\d*)$/, "$1.");
    money = (money + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    money = money.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(money))
        money = money.replace(re, "$1,$2");
    money = money.replace(/,(\d\d)$/, ".$1");
    if (type == 0) { // 不带小数位(默认是有小数位) 
        var a = money.split(".");
        if (a[1] == "00") {
            money = a[0];
        }
    }
    return money;
}

let getResourceIdByLimit = (list, limit) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].operationButton && list[i].operationButton.indexOf(limit) >= 0) {
            return list[i].id
        }
        if (list[i].children) {
            for (let j = 0; j < list[i].children.length; j++) {
                let item = list[i].children[j]
                if (item.operationButton && item.operationButton.indexOf(limit) >= 0) {
                    return item.id
                }
            }
        }
    }
}
/**
 * 格式化日期
 * @param val 时间戳 接受单位为毫秒
 * @param type 1：完整显示，2：不显示年,3:不显示分秒
 */
let formatDate = function(val, type) {
	type = type || 1
	let result = ''
  let timestamp = val
  let d = new Date()
  if (timestamp) d.setTime(timestamp)
	let year = d.getFullYear()
	let month = pad(d.getMonth() + 1)
	let day = pad(d.getDate())
	let housrs = pad(d.getHours())
	let minutes = pad(d.getMinutes())
  let seconds = pad(d.getSeconds())
  let week = d.getDay()
  let weekArr = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
	switch(type) {
		case 1:
			result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes + ':' + seconds
			break
		case 2:
			result = month + '-' + day + ' ' + housrs + ':' + minutes
			break
		case 3:
			result = year + '-' + month + '-' + day
			break
		case 4:
			result = housrs + ':' + minutes + ':' + seconds
			break
		case 5:
			result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes
      break
    case 6: 
      result =  year + '年' + month + '月' + day + '日'
      break
    case 7: 
      result = weekArr[week]
      break
		case 8:
		  result = month + '月' + day + '日'
		  break
		case 9:
			result = housrs + ':' + minutes
			break
		default:
			result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes + ':' + seconds
			break
	}
	return result
}

let getAfterDayTime = (time, day) => {
	return time += day * 24 * 3600 * 1000
}

/**
 * 补零
 * @param num
 * @returns {string}
 */
let pad = function(num) {
	return new Array(2 - ('' + num).length + 1).join(0) + num
}
export default {
    debounce,
    formatMoney,
    getBankIcon,
    getReqNo,
    getLast4Num,
    getUrlParam,
    convertName,
    convertBankNo,
    convertPhone,
    convertIds,
    Base64,
    isPC,
    formatMoneyW,
    getResourceIdByLimit,
    formatDate
}