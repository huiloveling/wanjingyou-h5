<template>
    <div class="track_wrap">
        <van-nav-bar title="订单跟踪">
            <span slot="left" class="iconfont" @click="toback">&#xe6dc;</span>
        </van-nav-bar>
        <div class="more_goods" v-show="trackInfo.orderGoods.length>1">
            因订单中商品在不同仓库，故按<span>{{trackInfo.orderGoods.length}}</span>个包裹发货
        </div>
        <van-tabs v-model="active" class="goods_tab" swipeable>
            <van-tab v-for="(item,index) in trackInfo.orderGoods">
                <div class="tab-title" slot="title" @click="track_change(item,index)">{{item.titles}}</div>
                <div class="goods_img_wrap">
                    <img :src="good.imagePath" alt=""v-for="good in item.orderList">
                </div>
                <p class="track_num">运单号：{{trackLists[0].channelOrderId}}</p>
                <div>
                    <div class="express_company">
                        <p>快递公司：<span>{{trackLists[0].express}}</span></p>
                    </div>
                    <van-steps direction="vertical" :active="0" active-color="#0497D9">
                        <van-step v-for="(track,index) in trackLists">
                            <h3 style="font-size:14px;">{{track.content}}</h3>
                            <p style="margin-top:4px;font-size:12px;color:#666666">{{track.msgTime}}</p>
                        </van-step>
                    </van-steps>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import fatch from './../../common/js/fatch'
import { commonParams, api } from './../../common/js/config'
import { isLogin } from './../../common/js/utils'
import Storage from './../../common/js/storage'
export default {
    data(){
        return{
            order_id:null,
            active:0,
            trackInfo:{
                company:"圆通速递",
                orderGoods:[],
            },
            channelOrderId:[],
            trackLists:[]
        }
    },
    mounted(){
        if (!isLogin()) {
            Storage.set({login_path: this.$route.path })
            this.$router.push({ path: '/login' });
            return;
        }
        this.order_id = this.$route.params.item;
        const params = Object.assign({}, commonParams(true), {
            orderId:this.order_id,
        });
        const url = `${api}message/orderTrackChannelOrder`;
        fatch(url, 'get', params, (err, state) => {
        }).then((res) => {
            if (res.code === '0') {
                for(var i=0;i<res.data.length;i++){
                    this.channelOrderId.push(res.data[i]);
                }
                this.ajax_request(this.channelOrderId);
            } else {
                console.log(res);
            }
        });
    },
    methods:{
        track_change(item,index){
            const url = `${api}message/getOrderTrack`;
            const params = Object.assign({}, commonParams(true), {
                orderId:this.order_id,
                channelOrderId:this.channelOrderId[index],
            });
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                console.log(res);
                if (res.code == '0') {
                        this.trackLists=res.data.orderTrack;
                        for(var i=0;i<this.trackLists.length;i++){
                            var unixTimestamp = new Date(this.trackLists[i].msgTime) ;
                            var year = unixTimestamp.getFullYear();
                            var months = unixTimestamp.getMonth() + 1;
                            var days = unixTimestamp.getDate();
                            var hours = unixTimestamp.getHours();
                            var minutes = unixTimestamp.getMinutes();
                            var seconds = unixTimestamp.getSeconds();
                            if(months<10){
                                months = "0"+months;
                            }
                            if(days<10){
                                days = "0"+days;
                            }
                            if(hours<10){
                                hours = "0"+hours;
                            }
                            if(minutes<10){
                                minutes = "0"+minutes;
                            }
                            if(seconds<10){
                                seconds = "0"+seconds;
                            }
                            var commonTime = year + "/" + months + "/" + days+" "+hours+":"+minutes+":"+seconds;
                            this.trackLists[i].msgTime = commonTime;
                        }
                        console.log(this.trackLists)
                } else {
                    console.log(res);
                }
            });
        },
        toback(){
            window.history.go(-1);
        },
        ajax_request(list){
            this.channelOrderId = list;
            for(var i=0;i<this.channelOrderId.length;i++){
                const url = `${api}message/getOrderTrack`;
                const params = Object.assign({}, commonParams(true), {
                    orderId:this.order_id,
                    channelOrderId:this.channelOrderId[i],
                });
                fatch(url, 'get', params, (err, state) => {
                }).then((res) => {
                    console.log(res);
                    if (res.code == '0') {
                            this.trackInfo.orderGoods.push({orderList:res.data.orderGoods});
                            for(var i= 0;i<this.trackInfo.orderGoods.length;i++){
                                this.trackInfo.orderGoods[i].titles="包裹"+(i+1);
                            }
                            console.log(this.trackInfo);
                    } else {
                        console.log(res);
                    }
                });
            }
            const url = `${api}message/getOrderTrack`;
            const params = Object.assign({}, commonParams(true), {
                orderId:this.order_id,
                channelOrderId:this.channelOrderId[0],
            });
            console.log(params);
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                if (res.code == '0') {
                        this.trackLists=res.data.orderTrack;
                        for(var i=0;i<this.trackLists.length;i++){
                            var unixTimestamp = new Date(this.trackLists[i].msgTime) ;
                            var year = unixTimestamp.getFullYear();
                            var months = unixTimestamp.getMonth() + 1;
                            var days = unixTimestamp.getDate();
                            var hours = unixTimestamp.getHours();
                            var minutes = unixTimestamp.getMinutes();
                            var seconds = unixTimestamp.getSeconds();
                            if(months<10){
                                months = "0"+months;
                            }
                            if(days<10){
                                days = "0"+days;
                            }
                            if(hours<10){
                                hours = "0"+hours;
                            }
                            if(minutes<10){
                                minutes = "0"+minutes;
                            }
                            if(seconds<10){
                                seconds = "0"+seconds;
                            }
                            var commonTime = year + "/" + months + "/" + days+" "+hours+":"+minutes+":"+seconds;
                            this.trackLists[i].msgTime = commonTime;
                        }
                } else {
                    console.log(res);
                }
            });
    }
    }
}
</script>
<style lang="stylus" scoped>
.track_wrap >>>.van-tabs__nav
    padding 0 15px
    .van-tabs__line
        display none
    .van-tab
        width 16%
        flex none
        margin-right 10px
    .van-tab--active
        border-bottom 2px solid #DE1E1D
.track_wrap >>>.van-tab__pane
    padding 0 15px
    background #fff
    padding-top 6px
    .goods_img_wrap
        padding 0 4px
        img
            width 60px
            height 60px
            margin-right 4px
    .track_num
        padding 4px 0 8px 0
        font-size 14px
        color #333
        border-bottom 1px dashed #ebedf0
    .express_company
        background #fff
        p
            border-bottom 1px dashed #ebedf0
            border-top 1px dashed #ebedf0
            font-size 14px
            color #333
            height 40px
            line-height 40px
.track_wrap
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
    .more_goods
        height 45px
        display flex
        align-items center
        padding 0 15px
        font-size 15px
        background #fff
        margin-bottom 10px
</style>
