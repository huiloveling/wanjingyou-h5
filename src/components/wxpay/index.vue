<template>
    <div class='container'>
        <div class='header'>
            <div class='back' @click='back'>
                <span class='iconfont'>&#xe6dc;</span>
            </div>
            <div>微信付款</div>
        </div>
        <div class='payinfo'>
            <div class='payprice'>
                订单金额：￥{{ wxPrice }}
            </div>
            <div class='wximg'>
                <div>
                    <img :src='wxpayImg' />
                </div>
            </div>
            <div class='time'>
                请在{{ wxpayTime }}之前进行付款
            </div>
        </div>
        <div class='opt'>
            <h3>操作流程如下</h3>
            <div class='item'>
                第一步：请截屏保存二维码至相册
            </div>
            <div class='item'>
                第二步：打开[扫一扫]点击右上角 <br>
                [相册]选择此二维码进行付款
            </div>
        </div>
    </div>
</template>

<script>
    import Storage from './../../common/js/storage';
    import { isLogin, formatPoint } from './../../common/js/utils';
    export default {
        data() {
            return {
                wxPrice: '',
                wxpayImg: '',
                wxpayTime: ''
            }
        },
        mounted() {
            if (!isLogin()) {
                Storage.set({login_path: this.$route.path })
                this.$router.push({ path: '/login' });
                return;
            }
            let wxdata = Storage.get('wxpayData');
            this.wxPrice = wxdata.wxPrice;
            this.wxpayImg = wxdata.wxpayImg;
            this.wxpayTime = wxdata.wxpayTime;
        },
        methods: {
            back() {
                this.$router.back(-1);
            }
        }
    }
</script>

<style scoped lang='stylus'>
    .container
        width 100%
        min-height 100vh
        background-image url('./../../assets/wxpay.png')
        background-size cover
        background-repeat no-repeat
        .header
            height 45px
            line-height 45px
            font-size .36rem
            text-align center
            background-color #fff
            position relative
            .back
                position absolute
                left 10px
        .payinfo
            font-size .36rem
            color #fff
            text-align center
            padding-top 1rem
            font-family 'PingFang-SC-Bold'
            .wximg
                width 3.6rem
                height 3.6rem
                margin 0 auto
                margin-top .3rem
                display flex
                justify-content center
                align-items center
                img
                    display block
                    width 2.8rem
                    height 2.8rem
            .time
                font-size .28rem
                margin-top .1rem
        .opt
            color #fff
            text-align center
            font-size .36rem
            margin-top 1.3rem
            .item
                width 80%
                line-height 1.5
                font-size .3rem
                margin 0 auto
                margin-top .3rem
                padding .2rem .05rem
                border: 1px solid #fff;
</style>