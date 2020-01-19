import http from './http';
import router from './../../router'
import Storage from './storage'
import { Toast } from 'vant';
const ERR_OK = 200;
const ERR_CODE = '0';

const fatch = (url, type, parmas, callback, contentType = false) => {
    return new Promise((resolve, reject) => {
        http(url, type, parmas, contentType).then((res) => {
            if (res.status === ERR_OK && res.data.code === ERR_CODE) {
                resolve(res.data);
            } else {
                if (res.data.code === '9') {
                    Toast(res.data.msg);
                    Storage.clear();
                    router.replace('/login');
                } else {
                    resolve(res.data);
                }
            }
        }).catch((err) => {
            callback('网络错误', false, err);
        })
    });
}

export default fatch;