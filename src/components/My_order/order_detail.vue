<template>
    <div class="orderDetailWrap">
        <van-nav-bar title="订单详情">
            <span slot="left" class="iconfont" @click="toback">&#xe6dc;</span>
        </van-nav-bar>
        <div class="order_detail_content">
            <div class="order_state" :style='{background: `url(${backgroundImg})`, backgroundSize: `100%`, backgroundRepeat: `no-repeat`}'>
                <p>
                    {{
                        order_send_info.orderState == 0 ? '等待付款' : order_send_info.orderState == 1 ?
                        '等待收货' : order_send_info.orderState == 3 ? '已付款' : order_send_info.orderState == 6 ?
                        '已完成' : order_send_info.orderState == 2 ? '已取消' : ''
                    }}
                </p>
                <p class="state_info" v-if='order_send_info.orderState == 0'>
                    <span>剩余：{{order_send_info.dateTime}}</span>
                    <span>需付款：￥{{_formatPoint(order_send_info.orderPrice)}} </span>
                </p>
            </div>
            <!-- <div class="order_state" v-else-if="order_send_info.orderState==1">
                <p>等待收货</p>
                <p class="state_info"></p>
            </div>
            <div class="order_state" v-else-if="order_send_info.orderState==3">
                <p>已付款</p>
                <p class="state_info"></p>
            </div>
            <div class="order_state" v-else-if="order_send_info.orderState==6">
                <p>已完成</p>
                <p class="state_info"></p>
            </div>
            <div class="order_state" v-else-if="order_send_info.orderState==2">
                <p>已取消</p>
                <p class="state_info"></p>
            </div> -->
            <div class="shipping_info" v-show="order_send_info.orderState==3" @click="to_order_track(order_send_info.orderId)">
                <p class="shipping_code">您的订单已经开始发货，请查看具体<span>物流信息</span></p>
                <!-- <p class="shipping_time">2018-10-4 10:34:33</p> -->
            </div>
            <div class="shop_over" v-show="order_send_info.orderState==6" @click="to_order_track(order_send_info.orderId)">
                <span>感谢您在万鲸游购物，欢迎您下次光临！</span>
                <span class="iconfont">&#xe600;</span>
            </div>
            <div class="order_address">
                <p>{{order_send_info.send_address.userName}} {{order_send_info.send_address.userPhone}}</p>
                <p>地址：{{order_send_info.send_address.province}}{{order_send_info.send_address.city}}{{order_send_info.send_address.county}}{{order_send_info.send_address.town}}{{order_send_info.send_address.address}}</p>
            </div>
            <div class="detail_content">
                <div class="goods_wrap" v-for="i in goodsList" @click='goodsDetail(i.sysSku)'>
                    <div class="detail_img">
                        <img :src="i.goods.imagePath" alt="">
                    </div>
                    <div class="detail_info">
                        <p class="goods_title">{{i.goods.name}}</p>
                        <p class="goods_info">
                            <span>{{i.goods.attributes}}</span>
                        </p>
                        <p class="goods_price">
                            <span><span style='font-size: 10px;'>￥</span>{{_formatPoint(i.goodsPrice)}}</span>
                            <label>x{{i.num}}</label>
                        </p>
                        <!-- <div class="apply_wrap">
                            <van-button plain type="danger" size="mini" @click="to_after_sales(i.order_id)">申请售后</van-button>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="contect_service" v-show='false'>
                <button @click="to_customer()">联系客服</button>
            </div>
            <ul class="order_info">
                <li>
                    <span class="left">下单编号：</span>
                    <span class="right">{{order_id}}</span>
                </li>
                <li>
                    <span class="left">下单时间：</span>
                    <span class="right">{{order_send_info.orderCreateTime}}</span>
                </li>
            </ul>
            <div class="line_height"></div>
            <ul class="order_info order_pay_info">
                <li>
                    <span class="left">商品总额</span>
                    <span class="right"><span style='font-size: 10px;'>￥</span>{{_formatPoint(order_send_info.goodsTotalPrice)}}</span>
                </li>
                <li>
                    <span class="left">运费</span>
                    <span class="right"><span style='font-size: 10px;'>￥</span>{{_formatPoint(order_send_info.freight)}}</span>
                </li>
                <li>
                    <span class="left">优惠金额</span>
                    <span class="right">-<span style='font-size: 10px;'>￥</span>{{_formatPoint(order_send_info.couponAmount)}}</span>
                </li>
            </ul>
        </div>
        <div class="actual_pay">
            <span>实付款:</span>
            <span class="pay_price"><span style='font-size: 10px;'>￥</span>{{_formatPoint(order_send_info.orderPrice)}}</span>
        </div>
        <div class="bottom_fixed" v-show="order_send_info.orderState==0||order_send_info.orderState==1">
            <van-button type="default" size="small" v-show="order_send_info.orderState==0" @click="cancel_order(order_id)">取消订单</van-button>
            <van-button plain type="danger" size="small" v-show="order_send_info.orderState==0" @click="to_pay_page">去支付</van-button>
            <van-button type="default" size="small" v-show="order_send_info.orderType==5"  @click="confirm_receipt(order_id)">确认收货</van-button>
            <van-button plain type="danger" size="small" v-show="order_send_info.orderState==1"  @click="check_logistics(order_id)">查看物流</van-button>
        </div>
        <van-popup v-model="loading">
            <van-loading type="spinner"/>
        </van-popup>
    </div>
</template>
<script>
import Vue from 'vue'
import { Toast,Dialog  } from 'vant';
import fatch from './../../common/js/fatch'
import { commonParams, api } from './../../common/js/config'
import { isLogin, formatPoint, formatDateTime } from './../../common/js/utils'
import Storage from './../../common/js/storage'
import { mapMutations } from 'vuex';
Vue.use(Toast).use(Dialog);
export default {
    data(){
        return{
            order_id:null,
            goodsList:[],
            order_send_info:{
                state:3,
                send_name:"圆通速递",
                send_info:{},
                send_address:{},
            },
            nowTime:"",
            loading:true,
            backgroundImg: require('./../../assets/blue_background.png')
        }
    },
    mounted(){
        if (!isLogin()) {
            Storage.set({login_path: this.$route.path })
            this.$router.push({ path: '/login' });
            return;
        }
        this.order_id = this.$route.params.item;
        this.refresh();
    },
    methods:{
        goodsDetail(sysSku) {
            this.setSysSku(sysSku);
            this.$router.push({ path: '/product' });
        },
        _formatPoint(price) {
            return formatPoint(price);
        },
        refresh(){
            const url = `${api}order/orderDetailNew`;
            const params = Object.assign({}, commonParams(true), {
                orderId:this.order_id,
            });
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                if (res.code == '0') {
                        this.loading = false;
                        this.order_send_info = res.data;
                        this.order_send_info.send_address = this.order_send_info.addressMap;
                        this.goodsList = this.order_send_info.orderGoodsList;
                        if (!this.order_send_info.orderCreateTime == "") {
                            this.order_send_info.orderCreateTime = formatDateTime(this.order_send_info.orderCreateTime);
                        }
                        if (!this.order_send_info.finishTime == "") {
                            this.order_send_info.finishTime = formatDateTime(this.order_send_info.finishTime);
                        }
                        let nowTimer = 86400000 - (1000 * 60 * 2);
                        let endTimer = this.order_send_info.dateTime;
                        if (this.order_send_info.dateTime > nowTimer) {
                            this.order_send_info.dateTime = "已过期";
                        } else {
                            this.order_send_info.dateTime = this.formatDateTime(endTimer, nowTimer);
                            setInterval(() => {
                                this.order_send_info.dateTime = this.formatDateTime(endTimer += 1000, nowTimer);
                            } , 1000);
                        }
                } else {
                    console.log(res);
                }
            });
        },
        formatDateTime(endTimer, nowTimer) {
            let time = nowTimer - endTimer;
            let h = Math.floor(time / 1000 / 60 / 60 % 24);
            let m = Math.floor(time / 1000 / 60 % 60);
            let s = Math.floor(time / 1000 % 60);
            if (h <= 9) h = '0' + h;
            if (m <= 9) m = '0' + m;
            if (s <= 9) s = '0' + s;
            return `${h}:${m}:${s}`; 
        },
        // 联系客服
        to_customer(){
            location.href = `#/contact`;
        },
        // 返回
        toback(){
            window.history.go(-1);
        },
        to_order_track(item){
            location.href = `#/order_track/${item}`;
        },
        // 售后按钮
        // to_after_sales(item){
        //     location.href = `#/after_sales/${item}`;
        // },
        // 取消订单
        cancel_order(id){
            Toast.loading({
                mask: true,
                forbidClick:true,
                duration:0,
                message: '取消中...'
            });
            const url = `${api}order/cancelOrder`;
            const params = Object.assign({}, commonParams(true), {
                timestamp:new Date().getTime(),
                orderId: id,
                sign: "",
            });
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                Toast.clear();
                if (res.code == '0') {
                    Toast.success(res.msg);
                    this.refresh();
                } else {
                    Toast.fail(res.msg);
                }
            });
        },
        // 去支付
        to_pay_page(){
            var list = [];
            for(var i =0;i<this.goodsList.length;i++){
                list.push(this.goodsList[i].goods.name);
            }
            let orderInfo = {
                order_id: this.order_id,
                orderPrice: this.order_send_info.orderPrice,
                goodsList: list
            }
            Storage.set({"orderInfo": orderInfo});
            this.$router.push({ path: '/order_pay' });
        },
        // 确认收货按钮
        confirm_receipt(id){
            Dialog.confirm({
                message: '请您确保已经收到货物。'
            }).then(() => {
                const url = `${api}order/confirmReceipt`;
                const params = Object.assign({}, commonParams(true), {
                    timestamp:new Date().getTime(),
                    orderId:id,
                    sign:"",
                });
                fatch(url, 'get', params, (err, state) => {
                }).then((res) => {
                    if (res.code == '0') {
                        Toast(res.msg);
                    } else {
                        Toast(res.msg);
                    }
                });
            }).catch(() => {
                Toast("取消确认收货");
            });
        },
        check_logistics(order_id){
            location.href = `#/order_track/${order_id}`;
        },
        ...mapMutations({
            'setSysSku': 'SYS_SKU'
        })
    }
}
</script>
<style lang='stylus' scoped>
    .orderDetailWrap>>>.van-overlay
        background rgba(0,0,0,.1)
    .orderDetailWrap>>>.van-popup
        background rgba(0,0,0,.3)
        .van-loading
            width 40px
            height 40px
            color #fff !important
    .orderDetailWrap
        font-size 16px
        letter-spacing .6px
        height 100vh
        width 100vw
        min-width 275px
        max-width 640px
        background #F3F2F0
        .iconfont
            font-size 14px
            color #999
        .line_height
            height 10px
            background #F5F5F4
        .order_detail_content
            .order_state
                color #fff
                padding 0 15px
                height 50px
                background-repeat no-repeat
                display flex
                justify-content space-between
                align-items center
                font-size 15px
                .state_info
                    display flex
                    flex-direction column
                    font-size 12px
                    span:nth-child(2)
                        margin-top 6px
            .shipping_info
                padding 0px 15px
                background #fff
                margin-bottom 10px
                border-bottom 1px solid #ebedf0
                .shipping_code
                    color #333
                    font-size 13px
                    padding-top 10px
                    padding-bottom 10px
                    span
                        color #00A2EB
                        margin-left 4px
                .shipping_time
                    padding-bottom 10px
                    color #00A2EB
                    font-size 12px
            .shop_over
                height 43px
                display flex
                align-items center
                justify-content space-between
                padding 0 15px
                background #fff
                border-bottom 1px solid #ebedf0
                span:nth-child(1)
                    font-size 13px
                    color #333
                span:nth-child(2)
                    font-size 24px
                    color #999999
            .order_address
                padding 9px 15px
                font-size 16px
                color #666666
                background #fff
                border-bottom 1px solid #ebedf0
                margin-bottom 10px
                p
                    line-height 18px
                p:nth-child(1)
                    margin-bottom 4px
                    font-size 16px
                    color #333
            .detail_content
                background #fff
                font-size 20px
                width 100%
                padding 0 15px
                box-sizing border-box
                padding-top 10px
                margin-bottom 10px
                .goods_wrap
                    height 131px
                    display flex
                    justify-content space-between
                    border-top .5px dashed #ebedf0
                    align-items center
                    .detail_img
                        max-width 98px
                        min-width 80px
                        max-height 98px
                        min-height 80px
                        width 98px
                        height 98px
                        margin-right 31px
                        margin-top -10px
                        img
                            width 98px
                            height 98px
                    .detail_info
                        flex 1
                        letter-spacing .6px
                        .goods_title
                            font-size 14px
                            color #333
                            margin-bottom 6px
                            line-height 18px
                            text-overflow -o-ellipsis-lastline
                            overflow hidden
                            text-overflow ellipsis
                            display -webkit-box
                            -webkit-line-clamp 2
                            line-clamp 2
                            -webkit-box-orient vertical
                        .goods_info
                            font-size 12px
                            color #666666
                            margin-bottom 10px
                            span:nth-child(1)
                                margin-right 10px
                        .goods_price
                            color #666666
                            display flex
                            align-items center
                            justify-content space-between
                            span
                                font-size 16px
                                color #DE1E1D
                                font-weight 700
                            label
                                font-size 12px
                                color #666666
                        .apply_wrap
                            text-align right
                            margin-top 4px
                            button
                                width 65px
            .contect_service
                text-align center
                height 70px
                background #fff
                border-bottom 1px solid #E2E2E2
                margin-bottom 10px
                button
                    margin-top 15px
                    width 129px
                    height 40px
                    border-radius 40px
                    background #DE1E1D
                    color #fff
                    border none
                    font-size 17px
                    text-align center
                    line-height 40px
            .order_info
                background #fff
                li
                    font-size .3rem
                    color #333
                    margin 0 15px
                    border-bottom 0.5px dashed #ebedf0
                    line-height 40px
                    min-height 40px
                    display flex
                    .left
                        display block
                        color #666666
                        height 40px
                    .right
                        width 72%
                        display block
                        color #666666
                        word-wrap break-word
                li:last-child
                    border-bottom none
            .order_pay_info
                border-bottom 1px solid #ebedf0
                margin-bottom 0
                li
                    display flex
                    justify-content space-between
                    span
                        color #333
                    .right
                        text-align right
        .actual_pay
            padding 0 15px
            text-align right
            height 60px
            line-height 60px
            font-size 15px
            background #F3F2F0
            padding-bottom 60px
            .pay_price
                color #DE1E1D
        .bottom_fixed
            position fixed
            bottom 0
            width 100%
            height 50px
            display flex
            justify-content flex-end
            padding 0 15px
            background #fff
            box-sizing border-box
            align-items center
            button
                height 33px
                width 82px
                border-radius 3px
            .van-button--default
                margin-right 10px
                border 1px solid #555555
</style>