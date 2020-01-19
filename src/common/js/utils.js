import Storage from './storage';
/**
 * 去除空格
 * @param  {str}
 * @param  {type} 
 *          type:  1:所有空格  2:前后空格  3:前空格 4:后空格
 * @Email   felicity_live@sina.cn
 * @return {String}
 */
export function trim(str, type) {
    type = type || 1;
    switch (type) {
        case 1:
            return str.replace(/\s+/g, '');
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, '');
        case 3:
            return str.replace(/(^\s*)/g, '');
        case 4:
            return str.replace(/(\s*$)/g, '');
        default:
            return str;
    }
}

export function isLogin() {
    let user = Storage.get('user');
    if (user == null && user == undefined) {
        return false;
    } else {
        return true;
    }
}

export function formatPoint(price) {
    if (price === undefined) return;
    if (price.toString().split(".")[1] === undefined) {
        return price + '.00';
    } else {
        if (price.toString().split(".")[1].length === 1) {
            return price + '0';
        } else if (price.toString().split(".")[1].length === 2) {
            return price
        } else {
            return price.toFixed(2);
        }
    }
}

export function formatDateTime(time, f) {
    let date = new Date(time);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    m = m < 10 ? ('0' + m) : m;
    d = d < 10 ? ('0' + d) : d;
    h = h < 10 ? ('0' + h) : h;
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    if (f) return y + '/' + m + '/' + d + ' ' + h + ':' + minute + ':' + second;
    else return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}