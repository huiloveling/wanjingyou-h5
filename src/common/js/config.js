// 请求数据公共参数

import Storage from './storage';

export function commonParams(user) {
    let parms = {
        platformId: 2,
        mimimallVersion: '1.1.1.web',
    }
    if (user) {
        if (Storage.get('user') === undefined) return parms;
        let user_info = {
            token: Storage.get('user').token,
            userId: Storage.get('user').userId
        }
        return Object.assign({}, parms, user_info);
    } else {
        return parms;
    }
}

// export const api = 'https://line.mimidai.com/mimimall-api/';
export const api = 'http://api.wanjingyou.com.cn:8080/';
// export const api = 'http://192.168.1.65:86/mimimall-api/';