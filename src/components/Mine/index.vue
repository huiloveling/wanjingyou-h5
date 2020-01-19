<template>
    <div class="mineWrap">
        <div class="header">
            <div class='back'></div>
            <div class='title'>我的</div>
            <div class='set' >
                <img @click='set' src='./../../assets/set.png' />
            </div>
        </div>
        <div class="content">
            <div class="content_center">
                <div class="mine_order" @click="to_myorder(0)">
                    <span>我的订单</span>
                    <!-- <span class='iconfont'>&#xe600;</span> -->
                    <img src="./../../assets/right.png" alt="">
                </div>
                <ul class="mine_class">
                    <li @click="to_myorder(1)">
                        <div>
                            <label v-show="waitPayShow">{{waitPay}}</label>
                            <img src="./../../assets/ready_pay.png" alt=""><br>
                        </div>
                        <span>待付款</span>
                    </li>
                    <li @click="to_myorder(2)">
                        <div>
                            <label v-show="waitTakeShow">{{waitTake}}</label>
                            <img src="./../../assets/ready_send.png" alt=""><br>
                        </div>
                        <span>待收货</span>
                    </li>
                    <li @click="to_myorder(4)">
                        <div>
                            <img src="./../../assets/ready_receive.png" alt="">
                        </div>
                        <span>已取消</span>
                    </li>
                    <li @click="to_myorder(0)">
                        <div>
                            <img src="./../../assets/all_order.png" alt=""><br>
                        </div>
                        <span>全部订单</span>
                    </li>
                </ul>
                <div class="line_height"></div>
                <ul class="mine_set">
                    <li @click="toaddress_management">
                        <div class="set_left">
                            <img src="./../../assets/address.png" alt="">
                            <span>地址管理</span>
                        </div>
                        <img src="./../../assets/right.png" alt="">
                    </li>
                    <li @click="to_customer()">
                        <div class="set_left">
                            <img src="./../../assets/service_yellow.png" alt="">
                            <span>客服中心</span>
                        </div>
                        <img src="./../../assets/right.png" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <Footer :tabbarActive='3' />
    </div>
</template>
<script>
    import Footer from './../../base/footer';
    import fatch from './../../common/js/fatch'
    import { commonParams, api } from './../../common/js/config'
    import Storage from './../../common/js/storage'
    import { isLogin } from './../../common/js/utils'
    export default {
        name:"mine",
        data() {
            return{
                active:3,
                waitTake:"",
                waitPay:"",
                waitTakeShow:true,
                waitPayShow:true,
            }
        },
        mounted() {
            if (!isLogin()) {
                Storage.set({login_path: this.$route.path })
                this.$router.push({ path: '/login' });
                return;
            }
            const url = `${api}order/orderCount`;
            const params = Object.assign({}, commonParams(true), {
                timestamp: new Date().getTime(),
                sign: "",
            });
            fatch(url, 'get', params, (err, state) => {

            }).then((res) => {
                if (res.code === '0') {
                    console.log(res);
                    this.waitPay = res.data.state0;
                    this.waitTake = res.data.state1;
                    if(this.waitPay==0){
                       this.waitPayShow=false;
                    }
                    if(this.waitTake==0){
                       this.waitTakeShow=false;
                    }
                } else {

                }
            });
        },
        methods:{
            set() {
                this.$router.push({ path: '/set' });
            },
            toaddress_management(){
                location.href = '#/address_handle';
            },
            to_myorder(item){
                location.href = `#/my_order/${item}`;
            },
            // 联系客服
            to_customer(){
                location.href = `#/contact`;
            },
        },
        components: {
            Footer
        }
    }
</script>
<style scoped lang='stylus'>
.mineWrap
    .header
        height 44px
        font-size 17px
        color #333
        display flex
        align-items center
        justify-content center
        position relative
        border-bottom 1px solid #ebedf0
        div
            flex 1
            height 100%
            line-height 44px
            text-align center
        .set
            display flex
            align-items center
            justify-content flex-end
            box-sizing border-box
            img
                margin-right 15px
                width 28px
                height 28px
    .content
        .content_center
            font-size 16px
            height 156px
            .mine_order
                display flex
                align-items center
                justify-content space-between
                height 45px
                color #333
                font-size 15px
                padding 0 15px
                span:nth-child(2)
                    color #999
                    font-size 20px
                img
                    display 30px
                    height 30px
            .mine_class
                display flex
                flex-direction row
                height 55px
                li
                    width 25%
                    text-align center
                    font-size 12px
                    display flex
                    justify-content center
                    flex-direction column
                    div
                        width 30px
                        height 30px
                        margin:0 auto
                        position relative
                        label
                            position absolute
                            background #DE1E1D
                            color #fff
                            right -8px
                            top -8px
                            width 28px
                            height 28px
                            border-radius 28px
                            text-align center
                            line-height 28px
                            font-size 20px
                            -webkit-transform:scale(0.5);
                        img
                            width 30px
                            height 30px
            .line_height
                height 10px
                width 100%
                background #F3F2F0
            .mine_set
                li
                    font-size 16px
                    display flex
                    align-items center
                    justify-content space-between
                    padding 0 15px
                    height 45px
                    border-bottom 1px solid #E8E8E7;
                    .set_left
                        height 100%
                        display flex
                        align-items center
                        font-size 14px
                        color #333
                        img
                            margin-right 6px
                            width 25px
                            height 25px
                    img
                        width 30px
                        height 30px
    .van-tabbar
        padding 5px 0
        .van-tabbar-item__icon
            img
                width 28px
                height 28px
</style>
