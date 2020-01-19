import * as types from './mutation-types';
import Storage from './../common/js/storage'

const matutaions = {
    [types.SYS_SKU] (state, sys_sku) {
        state.sys_sku = sys_sku;
        try {
            Storage.set({sys_sku});
        } catch (e) {
            
        }
    },
    [types.PURCHASE] (state, purchase) {
        state.purchase = purchase;
        try {
            Storage.set({purchase});
        } catch (e) {
            
        }
    }
}

export default matutaions;