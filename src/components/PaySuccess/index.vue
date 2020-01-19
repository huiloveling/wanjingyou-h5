<template>
    <div class='wjy-container'>
        <div class='wjy-header'>
            <van-nav-bar
                title="支付成功"
                right-text="完成"
                left-arrow
            />
        </div>
        <div class='wjy-pay-info'>
            <div class='wjy-pay-info-pic'>
                <img src='./../../assets/pay.png' />
            </div>
            <div class='wjy-pay-info-desc'>
                <div>
                    <img src='./../../assets/dd.png' />
                    <span>支付方式</span>
                    <span style="color: #00A2EB;">银行卡支付</span>
                </div>
                <div>
                    <img src='./../../assets/qq.png' />
                    <span>支付金额</span>
                    <span style="color: #DE1E1D;">219.98</span>
                </div>
            </div>
            <div class='wjy-pay-btn'>
                <div>
                    <van-button type="danger">查看订单</van-button>
                </div>
                <div>
                    <van-button plain type="danger">返回商城</van-button>
                </div>
            </div>
            <div class='wjy-pay-info-tips'>
                <span style="color: #DE1E1D;">温馨提示：</span>平台不会以订单异常，系统升级为由要求您点击任何网址链接进行退款操作。
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style scoped lang='stylus'>
    .wjy-pay-info
        .wjy-pay-info-pic
            img
                display block
                width 150px
                height 150px
                margin 0 auto
        .wjy-pay-info-desc
            font-size 14px
            div
                line-height 35px
                display flex
                justify-content center
                align-items center
                img
                    width 30px
                    height 30px
                    margin-top -3px
                span
                    margin 0 1px
                    color #333333
                    font-weight bold
                    min-width 70px
                    text-align center
        .wjy-pay-btn
            div
                padding 10px 0
                button
                    width 80%
                    display block
                    margin 0 auto
                    font-size 16px
        .wjy-pay-info-tips
            font-size 14px
            width 85%
            margin 0 auto
            color #999999
            line-height 1.2
</style>