<template>
    <div class="set_wrap">
        <van-nav-bar title="设置">
            <span slot="left" class="iconfont" style="color:#333;" @click="toback">&#xe6dc;</span>
        </van-nav-bar>
        <li @click="to_change_phone">
            <span>修改手机号</span>
            <img src="./../../assets/right.png" alt="">
        </li>
        <button @click='signOut'>退出登录</button>
    </div>
</template>
<script>
    import Storage from './../../common/js/storage'
    import fatch from './../../common/js/fatch'
    import { commonParams, api } from './../../common/js/config'
    export default {
        data(){
            return{

            }
        },
        methods:{
            signOut() {
                this.$dialog.confirm({
                    title: '提示',
                    className: 'className',
                    message: '确定退出吗？'
                }).then(() => {
                    const url = `${api}user/logout`;
                    const params = Object.assign({}, commonParams(true), {
                        timestamp: new Date().getTime()
                    });
                    fatch(url, 'get', params, (err, state) => {
                        this.$toast('操作失败！');
                    }).then((res) => {
                        if (res.code === '0') {
                            Storage.clear();
                            this.$router.push({ path: '/mall' });
                        } else {
                            this.$toast(res.msg);
                        }
                    });
                }).catch(() => {
                    
                });
            },
            toback() {
                this.$router.push({ path: '/mine' });
            },
            to_change_phone() {
                this.$router.push({ path: '/change_phone' });
            }
        }
    }
</script>
<style lang="stylus" scoped>
.set_wrap >>> [class*=van-hairline]::after
    content '000'
    opacity 0
.set_wrap >>> .van-nav-bar
    border-bottom 1px solid #ebedf0
.set_wrap
    font-size 16px
    color #333
    li
        display flex 
        align-items center
        justify-content space-between
        padding 0 8px 0 15px
        font-size 14px
        height 50px
        border-bottom 1px solid #ebedf0
        img
            width 30px
            height 30px
    button 
        width 90%
        height 44px 
        display flex
        align-items center                                                                         
        margin-left 5%
        background #DE1E1D
        border none
        border-bottom 1px solid #B70404
        position fixed
        bottom 57px
        color #fff
        border-radius 44px
        justify-content center
        font-size 17px
</style>
