<template>
    <div class="after_sale_wrap">
        <van-nav-bar title="售后服务">
            <span slot="left" class="iconfont" @click="toback">&#xe6dc;</span>
        </van-nav-bar>
        <div class="detail_content" v-for="i in goodsList">
            <div class="goods_wrap">
                <div class="detail_img">
                    <img :src="i.order_img" alt="">
                </div>
                <div class="detail_info">
                    <p class="goods_title">{{i.order_title}}</p>
                    <p class="goods_price">
                        <span>单价：{{i.order_price}}</span>
                        <label>购买数量：{{_formatPoint(i.order_num)}}</label>
                    </p>
                </div>
            </div>
        </div>
        <div class="step_wrap">
            <span>申请数量</span>
            <van-stepper v-model="value" />
        </div>
        <div class="line_height"></div>
        <ul class="change_and_return">
            <li @click="to_sales_detail(1)">
                <div>
                    <p class="p_title">退货退款</p>
                    <p class="p_content">收到货，需要退还已收到的商品</p>
                </div>
                <span class="iconfont">&#xe600;</span>
            </li>
            <li>
                <div>
                    <p class="p_title">换货</p>
                    <p class="p_content">收到货，需要换已收到的商品</p>
                </div>
                <span class="iconfont">&#xe600;</span>
            </li>
        </ul>
    </div>
</template>
<script>
import { isLogin, formatPoint } from './../../common/js/utils'
import Storage from './../../common/js/storage'
export default {
    data(){
        return{
            order_id:null,
            value:1,
            goodsList:[
                {
                    order_time:'2018-6-24',
                    order_id:1,
                    order_state:1,
                    order_title:'[Apple Iphone8 (A1863) 641 高短金色 移动联通电信4G手机]',
                    order_img:"https://img14.360buyimg.com/n0/jfs/t10675/253/1344769770/66891/92d54ca4/59df2e7fN86c99a27.jpg",
                    order_goods_info:"颜色：金色  版本：全网通64G",
                    order_price:6400.00,
                    order_num:1
                },
            ],
        }
    },
    mounted(){
        if (!isLogin()) {
            Storage.set({login_path: this.$route.path })
            this.$router.push({ path: '/login' });
            return;
        }
        this.order_id = this.$route.params.item;
        console.log(17*14);
    },
    methods:{
        _formatPoint(price) {
            return formatPoint(price);
        },
        toback(){
            window.history.go(-1);
        },
        to_sales_detail(item){
            location.href = `#/after_sales/${item}`;
            location.href = `#/sales_detail/${item}`
        }
    }
}
</script>
<style lang="stylus" scoped>
.after_sale_wrap >>>[class*=van-hairline]::after
    border-bottom 1px solid #DADAD9
.after_sale_wrap
    font-size 16px
    letter-spacing .6px
    height 100vh
    width 100vw
    min-width 275px
    max-width 640px
    background #fff
    .iconfont
        font-size 14px
        color #999
    .detail_content
        background #fff
        font-size 20px
        width 100%
        display flex
        justify-content space-between
        align-items center
        padding 0 20px 0 20px
        box-sizing border-box
        .goods_wrap
            height 112px
            display flex
            justify-content space-between
            align-items center
            padding-right 20px
            border-bottom 1px solid #EAEAE9
            .detail_img
                max-width 98px
                min-width 80px
                max-height 98px
                min-height 80px
                width 98px
                height 98px
                margin-right 31px
                img
                    width 95px
                    height 95px
            .detail_info
                flex 1
                letter-spacing .6px
                .goods_title
                    font-size 14px
                    color #333
                    margin-bottom 16px
                    line-height 20px
                .goods_price
                    color #666666
                    display flex
                    align-items center
                    justify-content space-between
                    font-size 12px
                    color #666666
    .step_wrap
        display flex
        justify-content space-between
        padding 0 15px
        height 40px
        align-items center
        background #fff
        color #333
        span
            font-size 13px
    .line_height
        height 10px
        background #EAEAE9
    .change_and_return
        background #fff
        padding-top 8px
        li
            color #333
            height 60px
            padding 0 15px
            display flex
            justify-content space-between
            align-items center
            border-bottom 1px solid #DFDFDE
            .p_title
                font-size 14px
                margin-bottom 8px
            .p_content
                font-size 12px
                color #555555
                text-indent 24px
            .iconfont
                font-size 24px
                color #666666
</style>
