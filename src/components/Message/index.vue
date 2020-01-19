<template>
    <div class="messageWrap">
        <van-nav-bar title="消息">
            <span slot="left" class="iconfont" @click="toback">&#xe6dc;</span>
        </van-nav-bar>
        <van-tabs v-model="active" @click="tabMessage">
            <van-tab title="系统公告">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    :immediate-check="false"
                    finished-text="没有更多了"
                    @load="onLoad"
                    >
                    <ul class="sysList">
                        <li v-for="(item,index) in sysInfoList" @click="look_sys_notice(item.title,item.id)">
                            <div class="code">
                                <img src="./../../assets/email.png" alt="" v-show="item.state==1">
                                <img src="./../../assets/email_none.png" alt="" v-show="item.state==0">
                                <p>{{item.title}}</p>
                            </div>
                            <p class="info_time">{{item.createTime}}</p>
                        </li>
                    </ul>
                </van-list>
            </van-tab>
            <van-tab title="物流消息">
                <van-list
                    v-model="loading2"
                    :finished="finished2"
                    :immediate-check="false"
                    finished-text="没有更多了"
                    @load="onLoad2"
                    >
                    <ul class="allList">
                        <li v-for="(item,index) in logisticsList" @click="toOrderTrack(item.orderId)">
                            <p class="info_time">{{item.msgTime}}</p>
                            <div class="content">
                                <p class="send_info">发货提醒</p>
                                <div class="info_content">
                                    <div class="imgs">
                                        <img :src="item.imageUrl" alt="">
                                    </div>
                                    <div class="code">
                                        {{item.content}}

                                    </div>
                                    <label class="iconfont">&#xe600;</label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </van-list>
            </van-tab>
            <van-tab title="推送通知">
                <van-list
                    v-model="loading3"
                    :finished="finished3"
                    :immediate-check="false"
                    finished-text="没有更多了"
                    @load="onLoad3"
                    >
                    <ul class="pushList">
                        <li v-for="(item,index) in pushInfoList">
                            <div class="info_time">
                                <img src="./../../assets/ball_none.png" alt="">
                                <p>{{item.title}}</p>
                            </div>
                            <div class="content">
                                <div class="code">
                                    {{item.content}}
                                </div>
                                <p class="times">{{item.sendTime}}</p>
                            </div>
                        </li>
                    </ul>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import Vue from 'vue';
import fatch from './../../common/js/fatch'
import { commonParams, api } from './../../common/js/config'
import Storage from './../../common/js/storage'
import { isLogin } from './../../common/js/utils'
export default {
    data(){
        return{
            active:0,
            nowpage:1,
            pushpage:1,
            logisticspage:1,
            sysInfoList:[],
            pushInfoList:[],
            logisticsList:[],
            loading: false,
            finished: false,
            loading2: false,
            finished2: false,
            loading3: false,
            finished3: false
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
    methods:{
        // 查看系统公告消息
        look_sys_notice(item,id){
            console.log(id);
            const url = `${api}article/getDetails`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                id: id,
                sign: "",
            });
            fatch(url, 'get', params, (err, state) => {

            }).then((res) => {
                const result = res.data;
                console.log(res);
                if (res.code === '0') {
                    this.$router.push({
                        name: 'showContent',
                        params: {
                          id: res.data.content,
                          title: item
                        }
                    })
                } else {

                }
            });
        },
        // 查看物流
        toOrderTrack(order_id){
            location.href = `#/order_track/${order_id}`;
        },
        toback(){
            window.history.go(-1);
        },
        tabMessage(index,title){
            if(index==0){
                this.nowpage = 1;
                this.refresh();
            }else if(index==1){
                this.logisticspage = 1;
                this.refresh2();
            }else if(index==2){
                this.pushpage = 1;
                this.refresh3();
            }
        },
        onLoad() {
            this.nowpage+=1;
            const url = `${api}article/getArticle`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                pageNo: this.nowpage,
                pageSize: 20,
                sign: "",
            });
            fatch(url, 'get', params, (err, state) => {

            }).then((res) => {
                const result = res.data;
                if (res.code === '0') {
                    console.log(res);
                    this.loading = false;
                    if(res.data.getArticle.length>0){
                        for(var i=0;i<res.data.getArticle.length;i++){
                            this.sysInfoList.push(res.data.getArticle[i]);
                        }
                    }else{
                        this.finished = true;
                    }

                } else {

                }
            });
        },
        onLoad2() {
            this.logisticspage+=1;
            const url = `${api}message/orderTrack`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                pageNo:this.logisticspage,
                pageSize:20,
                sign: "",
            });
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                if (res.code === '0') {
                    console.log(res);
                    this.loading2 = false;
                    if(res.data.result.length>0){
                        for(var i=0;i<res.data.result.length;i++){
                            var unixTimestamp = new Date(res.data.result[i].msgTime) ;
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
                            res.data.result[i].msgTime = commonTime;
                            this.logisticsList.push(res.data.result[i]);
                        }
                    }else{
                        this.finished2 = true;
                    }
                } else {

                }
            });
        },
        onLoad3() {
            this.pushpage+=1;
            console.log("3");
            const url = `${api}message/sysMessage`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                pageNo:this.pushpage,
                pageSize:20,
                sign: "",
            });
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                if (res.code === '0') {
                    console.log(res);
                    this.loading3 = false;
                    if(res.data.length>0){
                        for(var i=0;i<res.data.length;i++){
                            var unixTimestamp = new Date(res.data[i].sendTime) ;
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
                            res.data[i].sendTime = commonTime;
                            this.pushInfoList.push(res.data[i]);
                        }
                        console.log(this.pushInfoList);
                    }else{
                        this.finished3 = true;
                    }
                } else {
                    this.$toast(res.msg);
                    this.loading3 = false;
                    this.finished3 = true;
                }
            });
        },
        refresh(){
            const url = `${api}article/getArticle`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                pageNo:1,
                pageSize:20,
                sign: "",
            });
            fatch(url, 'get', params, (err, state) => {

            }).then((res) => {
                const result = res.data;
                if (res.code === '0') {
                    console.log(res);
                    this.sysInfoList = res.data.getArticle;
                } else {

                }
            });
        },
        refresh2(){
            const url = `${api}message/orderTrack`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                pageNo:1,
                pageSize:20,
                sign: "",
            });
            fatch(url, 'get', params, (err, state) => {

            }).then((res) => {
                const result = res.data;
                if (res.code === '0') {
                    console.log(res);
                    this.loading2 = false;
                    if(res.data.result.length>0){
                        this.logisticsList= res.data.result;
                        for(var i=0;i<this.logisticsList.length;i++){
                            var unixTimestamp = new Date(this.logisticsList[i].msgTime) ;
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
                            this.logisticsList[i].msgTime = commonTime;
                        }
                    }else{
                        this.finished2 = true;
                    }
                } else {

                }
            });
        },
        refresh3(){
            const url = `${api}message/sysMessage`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                pageNo:1,
                pageSize:20,
                sign: "",
            });
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                const result = res.data;
                if (res.code === '0') {
                    console.log(res);
                    this.loading3 = false;
                    if(res.data.length>0){
                        this.pushInfoList= res.data;
                        for(var i=0;i<this.pushInfoList.length;i++){
                            var unixTimestamp = new Date(this.pushInfoList[i].sendTime);
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
                            this.pushInfoList[i].sendTime = commonTime;
                        }
                    }else{
                        this.finished3 = true;
                    }
                } else {

                }
            });
        }
    }
}
</script>
<style lang="stylus" scoped>
.messageWrap>>>.van-tab--active
    color red
.messageWrap>>>.van-nav-bar
        position fixed
        top 0
        z-index 99
        left 0
        right 0
.messageWrap>>>.van-tabs__wrap
        position fixed
        top 46px
        left 0
        right 0
.messageWrap
    font-size 16px
    padding-top 46px
    width 100vw
    height 100%
    background #F3F2F0
    min-height 100vh
    box-sizing: border-box;
    color #333
    .iconfont
        font-size 14px
        color #999
    .pushList
        margin-top 10px
        li
            background #fff
            position relative
            margin-bottom 12px
            padding-bottom 10px
            .info_time
                padding 0 15px
                display flex
                align-items center
                height 45px
                position relative
                img
                    width 21px
                    height 21px
                p
                    margin-left 9px
                    font-size 14px
                    width 180px
                    text-overflow ellipsis
                    overflow hidden
                    white-space nowrap
            .info_time:before
                content: "";
                position: absolute;
                top: -50%;
                bottom: -50%;
                left: -50%;
                right: -50%;
                width: 200%;
                height: 200%;
                -webkit-transform: scale(0.5);
                transform: scale(0.5);
                border-bottom: 1px solid #ebedf0;
            .content
                padding 14px 19px 4px 45px
                font-size 13px
                .times
                    display flex
                    justify-content flex-end
                .code
                    line-height 20px
        li:before
                content: "";
                position: absolute;
                top: -50%;
                bottom: -50%;
                left: -50%;
                right: -50%;
                width: 200%;
                height: 200%;
                -webkit-transform: scale(0.5);
                transform: scale(0.5);
                border-bottom: 1px solid #ebedf0;
    .sysList
        background #fff
        padding-top 0px
        li
            height 50px
            display flex
            align-items center
            justify-content space-between
            position relative
            margin 0 15px
            font-size 14px
            .code
                height 40px
                display flex
                align-items center
                p
                    width 160px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    margin-left 9px
                img
                    width 38px
                    height 38px
        li:before
            content: "";
            position: absolute;
            top: -50%;
            bottom: -50%;
            left: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
            border-bottom: 1px dashed #ebedf0;
        li:last-child:before
            border none
    .allList
        padding 13px 0
        li
            margin 0px 15px 10px 15px
            background #fff
            padding-bottom 12px
            border-radius 8px
            .info_time
                font-size 14px
                height 44px
                line-height 44px
                border-bottom 1px solid #D1D1D0
                padding 0 19px
            .content
                height 100px
                padding 0 19px
                .send_info
                    color #00A2EB
                    font-size 15px
                    padding-bottom 4px
                    margin-top 13px
                .info_content
                    display flex
                    justify-content space-between
                    align-items center
                    height 84px
                    position relative
                    .code
                        font-size 12px
                        line-height 20px
                        color #525252
                        letter-spacing .4px
                        padding-right 12px
                        word-wrap none
                        word-break break-all
                        display flex
                        align-items center
                        display -webkit-box
                        -webkit-line-clamp 3
                        -webkit-box-orient vertical
                        overflow hidden
                    .iconfont
                        position absolute
                        right -6px
                        font-size 20px
                        top 32px
                    .imgs
                        display flex
                        align-items center
                        width 65px
                        height 65px
                        img
                            height 65px

</style>
