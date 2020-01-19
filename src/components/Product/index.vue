<template>
    <div class='container' :style='{paddingBottom:  saleState === 0 || state === 0 || sysState !== 3 ? "85px" : "50px"}'>
        <div class='wjy-header-new-bar'>
            <van-nav-bar title='商品详情'>
                <div class='wjy-header-new-bar-left' slot='left' @click='back'>
                    <span class='iconfont'>&#xe6dc;</span>
                </div>
                <div class='wjy-header-new-bar-right' slot='right'>
                    <span class='iconfont' @click='handleToCat'>&#xe602;</span>
                    <span class='iconfont' @click='getMessage'>&#xe6d3;</span>
                </div>
            </van-nav-bar>
            <div class='wjy-header-shortcut-ul' v-show='header_shortcut'>
                <span class='shortcut-top iconfont'>
                    &#xe601;
                </span>
                <ul class='wjy-header-shortcut'>
                    <li>
                        <span class='iconfont'>
                            &#xe604;
                        </span>
                        <router-link to='/mall'>首页</router-link>
                    </li>
                    <li>
                        <span class='iconfont news'>
                            &#xe603;
                            <span v-show='message > 0'>{{message}}</span>
                        </span>
                        <router-link to='/message'>消息</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class='wjy-slider'>
            <van-swipe @change='onChange' :height='375' :autoplay='3000'>
                <van-swipe-item v-for='(item, index) in goodsImgList' :key='index'>
                    <img :src='item.imgUrl' @click='handleImagePreview(index)' />
                </van-swipe-item>
                <div class='custom-indicator' slot='indicator'>
                    {{ current + 1 }}/{{ goodsImgList.length }}
                </div>
            </van-swipe>
        </div>
        <div class='wjy-buy-area'>
            <div style='background: #fff; padding: 10px;'>
                <div class='wjy-text-wrap'>
                    {{ goodsName }}
                </div>
                <div class='wjy-price'>
                    <span>
                        ¥<b>{{_formatPoint(goodsPrice)}}</b>
                        <span v-show='credit !== 0'>
                            +{{credit}}个
                        </span>
                    </span>
                    <span class='wjy-original-price'>
                        ¥<b>{{_formatPoint(goodsOriginalPrice)}}</b>
                    </span>
                </div>
            </div>
        </div>
        <div class='wjy-sku'>
            <div style='background: #fff; padding: 10px;' @click='handleShowSkuClick'>
                <span class='left'>已选</span>
                <span class='title'>{{goodsAttributes}}&nbsp;&nbsp;&nbsp;{{stepper}}个</span>
                <span class='right iconfont'>&#xe600;</span>
            </div>
        </div>
        <div class='wjy-van-tabs'>
            <van-tabs v-model="active">
                <van-tab title="商品介绍">
                    <div v-html='goodsIntroduction'></div>
                </van-tab>
                <van-tab title="规格参数">
                    <div class='html'>
                        <div v-html='goodsParam'></div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div class='wjy-header-mask' v-show='header_shortcut' @click='handleShowShortcut'></div>
        <div class='wjy-footer'>
            <div  v-show='saleState === 0 || state === 0 || sysState !== 3' style='height: 35px; background: #ccc;width: 100%;position: absolute;top: -35px;left: 0;right: 0;font-size: 14px; text-align: center;line-height: 35px;'>
                该商品以下架，非常抱歉
            </div>
            <div class='wjy-footer-service'>
                <img src='./../../assets/service.png' @click='handleToContact' />
            </div>
            <div class='wjy-footer-btn' v-show='saleState === 1 && state === 1 && sysState === 3'>
                <van-button type="primary" @click='handleAddCardClick'>加入购物车</van-button>
                <van-button type="primary" @click='handlePurchaseClick'>立即购买</van-button>
            </div>
            <div class='wjy-footer-btn' v-show='saleState === 0 || state === 0 || sysState !== 3'>
                <van-button type="primary" class='btn' @click='handleSimilarClick'>查看类似商品</van-button>
            </div>
        </div>
        <div
            class='detail_sku_v1_main show'
            :style="{top: transform ? '100%' : '0'}"
            @click='handleHineSkuClick'
        >
            <div
                class='main'
                @click.stop
                :style="{transform: transform ? 'translate3d(0, 495px,0)' : 'translate3d(0, 0,0)'}"
            >
                <div class='header'>
                    <img class='avt' :src="getCurAttrImg()" />
                    <p class='price'>
                        ¥<em>{{_formatPoint(goodsPrice)}}</em>
                    </p>
                    <p class='prop'>
                        商品编号：
                        <span>
                             <!-- {{getActiveAttrTxt()}}&nbsp;&nbsp;{{stepper}}个 -->
                             {{goodsSku}}
                        </span>
                    </p>
                </div>
                <!-- <div class='header_img' v-show='header_img'>
                    {{_formatPoint(goodsPrice)}} 元
                </div> -->
                <div class='body'>
                    <div class='popupSkuArea' id='popupSkuArea'>
                        <div style='height: 250px;overflow: hidden;overflow-y: auto;'>
                            <div v-for='(item, index) in sku' :key='index' >
                                <div class='sku_kind'>{{item.saleName}}</div>
                                <div  class='sku_choose'>
                                    <van-button
                                        class='item'
                                        v-for='(subItem, id) in item.saleAttrList'
                                        :style="{ background: (activeAttr[item.saleName] && activeAttr[item.saleName].saleValue == subItem.saleValue) ? '#fff' : getCurAttrInclude(subItem,item.saleName) ? '#ccc' : '', color : (activeAttr[item.saleName] && activeAttr[item.saleName].saleValue) == subItem.saleValue ? 'red' : '' }"
                                        :disabled="getCurAttrInclude(subItem,item.saleName)"
                                        @click='handleClick(subItem, index, id)'
                                    >
                                        {{subItem.saleValue}}
                                    </van-button>
                                </div>
                            </div>
                        </div>
                        <div class='stepper'>
                            <div class='title'>数量</div>
                            <div class='num'>
                                <van-stepper v-model="stepper" />
                            </div>
                        </div>
                        <span style="display: none">{{count}}</span>
                    </div>
                    <div class='btns show'>
                        <van-button type="danger" @click='handleUpdateSkuClick'>确定</van-button>
                    </div>
                    <div class='body-loading' v-show='body_loading'>
                        <van-loading type="spinner" color="#000" />
                    </div>
                </div>
            </div>
        </div>
        <div class='loading' v-if='loading'>
            <div class='loading-warp'>
                <img :src="require('./../../assets/loading.gif')" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import fatch from './../../common/js/fatch'
    import Storage from './../../common/js/storage'
    import { commonParams, api } from './../../common/js/config'
    import { isLogin } from './../../common/js/utils'
    import { mapGetters, mapMutations } from 'vuex'
    import { ImagePreview } from 'vant';
    import { formatPoint } from './../../common/js/utils';
    export default {
        data() {
            return {
                header_shortcut: false,
                current: 0,
                active: 2,
                goodsImgList: [],
                goodsInfo: '',
                goodsName: '',
                goodsOriginalPrice: '',
                goodsPrice: '',
                goodsAttributes: '',
                goodsIntroduction: '',
                goodsParam: '',
                saleState: '',
                state: '',
                sysState: '',
                goodsSku: '',
                credit: 0,
                stepper: 1,
                count: 0,
                sku: [],
                img: '',
                activeAttr: {},
                transform: true,
                loading: false,
                body_loading: false,
                header_img: false,
                message: 0
            }
        },
        computed: {
            ...mapGetters([
                'sys_sku',
            ])
        },
        mounted() {
            this.getGoodsDetail(this.sys_sku, '', true);
        },
        methods: {
            _formatPoint(price) {
                return formatPoint(price);
            },
            handleSimilarClick() {
                const data = {
                    categoryId: this.goodsInfo.category,
                    name: '类似商品'
                }
                Storage.set({'categoryType': 3, 'categoryData': data, type: 3});
                this.$router.push({ path: '/search' });
            },
            handleImagePreview(index) {
                let arr = [];
                for (let i = 0; i < this.goodsImgList.length; i++) {
                    arr.push(this.goodsImgList[i].imgUrl)
                }
                ImagePreview({
                  images: arr,
                  startPosition: index,
                  onClose() {
                    // do something
                  }
                });
            },
            // 立即购买
            handlePurchaseClick() {
                if (!isLogin()) {
                    Storage.set({login_path: this.$route.path })
                    this.$router.push({ path: '/login' });
                    return;
                }
                let params = [{
                    attributes: this.goodsInfo.attributes,
                    category: this.goodsInfo.category,
                    channelCode: this.goodsInfo.channelCode,
                    createTime: this.goodsInfo.createTime,
                    imageSource: this.goodsInfo.imageSource,
                    isBuy: this.goodsInfo.isBuy,
                    name: this.goodsInfo.name,
                    num: this.stepper,
                    price: this.goodsInfo.price,
                    sku: this.goodsInfo.sku,
                    state: this.goodsInfo.state,
                    sysSku: this.goodsInfo.sysSku,
                    sysState: this.goodsInfo.sysState,
                    imagePath: this.goodsInfo.imagePath,
                }];
                this.setPurchase({params: JSON.stringify(params), cart: 0});
                this.$router.push({ path: '/goodsOrder' });
            },
            handleToCat() {
                if (!isLogin()) {
                    Storage.set({login_path: this.$route.path })
                    this.$router.push({ path: '/login' });
                    return;
                }
                this.$router.push({path: '/card'});
            },
            handleShowSkuClick() {
                this.getGoodsAttribute(this.goodsSku);
            },
            handleHineSkuClick() {
                this.transform = true;
            },
            handleUpdateSkuClick() {
                if (Object.keys(this.activeAttr).length != this.sku.length) {
                    let sku_list = [];
                    for (let i = 0; i < this.sku.length; i++) {
                        sku_list.push(this.sku[i].saleName);
                    }
                    this.$toast('请选择' + '  ' + this.getArrDifference(sku_list, Object.keys(this.activeAttr)).join(' '));
                    return
                }
                this.transform = true;
                if (this.getActiveSkuIds() === undefined) {
                    this.getGoodsDetail('', this.goodsSku, true)
                } else {    
                    this.getGoodsDetail('', this.getActiveSkuIds(), true)
                }
            },
            getArrDifference(arr1, arr2) {
                return arr1.concat(arr2).filter(function(v, i, arr) {
                    return arr.indexOf(v) === arr.lastIndexOf(v);
                });
            },
            // 获取SKU
            getActiveSkuIds() {
                var activeSkuIds = [];
                for (var key in this.activeAttr) {
                    activeSkuIds.push(this.activeAttr[key].skuIds);
                }
                var activeId = 0;
                var map_count = {};
                for (var i = 0; i < activeSkuIds.length; i++) {
                    for (var j = 0; j < activeSkuIds[i].length; j++) {
                        if (map_count[activeSkuIds[i][j]]) {
                           map_count[activeSkuIds[i][j]]++;
                        } else {
                            map_count[activeSkuIds[i][j]] = 1;
                        }
                    }
                }
                for (var key in map_count) {
                    if (map_count[key] == activeSkuIds.length) return key;
                }
            },
            getCurAttrInclude(attrVal, attr_name) {
                if (Object.keys(this.activeAttr).length == 0) return false;
                if (this.sku.length == 1 && attrVal.skuIds.length) return false;
                var skuIds = attrVal.skuIds;
                var find_map = {};
                var is_exits = false;
                for (var i = 0; i < skuIds.length; i++) {
                    var count= 0;
                    var skuId = skuIds[i];
                    var keys = Object.keys(this.activeAttr);
                    for (var j = 0; j < keys.length; j++) {
                        if (this.activeAttr[keys[j]].val_id == attrVal.val_id) {
                            return false;
                        }
                        if (this.activeAttr[keys[j]].skuIds.indexOf(skuId) >- 1) {
                            if (!find_map[this.activeAttr[keys[j]].saleName]) {
                                find_map[this.activeAttr[keys[j]].saleName] = 1;
                            }
                            count++;
                            continue;
                        } else if(keys[j] == attr_name) {
                            count++;
                            continue;
                        }
                    }
                    if (count == Object.keys(this.activeAttr).length) {
                        is_exits = true;
                        break;
                    }
                }
                var plus_num = 0;
                if (is_exits) return false;
                return true;
            },
            // 获取商品图片
            getCurAttrImg() {
                let url = '';
                if (this.goodsImgList.length) {
                    url = this.goodsImgList[0].imgUrl;
                }
                var img_url = '';
                for (var key in this.activeAttr) {
                    if (this.activeAttr[key].imagePath) img_url = this.activeAttr[key].imagePath;
                }
                if (!img_url) return this.cur_img === undefined ? url : this.cur_img;
                this.cur_img = img_url;
                return img_url;
            },
            // 获取商品信息
            getActiveAttrTxt() {
                var attr_res = [];
                for (var key in this.activeAttr) attr_res.push(this.activeAttr[key].saleValue);
                return attr_res.join(",")
            },  
            // 格式化SKU列表
            getSkuData(sku) {
                this.sku = sku.map((item,index1) => {
                    item.saleAttrList.map((subItem, index2) => {
                        subItem.disabled = false;
                        subItem.hasSku = {};
                        for (var i = 0; i < subItem.skuIds.length; i++) {
                            var skuId = subItem.skuIds[i];
                            for (var n = 0; n < sku.length; n++) {
                                if ( n != index1) {
                                    sku[n].saleAttrList.map((item, val_id) => {
                                        item.val_id = sku[n].saleName + val_id;
                                        if (item.skuIds.indexOf(skuId) != -1) {
                                            if (subItem.hasSku[sku[n].saleName]) {
                                                subItem.hasSku[sku[n].saleName].push(this.cloneObj(item));
                                            } else {
                                              subItem.hasSku[sku[n].saleName] = [];
                                              subItem.hasSku[sku[n].saleName].push(this.cloneObj(item));
                                           }
                                        }
                                    });
                                }
                            }
                        }
                    });
                    return item;
                });
            },
            cloneObj (obj) {
                var result = {};
                for (var key in obj) {
                    if (key != 'hasSku') result[key] = obj[key];
                }
                return result;
            },
            lookup(defaultSkuId) {
                for (let i = 0; i < this.sku.length; i++) {
                    let saleAttrList = this.sku[i].saleAttrList;
                    for (let k = 0; k < saleAttrList.length; k++) {
                        let skuIds = saleAttrList[k].skuIds;
                        saleAttrList[k].color = false;
                        saleAttrList[k].bj = false;
                        if (skuIds.indexOf(defaultSkuId) !== -1) {
                            saleAttrList[k].bj = true;
                            saleAttrList[k].color = true;
                            this.activeAttr[this.sku[i].saleName] = saleAttrList[k];
                            break;
                        }
                    }
                }
            },
            // 点击查询SKU
            handleClick(attrVal, index, id) {
                if (this.activeAttr[this.sku[index].saleName] && this.activeAttr[this.sku[index].saleName].saleValue == attrVal.saleValue){
                    delete this.activeAttr[this.sku[index].saleName];
                } else {
                    this.activeAttr[this.sku[index].saleName]=attrVal;
                }
                this.count++; //刷新界面；
                if (Object.keys(this.activeAttr).length == this.sku.length) {
                    this.getActiveSkuIds(); 
                    this.getGoodsDetail('', this.getActiveSkuIds(), false);
                }
            },
            // 添加购物车
            handleAddCardClick() {
                if (!isLogin()) {
                    Storage.set({login_path: this.$route.path })
                    this.$router.push({ path: '/login' });
                    return;
                }
                const url = `${api}cart/addCart`;
                const params = Object.assign({}, commonParams(true), {
                    num: this.stepper,
                    sign: '',
                    sysSku: this.sysSku,
                    timestamp: new Date().getTime()
                });
                fatch(url, 'get', params, (err, state) => {
                    this.$toast('加入购物车失败！');
                }).then((res) => {
                    if (res.code === '0') {
                        this.$toast(res.msg);
                    } else {
                        this.$toast(res.msg);
                    }
                })
            },
            // 获取商品详情
            getGoodsDetail(sysSku, sku, loading) {
                const url = `${api}goods/getGoodsDetail`;
                const params = Object.assign({}, commonParams(), {
                    sign: '',
                    sysSku,
                    sku,
                    timestamp: new Date().getTime()
                });
                if (loading) this.loading = true;
                else this.body_loading = true;
                fatch(url, 'get', params, (err, state) => {
                    if (loading) this.loading = false;
                    else this.body_loading = false;
                    this.$toast(err);
                }).then((res) => {
                    if (res.code === '0') {
                        const result = res.data;
                        this.goodsInfo = result;
                        this.goodsImgList = result.images;
                        this.goodsName = result.name;
                        this.goodsOriginalPrice = result.originalPrice;
                        this.goodsPrice = result.price;
                        this.goodsAttributes = result.attributes;
                        this.goodsIntroduction = result.introduction;
                        this.goodsParam = result.param;
                        this.saleState = result.saleState;
                        this.state = result.state;
                        this.sysState = result.sysState;
                        this.goodsSku = result.sku;
                        this.sysSku = result.sysSku;
                        this.credit = result.credit;
                        if (loading) this.loading = false;
                        else this.body_loading = false;
                    } else {
                        if (loading) this.loading = false;
                        else this.body_loading = false;
                        this.$toast(res.msg);
                    }
                });
            },
            // 获取商品SKU数据
            getGoodsAttribute(goodsSku) {
                const url = `${api}goods/getGoodsAttribute`;
                const params = Object.assign({}, commonParams(), {
                    channelCode: 1,
                    sku: goodsSku,
                    timestamp: new Date().getTime()
                });
                fatch(url, 'get', params, (err, state) => {
                    this.$toast(err);
                }).then((res) => {
                    if (res.code === '0') {
                        let data = res.data;
                        if (data.length === 0) {
                            this.header_img = true;
                        } else {
                            this.header_img = false;
                        }
                        this.getSkuData(data);
                        this.lookup(parseInt(goodsSku));
                        this.transform = false;
                    } else {
                        this.$toast(res.msg);
                    }
                });
            },
            handleShowShortcut() {
                this.header_shortcut = !this.header_shortcut;
            },
            getMessage() {
                if (!isLogin()) {
                    Storage.set({login_path: this.$route.path })
                    this.$router.push({ path: '/login' });
                    return;
                }
                const url = `${api}message/noReadSysMsgSize`;
                const params = Object.assign({}, commonParams(true), {
                    sign: '',
                    timestamp: new Date().getTime()
                });
                fatch(url, 'get', params, (err, state) => {
                    this.header_shortcut = !this.header_shortcut;
                }).then((res) => {
                    if (res.code === '0') {
                        this.header_shortcut = !this.header_shortcut;
                        this.message = res.data;
                    } else {
                        this.header_shortcut = !this.header_shortcut;
                    }
                })
            }, 
            onChange(index) {
                this.current = index;
            },
            handleToContact() {
                this.$router.push({ path: '/contact' });
            },
            back() {
                this.$router.back(-1);
            },
            ...mapMutations({
                'setPurchase': 'PURCHASE'
            })
        }
    }
</script>

<style scoped lang='stylus'>
    .container  >>> .van-tab--active
        color #0BA6EC
    .container >>> .van-tabs__line
        background-color #0BA6EC
    .container >>> .van-tab__pane *
        width 100%!important
        max-width 100%!important
    .container >>> .van-tab__pane img
        max-width 100%!important
    .container >>> .van-tab__pane .html
        padding 15px
        box-sizing border-box
        line-height 1.8
    .container >>> .van-tab__pane div table
        padding 10px
        box-sizing border-box
        border-collapse 0
        overflow hidden
        overflow-x auto
    .container
        background-color #f5f5f4
        min-height 100vh
        padding-bottom 50px
        box-sizing border-box
        .sku_text
            position: absolute
            border-radius 9px
            padding 10px 20px
            height: 30px
            top: 50%
            margin 0 auto
            margin-top: -15px
            left 50%
            text-align center
            color #fff
            font-size 16px
            line-height 30px
            transform translate(-50%, 0)
            background: rgba(0,0,0,0.7)
            z-index: 999999999999999
        .wjy-header-new-bar
            font-size 20px
            z-index 101
            width 100%
            position fixed
            top 0
            left 0
            right 0
            .wjy-header-new-bar-right
                color #747474
                span
                    font-size 18px
                    margin 0 3px
            .wjy-header-shortcut-ul
                position absolute
                right 15px
                top 40px
                border-radius 4px
                z-index 100
                width 132px
                background rgba(0, 0, 0, .7)
                .shortcut-top
                    position absolute
                    color rgba(0, 0, 0, .7)
                    font-size 24px
                    right -1px
                    top -15px
                ul
                    padding 0 15px 0 15px
                    li
                        font-size 16px
                        color #fff
                        display: block
                        position: relative
                        border-bottom: 1px solid hsla(0,0%,100%,.2)
                        height: 38px
                        line-height: 38px
                        z-index: 1000
                        a
                            color #fff
                            margin-left 10px
                        span
                            font-size 16px
                        .news
                            position relative
                            span
                                position absolute
                                font-size 8px
                                min-width 12px
                                height 12px
                                background red
                                text-align center
                                line-height 12px
                                border-radius 50%
                                top -3px
                                right -3px
        .wjy-slider
            height 375px
            min-height 375px
            max-height 375px
            margin-top 46px
            img
                display block
                width 100%
                height 100%
            .custom-indicator
                position absolute
                font-size 16px
                width 70px
                height 25px
                z-index 999
                background #ccc
                bottom 10px
                right 10px
                border-radius 20px
                line-height 25px
                text-align center
                color #fff
        .wjy-header-mask
            position fixed
            top 0
            left 0
            right 0
            bottom 0
            z-index 99
        .wjy-buy-area
            margin-top 10px
            font-size 16px
            padding 0 10px
            color #474747
            font-family 'PingFang-SC-Medium'
            .wjy-text-wrap
                line-height 1.2
                margin-bottom 10px
            .wjy-price
                color #DF0B0B
                .wjy-original-price
                    text-decoration line-through
                    color #7F7F7F
                    margin-left 20px
        .wjy-sku
            font-family 'PingFang-SC-Medium'
            margin 10px 0
            padding 0 10px
            font-size 16px
            color #474747
            div
                display flex
                .title
                    flex 1
                .left
                    width 50px
                .right
                    width 50px
                    text-align right
        .wjy-van-tabs
            font-size 16px
        .wjy-footer
            position fixed
            left 0
            right 0
            bottom 0
            max-width 640px
            margin 0 auto
            height 50px
            z-index 999
            background #fff
            display flex
            .wjy-footer-service
                width 72px
                display flex
                justify-content center
                align-items center
                img
                    width 20px
                    height 20px
                    display block
                    margin 0 auto
            .wjy-footer-btn
                flex 1
                display flex
                button
                    display block
                    height 100%
                    border none
                    border-radius 0px
                button:nth-child(1)
                    background #F7B006
                    width 50%
                button:nth-child(2)
                    width 50% 
                    background #DF0909
                button.btn
                    width 100%
                    background #0ba6ec
        .loading
            position fixed
            top 46px
            left 0
            right 0
            bottom 0
            background #fff
            z-index 1000000000
            display flex
            justify-content center
            align-items center
            .loading-warp
                position absolute
                top 30%
                width 100px
                height 100px
                background rgba(0, 0, 0, .6)
                border-radius 5px
                display flex
                justify-content center
                align-items center
                img
                    display block
                    width 40px
                    height 40px
    .detail_sku_v1_main
        max-width 640px
        margin 0 auto
        position: fixed;
        top: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1999;
        background-color: rgba(0,0,0,.7);
        .main
            position: absolute;
            transform: translate3d(0, 495px,0);
            -webkit-transition: -webkit-transform .2s cubic-bezier(0,0,.25,1);
            transition: -webkit-transform .2s cubic-bezier(0,0,.25,1);
            transition: transform .2s cubic-bezier(0,0,.25,1);
            transition: transform .2s cubic-bezier(0,0,.25,1),-webkit-transform .2s cubic-bezier(0,0,.25,1);
            bottom: 0;
            bottom: constant(safe-area-inset-bottom);
            bottom: env(safe-area-inset-bottom);
            width: 100%;
            max-height: 475px;
            background-color: #fff;
            .header_img
                height 35px
                line-height 35px
                padding 0 10px
                font-size: 16px;
                color: #e4393c;
            .header
                position: relative;
                font-size: 16px;
                color: #333;
                height: 70px;
                padding: 0 0 10px 110px;
                background-color: #fff;
                .avt
                    position: absolute;
                    left: 10px;
                    top: -20px;
                    border-radius: 2px;
                    width: 90px;
                    height: 90px;
                    border: 0 none;
                    vertical-align: top;
                .price
                    display: inline-block;
                    height: 40px;
                    line-height: 40px;
                    color: #e4393c;
                    font-size: 10px;
                    em
                        font-size: 16px;
                        font-family: arial,sans-serif;
                        font-style: normal;
                .prop
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: break-all;
                    font-size: 12px;
                    color: #333;
                    line-height: 1.4em;
                    padding-right: 10px;
            .body
                box-sizing: border-box;
                padding-bottom: 55px;
                overflow: auto;
                position relative
                .body-loading
                    position absolute
                    width 100%
                    height 100%
                    background rgba(255, 255, 255, .1)
                    top 0
                    left 0
                    right 0
                    bottom 0
                    display flex
                    justify-content center
                    align-items center
                .sku_kind
                    font-size: 12px;
                    color: #999;
                    margin: 0 10px;
                    height: 40px;
                    line-height: 40px;
                .sku_choose
                    overflow: hidden;
                    margin-bottom: 3px;
                    .item
                        display: inline-block;
                        padding: 0 10px;
                        min-width: 20px;
                        max-width: 270px;
                        overflow: hidden;
                        height: 30px;
                        line-height: 30px;
                        float: left;
                        text-align: center;
                        margin-left: 10px;
                        margin-bottom: 10px;
                        border-radius: 4px;
                        color: #333;
                        background-color: #fff;
                        font-size: 14px;
            .btns
                display: flex;
                position: absolute;
                bottom: 0;
                background-color: #fff;
                width: 100%;
                button
                    background-color: #e4393c;
                    height: 50px;
                    line-height: 50px;
                    color: #fff;
                    font-size: 16px;
                    text-align: center;
                    width: 80%;
                    display block
                    margin 0 auto
            .stepper
                font-size 14px
                height 28px
                line-height 28px
                display flex
                padding 0 10px
                .num
                    width 50%
                    text-align right
                .title
                    width 50%
</style>