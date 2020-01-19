<template>
    <div class="address">
         <van-nav-bar title="地址管理">
            <span slot="left" class="iconfont" @click="toback">&#xe6dc;</span>
        </van-nav-bar>
        <ul class="address_list">
            <li v-for="(i, index) in address_list">
                <p class="base_info" @click="show_default(i.isDefault,i.userAddressId)">
                    <span>{{i.userName}}</span><span>{{i.userPhone}}</span>
                </p>
                <p class="address_info" @click="show_default(i.isDefault,i.userAddressId)">
                    地址：{{i.province}}{{i.city}}{{i.county}}{{i.town}}{{i.address}}
                </p>
                <div class="icon_wrap">
                    <li>
                        <img src="./../assets/default_icon.png" alt="" v-show="i.isDefault==1" @click="show_default(i.isDefault,i.userAddressId)"><span v-show="i.isDefault==1">默认地址</span>
                        <img src="./../assets/no_icon.png" alt="" @click="show_default(i.isDefault,i.userAddressId)" v-show="i.isDefault==0"><span v-show="i.isDefault==0">默认地址</span>
                    </li>
                    <li>
                        <img src="./../assets/edit_icon.png" alt="" @click="edit_address(i.userName,i.address,i.province,i.city,i.county,i.userPhone,i.cityCode,i.countyCode,i.provinceCode,i.townCode,i.town,i.isDefault,i.userAddressId,'edit')">
                        <span class="one_span">编辑</span>
                        <img src="./../assets/del_icon.png" alt="" @click="delete_address(i.userAddressId)">
                        <span>删除</span>
                    </li>
                </div>
            </li>
        </ul>
        <div v-show="address_list.length==0" class="no_address">
            <img src="./../assets/no_address.png" alt="">
        </div>
        <div class="add_new_address">
            <van-button type="danger" @click="to_add_address('add')">新增地址</van-button>
        </div>
    </div>
</template>
<script>
import fatch from './../common/js/fatch'
import { commonParams, api } from './../common/js/config'
import { isLogin } from './../common/js/utils'
import Storage from  './../common/js/storage'
export default {
    data() {
        return {
            chosenAddressId: '1',
            address_radio:'1',
            address_list: [],
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
        refresh(){
            const url = `${api}userAddress/obtain`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
            });
            fatch(url, 'get', params, (err, state) => {

            }).then((res) => {
                if (res.code === '0') {
                    if (res.data === null) return;
                    this.address_list = res.data.selectAll;
                } else {
                }
            });
        },
        toback(){
            window.history.go(-1);
        },
        to_add_address(item) {
            location.href = `#/add_address`;
        },
        show_default(item, id) {
            if(item==1){
                return;
            }
            const url = `${api}userAddress/isDefault`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                id: id,
                isDefault: item === 0 ? 1 : 0
            });
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                console.log(res);
                if (res.code === '0') {
                    this.refresh();
                } else {
                }
            });
        },
        delete_address(id){
            this.$dialog.confirm({
                message: '确定删除此地址吗？'
            }).then(() => {
                const url = `${api}userAddress/deleteAddress`;
                const params = Object.assign({}, commonParams(true), {
                    timestamp:new Date().getTime(),
                    sign:"",
                    id:id,
                });
                fatch(url, 'get', params, (err, state) => {
                }).then((res) => {
                    if (res.code === '0') {
                        this.refresh();
                        this.$toast(res.msg);
                    } else {
                        this.$toast(res.msg);
                    }
                });
            }).catch(() => {
                this.$toast("已取消")
            });
        },
        edit_address(username,address,province,city,county,userPhone,cityCode,countyCode,provinceCode,townCode,town,isDefault,userAddressId,index) {
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
    .van-nav-bar
        .van-nav-bar__left
            .van-icon
                color:#333
        .iconfont
            font-size 14px
            color #999
    .no_address
        padding 42px 15px 0 9px
        img
            width 100%
    .address_list
        overflow-y auto
        padding-bottom 80px
        li
            font-size 14px
            padding 2px 15px
            background #fff
            border-bottom 1px solid #ebedf0
            position relative
            .base_info
                padding 12px 0 8px 0
                font-size 15px
                span:nth-child(1)
                    margin-right 12px
            .address_info
                font-size 13px
                color #666
                margin-bottom 10px
                line-height 20px
                overflow hidden
                text-overflow ellipsis
                display -webkit-box
                -webkit-line-clamp 2
                -webkit-box-orient vertical
            .icon_wrap
                display flex
                justify-content space-between
                align-items center
                height 45px
                border-top 1px dashed #ebedf0
                li
                    border none
                    padding 0
                li:nth-child(1)
                    display flex
                    align-items center
                    img
                        width 30px
                        height 30px
                li:nth-child(2)
                    display flex
                    align-items center
                    img
                        width 30px
                        height 30px
                    span
                        color #00A2EB
                        font-size 14px
                    .one_span
                        margin-right 14px
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
