<template>
    <div class='wjy-container'>
        <div class='wjy-header'>
            
        </div>
        <div style='margin-top: 40px'>
            <div class='wjy-pro-filter'>
                <div class='pro-filter-items'>
                    <a href='javascript:void(0);'>综合</a>
                    <a href='javascript:void(0);'>
                        价格
                        <div>
                            <p class='iconfont'>&#xe601;</p>
                            <p class='iconfont'>&#xe650;</p>
                        </div>
                    </a>
                    <a href='javascript:void(0);'>
                        筛选
                        <span class='iconfont'>&#xe6c6;</span>
                    </a>
                </div>
            </div>
            <div class='wjy-search-prolist' ref='wrapper'>
                <div>
                    <div>
                        <van-card
                            price="1300"
                            origin-price="1500"
                            desc="4.7英寸"  
                            title="  Apple 苹果6  iPhone6手机 金色 全网通标配 32GB  "
                            thumb="http://img11.360buyimg.com/mobilecms/s455x455_jfs/t3916/268/2480035790/288161/e9b84529/58aa5e70Nb419eb24.jpg!q70.dpg.webp"
                        />
                        <van-card
                            price="1300"
                            origin-price="1500"
                            desc="4.7英寸"  
                            title="  Apple 苹果6  iPhone6手机 金色 全网通标配 32GB  "
                            thumb="http://img11.360buyimg.com/mobilecms/s455x455_jfs/t3916/268/2480035790/288161/e9b84529/58aa5e70Nb419eb24.jpg!q70.dpg.webp"
                        />
                        <van-card
                            price="1300"
                            origin-price="1500"
                            desc="4.7英寸"  
                            title="  Apple 苹果6  iPhone6手机 金色 全网通标配 32GB  "
                            thumb="http://img11.360buyimg.com/mobilecms/s455x455_jfs/t3916/268/2480035790/288161/e9b84529/58aa5e70Nb419eb24.jpg!q70.dpg.webp"
                        />
                        <van-card
                            price="1300"
                            origin-price="1500"
                            desc="4.7英寸"  
                            title="  Apple 苹果6  iPhone6手机 金色 全网通标配 32GB  "
                            thumb="http://img11.360buyimg.com/mobilecms/s455x455_jfs/t3916/268/2480035790/288161/e9b84529/58aa5e70Nb419eb24.jpg!q70.dpg.webp"
                        />
                        <van-card
                            price="1300"
                            origin-price="1500"
                            desc="4.7英寸"  
                            title="  Apple 苹果6  iPhone6手机 金色 全网通标配 32GB  "
                            thumb="http://img11.360buyimg.com/mobilecms/s455x455_jfs/t3916/268/2480035790/288161/e9b84529/58aa5e70Nb419eb24.jpg!q70.dpg.webp"
                        />
                        <van-card
                            price="1300"
                            origin-price="1500"
                            desc="4.7英寸"  
                            title="  Apple 苹果6  iPhone6手机 金色 全网通标配 32GB  "
                            thumb="http://img11.360buyimg.com/mobilecms/s455x455_jfs/t3916/268/2480035790/288161/e9b84529/58aa5e70Nb419eb24.jpg!q70.dpg.webp"
                        />
                        <van-card
                            price="1300"
                            origin-price="1500"
                            desc="4.7英寸"  
                            title="  Apple 苹果6  iPhone6手机 金色 全网通标配 32GB  "
                            thumb="http://img11.360buyimg.com/mobilecms/s455x455_jfs/t3916/268/2480035790/288161/e9b84529/58aa5e70Nb419eb24.jpg!q70.dpg.webp"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        data() {
            return {
                wjy_recent_search: false,
                wjy_search_history: false,
                search_name: '',
            }
        },
        methods: {
            back() {
                this.$router.back(-1);
            },
            _initScroll() {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    flickLimitTime: 1,
                    probeType: 3,
                    click: true,
                })
            },
            handleSearchChange() {
                if (!this.search_name) {
                    this.wjy_search_history = false;
                }
            },
            handleSearchClick() {
                if (this.search_name === '3') {
                    this.wjy_search_history = true;
                    this.wjy_recent_search = true;
                    this._initScroll();
                } else {
                    this.wjy_recent_search = false;
                    this.wjy_search_history = true;
                }
            },
            handleShowScreenClick() {
                this.$router.push({
                    path: `/search/filterInner`
                });
            }
        },
        watch: {

        },
    }
</script>

<style scoped lang='stylus'>
    .slide-enter-active, .slide-leave-active
        transition all 0.3s
    .slide-enter, .slide-leave-to
        transform translate3d(100%, 0, 0)
    .wjy-container >>> .van-overlay
        min-height 100vh
    .wjy-container >>> .van-popup--right
        width 90%
        height 100%
    .wjy-container
        transform translate(0,0)
        min-height 100vh
        height 100%
        .wjy-header
            height 40px
            background-color red
        .wjy-recent-search
            font-size 14px
            margin-top 15px
            padding-left 13px
            .wjy-recent-search-head
                padding 0 15px 11px 0
                font-size 15px;
                line-height 15px
                color #232326
                display flex
                font-family 'PingFang-SC-Medium'
                p
                    width 100px
                .wjy-search-head-del
                    flex 1
                    text-align right
                    span
                        font-size 15px
                        color #686868
            .wjy-recent-search-list
                padding-right 2px
                overflow hidden
                font-size 12px
                text-align center
                span
                    display block
                    max-width 100%
                    overflow hidden
                    padding-right 10px
                    padding-bottom 10px
                    float left
                    a
                        height 23px
                        line-height 24px
                        border-radius 3px
                        display block
                        width 100%
                        color #686868
                        white-space nowrap
                        text-overflow ellipsis
                        background-color #f0f2f5
                        padding-left 13px
                        padding-right 13px
                        overflow hidden
                        box-sizing border-box
        .wjy-pro-filter
            .pro-filter-items
                display flex
                font-size 14px
                border-bottom 1px solid #ccc
                a
                    flex 1
                    height 46px
                    text-align center
                    line-height 46px
                    color #333
                    span
                        font-size 13px
                a:nth-child(1)
                    color red
                a:nth-child(2)
                    border-left 1px solid #ccc
                    border-right 1px solid #ccc
                    display flex
                    justify-content center
                    align-items center
                    div
                        height 100%
                        p
                            height 50%
                            display flex
                            justify-content center
                            align-items center
                            font-size 17px
                        p:nth-child(1)
                            align-items flex-start
                            margin-top -4px
                            color red
                        p:nth-child(2)
                            align-items flex-end
                            margin-top 9px
        .wjy-search-prolist
            max-width 640px
            margin 0 auto
            position fixed
            left 0
            top 47px
            right 0
            bottom 0
            overflow hidden
</style>