<template>
    <div>
        <div class='wjy-floot'>
            <van-tabbar v-model='active' :fixed='false'>
                <van-tabbar-item to="/mall">
                    <span>首页</span>
                    <img
                        slot='icon'
                        :src="active === 0 ? require('./../../assets/home1.png') : require('./../../assets/home.png')"
                    >
                </van-tabbar-item>
                <van-tabbar-item to="/category">
                    <span>分类</span>
                    <img
                        slot='icon'
                        width='28'
                        :src="active === 1 ? require('./../../assets/classify.png') : require('./../../assets/classify1.png')"
                    >
                </van-tabbar-item>
                <van-tabbar-item to="/card">
                    <span>购物车</span>
                    <img
                        slot='icon'
                        width='28'
                        :src="active === 2 ? require('./../../assets/car1.png') : require('./../../assets/car.png')"
                    >
                </van-tabbar-item>
                <van-tabbar-item to="/mine">
                    <span>我的</span>
                    <img
                        slot='icon'
                        width='28'
                        :src="active === 3 ? require('./../../assets/my1.png') : require('./../../assets/my.png')"
                    >
                </van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            tabbarActive: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                active: 0
            }
        },
        created() {
            this.active = this.tabbarActive;
        }
    }
</script>

<style scoped lang='stylus'>
    .wjy-floot
        height 50px
        max-width 640px
        margin 0 auto
        position fixed
        left 0
        right 0
        bottom 0
        background #fff
        z-index 99
        .van-tabbar-item__icon
            img
                width 28px
                height 28px
</style>