let defaultSysSku = '';
let defaultPurchase = null;
import Storage from './../common/js/storage'
try {
    if (Storage.get('sys_sku')) defaultSysSku = Storage.get('sys_sku');
    if (Storage.get('purchase')) defaultPurchase = Storage.get('purchase');
} catch (e) {

}
const state = {
    sys_sku: defaultSysSku,
    purchase: defaultPurchase
}

export default state;