<template>
    <div class="myOrder">
        <van-nav-bar title="我的订单">
            <span slot="left" class="iconfont" style="color:#333;" @click="toback">&#xe6dc;</span>
        </van-nav-bar>
        <van-tabs v-model="active" swipeable :swipe-threshold="5">
            <van-tab>
                <div slot="title" @click="ajax_all()">全部</div>
                <van-list
                    v-model="order_list_loading"
                    @load="on_order_load('',allOrderList,allpageNo)"
                    :finished="finished"
                    finished-text="没有更多了"
                    :immediate-check="false"
                >
                    <li class="order_detail" v-for="i in allOrderList">
                        <div class="detail_top">
                            <p>
                                <img src="./../../assets/date.png">
                                <span v-html="i.createTime"></span>
                            </p>
                            <span class="top_state" v-if="i.orderState==0">待支付</span>
                            <span class="top_state" v-else-if="i.orderState==1">待收货</span>
                            <span class="top_state" v-else-if="i.orderState==2">已取消</span>
                            <span class="top_state" v-else-if="i.orderState==6">已完成</span>
                        </div>
                        <div class="detail_content" v-for="(goods,index) in i.orderGoodsList" @click="toOrderDetail(i.orderId)">
                            <div class="detail_img">
                                <img :src="goods.goods.imagePath" alt="">
                            </div>
                            <div class="detail_info">
                                <p class="goods_title">{{goods.goods.name}}</p>
                                <p class="goods_info">
                                    <span>{{goods.goods.attributes}}</span>
                                    <!-- <span>版本：全网通64G</span> -->
                                </p>
                                <p class="goods_price">
                                    <span><span style="font-size: 10px;">￥</span>{{_formatPoint(goods.goodsPrice)}}</span>
                                    <label>x{{goods.num}}</label>
                                </p>
                            </div>
                        </div>
                        <div class="all_price">
                            <span>共<label>{{i.total}}</label>件商品</span>
                            <span>总额：<span style="font-size: 10px;">￥</span><label>{{_formatPoint(i.orderPrice)}}</label></span>
                        </div>
                        <div class="order_state" v-if="i.orderState==0">
                            <button class="button_cancel" @click="cancel_order(i.orderId)">取消订单</button>
                            <button class="button_pay" @click.stop="toOrderDetail(i.orderId, i.orderGoodsList, i.orderId, i.orderPrice)">去支付</button>
                        </div>
                        <div class="order_state" v-else-if="i.orderState==1&&i.orderType==5">
                            <button class="button_pay" @click="confirm_receipt(i.orderId)">确认收货</button>
                        </div>
                        <div class="order_state" v-else-if="i.orderState==1">
                            <button class="button_pay" @click="check_logistics(i.orderId)">查看物流</button>
                        </div>
                    </li>
                </van-list>
            </van-tab>
            <van-tab>
                <div slot="title" @click="ajax_pay()">待付款</div>
                <van-list
                    v-model="order_list_loading"
                    @load="on_order_load(0,payList,paypageNo)"
                    :finished="finished"
                    finished-text="没有更多了"
                    :immediate-check="false"
                >
                    <li class="order_detail" v-for="i in payList">
                        <div class="detail_top">
                            <p>
                                <img src="./../../assets/date.png">
                                <span v-html="i.createTime"></span>
                            </p>
                            <span class="top_state" v-if="i.orderState==0">待支付</span>
                            <span class="top_state" v-else-if="i.orderState==1">待收货</span>
                            <span class="top_state" v-else-if="i.orderState==2">已取消</span>
                            <span class="top_state" v-else-if="i.orderState==6">已完成</span>
                        </div>
                        <div class="detail_content" v-for="(goods,index) in i.orderGoodsList" @click="toOrderDetail(i.orderId)">
                            <div class="detail_img">
                                <img :src="goods.goods.imagePath" alt="">
                            </div>
                            <div class="detail_info">
                                <p class="goods_title">{{goods.goods.name}}</p>
                                <p class="goods_info">
                                    <span>{{goods.goods.attributes}}</span>
                                    <!-- <span>版本：全网通64G</span> -->
                                </p>
                                <p class="goods_price">
                                    <span><span style="font-size: 10px;">￥</span>{{_formatPoint(goods.goodsPrice)}}</span>
                                    <label>x{{goods.num}}</label>
                                </p>
                            </div>
                        </div>
                        <div class="all_price">
                            <span>共<label>{{i.total}}</label>件商品</span>
                            <span>总额：<label><span style="font-size: 10px;">￥</span>{{_formatPoint(i.orderPrice)}}</label></span>
                        </div>
                        <div class="order_state" v-if="i.orderState==0">
                            <button class="button_cancel" @click="cancel_order(i.orderId)">取消订单</button>
                            <button class="button_pay" @click.stop="toOrderDetail(i.orderId, i.orderGoodsList, i.orderId, i.orderPrice)">去支付</button>
                        </div>
                        <div class="order_state" v-else-if="i.orderState==1&&i.orderType==5">
                            <button class="button_pay">确认收货</button>
                        </div>
                        <div class="order_state" v-else-if="i.orderState==1">
                            <button class="button_pay" @click="check_logistics(i.orderId)">查看物流</button>
                        </div>
                    </li>
                </van-list>
            </van-tab>
            <van-tab>
                <div slot="title" @click="ajax_receive()">待收货</div>
                <van-list
                    v-model="order_list_loading"
                    @load="on_order_load(1,receiveList,receivepageNo)"
                    :finished="finished"
                    finished-text="没有更多了"
                    :immediate-check="false"
                >
                    <li class="order_detail" v-for="i in receiveList">
                        <div class="detail_top">
                            <p>
                                <img src="./../../assets/date.png">
                                <span v-html="i.createTime"></span>
                            </p>
                            <span class="top_state" v-if="i.orderState==0">待支付</span>
                            <span class="top_state" v-else-if="i.orderState==1">待收货</span>
                            <span class="top_state" v-else-if="i.orderState==2">已取消</span>
                            <span class="top_state" v-else-if="i.orderState==6">已完成</span>
                        </div>
                        <div class="detail_content" v-for="(goods,index) in i.orderGoodsList" @click="toOrderDetail(i.orderId)">
                            <div class="detail_img">
                                <img :src="goods.goods.imagePath" alt="">
                            </div>
                            <div class="detail_info">
                                <p class="goods_title">{{goods.goods.name}}</p>
                                <p class="goods_info">
                                    <span>{{_formatPoint(goods.goods.attributes)}}</span>
                                    <!-- <span>版本：全网通64G</span> -->
                                </p>
                                <p class="goods_price">
                                    <span><span style="font-size: 10px;">￥</span>{{_formatPoint(goods.goodsPrice)}}</span>
                                    <label>x{{goods.num}}</label>
                                </p>
                            </div>
                        </div>
                        <div class="all_price">
                            <span>共<label>{{i.total}}</label>件商品</span>
                            <span>总额：<span style="font-size: 10px;">￥</span><label>{{_formatPoint(i.orderPrice)}}</label></span>
                        </div>
                        <div class="order_state" v-if="i.orderState==0">
                            <button class="button_cancel">取消订单</button>
                            <button class="button_pay">去支付</button>
                        </div>
                        <div class="order_state" v-else-if="i.orderState==1&&i.orderType==5">
                            <button class="button_pay" @click="confirm_receipt(i.orderId)">确认收货</button>
                        </div>
                        <div class="order_state" v-else-if="i.orderState==1">
                            <button class="button_pay" @click="check_logistics(i.orderId)">查看物流</button>
                        </div>
                    </li>
                </van-list>
            </van-tab>
            <van-tab>
                <div slot="title" @click="ajax_over()">已完成</div>
                <van-list
                    v-model="order_list_loading"
                    @load="on_order_load(6,overList,overpageNo)"
                    :finished="finished"
                    finished-text="没有更多了"
                    :immediate-check="false"
                >
                    <li class="order_detail" v-for="i in overList">
                        <div class="detail_top">
                            <p>
                                <img src="./../../assets/date.png">
                                <span v-html="i.createTime"></span>
                            </p>
                            <span class="top_state" v-if="i.orderState==0">待支付</span>
                            <span class="top_state" v-else-if="i.orderState==1">待收货</span>
                            <span class="top_state" v-else-if="i.orderState==2">已取消</span>
                            <span class="top_state" v-else-if="i.orderState==6">已完成</span>
                        </div>
                        <div class="detail_content" v-for="(goods,index) in i.orderGoodsList" @click="toOrderDetail(i.orderId)">
                            <div class="detail_img">
                                <img :src="goods.goods.imagePath" alt="">
                            </div>
                            <div class="detail_info">
                                <p class="goods_title">{{goods.goods.name}}</p>
                                <p class="goods_info">
                                    <span>{{goods.goods.attributes}}</span>
                                    <!-- <span>版本：全网通64G</span> -->
                                </p>
                                <p class="goods_price">
                                    <span><span style="font-size: 10px;">￥</span>{{_formatPoint(goods.goodsPrice)}}</span>
                                    <label>x{{goods.num}}</label>
                                </p>
                            </div>
                        </div>
                        <div class="all_price">
                            <span>共<label>{{i.total}}</label>件商品</span>
                            <span>总额：<span style="font-size: 10px;">￥</span><label>{{_formatPoint(i.orderPrice)}}</label></span>
                        </div>
                        <div class="order_state" v-if="i.orderState==0">
                            <button class="button_cancel">取消订单</button>
                            <button class="button_pay">去支付</button>
                        </div>
                        <div class="order_state" v-else-if="i.orderState==1&&i.orderType==5">
                            <button class="button_pay">确认收货</button>
                        </div>
                        <div class="order_state" v-else-if="i.orderState==1">
                            <button class="button_pay" @click="check_logistics(i.orderId)">查看物流</button>
                        </div>
                    </li>
                </van-list>
            </van-tab>
            <van-tab>
                <div slot="title" @click="ajax_cancel()">已取消</div>
                <van-list
                    v-model="order_list_loading"
                    @load="on_order_load(2,cancelList,cancelpageNo)"
                    :finished="finished"
                    finished-text="没有更多了"
                    :immediate-check="false"
                >
                    <li class="order_detail" v-for="i in cancelList">
                        <div class="detail_top">
                            <p>
                                <img src="./../../assets/date.png">
                                <span v-html="i.createTime"></span>
                            </p>
                            <span class="top_state" v-if="i.orderState==0">待支付</span>
                            <span class="top_state" v-else-if="i.orderState==1">待收货</span>
                            <span class="top_state" v-else-if="i.orderState==2">已取消</span>
                            <span class="top_state" v-else-if="i.orderState==6">已完成</span>
                        </div>
                        <div class="detail_content" v-for="(goods,index) in i.orderGoodsList" @click="toOrderDetail(i.orderId)">
                            <div class="detail_img">
                                <img :src="goods.goods.imagePath" alt="">
                            </div>
                            <div class="detail_info">
                                <p class="goods_title">{{goods.goods.name}}</p>
                                <p class="goods_info">
                                    <span>{{goods.goods.attributes}}</span>
                                    <!-- <span>版本：全网通64G</span> -->
                                </p>
                                <p class="goods_price">
                                    <span><span style="font-size: 10px;">￥</span>{{_formatPoint(goods.goodsPrice)}}</span>
                                    <label>x{{goods.num}}</label>
                                </p>
                            </div>
                        </div>
                        <div class="all_price">
                            <span>共<label>{{i.total}}</label>件商品</span>
                            <span>总额：<span style="font-size: 10px;">￥</span><label>{{_formatPoint(i.orderPrice)}}</label></span>
                        </div>
                        <div class="order_state" v-if="i.orderState==0">
                            <button class="button_cancel">取消订单</button>
                            <button class="button_pay">去支付</button>
                        </div>
                        <div class="order_state" v-else-if="i.orderState==1&&i.orderType==5">
                            <button class="button_pay">确认收货</button>
                        </div>
                        <div class="order_state" v-else-if="i.orderState==1">
                            <button class="button_pay" @click="check_logistics(i.orderId)">查看物流</button>
                        </div>
                    </li>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import Vue from "vue"
import { Toast } from 'vant';
import fatch from './../../common/js/fatch'
import { commonParams, api } from './../../common/js/config'
import Storage from './../../common/js/storage'
import { isLogin, formatPoint } from './../../common/js/utils'
Vue.use(Toast);
export default {
    data() {
        return {
            active: 0,
            allOrderList:[],
            payList:[],
            receiveList:[],
            cancelList:[],
            overList:[],
            order_list_loading:false,
            order_list_error:false,
            allpageNo:0,
            paypageNo:0,
            receivepageNo:0,
            cancelpageNo:0,
            overpageNo:0,
            finished: false,
        }
    },
    mounted(){
        if (!isLogin()) {
            Storage.set({login_path: this.$route.path })
            this.$router.push({ path: '/login' });
            return;
        }
        this.refresh();
    },
    methods: {
        _formatPoint(price) {
            return formatPoint(price);
        },
        refresh(){
            this.active = this.$route.params.active;
            switch(this.active) {
                case '0':
                    this.ajax_all();
                    break;
                case '1':
                    this.ajax_pay();
                    break;
                case '2':
                    this.ajax_receive();
                    break;
                case '3':
                    this.ajax_over();
                    break;
                case '4':
                    this.ajax_cancel();
                    break;
                default:
                    this.ajax_all();
                    break;
            }
        },
        // 确认收货按钮
        confirm_receipt(id){
            Toast.loading({
                mask: true,
                forbidClick:true,
                duration:0,
                message: '确认收货中...'
            });
            const url = `${api}order/confirmReceipt`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                sign: "",
                orderId: id,
            });
            fatch(url, 'get', params, (err, state) => {

            }).then((res) => {
                Toast.clear();
                if (res.code == '0') {
                    Toast.success(res.msg);
                    this.ajax_receive();
                } else {
                    Toast.fail(res.msg);
                }
            });
        },
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
                timestamp: new Date().getTime(),
                sign: "",
                orderId: id,
            });
            fatch(url, 'get', params, (err, state) => {

            }).then((res) => {
                Toast.clear();
                if (res.code == '0') {
                    Toast.success(res.msg);
                    this.ajax_pay();
                } else {
                    Toast.fail(res.msg);
                }
            });
        },
        // 全部订单
        ajax_all() {
            this.init_page_no();
            this.allOrderList = [];
            this.on_order_load("", this.allOrderList,this.allpageNo);
        },
        ajax_request(params, way,url, callback) {
            const urlLink = `${api}` + url;
            fatch(urlLink, way, params, (err, state) => {

            }).then((data) => {
                callback(data);
            });
        },
        toback() {
            window.history.go(-1);
        },
        to_add_address(item) {
            location.href = `#/edit_address/${item}`;
        },
        toOrderDetail(item, data, order_id, goodsPrice) {
            if (order_id && goodsPrice) {
                var list = [];
                for(var i =0;i<data.length;i++){
                    list.push(data[i].goods.name);
                }
                let orderInfo = {
                    order_id: order_id,
                    orderPrice: goodsPrice,
                    goodsList: list
                }
                Storage.set({"orderInfo": orderInfo});
                location.href = `#/order_pay`;
            } else {
                location.href = `#/order_detail/${item}`;
            }
        },
        on_order_load(item, list, nowpage) {
            nowpage += 1;
            switch(item) {
                case '':
                    this.allpageNo = nowpage;
                    break;
                case 1:
                    this.receivepageNo = nowpage;
                    break;
                case 2:
                    this.cancelpageNo = nowpage;
                    break;
                case 4:
                    this.paypageNo = nowpage;
                    break;
                case 6:
                    this.overpageNo = nowpage;
                    break;
                default:
                    this.allpageNo = nowpage;
                    break;
            }
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                sign: "",
                pageNo: nowpage,
                pageSize: 20,
            });
            if (item == 4) {
                params.orderState = 0;
            } else {
                params.orderState = item;
            }
            var this_ = this;
            this.ajax_request(params,'get',"/order/selectOrderNew",function(res){
                if (res.code === '0') {
                    if (res.data == null) {
                        this_.order_list_loading = false;
                        this_.finished = true;
                    } else {
                        for (var i = 0; i < res.data.selectOrder.length; i++) {
                            list.push(res.data.selectOrder[i]);
                        }
                        this_.order_list_loading = false;
                        for (var i = 0; i < list.length; i++) {
                            var unixTimestamp = new Date(list[i].createTime) ;
                            var year = unixTimestamp.getFullYear();
                            var months = unixTimestamp.getMonth() + 1;
                            var days = unixTimestamp.getDate();
                            var hours = unixTimestamp.getHours();
                            var minutes = unixTimestamp.getMinutes();
                            var seconds = unixTimestamp.getSeconds();
                            var commonTime = year + "/" + this_.add0(months) + "/" + this_.add0(days)+" "+this_.add0(hours)+":"+this_.add0(minutes)+":"+this_.add0(seconds);
                            list[i].createTime = commonTime;
                        }
                    }
                } else {

                }
            })
        },
        add0(m){
            return m<10?'0'+m:m
        },
        // 查看物流
        check_logistics(order_id){
            location.href = `#/order_track/${order_id}`;
        },
        // 待支付
        ajax_pay() {
            this.init_page_no();
            this.payList = [];
            this.on_order_load(4, this.payList, this.paypageNo);
        },
        // 已取消
        ajax_cancel() {
            this.init_page_no();
            this.cancelList = [];
            this.on_order_load(2, this.cancelList, this.cancelpageNo);
        },
        // 待收货
        ajax_receive() {
            this.init_page_no();
            this.receiveList = [];
            this.on_order_load(1, this.receiveList, this.receivepageNo);
        },
        //  已完成
        ajax_over() {
            this.init_page_no();
            this.overList = [];
            this.on_order_load(6, this.overList, this.overpageNo);
        },
        // 初始化所有的pageNO 切换后所有的pageNo都是0
        init_page_no() {
            this.allpageNo = 0;
            this.paypageNo = 0;
            this.receivepageNo = 0;
            this.cancelpageNo = 0;
            this.overpageNo = 0;
        }
   }
}
</script>
<style lang="stylus" scoped>
.myOrder >>> .van-tabs__content
    min-height 200px
.myOrder >>> .van-tab--active
        color red
.myOrder >>> .van-nav-bar
        position fixed
        top 0
        left 0
        right 0
        background #fff
.myOrder >>> .van-tabs__wrap
        position fixed
        top 46px
        left 0
        right 0
        background #fff
.myOrder
    font-size 14px
    padding-top 46px
    .order_detail
        color #333
        .detail_top
            height 40px
            display flex
            align-items center
            justify-content space-between
            padding 0 15px 0 10px
            border-bottom 1px solid #E2E2E2
            p
                display flex
                align-items center
                img
                    display block
                    width 23px
                    height 23px
            .top_state
                color #00A2EB
        .detail_content
            font-size 20px
            width 100%
            box-sizing border-box
            display flex
            justify-content space-between
            align-items center
            padding 15px 18px 15px 28px
            border-bottom 1px solid #E2E2E2
            .detail_img
                max-width 98px
                min-width 80px
                max-height 98px
                min-height 80px
                width 98px
                height 98px
                margin-right 31px
                img
                    max-height 98px
                    min-height 80px
                    width 98px
                    height 98px
                    max-width 98px
                    min-width 80px
            .detail_info
                flex 1
                letter-spacing .6px
                .goods_title
                    font-size 14px
                    line-height 20px
                    color #333
                    margin-bottom 10px
                    word-break break-all
                    text-overflow ellipsis
                    display -webkit-box
                    -webkit-box-orient vertical
                    -webkit-line-clamp 3
                    overflow hidden
                .goods_info
                    font-size 12px
                    color #666666
                    margin-bottom 14px
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
        .all_price
                text-align right
                height 40px
                line-height 40px
                border-bottom 1px solid #E2E2E2
                font-size 13px
                color #333
                padding 0 27px
                span:nth-child(1)
                    margin-right 0px
        .order_state
            height 50px
            border-bottom 1px solid #E2E2E2
            line-height 50px
            padding 0 27px
            text-align right
            button
                height 33px
                line-height 33px
                border 1px solid #555555
                border-radius 3px
                padding 0
                width 82px
                background #fff
                font-size 13px
                color #333
            button:nth-child(2)
                margin-left 12px
            .button_pay
                color #DE1E1D
                border 1px solid #DE1E1D
</style>
