<template>
    <div class="payWrap">
        <van-nav-bar title="订单支付">
            <span slot="left" class="iconfont" style="color:#333;" @click="toback">&#xe6dc;</span>
        </van-nav-bar>
        <div class="orderInfo">
            <van-collapse v-model="nowOrder">
                <van-collapse-item :title="'￥' + _formatPoint(orderInfo.orderPrice)" name="1">
                    <li>
                        <span>订单编号</span>
                        <p>{{orderInfo.order_id}}</p>
                    </li>
                    <li v-for="item in orderInfo.goodsList">
                        <span>商品名称</span>
                        <p>{{item}}</p>
                    </li>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="lineHeight"></div>
        <div class="payWay">
            <p class="payTitle">支付方式支付方式</p>
            <van-radio-group v-model="radio" @change="radio_change">
                <van-radio :name="item.payType" checked-color="#DB0B0B" v-for="(item,index) in payList">{{item.name}}</van-radio>
                <!-- <van-radio name="2" checked-color="#DB0B0B">易宝支付</van-radio> -->
            </van-radio-group>
            <!-- <van-radio checked-color="#DB0B0B">银行卡支付</van-radio> -->
        </div>
        <div class='pay_container'>
            <button class="pay_num" @click="toPay">支付￥{{_formatPoint(orderInfo.orderPrice)}}</button>
        </div>
    </div>
</template>
<script>
import fatch from './../../common/js/fatch'
import { commonParams, api } from './../../common/js/config'
import Storage from './../../common/js/storage'
import { isLogin, formatPoint } from './../../common/js/utils'
export default {
    data(){
        return{
            nowOrder: [1, ],
            radio: null,
            order_id: "",
            goodsList: [],
            order_price: "",
            payList: [],
            orderInfo: ''
        }
    },
    mounted(){
        if (!isLogin()) {
            Storage.set({login_path: this.$route.path })
            this.$router.push({ path: '/login' });
            return;
        }
        this.orderInfo = Storage.get('orderInfo');
        const url = `${api}basic/payTypeList`;
        const params = Object.assign({}, commonParams(true), {
            timestamp: new Date().getTime(),
            sign: "",
        });
        fatch(url, 'get', params, (err, state) => {
            this.$toast.fail('获取支付列表失败！');
        }).then((res) => {
            if (res.code == '0') {
                this.payList = res.data;
                this.radio = this.payList[0].payType;
            } else {
                console.log(res);
            }
        });
    },
    methods:{
        _formatPoint(price) {
            return formatPoint(price);
        },
        radio_change(van) {
            // if (this.radio == 1) {
            //     const url = `${api}pay/yeePay/getPayUrl`;
            //     const params = Object.assign({}, commonParams(true), {
            //         timestamp: new Date().getTime(),
            //         orderId: this.orderInfo.order_id,
            //         payType: 1,
            //         sign: "",
            //     });
            //     fatch(url, 'get', params, (err, state) => {

            //     }).then((res) => {
            //         if (res.code == '0') {
            //             console.log(res);
            //         } else {
            //             console.log(res);
            //         }
            //     });
            // }
        },
        // 去支付按钮
        toPay() {
            if (this.radio == '1') {
                const url = `${api}pay/yeePay/getPayUrl`;
                const params = Object.assign({}, commonParams(true), {
                    timestamp: new Date().getTime(),
                    orderId: this.orderInfo.order_id,
                    payType: this.radio,
                    sign: "",
                });
                fatch(url, 'get', params, (err, state) => {
                    this.$toast.fail('支付失败！');
                }).then((res) => {
                    if (res.code == '0') {
                        location.href = res.data.payUrl;
                    } else {
                        this.$toast.fail('支付失败！');
                    }
                });
            } else if (this.radio === '5') {
                this.wxpay(this.radio);
            } else if (this.radio === '4') {
                this.wxpay(this.radio);
            } else {
                this.$toast.fail('支付失败！');
            }
        },
        wxpay(type) {
            const url = `${api}pay/bfPay/wecahtPay`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                orderId: this.orderInfo.order_id,
                payType: type,
            });
            fatch(url, 'post', params, (err, state) => {
                this.$toast.fail('支付失败！');
            }).then((res) => {
                if (res.code == '0') {
                    if (type === '5') {
                        window.location = res.data;
                    } else if (type === '4') {
                        window.location = res.data;
                    }
                } else {
                    this.$toast.fail('支付失败！');
                }
            });
        },
        _formatDateTime(time) {     
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
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        },
        // 返回
        toback(){
            this.$router.push({ path: '/card' });
        }
    }
}
</script>
<style lang="stylus" scoped>
    .orderInfo >>>.van-collapse-item
        .van-cell
            .van-cell__title
                text-align center
                color #DB0B0B
                font-size 16px
        .van-collapse-item__content
            padding-top 0
            padding-bottom 0
    .payWrap
        font-size 16px
        background-color #F3F2F0
        max-width 640px
        margin 0 auto
        color #333
        .orderInfo
            li
                height 40px
                display flex
                align-items center
                justify-content space-between
                color #333
                font-size 15px
                p
                    width 70%
                    white-space nowrap
                    overflow hidden
                    text-overflow ellipsis
                    text-align right
        .lineHeight
            height 10px
        .payWay
            background #ffffff
            padding-bottom 75px
            .payTitle
                height 45px
                line-height 45px
                position relative
                padding 0 15px
            .payTitle:after
                content: "  "
                position: absolute
                left: 0
                bottom: 0
                width 100%
                height 1px
                border-bottom 1px solid #D1D1D0
                -webkit-transform scaleY(.5)
                transform scaleY(.5)
            .van-radio
                height 45px
                display flex
                align-items center
                padding-left 13px
                padding-right 15px
        .pay_container
            height 44px
            padding-bottom 33px
            position fixed
            bottom 0
            background-color #fff
            max-width 640px
            width 100%
            margin 0 auto
            .pay_num
                border none
                background #DE1E1D
                display block
                width 90%
                height 44px
                text-align center
                line-height 44px
                color #fff
                border-bottom 1px solid #B70404
                font-size 17px
                border-radius 44px
                margin 0 auto
</style>
