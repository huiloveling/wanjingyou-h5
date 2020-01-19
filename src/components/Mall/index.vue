<template>
    <div class='wjy-wrapper'>
        <div class='wjy-search_wrapper' ref='wjy_search'>
            <div class='wjy-search-server'>
                <img src='./../../assets/service.png' @click='handleToContact' />
            </div>
            <div class='wjy-search-form' @click='search'>
                <span class='iconfont'>&#xe649;</span>搜索商品
            </div>
            <div class='wjy-search-news'>
                <img src='./../../assets/news.png' @click="toMessage"/>
            </div>
        </div>
        <div
            class='scroll-wrapper'
            ref='wrapper'
        >
            <div>
                <div style="position: relative;">
                    <div class='wjy-tip'>
                        {{ pullingDownText }}
                    </div>
                    <div class='wjy-slider-wrapper' ref='wjy_slider_wrapper'>
                        <van-swipe v-if='bannerList.length' :autoplay='3000' indicator-color='white' :height='160'>
                            <van-swipe-item v-for='(item, index) in bannerList' :key='index'>
                                <img :src='item.picture' @click='handleBannerClick(item)' />
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                    <div class='wjy-box-wrapper' v-if='categoryList.length'>
                        <div class='item' v-for='(item, index) in categoryList' :key='index' @click='categoryGoods(item.categoryName, item.categoryId)'>
                            <img :src='item.categoryImage' />
                            <span>{{item.categoryName}}</span>
                        </div>
                    </div>
                    <div class='wjy-news-wrapper' v-if='articleList.length'>
                        <div class='new-icon'>
                            <img src='./../../assets/notice.png' />
                        </div>
                        <div class='new-list'>
                            <ul :class='{news_top: animate}'>
                                <li v-for='(item, index) in articleList' @click='toMessage'>{{item.title}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class='wjy-area-wrapper' v-if='homepageImageList.length'>
                        <div class='img1'>
                            <img
                                :src='homepageImageList.length && homepageImageList[0].image'
                                @click='toArea(homepageImageList[0])'
                            />
                        </div>
                        <div class='img2'>
                            <div class='item1'>
                                <img
                                    :src='homepageImageList.length && homepageImageList[1].image'
                                    @click='toArea(homepageImageList[1])'
                                />
                            </div>
                            <div class='item2'>
                                <div>
                                    <img
                                        :src='homepageImageList.length && homepageImageList[2].image'
                                        @click='toArea(homepageImageList[2])'
                                    />
                                </div>
                                <div>
                                    <img
                                        :src='homepageImageList.length && homepageImageList[3].image'
                                        @click='toArea(homepageImageList[3])'
                                    />
                                </div>
                            </div>

                        </div>
                        <div class='img3'>
                                <div>
                                    <img
                                        :src='homepageImageList.length && homepageImageList[4].image'
                                        @click='toArea(homepageImageList[4])'
                                    />
                                </div>
                                <div>
                                    <img
                                        :src='homepageImageList.length && homepageImageList[5].image'
                                        @click='toArea(homepageImageList[5])'
                                    />
                                </div>
                                <div>
                                    <img
                                        :src='homepageImageList.length && homepageImageList[6].image'
                                        @click='toArea(homepageImageList[6])'
                                    />
                                </div>
                            </div>
                    </div>
                    <div class='wjy-everyday-new-products'>
                        <div class='panel'>
                            <div class='panel-title' v-if='homepageImageList.length'>
                                <img src='./../../assets/new.png' />
                                <span>{{homepageImageList[7].name}}</span>
                            </div>
                            <div class='panel-more' @click='recommendGoods(homepageImageList[7].name, 0)'>
                                <span>更多</span><span class='iconfont'>&#xe600;</span>
                            </div>
                        </div>
                        <div class='slider' v-if='bannerList2.length'>
                            <van-swipe :autoplay='3000' indicator-color='white' :height='128'>
                                <van-swipe-item v-for='(item, index) in bannerList2' :key='index'>
                                    <img :src='item.picture' @click='handleBannerClick(item)' />
                                </van-swipe-item>
                            </van-swipe>
                        </div>  
                        <div class='goods-list'>
                            <div class='goods-item' v-for='(item, index) in dailyList' :key='index' @click='handleToGoodsInfo(item.sysSku)'>
                                <img :src='item.imagePath' />
                                <div class='desc'>
                                    {{ item.name }}
                                </div>
                                <div class='price'>
                                    <span>￥{{ _formatPoint(item.price) }} </span><s>{{ _formatPoint(item.originalPrice) }}</s>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='wjy-everyday-new-products'>
                        <div class='panel'>
                            <div class='panel-title' v-if='homepageImageList.length'>
                                <img src='./../../assets/heat.png' />
                                <span>{{homepageImageList[8].name}}</span>
                            </div>
                            <div class='panel-more' @click='recommendGoods(homepageImageList[8].name, 1)'>
                                <span>更多</span><span class='iconfont'>&#xe600;</span>
                            </div>
                        </div>
                        <div class='goods-list'>
                            <div class='goods-item' v-for='(item, index) in hotList' :key='index' @click='handleToGoodsInfo(item.sysSku)'>
                                <img :src='item.imagePath' />
                                <div class='desc'>
                                    {{item.name}}
                                </div>
                                <div class='price'>
                                    <span>￥{{ _formatPoint(item.price) }} </span><s>{{ _formatPoint(item.originalPrice) }}</s>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if='pullupFlag' style="height: 50px; line-height: 50px; text-align: center;">
                        <img style="width: 30px; height: 30px; " src='./../../assets/loading.gif' />
                    </div>
                </div>
            </div>
        </div>
        <Footer :tabbarActive='0' />
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import { prefixStyle } from './../../common/js/dom'
    import Storage from './../../common/js/storage'
    import Scroll from './../../base/scroll/scroll'
    import fatch from './../../common/js/fatch'
    import Footer from './../../base/footer'
    import { commonParams, api } from './../../common/js/config'
    import { isLogin, formatPoint } from './../../common/js/utils'
    import { mapMutations } from 'vuex'
    const transform = prefixStyle('transform')
    const transitionDuration = prefixStyle('transitionDuration')
    export default {
        name: 'Mall',
        data() {
            return {
                bannerList: [],
                bannerList2: [],
                categoryList: [],
                articleList: [],
                dailyList: [],
                hotList: [],
                homepageImageList: [],
                pageNo: 1,
                pageSize: 10,   
                probeType: 3,
                pullDownRefresh: {
                    threshold: 50,
                    stop: 50
                },
                active: 0,
                animate: false,
                pullingDownText: '下拉刷新...',
                pullupFlag: false,
                wjySearchShow: true,
            }
        },
        mounted() {
            setTimeout(() => {
                this._init_();
            }, 20);
        },
        methods: {
            _formatPoint(price) {
                return formatPoint(price);
            },
            toMessage() {
                if (!isLogin()) {
                    this.$router.push({ path: '/login' });
                    return;
                }
                location.href = `#/message`;
            },
            handleToGoodsInfo(sysSku) {
                this.setSysSku(sysSku);
                this.$router.push({ path: '/product' });
            },
            _init_() {
                this.getGoods();
                this.getBanner();
                this.getCategoryList();
                this.getDetails();
                this._initScroll();
                this.getHomepageImage();
                setInterval(this._newsList, 3000)
            },
            // 获取专区图片
            getHomepageImage() {
                const url = `${api}basic/homepageImage`;
                const params = Object.assign({}, commonParams(), {
                });
                fatch(url, 'get', params, (err, state) => {

                }).then((res) => {
                    if (res.code === '0') {
                        this.homepageImageList = res.data;
                    } else {

                    }
                });
            },
            // 获取广告位
            getBanner() {
                const url = `${api}advert/getAdvertList`;
                const params = Object.assign({}, commonParams(), {
                    phoneType: 3,
                });
                fatch(url, 'get', params, (err, state) => {

                }).then((res) => {
                    if (res.code === '0') {
                        const result = res.data;
                        if (result[0] !== undefined) {
                            if (result[0].advertList.length) {
                                this.bannerList = result[0].advertList;
                            } else {
                                this.bannerList.push({
                                    advertName: result[0].name,
                                    picture: result[0].image,
                                });
                            }
                        }
                        if (result[1] !== undefined) {
                            if (result[1].advertList.length) {
                                this.bannerList2 = result[1].advertList;
                            } else {
                                this.bannerList2.push({
                                    advertName: result[1].name,
                                    picture: result[1].image,
                                });
                            }
                        }
                    } else {

                    }
                });
            },
            // 广告跳转链接
            handleBannerClick(item) {
                if (item.sysSku !== undefined && item.sysSku !== null && item.sysSku !== '') {
                    this.setSysSku(item.sysSku);
                    this.$router.push({ path: '/product' });
                } else {
                    if (item.url !== undefined && item.url !== null && item.url !== '') {
                        window.location = item.url;
                    }
                }
            },
            // 获取分类导航
            getCategoryList() {
                const url = `${api}basic/getCategoryId`;
                const params = Object.assign({}, commonParams(), {
                    phoneType: 3,
                    categoryState: 0,
                    sign: '',
                    timestamp: new Date().getTime(),
                    type: 2
                });
                fatch(url, 'get', params, (err, state) => {

                }).then((res) => {
                    if (res.code == '0') {
                        const result = res.data;
                        if (result.mallCategory.length) {
                            this.categoryList = result.mallCategory;
                        } else {

                        }
                    } else {

                    }
                });
            },
            // 获取分类商品
            categoryGoods(name, categoryId) {
                if (categoryId === null) {
                    this.$router.push({ path: '/category' });
                    return;
                }
                const data = {
                    categoryId: categoryId,
                    name: name
                }
                Storage.set({'categoryType': 2, 'categoryData': data, type: 3});
                this.$router.push({ path: '/search' });
            },
            recommendGoods(name, state) {
                const data = {
                    categoryId: '',
                    name: name
                }
                Storage.set({'categoryType': 2, 'categoryData': data, type: 2, state: state});
                this.$router.push({ path: '/search' });
            },
            toArea(data) {
                Storage.set({'area': data});
                this.$router.push({ path: '/area' });
            },
            getDetails() {
                const url = `${api}article/getArticle`;
                const params = Object.assign({}, commonParams(), {
                    sign: '',
                    timestamp: new Date().getTime(),
                });
                fatch(url, 'get', params, (err, state) => {

                }).then((res) => {
                    if (res.code === '0') {
                        const result = res.data;
                        if (result.getArticle.length) {
                            this.articleList = result.getArticle;
                        } else {

                        }
                    } else {

                    }
                });
            },
            // 获取商品
            getGoods() {
                const url = `${api}goods/getIndexGoods`;
                const params = Object.assign({}, commonParams(), {
                    sign: '',
                    timestamp: new Date().getTime(),
                });
                fatch(url, 'get', params, (err, state) => {

                }).then((res) => {
                    const result = res.data;
                    if (res.code === '0') {
                        if (result.searchResultMap.length) {
                            const list = result.searchResultMap;
                            for (let i = 0; i < list.length; i++) {
                                if (list[i].state === 0) {
                                    this.dailyList.push(list[i]);
                                } else if (list[i].state === 1) {
                                    this.hotList.push(list[i]);
                                } else {

                                }
                            }
                        } else {

                        }
                    } else {

                    }
                });
            },
            _initScroll() {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    flickLimitTime: 1,
                    probeType: this.probeType,
                    click: true,
                    pullDownRefresh: {
                        threshold: this.scrollStop,
                        stop: this.scrollStop
                    },
                    pullUpLoad: {
                        threshold: -50
                    }
                });
                this.scroll.on('pullingDown', () => {
                    setTimeout(() => {
                        let wjy_search = this.$refs.wjy_search;
                        wjy_search.style.display = 'flex';
                        this.scroll.finishPullDown();
                        this._init_();
                    }, 2000);
                })
                this.scroll.on('touchEnd', (pos) => {
                    this.wjySearchShow = false;
                    this.pullingDownText = '加载中...';
                })
                this.scroll.on('scrollEnd', () => {
                    this.pullingDownText = '下拉刷新...';
                    this.wjySearchShow = true;
                })
                this.scroll.on('scroll', (pos) => {
                    let wjy_search = this.$refs.wjy_search;
                    let wjy_slider_wrapper = this.$refs.wjy_slider_wrapper;
                    var targetHeight = wjy_slider_wrapper.offsetHeight;
                    // if (this.wjySearchShow) wjy_search.style.display = 'none';
                    if (pos.y > 60 && this.wjySearchShow) {
                        this.pullingDownText = '松开立即刷新...';
                    } else if (pos.y <= 0) {
                        wjy_search.style.display = 'flex';
                        let opacity = 0;
                        let scrollTop = Math.abs(pos.y);
                        scrollTop > targetHeight ? (opacity = 1) : (opacity = 1 * (scrollTop / targetHeight));
                        wjy_search.style.background = `rgba(255, 255, 255, ${opacity})`;
                    }
                });
            },
            search() {
                Storage.set({'categoryType': 1, type: 1});
                this.$router.push({path: '/search'});
            },
            handleToContact() {
                this.$router.push({ path: '/contact' });
            },
            _newsList: function () {
                this.animate = true;
                setTimeout(()=>{
                    this.articleList.push(this.articleList[0]);
                this.articleList.shift();
                this.animate = false;
            }, 1000)},
            ...mapMutations({
                'setSysSku': 'SYS_SKU'
            })
        },
        watch: {
            pullupFlag() {
                setTimeout(() => {
                    this.scroll.refresh();
                }, 20);
            }
        },
        components: {
            Scroll,
            Footer
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
        .wjy-area-wrapper
            .img1
                width 100%
                height 130px
                margin-bottom 12px
                img
                    display block
                    width 100%
                    height 100%
            .img2
                display flex
                height 188px
                margin-bottom 12px
                .item1
                    width 50%
                    img
                        display block
                        width 100%
                        height 100%
                        border-right 1px solid #eee
                        box-sizing border-box
                .item2
                    width 50%
                    div
                        height 50%
                        img
                            display block
                            width 100%
                            height 100%
                    div:nth-child(1)
                            border-bottom 1px solid #eee
                            box-sizing border-box
            .img3
                display flex
                div
                    flex 1
                    height 115px
                    border-right 1px solid #eee
                    img
                        display block
                        width 100%
                        height 100%
                div:last-child
                    border none
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
                height 160px
                min-height 160px
                max-height 160px
                img
                    display block
                    width 100%
                    height 100%
            .wjy-box-wrapper
                display flex
                flex-wrap wrap
                padding 20px 0 0 0
                background #fff
                margin-top 12px
                border-bottom 1px solid #F0F0F0
                .item
                    width 20%
                    text-align center
                    margin-bottom 20px
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
                    min-height 128px
                    max-height 128px
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
                        font-size 12px
                        text-align center
                        padding 10px 8px
                        box-sizing border-box
                        border-right 1px solid #F8F8F8
                        border-bottom 1px solid #F8F8F8
                        img
                            width 100%
                            height 102px
                            margin-bottom 8px
                        .desc
                            width 100%
                            height 30px
                            max-height 30px
                            line-height 1.3
                            overflow hidden
                            margin-bottom 3px
                            color #333333
                            text-align left
                            display -webkit-box
                            -webkit-box-orient vertical
                            -webkit-line-clamp 2
                            letter-spacing 1.5px
                            letter-spacing: 0px;
                        .price
                            text-align left
                            margin-top 10px
                            s
                                color #999999
                            span
                                margin-right 5px
                                color red
</style>

