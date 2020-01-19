<template>
    <div class='container'>
        <header>
            <div class='back' @click='back'>
                <span class='iconfont'>&#xe6dc;</span>
            </div>
            确认订单
        </header>
        <div class='address_defalut_wrap'>
            <div class='address_defalut address_border' v-if='userAddressState' @click='handleAddressClick'>
                <ul>
                    <li>
                        <strong>{{userName}} {{userPhone}}</strong>
                    </li>
                    <li>
                        <span class='tag tag_red' v-show='selectDefault'>
                            默认
                        </span>
                        {{userAddress}}
                    </li>
                </ul>
            </div>
            <div class='address' v-if='!userAddressState' @click='handleAddressClick'>
                <div class='img'>
                    <img :src="require('./../../assets/add.png')" />
                    <span>添加收货地址</span>
                </div>
                <div class='icon'>
                    <span class='iconfont'>&#xe600;</span>
                </div>
            </div>
            <div class='hproduct' v-for='(item, index) in param' :key='item.sysSku'>
                <div class='l'>
                    <div class='box'>
                        <img :src='item.imagePath' />
                        <div class='noGoods' v-show='item.noGoods'>
                            <span>{{err_text}}</span>
                        </div>
                    </div>
                </div>
                <div class='r'>
                    <strong>{{item.name}}</strong>
                    <div class='sku_coll'>
                        <div >
                            <span :style="{background: item.attributes === '' ? '' : '#ECECEB', padding: '5px'}">{{item.attributes}}</span>
                        </div>
                    </div>
                    <div class='or_sku_price'>
                        <span class='price'>
                            <span style="font-size: 12px;">¥</span>&nbsp;{{_formatPoint(item.price)}}
                        </span>
                        <span class='num'>
                            x{{item.num}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class='buy_checkout'>
            <ul>
                <li>
                    <a href="javascript:void(0);">
                        <strong>商品总额</strong>
                        <div><span style="font-size: 12px;">¥</span>{{_formatPoint(goodsTotalPrice)}}</div>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                        <strong>运费</strong>
                        <div><span style="font-size: 12px;">¥</span>{{_formatPoint(freight)}}</div>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);">
                        <strong>订单总额</strong>
                        <div style="color: #e93b3d;"><span style="font-size: 12px;">¥</span>{{_formatPoint(orderPrice)}}</div>
                    </a>
                </li>
            </ul>
        </div>
        <van-button
            round
            type="danger"
            :loading='submissionLoading'
            class='submission'
            @click='handleSubmission'
            :disabled='submissionDisabled'
        >
            提交订单
        </van-button>
    </div>
</template>

<script>
    import fatch from './../../common/js/fatch';
    import Storage from './../../common/js/storage';
    import Footer from './../../base/footer';
    import { commonParams, api } from './../../common/js/config'
    import {accAdd, accMul} from './../../common/js/calculationPrice';
    import { mapGetters } from 'vuex'
    import { isLogin, formatPoint } from './../../common/js/utils'
    export default {
        data() {
            return {
                userAddress: '',
                userPhone: '',
                userName: '',
                userAddressId: '',
                freight: '',
                goodsTotalPrice: '',
                orderPrice: '',
                params: [],
                param: [],
                userAddressState: false,
                submissionLoading: false,
                submissionDisabled: false,
                selectDefault: false,
                err_text: ''
            }
        },
        computed: {
            ...mapGetters([
                'purchase',
            ])
        },
        created() {
            if (!isLogin()) {
                Storage.set({login_path: this.$route.path })
                this.$router.push({ path: '/login' });
                return;
            }
            if (Storage.get('purchase') === undefined) {
                this.$router.push({ path: '/mall' });
                return;
            }
            if (this.purchase === null) return;
            this.param = JSON.parse(this.purchase.params);
            for (let i = 0; i < this.param.length; i++) {
                this.params.push({
                    num: this.param[i].num,
                    goodsPrice: this.param[i].price,
                    sku: this.param[i].sku,
                    sysSku: this.param[i].sysSku,
                });
            }
            this.getOrderList();
        },
        methods: {
            _formatPoint(price) {
                return formatPoint(price);
            },
            handleSubmission() {
                if (!this.userAddressState) {
                    this.$toast('请选择收货地址');
                    return;
                }
                const url = `${api}order/createOrderNew`;
                const params = Object.assign({}, commonParams(true), {
                    timestamp: new Date().getTime(),
                    cart: this.purchase.cart,
                    freight: this.freight,
                    goodsTotalPrice: this.goodsTotalPrice,
                    orderPrice: this.orderPrice,
                    param: JSON.stringify(this.params),
                    userAddressId: this.userAddressId
                });
                this.submissionLoading = true;
                fatch(url, 'get', params, (err, state) => {
                    this.$toast('订单异常！');
                    this.submissionLoading = false;
                }).then((res) => {
                    if (res.code === '0') {
                        const result = res.data;
                        if (result !== null) {
                            let goodsList = [];
                            for (let i = 0; i < this.param.length; i++) {
                                goodsList.push(this.param[i].name);
                            }
                            let orderInfo = {
                                order_id: result.orderId,
                                orderPrice: result.orderPrice,
                                goodsList: goodsList
                            }
                            Storage.set({orderInfo: orderInfo});
                            this.$router.push({
                                path: '/order_pay'
                            })
                        }
                        this.submissionLoading = false;
                    } else {
                        const result = res.data;
                        if (result !== null) {
                            if (result.resultCode === '1' || result.resultCode === '2' || result.resultCode === '3' || result.resultCode === '5') {
                                this.getArrEqual(this.param, result.goods, false);
                                this.submissionDisabled = true;
                                this.err_text = result.message;
                                this.$toast(result.message);
                            } else if (result.resultCode === '4') {
                                this.getArrEqual(this.param, result.goods, true);
                                this.freight = result.freight;
                                this.orderPrice = result.orderPrice;
                                this.goodsTotalPrice = result.goodsTotalPrice;
                                this.$toast(res.msg);
                            }
                        } else {
                             this.$toast(res.msg);
                        }
                        this.submissionLoading = false;
                    }
                });
            },
            getOrderList() {
                const url = `${api}userAddress/selectDefault`;
                const params = Object.assign({}, commonParams(true), {
                    timestamp: new Date().getTime(),
                });
                fatch(url, 'get', params, (err, state) => {
                    let total = 0;
                    for (let i = 0; i < this.param.length; i++) {
                        total = accAdd(accMul(this.param[i].price, this.param[i].num), total);
                    }
                    this.goodsTotalPrice = total;
                    this.orderPrice = total;
                    this.freight = 0;
                }).then((res) => {
                    if (res.code === '0') {
                        const result = res.data;
                        if (result === null) {
                            let total = 0;
                            for (let i = 0; i < this.param.length; i++) {
                                total = accAdd(accMul(this.param[i].price, this.param[i].num), total);
                            }
                            this.goodsTotalPrice = total;
                            this.orderPrice = total;
                            this.freight = 0;
                            let updateCity = Storage.get('updateCity');
                            if (Storage.get('updateCity') !== undefined) {
                                this.userPhone = updateCity.userPhone;
                                this.userName = updateCity.userName;
                                this.userAddress = updateCity.province + updateCity.city + updateCity.county + updateCity.address;
                                this.userAddressId = updateCity.userAddressId;
                                this.userAddressState = true;
                                this.getOrderPriceNew(JSON.stringify(this.params));
                                this.selectDefault = updateCity.isDefault;
                                Storage.remove('updateCity');
                            }
                        } else {
                            let updateCity = Storage.get('updateCity');
                            if (Storage.get('updateCity') !== undefined) {
                                this.userPhone = updateCity.userPhone;
                                this.userName = updateCity.userName;
                                this.userAddress = updateCity.province + updateCity.city + updateCity.county + updateCity.address;
                                this.userAddressId = updateCity.userAddressId;
                                this.selectDefault = updateCity.isDefault;
                                Storage.remove('updateCity');
                            } else {
                                this.selectDefault = true;
                                this.userPhone = result.userPhone;
                                this.userName = result.userName;
                                this.userAddress = result.province + result.city + result.county + result.address;
                                this.userAddressId = result.userAddressId;
                            }
                            this.userAddressState = true;
                            this.getOrderPriceNew(JSON.stringify(this.params));
                        }

                    } else {
                        console.log(res)
                    }
                })
            },
            getOrderPriceNew(param) {
                const url = `${api}order/getOrderPriceNew`;
                const params = Object.assign({}, commonParams(true), {
                    timestamp: new Date().getTime(),
                    param: param,
                    userAddressId: this.userAddressId
                });
                fatch(url, 'get', params, (err, state) => {
                    let total = 0;
                    for (let i = 0; i < this.param.length; i++) {
                        total = accAdd(accMul(this.param[i].price, this.param[i].num), total);
                    }
                    this.goodsTotalPrice = total;
                    this.orderPrice = total;
                    this.freight = 0;
                }).then((res) => {
                    if (res.code === '0') {
                        this.goodsTotalPrice = res.data.goodsTotalPrice;
                        this.freight = res.data.freight;
                        this.orderPrice = res.data.orderPrice;
                    } else {
                        let total = 0;
                        for (let i = 0; i < this.param.length; i++) {
                            total = accAdd(accMul(this.param[i].price, this.param[i].num), total);
                        }
                        this.goodsTotalPrice = total;
                        this.orderPrice = total;
                        this.freight = 0;
                    }
                })
            },
            getArrEqual(arr1, arr2, falg) {
                for (let i = 0; i < arr2.length; i++) {
                    for (let j = 0; j < arr1.length; j++) {
                        if (arr1[j].sysSku === arr2[i].sysSku) {
                            if (!falg) {
                                arr1[j].noGoods = true;
                            } else {
                                this.params[j].goodsPrice = arr2[i].price;
                                this.params[j].num = arr2[i].num;
                                this.params[j].sku = arr2[i].sku;
                                this.params[j].sysSku = arr2[i].sysSku;
                                arr1[j].price = arr2[i].price;
                                arr1[j].num = arr2[i].num;
                                arr1[j].sku = arr2[i].sku;
                                arr1[j].sysSku = arr2[i].sysSku;
                            }
                        }
                    }
                }
            },
            back() {
                this.$router.back(-1);
            },
            handleAddressClick() {
                this.$router.push({ path: '/address_management' });
            }
        },
    }
</script>

<style lang='stylus' scoped>
    .container
        min-height 100vh
        background-color #F5F5F4
        header
            height 46px
            line-height 46px
            border-bottom 1px solid #ccc
            text-align center
            font-size 16px
            font-family 'PingFang-SC-Medium'
            position relative
            background-color #fff
            .back
                position absolute
                width 46px
                height 100%
        .address_defalut_wrap
            .address
                display flex
                align-items center
                height 45px
                line-height 45px
                padding 0 15px
                .img
                    display flex
                    align-items center
                    font-size 16px
                    line-height 25px
                    width 50%
                    img
                        width 25px
                        height 25px
                        margin-right 5px
                .icon
                    width 50%
                    text-align right
                    line-height 25px
                    font-size 18px
            .address_defalut
                padding: 12px 10px;
                position: relative;
                margin-bottom 15px
                background-color #fff
                ul
                    position: relative;
                    padding-right: 30px;
                    li
                        word-wrap: break-word;
                        word-break: break-all;
                        font-size: 14px;
                        line-height 1.8
                        strong
                            font-size: 16px;
                        span.tag
                            display: inline-block;
                            position: relative;
                            overflow: hidden;
                            padding: 0.5px 5px 0 5px;
                            box-sizing border-box
                            vertical-align: middle;
                            margin: -2px 5px 0 0;
                            max-width: 8em;
                            height: 16px;
                            line-height 16px
                            font-size: 9px;
                            color: #2FB1EE;
                        span.tag::after
                            content: "";
                            position: absolute;
                            z-index: 1;
                            pointer-events: none;
                            background-color: #e93b3d;
                            border: 1px solid #ddd;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            background: none;
                            border-color: #2FB1EE;
                            border-radius: 2px;
                ul:after
                    content: "";
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: -2px;
                    width: 6px;
                    height: 10px;
                    background-image: url('./../../assets/jm.svg');
                    background-repeat: no-repeat;
                    background-size: 100%;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    margin-top: -5px;
            .hproduct
                height 139px
                display flex
                background-color #fff
                .l
                    width 150px
                    height 100%
                    padding 13px
                    box-sizing border-box
                    .box
                        width 100%
                        height 100%
                        position relative
                        img
                            display block
                            width 100%
                            height 100%
                        .noGoods
                            position absolute
                            font-size 14px
                            top 50%
                            left 0
                            width 100%
                            height 50%
                            transform translate(0, -50%)
                            color #fff
                            text-align center
                            border-radius 70%
                            background rgba(0, 0, 0, .5)
                            display flex
                            justify-content center
                            align-items center
                            overflow hidden
                            span
                                display block
                                height 25px
                                line-height 25px
                                padding 0 12px
                                overflow: hidden;
                                -webkit-line-clamp: 1;
                                text-overflow:ellipsis;
                                -webkit-box-orient: vertical;
                .r
                    flex 1
                    height 100%
                    padding 10px
                    box-sizing border-box
                    strong
                        color: #333;
                        line-height: 20px;
                        font-size: 12px;
                        font-family 'PingFang-SC-Medium'
                        overflow: hidden;
                        margin-bottom 5px
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                    .sku_coll
                        width auto
                        box-sizing border-box
                        font-size: 12px;
                        min-height 24px
                        margin 5px 0 10px 0
                        color: #999;
                        border-radius 3px
                        div
                            box-sizing border-box
                            min-height 24px
                            height 24px
                            line-height 24px
                            display: -webkit-box;
                            overflow: hidden;
                            -webkit-line-clamp: 1;
                            text-overflow:ellipsis;
                            -webkit-box-orient: vertical;
                    .sku_price
                        height: 25px;
                        line-height: 25px;
                        color: #e93b3d;
                        font-size: 18px;
                        font-weight bold
                    .or_sku_price
                        height: 25px;
                        line-height: 25px;
                        color: #999999
                        font-size: 18px;
                        font-weight bold
                        display flex
                        .price
                            color: #e93b3d;
                            width 50%
                        .num
                            width 50%
                            text-align right
        .buy_checkout
            overflow: hidden;
            position: relative;
            background: #fff;
            margin-bottom: 15px;
            margin-top 15px
            li
                position: relative;
                overflow: hidden;
                a
                    position: relative;
                    display: block;
                    text-align: right;
                    font-size: 12px;
                    color: #666;
                    line-height 50px
                    display flex
                    width 100%
                    padding 0 15px
                    box-sizing border-box
                    strong
                        font-weight: 400;
                        font-size: 16px;
                        color: #333;
                        width 50%
                        text-align left
                    div
                        font-weight: 400;
                        font-size: 16px;
                        width 50%
            li:not(:last-child):before
                content: "";
                position: absolute;
                z-index: 1;
                pointer-events: none;
                background-color: #e5e5e5;
                height: 1px;
                left: 0;
                right: 0;
                bottom: 0;
                left: 15px;
                right: 15px
        .submission
            width 80%
            display block
            margin 0 auto
</style>