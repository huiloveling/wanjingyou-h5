<template>
    <div class="edit_address">
        <van-nav-bar title="编辑地址" left-arrow>
            <span slot="left" class="iconfont" @click="toback">&#xe6dc;</span>
        </van-nav-bar>
        <ul class="edit_detail">
            <li>
                <span>姓名：</span>
                <input type="text" placeholder="收货人姓名" v-model="user_info.username">
            </li>
            <li>
                <span>联系电话：</span>
                <input type="text" placeholder="收货人联系电话" maxlength="11" v-model="user_info.userphone">
            </li>
            <li>
                <span>所在地区：</span>
                <p @click="show_address_click(1)" class="detail_address">{{this.ok_address_content}}</p>
                <p @click="show_address_click(1)" class="please_choose">
                    <label>请选择</label>
                    <label class="iconfont">&#xe600;</label>
                </p>
            </li>
            <li>
                <span>详细地址：</span>
                <input type="text" placeholder="街道、门牌号等" v-model="user_info.userdetail">
            </li>
        </ul>
        <van-popup v-model="show_address" position="bottom" :overlay="true" class="pop_choose">
            <div class="title_bar">
                <span @click="cancel_address()">取消</span>
                <span @click="ok_address()">确认</span>
            </div>
            <div class="choose_btn">
                <button @click="choose_provincelist(1)" :class="now_area==1?'active':null">{{provincename}}</button>
                <button @click="choose_citylist(2)" :class="now_area==2?'active':null">{{cityname}}</button>
                <button @click="choose_arealist(3)" :class="now_area==3?'active':null">{{areaname}}</button>
                <button @click="choose_townlist(4)" :class="now_area==4?'active':null">{{townname}}</button>
            </div>
            <ul v-show="area_show">
                <li v-for="(item,index) in cityList" @click="choose_city_ok(item.code,item.name,now_id)">{{item.name}}</li>
            </ul>
        </van-popup>
        <button class="save_btn" @click="save_address">保存并使用</button>
    </div>
</template>
<script>
import addressList from './addressList.json'
import fatch from './../common/js/fatch'
import { commonParams, api } from './../common/js/config'
import { isLogin } from './../common/js/utils'
import Storage from './../common/js/storage'
export default {
    data() {
        return {
            show_address:false,
            address_title:"",
            user_info:{
                username:"",
                userphone:"",
                userdetail:"",
                provinceCode:"",
                cityCode:"",
                countyCode:"",
                townCode:"",
            },
            searchResult: [],
            area_show:false,
            now_id:1,
            cityCode:"",
            countyCode:"",
            townCode:"",
            value:"",
            provincename:"选择省",
            cityname:"选择市",
            areaname:"选择区",
            townname:"选择镇",
            address_checked:false,
            ok_address_content:"",
            cityList:[],
            now_area:1,
        }
    },
    mounted(){
        if (!isLogin()) {
            Storage.set({login_path: this.$route.path })
            this.$router.push({ path: '/login' });
            return;
        }
        const edit_info = Storage.get("edit_info");
        this.user_info.username = edit_info.username;
        this.user_info.userphone = edit_info.userPhone;
        this.user_info.provinceCode = edit_info.provinceCode;
        this.user_info.cityCode = edit_info.cityCode;
        this.user_info.countyCode = edit_info.countyCode;
        this.user_info.userdetail = edit_info.address;
        this.user_info.townCode = edit_info.townCode;
        this.user_info.userAddressId = edit_info.userAddressId;
        this.user_info.isDefault = edit_info.isDefault;
        this.provincename = edit_info.province;
        this.cityname = edit_info.city;
        this.areaname = edit_info.county;
        if(edit_info.town==""){
            this.townname = "请选择";
        }else{
            this.townname = edit_info.town;
        }
            this.ok_address_content = edit_info.province+edit_info.city+edit_info.county+edit_info.town;
    },
    methods: {
        cancel_address(){
            this.show_address = false;
        },
        ok_address(){
            if(this.provincename=="选择省"){
                this.$toast("请先选择省");
                return;
            }
            if(this.cityname=="选择市"){
                this.$toast("请先选择市");
                return;
            }
            if(this.areaname=="选择区"){
                this.$toast("请先选择区");
                return;
            }
            this.show_address = false;
            if(this.townname=="请选择"){
                this.ok_address_content = this.provincename+this.cityname+this.areaname;
            }else{
                this.ok_address_content = this.provincename+this.cityname+this.areaname+this.townname;
            }
        },
        toback(){
            window.history.go(-1);
        },
        show_address_click(item){
            this.show_address = true;
            if(item==1){
                this.choose_provincelist(1);
            }else if(item==2){
                this.choose_citylist(2);
            }else if(item==3){
                this.choose_arealist(3);
            }else if(item==4){
                this.choose_townlist(4);
            }

        },
        errorData(){
            this.show_address = false;
        },
        onfirm(value){
            this.show_address = false;
            if(value[0].name==value[1].name){
                this.ok_address_content = value[0].name+'/'+value[2].name;
            }else{
                this.ok_address_content = value[0].name+"/"+value[1].name+"/"+value[2].name;
            }
        },
        save_address(){
            if(this.user_info.username==''){
                this.$toast("请填写收货人姓名");
                return;
            }
            if(this.user_info.userphone==''){
                this.$toast("请填写收货人联系方式");
                return;
            }
            if(!(/^1[345789]\d{9}$/.test(this.user_info.userphone))){
                this.$toast("手机号码有误，请重填");
                return;
            }
            if(this.user_info.provinceCode==''){
                this.$toast("请选择收货地区");
                return;
            }
            if(this.user_info.cityCode==''){
                this.$toast("请选择收货地区");
                return;
            }
            if(this.user_info.countyCode==''){
                this.$toast("请选择收货地区");
                return;
            }
            if(this.user_info.userdetail==''){
                this.$toast("请填写收货人详细地址");
                return;
            }
            console.log(this.user_info)
            if(this.address_checked==true){
                this.address_checked=0;
            }else{
                this.address_checked==0;
            }
            const url = `${api}userAddress/updateAddress`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                address: this.user_info.userdetail,
                cityCode: this.user_info.cityCode,
                countyCode: this.user_info.countyCode,
                isDefault: this.user_info.isDefault,
                provinceCode: this.user_info.provinceCode,
                townCode: this.user_info.townCode,
                userName: this.user_info.username,
                userPhone: this.user_info.userphone,
                id: this.user_info.userAddressId,
                sign: ''
            });
            console.log(params);
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                if (res.code === '0') {
                    console.log(res)
                    this.$toast(res.msg);
                    window.history.go(-1);
                } else {
                    this.$toast(res.msg);
                }
            });
        },
        choose_city_ok(item,name,id){
            console.log(item);
            console.log(name);
            console.log(id);
            this.area_show = false;
            if(id==1){
                this.provincename = name;
                this.cityname = "请选择";
                this.areaname = "请选择";
                this.cityCode = item;
                this.user_info.provinceCode = item;
                this.choose_citylist(2);
            }else if(id==2){
                this.cityname = name;
                this.areaname = "请选择";
                this.countyCode = item;
                this.user_info.cityCode = item;
                this.choose_arealist(3);
            }else if(id==3){
                this.areaname = name;
                this.townname = "请选择";
                this.townCode = item;
                this.user_info.countyCode = item;
                this.choose_townlist(4);
            }else if(id==4){
                this.townname = name;
                this.user_info.townCode = item;
            }
        },
        choose_provincelist(id){
            this.now_area = 1;
            this.parentCode = "";
            console.log(id);
            const url = `${api}userAddress/getProvince`;
            const params = Object.assign({}, commonParams(), {
                timestamp:new Date().getTime(),
                sign:"",
            });
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                if (res.code === '0') {
                    console.log(res);
                    this.cityList = res.data;
                } else {
                    console.log(res);
                }
            });
            this.area_show = true;
            this.now_id = id;
        },
        choose_citylist(id){
            this.now_area = 2;
            if(this.provincename=="请选择"){
                this.$toast("请先选择省");
                return;
            }
            const url = `${api}userAddress/getNextArea`;
            const params = Object.assign({}, commonParams(), {
                timestamp:new Date().getTime(),
                sign:"",
                parentCode:this.cityCode,
            });
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                if (res.code === '0') {
                    console.log(res);
                    this.cityList = res.data;
                } else {
                    console.log(res);
                }
            });
            this.area_show = true;
            this.now_id = id;
        },
        choose_arealist(id){
            this.now_area = 3;
            if(this.provincename=="请选择"){
                this.$toast("请先选择省");
                return;
            }
            if(this.cityname=="请选择"){
                this.$toast("请先选择市");
                return;
            }
            const url = `${api}userAddress/getNextArea`;
            const params = Object.assign({}, commonParams(), {
                timestamp:new Date().getTime(),
                sign:"",
                parentCode:this.countyCode,
            });
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                if (res.code === '0') {
                    console.log(res);
                    this.cityList = res.data;
                } else {
                    console.log(res);
                }
            });
            this.area_show = true;
            this.now_id = id;
        },
        choose_townlist(id){
            this.now_area = 4;
            if(this.provincename=="请选择"){
                this.$toast("请先选择省");
                return;
            }
            if(this.cityname=="请选择"){
                this.$toast("请先选择市");
                return;
            }
            if(this.areaname=="请选择"){
                this.$toast("请先选择区");
                return;
            }
            const url = `${api}userAddress/getNextArea`;
            const params = Object.assign({}, commonParams(), {
                timestamp:new Date().getTime(),
                sign:"",
                parentCode:this.townCode,
            });
            fatch(url, 'get', params, (err, state) => {
            }).then((res) => {
                if (res.code === '0') {
                    console.log(res);
                    this.cityList = res.data;
                } else {
                    this.cityList = "";
                }
            });
            this.area_show = true;
            this.now_id = id;
        }
    }
}
</script>
<style lang="stylus" scoped>
.edit_address >>>.van-nav-bar
    z-index 999
    margin-bottom 10px

.edit_address
    height 100vh
    width 100vw
    min-width 275px
    max-width 640px
    background #F3F2F0
    position relative
    .iconfont
        font-size 14px
        color #999
    .edit_detail
        font-size 15px
        background #fff
        li
            display flex
            align-items center
            height 45px
            margin 0 15px
            border-bottom 1px solid #ebedf0
            .detail_address
                overflow hidden
                width 54%
                max-width 184px
                white-space nowrap
                text-overflow ellipsis
                padding-left 2px
            span
                width 80px
                max-width 80px
            input
                height 36px
                padding-left 4px
                flex 1
            ::-webkit-input-placeholder
                color #999
                font-size 14px
            ::-moz-placeholder
                color #999
                font-size 14px
            :-ms-input-placeholder
                color #999
                font-size 14px
            .please_choose
                position absolute
                right 15px
        li:last-child
            border none
            justify-content space-between
            span
                width 100px
    .save_btn
        border none
        background #DE1E1D
        width 90%
        height 44px
        text-align center
        line-height 44px
        color #fff
        border-bottom 1px solid #B70404
        margin-left 5%
        margin-top 57px
        font-size 17px
        border-radius 44px
    .pop_choose
        height 200px
        display flex
        flex-direction column
        .choose_btn
            display flex
            justify-content flex-start
            padding 0 8px
            button
                background #ffffff
                font-size 13px
                line-height 30px
                border none
                margin 0 4px
                padding 0
                i
                    margin-left 4px
                    height 12px
                    line-height 11px
             .active
                border-bottom 2px solid #f00
        ul
            padding 4px 20px
            flex 1
            overflow-y auto
            li
                height 40px
                font-size 14px
                line-height 40px
            li:hover
                background #ccc
                color #DE1E1D
        .title_bar
            height 40px
            display flex
            justify-content space-between
            padding 0 15px
            align-items center
            font-size 14px
            span
                color #1989fa
</style>
