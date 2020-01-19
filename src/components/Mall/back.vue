<template>
    <div class='wjy-wrapper'>
        <div class='wjy-search_wrapper' ref='wjy_search'>
            <div class='wjy-search-server'>
                <img src='./../../assets/service.png' />
            </div>
            <div class='wjy-search-form'>
                <span class='iconfont'>&#xe649;</span>搜索商品
            </div>
            <div class='wjy-search-news'>
                <img src='./../../assets/news.png' />
            </div>
        </div>

        <div class='scroll-wrapper' ref='wrapper'>
            <div>
                <div style="position: relative;">
                    <div class='wjy-tip'>
                        加载中...
                    </div>
                    <div class='wjy-slider-wrapper' ref='wjy_slider_wrapper'>
                        <van-swipe :autoplay='3000' indicator-color='white' :height='240'>
                            <van-swipe-item>
                                <img src='http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/18618/1/4885/159906/5c371056E1aed6ded/ca8f93ce55544cf6.jpg!cr_1125x549_0_72!q70.jpg.dpg' />
                            </van-swipe-item>
                            <van-swipe-item>
                                <img src='http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/7608/40/12556/76773/5c36ef19E76b19919/3ff5baa71b809fbf.jpg!cr_1125x549_0_72!q70.jpg.dpg' />
                            </van-swipe-item>
                            <van-swipe-item>
                                <img src='http:////m.360buyimg.com/mobilecms/s750x366_jfs/t1/18618/1/4885/159906/5c371056E1aed6ded/ca8f93ce55544cf6.jpg!cr_1125x549_0_72!q70.jpg.dpg' />
                            </van-swipe-item>
                            <van-swipe-item>
                                <img src='http:////m.360buyimg.com/mobilecms/s750x366_jfs/t23554/196/252614617/149239/73b66270/5b2a6ecdNc10d686b.jpg!cr_1125x549_0_72!q70.jpg.dpg' />
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                    <div class='wjy-box-wrapper'>
                        <div class='item'>
                            <img src='./../../assets/phone.png' />
                            <span>手机通讯</span>
                        </div>
                        <div class='item'>
                            <img src='./../../assets/phone_parts.png' />
                            <span>手机配件</span>
                        </div>
                        <div class='item'>
                            <img src='./../../assets/appliance.png' />
                            <span>生活电器</span>
                        </div>
                        <div class='item'>
                            <img src='./../../assets/articles.png' />
                            <span>生活用品</span>
                        </div>
                        <div class='item'>
                            <img src='./../../assets/clothing.png' />
                            <span>时尚女装</span>
                        </div>
                        <div class='item'>
                            <img src='./../../assets/childrenwear.png' />
                            <span>舒适童装</span>
                        </div>
                        <div class='item'>
                            <img src='./../../assets/toys.png' />
                            <span>智力玩具</span>
                        </div>
                        <div class='item'>
                            <img src='./../../assets/snacks.png' />
                            <span>休闲食品</span>
                        </div>
                    </div>
                    <div class='wjy-news-wrapper'>
                        <div class='new-icon'>
                            <img src='./../../assets/notice.png' />
                        </div>
                        <div class='new-list'>
                            <ul :class='{news_top: animate}'>
                                <li v-for='(item, index) in newslist'>{{item.name}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class='wjy-everyday-new-products'>
                        <div class='panel'>
                            <div class='panel-title'>
                                <img src='./../../assets/new.png' />
                                <span>每日上新</span>
                            </div>
                            <div class='panel-more'>
                                <span>更多</span><span class='iconfont'>&#xe600;</span>
                            </div>
                        </div>
                        <div class='slider'>
                            <img src='http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/18618/1/4885/159906/5c371056E1aed6ded/ca8f93ce55544cf6.jpg!cr_1125x549_0_72!q70.jpg.dpg' />
                        </div>  
                        <div class='goods-list'>
                            <div class='goods-item'>
                                <img src='http:////img12.360buyimg.com/mobilecms/s372x372_jfs/t19099/337/1919997878/142468/45dd1c9d/5ade9c57N87030299.jpg!q70.dpg' />
                                <div class='desc'>
                                    全自动破壁豆浆机加热,多功能料理机家用破壁机果汁榨汁机迷你搅拌机辅食机
                                </div>
                                <div class='price'>
                                    <span>￥89 </span><s>359</s>
                                </div>
                            </div>
                            <div class='goods-item'>
                                <img src='http://img12.360buyimg.com/mobilecms/s372x372_jfs/t24484/257/989942736/192291/592452b4/5b4af2c0N218bfeef.jpg!q70.dpg' />
                                <div class='desc'>
                                    全自动破壁豆浆机加热,多功能料理机家用破壁机果汁榨汁机迷你搅拌机辅食机
                                </div>
                                <div class='price'>
                                    <span>￥89 </span><s>359</s>
                                </div>
                            </div>
                            <div class='goods-item'>
                                <img src='http:////img13.360buyimg.com/mobilecms/s372x372_jfs/t1/10759/36/8975/91144/5c3d306cE2c1f7cdd/cdfb51a92c2544ce.jpg!q70.dpg' />
                                <div class='desc'>
                                    全自动破壁豆浆机加热,多功能料理机家用破壁机果汁榨汁机迷你搅拌机辅食机
                                </div>
                                <div class='price'>
                                    <span>￥89 </span><s>359</s>
                                </div>
                            </div>
                            <div class='goods-item'>
                                <img src='http:////img12.360buyimg.com/mobilecms/s372x372_jfs/t1/3523/19/6824/353022/5ba44d1fE1fd1f27e/bb4d21aca84bd78b.jpg!q70.dpg' />
                                <div class='desc'>
                                    全自动破壁豆浆机加热,多功能料理机家用破壁机果汁榨汁机迷你搅拌机辅食机
                                </div>
                                <div class='price'>
                                    <span>￥89 </span><s>359</s>
                                </div>
                            </div>
                            <div class='goods-item'>
                                <img src='http:////img14.360buyimg.com/mobilecms/s372x372_jfs/t7636/154/3536465322/264928/7da18d54/59c0d981Ne64990db.jpg!q70.dpg' />
                                <div class='desc'>
                                    全自动破壁豆浆机加热,多功能料理机家用破壁机果汁榨汁机迷你搅拌机辅食机
                                </div>
                                <div class='price'>
                                    <span>￥89 </span><s>359</s>
                                </div>
                            </div>
                            <div class='goods-item'>
                                <img src='http:////img13.360buyimg.com/mobilecms/s372x372_jfs/t7291/297/2370257511/289566/fbb99889/59ae185dN1d743b40.jpg!q70.dpg' />
                                <div class='desc'>
                                    全自动破壁豆浆机加热,多功能料理机家用破壁机果汁榨汁机迷你搅拌机辅食机
                                </div>
                                <div class='price'>
                                    <span>￥89 </span><s>359</s>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='wjy-everyday-new-products'>
                        <div class='panel'>
                            <div class='panel-title'>
                                <img src='./../../assets/heat.png' />
                                <span>热门推荐</span>
                            </div>
                            <div class='panel-more'>
                                <span>更多</span><span class='iconfont'>&#xe600;</span>
                            </div>
                        </div>
                        <div class='goods-list'>
                            <div class='goods-item'>
                                <img src='http:////img10.360buyimg.com/mobilecms/s372x372_jfs/t30457/185/596368267/184607/85d9f8e5/5bf7876bN748147a6.jpg!q70.dpg' />
                                <div class='desc'>
                                    传统手工炒饼丝河北烩饼面食炒饼饼丝4斤焖饼
                                </div>
                                <div class='price'>
                                    <span>￥89 </span><s>359</s>
                                </div>
                            </div>
                            <div class='goods-item'>
                                <img src='http:////img10.360buyimg.com/mobilecms/s372x372_jfs/t1/1522/2/2101/294132/5b95e7e9Ecaf5bc04/8f8edc2def21748a.jpg!q70.dpg' />
                                <div class='desc'>
                                    千团精工饼干模具卡通烘焙DIY西点铝合金模具 16件套 形状随机发 
                                </div>
                                <div class='price'>
                                    <span>￥89 </span><s>359</s>
                                </div>
                            </div>
                            <div class='goods-item'>
                                <img src='http:////img13.360buyimg.com/mobilecms/s372x372_jfs/t13741/332/2405255484/335021/8d071a63/5a3e1100Nc7c73ba4.jpg!q70.dpg' />
                                <div class='desc'>
                                    坛坛乡精致剁辣椒2.3kg蒸鱼剁椒酱湖南特产辣椒酱下饭菜
                                </div>
                                <div class='price'>
                                    <span>￥89 </span><s>359</s>
                                </div>
                            </div>
                            <div class='goods-item'>
                                <img src='http:////img14.360buyimg.com/mobilecms/s372x372_jfs/t27373/50/556441279/83453/58114b1/5bb18d7bN433eadd6.jpg!q70.dpg' />
                                <div class='desc'>
                                    【京东好店】【闪电发货】自行车雨衣单人男女学生单车骑车透明韩版骑行雨披防水反光 天蓝色 蓝色背包款 XL
                                </div>
                                <div class='price'>
                                    <span>￥89 </span><s>359</s>
                                </div>
                            </div>
                            <div class='goods-item'>
                                <img src='http:////img14.360buyimg.com/mobilecms/s372x372_jfs/t1/9190/3/11039/387252/5c257b12E3e674bdb/73bed53984ec9ef5.jpg!q70.dpg' />
                                <div class='desc'>
                                    冲牙器 便携式洗牙器去牙结石洗牙机洁牙器水牙线 收藏送4个喷头(联系客服) 默认1 
                                </div>
                                <div class='price'>
                                    <span>￥89 </span><s>359</s>
                                </div>
                            </div>
                            <div class='goods-item'>
                                <img src='http:////img12.360buyimg.com/mobilecms/s372x372_jfs/t17872/33/1741086777/430495/e9f7d59a/5ad592f4N8323a25e.jpg!q70.dpg' />
                                <div class='desc'>
                                    星球杯 桶装1026g中杯108杯 儿童巧克力酱零食饼干小杯桶装390g 390g /桶装【包邮尝鲜】
                                </div>
                                <div class='price'>
                                    <span>￥89 </span><s>359</s>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='wjy-floot'>
            <van-tabbar v-model="active" :fixed='false'>
              <van-tabbar-item icon="home-o">
                <span>首页</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    src='./../../assets/home.png'
                >
              </van-tabbar-item>
              <van-tabbar-item icon="search">
                    <span>分类</span>
                    <img
                        slot="icon"
                        slot-scope="props"
                        width='28'
                        src='./../../assets/classify.png'
                    >
              </van-tabbar-item>
              <van-tabbar-item icon="friends-o">
                  <span>购物车</span>
                  <img
                        slot="icon"
                        slot-scope="props"
                        width='28'
                        src='./../../assets/car.png'
                    >
              </van-tabbar-item>
              <van-tabbar-item icon="setting-o">
                  <span>我的</span>
                  <img
                        slot="icon"
                        slot-scope="props"
                        width='28'
                        src='./../../assets/my.png'
                    >
              </van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import { prefixStyle } from './../../common/js/dom'
    const transform = prefixStyle('transform')
    const transitionDuration = prefixStyle('transitionDuration')
    export default {
        name: 'Mall',
        props: {
            probeType: {
                type: Number,
                default: 3
            },
            click: {
                type: Boolean,
                default: true
            },
            pullup: {
                type: Boolean,
                default: true
            },
            listenScroll: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                active: 0,
                animate: false,
                flag: true,
                newslist: [
                    {
                        name: '学生党别再买AJ了，现在都流行买它，省钱又好看学生党别再买AJ了，现在都流行买它，省钱又好看',
                    },
                    {
                        name: '阿里巴巴',
                    },
                    {
                        name: '腾讯',
                    },
                    {
                        name: '李鹏辉',
                    }
                ]
            }
        },
        mounted() {
            setTimeout(() => {
                this._initScroll();
                setInterval(this._newsList, 3000)
            }, 20);
        },
        methods: {
            _initScroll() {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                });
                this.scroll.on('scroll', (pos) => {
                    let wjy_search = this.$refs.wjy_search;
                    let wjy_slider_wrapper = this.$refs.wjy_slider_wrapper;
                    var targetHeight = wjy_slider_wrapper.offsetHeight;
                    if (pos.y > 0) {
                        wjy_search.style.display = 'none';
                    } else if(pos.y <= 0) {
                        let opacity = 0;
                        let scrollTop = Math.abs(pos.y);
                        scrollTop > targetHeight ? (opacity = 1) : (opacity = 1 * (scrollTop / targetHeight));
                        wjy_search.style.background = `rgba(255, 255, 255, ${opacity})`;
                        wjy_search.style.display = 'flex';
                        setTimeout(() => {
                        }, 1000);
                    }
                });
                this.scroll.on('touchEnd', (pos) => {
                    
                });
            },
            _newsList: function () {
                this.animate = true;
                setTimeout(()=>{
                    this.newslist.push(this.newslist[0]);
                this.newslist.shift();
                this.animate = false;
            }, 1000)},
        }
    }
</script>

<style scoped lang='stylus'>
    .wjy-wrapper >>> [class*=van-hairline]::after
        content ''
        border none
    .wjy-wrapper
        min-height 100vh
        background #F5F5F4
        padding-bottom 60px
        .wjy-search_wrapper
            height 40px
            max-width 640px
            margin 0 auto
            position fixed
            top 0
            left 0
            right 0
            display flex
            justify-content center
            align-items center
            z-index 10
            .wjy-search-server
                width 43px
                height 40px
                display flex
                justify-content center
                align-items center
                img
                    display block
                    width 21px
                    height 21px
            .wjy-search-form
                height 30px
                line-height 30px
                flex 1
                border-radius 15px
                font-size 14px
                text-align center
                background #F0F0F0
                color #ccc
                span
                    font-size 14px
                    margin-right 3px
            .wjy-search-news
                width 45px
                height 40px
                display flex
                justify-content center
                align-items center
                img
                    display block
                    width 21px
                    height 21px
        .scroll-wrapper
            max-width 640px
            margin 0 auto
            position fixed
            left 0
            top 0
            right 0
            bottom 60px
            overflow hidden
            .wjy-tip
                position absolute
                left 0
                right 0
                top -50px
                height 50px
                line-height 50px
                font-size 18px
                text-align center
                display flex
                justify-content center
                align-items center
                img
                    display block
                    width 150px
                    height 150px
            .wjy-slider-wrapper
                height 240px
                min-height 240px
                max-height 240px
                img
                    display block
                    width 100%
                    height 100%
            .wjy-box-wrapper
                display flex
                flex-wrap wrap
                padding 22px 0
                background #fff
                margin-top 12px
                border-bottom 1px solid #F0F0F0
                .item:nth-child(-n+4)
                    margin-bottom 20px
                .item
                    width 25%
                    text-align center
                    img
                        width 48px
                        height 48px
                    span
                        display block
                        font-size 14px
            .wjy-news-wrapper
                height 45px
                display flex
                align-items center
                padding 0 15px
                color #3A3A3A
                box-sizing border-box
                background-color #fff
                .new-icon
                    display flex
                    justify-content center
                    align-items center
                    img
                        width 22px
                        height 22px
                .new-list
                    flex 1
                    height 30px
                    overflow hidden
                    display block
                    .news_top
                        transition transform 500ms ease-in-out 0s
                        transform translate3d(0px, -30px, 0px)
                    ul
                        width 100%
                        li
                            height 30px
                            line-height 30px
                            font-size 14px
                            padding-left 10px
                            box-sizing border-box
                            overflow hidden
                            text-overflow ellipsis
                            white-space nowrap
            .wjy-everyday-new-products
                margin-top 12px
                .panel
                    display flex
                    padding 0 15px
                    align-items center
                    font-size 16px
                    height 45px
                    line-height 45px
                    background #fff
                    .panel-title
                        display flex
                        align-items center
                        color #DE1E1D
                        img
                            width 22px
                            height 22px
                            margin-right 8px
                        span
                            display block
                            line-height 45px
                            font-family 'PingFang-SC-Medium'
                            font-weight bold
                    .panel-more
                        flex 1
                        height 45px
                        line-height 45px
                        font-size 15px
                        color #888888
                        display flex
                        justify-content flex-end
                        align-items center
                        span:first-child
                            margin-right -5px
                        span:last-child
                            font-size 25px
                            color #888888
                .slider
                    margin-top 12px
                    height 128px
                    width 100%
                    img
                        display block
                        width 100%
                        height 100%
                .goods-list
                    margin-top 12px
                    display flex
                    flex-wrap wrap
                    background #fff
                    .goods-item:nth-child(3n)
                        border-right none
                    .goods-item
                        width 33.333%
                        font-size 14px
                        text-align center
                        padding 10px 8px
                        box-sizing border-box
                        border-right 1px solid #F8F8F8
                        border-bottom 1px solid #F8F8F8
                        img
                            width 82px
                            height 102px
                        .desc
                            width 100%
                            height 30px
                            max-height 30px
                            line-height 1.2
                            overflow hidden
                            margin-bottom 3px
                            color #333333
                            text-align left
                            display -webkit-box
                            -webkit-box-orient vertical
                            -webkit-line-clamp 2
                        .price
                            text-align left
                            span
                                font-weight bold
                                margin-right 5px
        .wjy-floot
            height 50px
            max-width 640px
            margin 0 auto
            position fixed
            left 0
            right 0
            bottom 0
            padding 5px 0
            background #fff
            z-index 10
            .van-tabbar-item__icon
                img
                    width 28px
                    height 28px
</style>

