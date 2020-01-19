<template>
    <transition name='slide'>
        <div @click.stop='back' class='wjy-container'>
            <div @click.stop style='height: 100%; background: #fff; position: relative;'>
                <div class='wjy-screen-header'>
                    价格区间
                </div>
                <div class='wjy-screen-price'>
                    <div>
                        <input placeholder='最低价' />
                    </div>
                    <div class='line'>—</div>
                    <div>
                        <input placeholder='最高价' />
                    </div>
                </div>
                <div class='wjy-screen-res-block'>
                    <van-nav-bar>
                        <div slot='left'>商品</div>
                        <div slot='title'>{{brandName}}</div>
                        <div slot='right' @click='show'>
                            全部
                            <span class='iconfont'>&#xe600;</span>
                        </div>
                    </van-nav-bar>
                    <div class='wjy-screen-res-block-tags-selection'>
                        <div v-for='(item, index) in brandNameMap' :key='item.name' v-if='index < 8'>
                            <span :class='{active: item.bj}' @click='handleGoodsClick(index, item.name)'>{{item.name}}</span>
                        </div>
                    </div>
                </div>
                <div class='wjy-screen-res-block' v-if='categoryType !== 3'>
                    <van-nav-bar>
                        <div slot='left'>分类</div>
                        <div slot='title'>{{this.classifyTitle.join(',')}}</div>
                        <div slot='right'>
                            全部
                            <span class='iconfont'>&#xe600;</span>
                        </div>
                    </van-nav-bar>
                    <div class='wjy-screen-res-block-tags-selection'>
                        <div v-for='(item, index) in goods_list' :key='item.id'>
                            <span :class='{active: item.bj}' @click='handleChoiceClick(index, item.name)'>{{item.name}}</span>
                        </div>
                    </div>
                </div>
                <div class='wjy-screen-footer'>
                    <van-button type='default'>重置</van-button>
                    <van-button type='danger' @click='searchBrand'>确认</van-button>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
    import Storage from './../../../common/js/storage'
    export default {
        data() {
            return {
                brandNameMap: [],
                goods_list: [
                    {name: 'Apple', id: '0', bj: false},
                    {name: 'OPPO', id: '1', bj: false},
                    {name: '中国电信', id: '2', bj: false},
                    {name: '京东物流', id: '3', bj: false},
                    {name: '有货优先', id: '4', bj: false},
                    {name: '货到付款', id: '5', bj: false},
                ],
                classifyTitle: [],
                brandName: '',
                categoryType: Storage.get('categoryType')
            }
        },
        created() {
            const storageBrandNameMap = Storage.get('category').brandNameMap;
            if (storageBrandNameMap.length) {
                storageBrandNameMap.map((item, index) => {
                    this.brandNameMap.push({
                        name: item,
                        bj: false
                    });
                });
            }
        },
        methods: {
            handleChoiceClick(id, name) {
                let classifyTitle = this.classifyTitle;
                let goods_list = this.goods_list;
                for (let i = 0; i < goods_list.length; i++) {
                    if (id === i) {
                        if (goods_list[i].bj) {
                            let index = classifyTitle.indexOf(name);
                            if (index > -1) classifyTitle.splice(index, 1);
                            goods_list[i].bj = false;
                        } else {
                            classifyTitle.push(name);
                            goods_list[i].bj = true;
                        }
                    }
                }
            },
            handleGoodsClick(id, name) {
                if (this.brandName === name) {
                    this.brandName = '';
                } else {
                    this.brandName = name;
                }
            },
            back(){
                this.$router.back();
            },
            searchBrand() {
                this.$emit('searchBrandName', this.brandName);
                this.back();
            },
            show() {
                // this.$router.push({path: '/search/filterInner/filterBlock'})
            }
        },
        watch: {

        }
    }
</script>

<style scoped lang='stylus'>
    .slide-enter-active, .slide-leave-active
        transition all 0.3s
    .slide-enter, .slide-leave-to
        transform translate3d(100%, 0, 0)
    .wjy-container >>> [class*=van-hairline]::after
        border none
    .wjy-container >>> .van-nav-bar__right
        right 0
        font-size 16px
        color #A3A3A3
        font-family 'PingFang-SC-Medium'
    .wjy-container >>> .van-nav-bar__left
        font-size 16px
        left 0
        font-family 'PingFang-SC-Medium'
    .wjy-container >>> .van-nav-bar__title
        font-size 16px
        color #DF2928
        font-family 'PingFang-SC-Medium'
        div
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
    .wjy-container
        box-sizing border-box
        background-color #fff
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        background-color rgba(0, 0, 0, .7)
        z-index 9999
        padding-left 50px
        .wjy-screen-header
            font-size 16px
            height 30px
            line-height 30px
            padding 10px 0 0 10px
        .wjy-screen-price
            display flex
            height 35px
            margin-top 15px
            margin-bottom 15px
            padding 0 0 0 10px
            div
                flex 1
                background-color #F3F2F0
                border-radius 20px
                input
                    display block
                    width 100%
                    border none
                    height 100%
                    font-size 14px
                    background-color #F3F2F0
                    border-radius 20px
                    text-align center
                    padding 0 8px
                    box-sizing border-box
                    color #727272
            .line
                text-align center
                width 80px
                flex 0
                margin 0 15px
                font-size 25px
                line-height 35px
                border none
                border-radius 0px
                background-color #fff
        .wjy-screen-res-block
            width auto
            padding 0 0 0 10px
            margin-bottom 10px
            .wjy-screen-res-block-tags-selection
                display flex
                flex-wrap wrap
                div
                    box-sizing border-box
                    width 33.33%
                    font-size 14px
                    height 30px
                    line-height 30px
                    padding-right 10px
                    text-align center
                    margin-bottom 10px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    span
                        display block
                        width 100%
                        height 100%
                        border-radius 20px
                        background-color #F3F2F0
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                        padding 0 8px
                        box-sizing border-box
                        border 1px solid #F3F2F0
                    .active
                        border 1px solid #E86363
                        box-sizing border-box
                        background-color #fff
        .wjy-screen-footer
            width 100%
            font-size 14px
            position absolute
            left 0
            bottom 0
            display flex
            border-top 1px solid #ccc
            button
                display block
                flex 1
                width 50%
                border none
</style>