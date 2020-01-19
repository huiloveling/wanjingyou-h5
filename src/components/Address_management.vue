<template>
    <div class="address">
         <van-nav-bar title="收货地址">
            <span slot="left" class="iconfont" @click="toback">&#xe6dc;</span>
            <span slot="right" style="color:#333;" @click="to_handle()">管理</span>
        </van-nav-bar>
        <ul class="address_list">
            <li v-for="(i, index) in address_list" @click='handleUpdateClick(i)'>
                <p class="base_info">
                    <span>{{i.userName}}</span><span>{{i.userPhone}}</span>
                </p>
                <p class="address_info">
                   <span class="default_address" v-show="i.isDefault==1">默认</span>
                   地址：{{i.province}}{{i.city}}{{i.county}}{{i.town}}{{i.address}}
                   <!-- <img src="./../assets/edit.png" alt="" @click="toEdit(i.userName,i.address,i.province,i.city,i.county,i.userPhone,i.cityCode,i.countyCode,i.provinceCode,i.townCode,i.town,i.isDefault,i.userAddressId,'edit')"> -->
                </p>
            </li>
        </ul>
        <div v-show="address_list.length==0" class="no_address">
            <img src="./../assets/no_address.png" alt="">

        </div>
        <div class="add_new_address">
            <van-button type="danger" @click="to_add_address">新增地址</van-button>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import fatch from './../common/js/fatch'
import { commonParams, api } from './../common/js/config'
import { isLogin } from './../common/js/utils'
import Storage from './../common/js/storage'
export default {
    data() {
        return {
            chosenAddressId: '1',
            address_list: [],
            radio: '1'
        }
    },
    mounted(){
        if (!isLogin()) {
            Storage.set({login_path: this.$route.path })
            this.$router.push({ path: '/login' });
            return;
        }
        const url = `${api}userAddress/obtain`;
        const params = Object.assign({}, commonParams(true), {
            timestamp: new Date().getTime(),
            sign: ''
        });
        fatch(url, 'get', params, (err, state) => {
            this.searchLoading = false;
            this.pullUpText = '没有数据了...';
        }).then((res) => {
            if (res.code === '0') {
                if (res.data === null) return;
                console.log(res.data.selectAll)
                this.address_list = res.data.selectAll;
            } else {
                console.log(res);
            }
        });
    },
    methods: {
        handleUpdateClick(data) {
            Storage.set({updateCity: data});
            this.$router.push({ path: '/goodsOrder' });
        },
        toEdit(username,address,province,city,county,userPhone,cityCode,countyCode,provinceCode,townCode,town,isDefault,userAddressId,index) {
            const edit_info = {
                "username":username,
                "address":address,
                "province":province,
                "city":city,
                "county":county,
                "userPhone":userPhone,
                "cityCode":cityCode,
                "countyCode":countyCode,
                "provinceCode":provinceCode,
                "townCode":townCode,
                "town":town,
                "isDefault":isDefault,
                "userAddressId":userAddressId,
                "index":index,
            };
            Storage.set("edit_info",edit_info);
            location.href = `#/edit_address`;
        },
        toback(){
            window.history.go(-1);
        },
        to_add_address(){
            location.href = `#/add_address`;
        },
        to_handle(){
            location.href = `#/address_handle`;
        }
    }
}
</script>
<style lang="stylus" scoped>
.address
    height 100vh
    width 100vw
    min-width 275px
    max-width 640px
    background #F3F2F0
    position relative
    font-size 16px
    color #333
    .iconfont
        font-size 14px
        color #999
    .van-nav-bar
        .van-nav-bar__left
            .van-icon
                color:#333
        .van-icon
            color:#333 !important
    .no_address
        padding 42px 15px 0 9px
        img
            width 100%
    .address_list
        overflow-y auto
        padding-bottom 80px
        li
            font-size 14px
            padding 5px 15px 12px 15px
            background #fff
            border-bottom 1px solid #ebedf0
            max-height 90px
            position relative
            .base_info
                padding 12px 0 8px 0
                font-size 15px
                span:nth-child(1)
                    margin-right 12px
            .address_info
                font-size 13px
                width 100%
                min-width 246px
                color #666
                line-height 20px
                overflow hidden
                text-overflow ellipsis
                word-break break-all;
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical
                .default_address
                    height 20px
                    width 40px
                    color #03A0E8
                    border 1px solid #03A0E8
                    display inline-block
                    line-height 20px
                    text-align center
                    margin-right 9px
                    font-size 14px
                .img
                    position absolute
                    right 15px
                    width 20px
                    height 20px
                    top 35px
    .add_new_address
        position fixed
        max-width 640px
        margin 0 auto
        left 0
        right 0
        z-index 99999
        font-size 17px
        text-align center
        color #fff
        bottom 0
        height 80px
        background-color #fff
        display flex
        justify-content center
        align-items center
        button
            line-height 44px
            border-radius 44px
            width 80%
</style>
