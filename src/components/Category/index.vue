<template>
    <div class='container'>
        <div class='wjy-search'>
            <div @click='search'>
                <span class='iconfont'>&#xe649;</span>搜索商品
            </div>
        </div>
        <div class='wjy-category-viewport' v-if='rootList.length && branchList.length'>
            <Scroll class='wjy-category-tab' :data='rootList' :flag='true'>
                <ul>
                    <li
                        :class="{active : active == item.name}"
                        v-for='(item, index) in rootList'
                        :key='item.id'
                        @click='change(item.name, item.categoryId)'
                        v-text='item.name'
                    >
                    </li>
                </ul>
            </Scroll>
            <Scroll class='wjy-category-content' :data='branchList' :flag='true'>
                <div>
                    <div
                        class='wjy-category-div'
                        v-for='(item, index) in branchList'
                        :key='item.name'
                    >
                        <h4>{{item.name}}</h4>
                        <ul class='jd-category-style-1'>
                            <li
                                v-for='(item, index) in item.thirdCategoryList'
                                :key='index'
                                @click='searchGoods(item)'
                            >
                                <img v-lazy='item.image' />
                                <span>{{item.name}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Scroll>
        </div>
        <Loading v-show='(!rootList.length && !branchList.length)' />
        <Footer :tabbarActive='1' />
    </div>
</template>

<script>
    import Scroll from './../../base/scroll/scroll.vue';
    import Loading from './../../base/loading/index.vue';
    import fatch from './../../common/js/fatch';
    import Storage from './../../common/js/storage';
    import Footer from './../../base/footer';
    import { commonParams, api } from './../../common/js/config'
    export default {
        data() {
            return {
                rootList: [],
                branchList: [],
                active: '',
            }
        },
        created() {
            this.getCategoryList();
        },
        methods: {
            getCategoryList() {
                const url = `${api}basic/getFirstCategory`;
                const params = Object.assign({}, commonParams(), {
                    timestamp: new Date().getTime()
                });
                fatch(url, 'get', params, (err, state) => {
                    
                }).then((res) => {
                    if (res.code === '0') {
                        if (res.data.length) {
                            this.rootList = res.data;
                            this.active = this.rootList[0].name;
                            this.change(this.active, this.rootList[0].categoryId);
                        } else {
                            
                        }
                    } else {

                    }
                });
            },
            change(name, categoryId) {
                this.active = name;
                const url = `${api}basic/getCategory`;
                const params = Object.assign({}, commonParams(), {
                    timestamp: new Date().getTime(),
                    categoryId
                });
                fatch(url, 'get', params, (err, state) => {

                }).then((res) => {
                    if (res.code === '0') {
                        this.branchList = res.data;
                    } else {

                    }
                });
            },
            searchGoods(data) {
                Storage.set({'categoryType': 3, 'categoryData': data, type: 3});
                this.$router.push({ name: 'search' });
            },
            search() {
                Storage.set({'categoryType': 1, type: 1});
                this.$router.push({path: '/search'});
            },
        },
        components: {
            Scroll,
            Loading,
            Footer
        }
    }
</script>

<style lang='stylus' scoped>
    .container
        min-height 100vh
        overflow-y hidden
        .wjy-search
            height 40px
            flex 1
            border-bottom 1px solid #f8f8f8
            box-sizing border-box
            padding 5px 0
            z-index 10
            background-color #fff
            position fixed
            top 0
            left 0
            right 0
            div
                width 90%
                height 30px
                line-height 30px
                margin 0 auto
                border-radius 15px
                font-size 14px
                text-align center
                background #ECECEB
                color #fff
                span
                    font-size 14px
                    margin-right 3px
        .wjy-category-viewport
            display flex
            .wjy-category-tab
                width 86px
                position fixed
                left 0
                top 40px
                bottom 50px
                ul
                    box-shadow 10px 0px 10px -5px #d0d0d0;
                    li
                        height 46px
                        font-size 14px
                        line-height 46px
                        text-align center
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                        background-color #fff
                    .active
                        color #00A2EB
                        background-color #fff
            .wjy-category-content
                position fixed
                left 86px
                top 40px
                bottom 50px
                right 0
                flex 1
                .wjy-category-div
                    margin 0px 7px 0
                    h4
                        font-size 14px
                        margin-left 10px
                        color #333
                        line-height 30px
                        border-bottom 1px solid #DAD9D9
                    .jd-category-style-1
                        border 0
                        font-size 0
                        padding 7px 10px 0
                        overflow hidden
                        li
                            width 33.33333%
                            float left
                            text-align center
                            img
                                width 70px
                                height 70px
                                margin-bottom 5px
                            span
                                display block
                                color #333
                                height 35px
                                margin-top 2px  
                                font-size 14px
</style>