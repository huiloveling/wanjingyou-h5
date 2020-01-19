<template>
    <div class='container'>
        <div class='wjy-header'>
            <div class='back'>
                <!-- <span class='iconfont'>&#xe6dc;</span> -->
            </div>
            <div class='title'>购物车</div>
            <div class='menu'></div>
        </div>
        <div class='checkAll' v-if='list.length'>
            <div class='imgwarp'>
                <img v-show='checkAll' @click='allPick(), checkModel()' :src="require('./../../assets/yas.png')" >
                <img v-show='!checkAll' @click='allPick(), checkModel()' :src="require('./../../assets/yq.png')" >
            </div>
            <div>全选</div>
        </div>
        <div class='wjy-shopcart-list'>
            <div class='product-box' v-for='(item, index) in list' :key='index'>
                <div class='product-ckb' v-show='item.state === 1 && item.sysState === 3'>
                    <img class='emm' v-show='item.isBuy' @click='pickOne(index, undefined, item.sysSku), checkPick()' v-lazy="require('./../../assets/yas.png')" />
                    <img class='emm' v-show='!item.isBuy' @click='pickOne(index, item), checkPick()' v-lazy="require('./../../assets/yq.png')" />
                </div>
                <div class='product-sx' @click='goodsDetail(item.sysSku)'>
                    <div style="width: 100px;height: 100px;position: relative;">
                        <img class='product-img' :src='item.imagePath' />
                        <div class='noGoods' v-show='item.state !== 1 || item.sysState !== 3'>
                            <span>下架</span>
                        </div>
                    </div>
                    <div class='desc'>
                        <div class='proName' v-text='item.name'></div>
                        <div class='sku' v-text='item.attributes'></div>
                        <div class='goods_line'>
                            <span class='price' v-show='item.state === 1 && item.sysState === 3'><span>¥</span> <b>{{_formatPoint(item.price)}}</b></span>
                            <div class='num_and_more' @click.stop v-show='item.state === 1 && item.sysState === 3'>
                                <van-stepper v-model='item.num' @change='handleStepperChange(item.num, item.sysSku)' />
                            </div>
                            <span style="font-size: 14px; color: #333;" v-show='item.state !== 1 || item.sysState !== 3'>
                                该商品以下架，请联系客服
                            </span>
                        </div>
                        <div class='delete_goods'>
                            <span @click.stop='handleDeleteGoodsClick(item.sysSku, index, item)'>删除</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='wjy-fixBar' v-if='list.length'>
            <div class='icon_select'>
                <p>
                    总计：<span><span style="font-size: 10px;">¥</span>{{_formatPoint(totalPrice)}}</span>
                </p>
            </div>
            <div class='total'>
                <van-button type="danger" @click='handleSettlement'>结算</van-button>
            </div>
        </div>
        <Footer :tabbarActive='2' />
        <div class='loading' v-show='loading'>
            <div class='loading-warp'>
                <img :src="require('./../../assets/loading.gif')" alt="">
            </div>
        </div>
        <div class='no_list' v-if='!loading && !list.length'>
            <div>
                <img :src="require('./../../assets/_1cat.png')" />
                <p>购物车是空哒~快去买买买</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Footer from './../../base/footer';
    import fatch from './../../common/js/fatch'
    import Storage from './../../common/js/storage'
    import { commonParams, api } from './../../common/js/config'
    import {accAdd, accMul} from './../../common/js/calculationPrice';
    import { isLogin, formatPoint } from './../../common/js/utils'
    import { mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'Card',
        data() {
            return {
                checked: false,
                stepper: 3,
                list: [],
                checkAll: false,
                checkBoxModel: [],
                params: [],
                loading: true
            }
        },
        mounted() {
            if (!isLogin()) {
                Storage.set({login_path: this.$route.path })
                this.$router.push({ path: '/login' });
                return;
            }
            this.getCatData();
        },
        computed: {
            totalPrice: function () {
                var total = 0;
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i]) {
                        if (this.list[i].state === 1 && this.list[i].sysState === 3) {
                            if (this.list[i].isBuy) {
                                var item = this.list[i];
                                total = accAdd(accMul(item.price, item.num), total);
                            }
                        }
                    }
                }
                return total;
            },
        },
        methods: {
            _formatPoint(price) {
                return formatPoint(price);
            },
            handleSettlement() {
                console.log(this.params)
                if (!this.params.length) {
                    this.$toast('请选择商品！');
                } else {
                    this.setPurchase({params: JSON.stringify(this.params), cart: 1});
                    this.$router.push({ path: '/goodsOrder' });
                }
            },
            handleDeleteGoodsClick(sysSkus, index, item) {
                this.$dialog.confirm({
                  message: '确定要删除该商品吗？',
                  className: 'className',
                }).then(() => {
                  const url = `${api}cart/deleteCart`;
                    const params = Object.assign({}, commonParams(true), {
                        sysSkus,
                        sign: '',
                        timestamp: new Date().getTime()
                    });
                    fatch(url, 'get', params, (err, state) => {
                        this.$toast('删除失败');
                    }).then((res) => {
                        if (res.code === '0') {
                            this.pickOne(index, item);
                            this.checkPick();
                            this.list.splice(index, 1);
                            for (let i = 0; i < this.params.length; i++) {
                                if (this.params[i].sysSkus === sysSkus) {
                                    this.params.splice(i, 1);
                                }
                            }
                        } else {
                            this.$toast(res.msg);
                        }
                    });
                }).catch(() => {
                    
                });
            },
            handleStepperChange(num, sysSku) {
                const url = `${api}cart/editCart`;
                const params = Object.assign({}, commonParams(true), {
                    num,
                    sysSku,
                    sign: '',
                    timestamp: new Date().getTime()
                });
                fatch(url, 'get', params, (err, state) => {

                }).then((res) => {

                })
            },
            getCatData() {
                const url = `${api}cart/getCart`;
                const params = Object.assign({}, commonParams(true), {
                    sign: '',
                    timestamp: new Date().getTime()
                });
                fatch(url, 'get', params, (err, state) => {
                    this.loading = false;
                }).then((res) => {
                    if (res.code === '0') {
                        let result = res.data;
                        if (result !== null) {
                            for (let i = 0; i < result.length; i++) {
                                result[i].isBuy = false;
                            }
                            this.list = result;

                        } else {
                            this.list = [];
                        }
                        this.loading = false;
                    } else {
                        this.loading = false;
                    }
                })
            },
            allPick(value) {
                if (this.checkAll) {
                    this.checkBoxModel = [];
                    this.checkAll = false;
                    this.params = [];
                } else {
                    this.checkBoxModel = [];
                    this.list.forEach((item) => {
                        this.checkBoxModel.push(item.id);
                    });
                    this.checkAll = true;
                    this.params = [];
                    for (let i = 0; i < this.list.length; i++) {
                        console.log(this.list[i])
                        console.log(this.list[i].isBuy)
                        console.log(this.list[i])
                        this.params.push(this.list[i]);
                    }
                }
            },
            checkModel() {
                if (this.checkBoxModel.length) {
                    for (var i = 0; i < this.checkBoxModel.length; i++) this.list[i].isBuy = true;
                } else {
                    for (var i = 0; i < this.list.length; i++) this.list[i].isBuy = false;
                }
            },
            pickOne(index, data, sysSku) {
                if (data === undefined) {
                    for (let i = 0; i < this.params.length; i++) {
                        if (this.params[i].sysSku === sysSku) {
                            this.params.splice(i, 1);
                        }
                    }
                } else {
                    this.params.push(data);
                }
                if (this.list[index]) {
                    if (this.list[index].isBuy) this.list[index].isBuy = false;
                    else this.list[index].isBuy = true;
                }
            },
            checkPick() {
                var sumPic = 0;
                var count = 0;
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].state === 1 && this.list[i].sysState === 3) {
                        count++;
                        if (this.list[i].isBuy) {
                            sumPic++;
                        }
                    }
                }
                if (sumPic == count) {
                    this.checkAll = true;
                }
                else {
                    this.checkAll = false;
                }
            },
            goodsDetail(sysSku) {
                this.setSysSku(sysSku);
                this.$router.push({ path: '/product' });
            },
            back() {
                this.$router.back(-1);
            },
            ...mapMutations({
                'setPurchase': 'PURCHASE',
                'setSysSku': 'SYS_SKU'
            })
        },
        components: {
            Footer
        }
    }
</script>

<style scoped lang='stylus'>
    .container >>> .van-stepper button
        width 30px!important
    .container >>> .van-stepper__input
        width 28px!important   
    .container
        font-size 16px
        background-color #fff
        min-height 100vh
        box-sizing border-box
        padding-bottom 100px
        padding-top 46px
        .checkAll
            height 45px
            display flex
            align-items center
            line-height 45px
            border-bottom 1px solid #e1e1e1
            .imgwarp
                width 40px
                display flex
                align-items center
                justify-content center
                img
                    height 18px
                    width 18px
        .no_list
            display flex
            flex-wrap wrap
            justify-content center
            padding-top 150px
            box-sizing border-box
            div
                img
                    display block
                    width 120px
                    height 120px
                    margin 0 auto
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
        .wjy-header
            max-width 640px
            margin 0 auto
            height 46px
            line-height 46px
            display flex
            background-color #fff
            border-bottom 1px solid #e5e5e5
            box-sizing border-box
            position fixed
            left 0
            top 0
            right 0
            z-index 999999
            .back
                width 46px
                height 46px
                text-align center
            .title
                flex 1
                text-align center
            .menu
                width 46px
                height 46px
        .wjy-shopcart-list
            .product-box
                width: 100%;
                min-height: 130px;
                position: relative;
                .product-ckb
                    width: 40px;
                    height: 100%;
                    display: inline-block;
                    float: left;
                    text-align: center;
                    line-height: 140px;
                    z-index: 99;
                    position: absolute;
                    .em
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        border: 1px solid #B8B4B4;
                        display: inline-block;
                        cursor: pointer;
                    .emm
                        width: 18px;
                        height: 18px;
                        display: inline-block;
                        cursor: pointer;
                .product-sx
                    // height: 130px;
                    padding: 10px 0;
                    border-bottom: 1px solid #e1e1e1;
                    padding-left: 40px;
                    display: inline-block;
                    width: 100%;
                    box-sizing: border-box;
                    position: absolute;
                    display flex
                    .product-img
                        width: 100px;
                        height: 100px;
                    .noGoods
                            position absolute
                            font-size 14px
                            top 50%
                            left 0
                            width 100%
                            height 50%
                            transform translate(0, -50%)
                            color #fff
                            text-align center
                            border-radius 70%
                            background rgba(0, 0, 0, .5)
                            display flex
                            justify-content center
                            align-items center
                            overflow hidden
                            span
                                display block
                                height 25px
                                line-height 25px
                                padding 0 12px
                                overflow: hidden;
                                -webkit-line-clamp: 1;
                                text-overflow:ellipsis;
                                -webkit-box-orient: vertical;
                    .desc
                        padding 0 10px 0 9px
                        box-sizing border-box
                        flex 1
                        .proName
                            font-size 14px
                            display -webkit-box
                            -webkit-box-orient vertical
                            -webkit-line-clamp: 2
                            word-break break-all
                            overflow hidden
                            color #333
                            max-height 32px
                            line-height 16px
                        .sku
                            display -webkit-box
                            -webkit-box-orient vertical
                            -webkit-line-clamp: 1
                            overflow hidden
                            word-break break-all
                            color #999
                            font-size 12px
                            line-height 2
                            margin 2px 0 6px 0
                            min-height 19px
                        .goods_line
                            display flex
                            line-height 30px
                            height 30px
                            .num_and_more
                                flex 1
                                text-align right
                            .price
                                color #e93b3d
                                font-size 10px
                                width 40%
                                span
                                    font-size 10px
                                b
                                    font-size 16px
                        .delete_goods
                            text-align right
                            font-size 14px
                            color #ccc
                            margin-top 5px
                .delete
                    position absolute
                    right 5px
                    top 8px
                    img
                        width 20px
                        height 20px
        .wjy-fixBar
            max-width 640px
            margin 0 auto
            position fixed
            z-index 99
            bottom 50px
            left 0
            right 0
            height 50px
            background #fff
            display flex
            border-bottom 1px solid #ccc
            .icon_select
                width 50%
                font-size 16px
                box-sizing border-box
                height 50px
                line-height 50px
                padding-left 10px
                span
                    color #e93b3d
            .total
                width 50%
                display flex
                text-align right
                justify-content flex-end 
                button
                    display block
                    height 50px
                    line-height 50px
                    border-radius 0
                    border none
                    min-width 100px
                    font-size 16px
</style>