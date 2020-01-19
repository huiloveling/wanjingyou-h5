<template>
    <div class='wjy-container'>
        <div class='wjy-header' v-show='categoryType !== 1'>
            <div class='back' @click='back'>
                <span class='iconfont'>&#xe6dc;</span>
            </div>
            <div class='title'>{{recommendText}}</div>
            <div class='menu'></div>
        </div>
        <div class='wjy-header-search' v-show='categoryType === 1'>
            <div class='wjy-header-search-back' @click='back'>
                <span class='iconfont'>&#xe6dc;</span>
            </div>
            <div class='wjy-header-search-input'>
                <div>
                    <span class='iconfont'>&#xe649;</span>
                    <input placeholder='搜索商品' v-model='search_name' @input='handleInput' />
                </div>
            </div>
            <div class='wjy-header-search-btn'>
                <button @click='handleSearchClick'>搜索</button>
            </div>
        </div>
        <div class='wjy-recent-search' v-show='type === 1 && History && item !== 1'>
            <div class='wjy-recent-search-head'>
                <p>搜索历史</p>
                <div class='wjy-search-head-del' @click='handleDeleteHistory'>
                    <span class='iconfont'>&#xe63a;</span>
                </div>
            </div>
            <div class='wjy-recent-search-list'>
                <span v-for='(item, index) in search_name_list' :key='index'>
                    <a href='javascript:void(0);' @click='handleSearchClick($event, item)'>{{item}}</a>
                </span>
            </div>
        </div>
        <div v-show='type !== 1 || searchState === 1 || item === 1'>
            <div class='wjy-pro-filter'>
                <div class='pro-filter-items'>
                    <a href='javascript:void(0);' :style='{color: comprehensiveColor ? "red" : ""}' @click='handleComprehensiveClick'>综合</a>
                    <a href='javascript:void(0);' @click='handleElevatorClick'>
                        <span :style='{color: priceColor ? "red" : ""}'>价格</span>
                        <div>
                            <p class='iconfont' :style='{color: order === 1 ? "red" : "" }'>&#xe601;</p>
                            <p class='iconfont' :style='{color: order === 2 ? "red" : "" }'>&#xe650;</p>
                        </div>
                    </a>
                    <a href='javascript:void(0);' @click='handleShowScreenClick'>
                        <span :style='{color: screenClick ? "red" : ""}'>筛选</span>
                        <span class='iconfont'>&#xe6c6;</span>
                    </a>
                </div>
            </div>
            <Scroll
                class='wjy-search-prolist'
                ref='prolistWrapper'
                v-show='!searchLoading'
                :data='categoryList'
                :pullup='true'
                :listenScroll='true'
                :pullingDown='true'
                @pullingUp='handlePullinpUp'
                @pullingDown='pullingHandleDown'
                @scroll='handleScroll'
            >
                <div>
                    <div class='wjy-tip'>
                        {{ pullingDownText }}
                    </div>
                    <!-- <div class='loading' v-if='!categoryList.length && type !== 1'>
                        <img :src="require('./../../assets/loading.gif')" alt="">
                    </div> -->
                    <div ref='categoryList' v-if='(categoryList.length && type !== 1 || searchState === 1)'>
                        <div v-for='(item, index) in categoryList' @click='goodsDetail(item.sysSku)'>
                            <van-card
                                :price='_formatPoint(item.price)'
                                :origin-price="_formatPoint(item.originalPrice)"
                                :title='item.name'
                                :thumb='item.imagePath'
                            />
                        </div>
                    </div>
                    <div class='wjy-search-pullUp-text' v-if='height'>{{pullUpText}}</div>
                </div>
            </Scroll>
        </div>
        <Loading :bottom='0' :top='91' v-if='searchLoading || fms_pull' />
        <van-popup
            v-model='overlay'
            class='wjy-van-popup'
            position='right'
            :overlay='true'
            :lock-scroll='false'
            @click-overlay='handleOverlay'
        >
            <div class='warper'>
                <div style="height: 100%;">
                    <div class='wjy-van-btn'>
                        <van-button type='default' @click='handleEmpty'>重置</van-button>
                        <van-button type='danger' @click='handleSearchBrankName'>确认</van-button>
                    </div>
                    <div class='wjy-van-header'>
                        价格区间
                    </div>
                    <div class='wjy-screen-price'>
                        <div>
                            <input onkeyup = "value=value.replace(/[^\d]/g,'')" placeholder='最低价' type='number' v-model='minMoney' />
                        </div>
                        <div class='line'>—</div>
                        <div>
                            <input onkeyup = "value=value.replace(/[^\d]/g,'')" placeholder='最高价' type='number' v-model='maxMoney' />
                        </div>
                    </div>
                    <div class='wjy-screen-res-block' v-if='brandNameMap.length'>
                        <van-nav-bar>
                            <div slot='left'>品牌</div>
                            <div slot='title'>{{brandName}}</div>
                            <div slot='right' @click='handleShowFilter(1)'>
                                全部
                                <span class='iconfont'>&#xe600;</span>
                            </div>
                        </van-nav-bar>
                        <div class='wjy-screen-res-block-tags-selection'>
                            <div v-for='(item, index) in brandNameMap' :key='index' v-if='index < 9'>
                                <span :class='{active: brandName === item.name ? true: false}' @click='handleGoodsClick(index, item.name)'>{{item.name}}</span>
                            </div>
                        </div>
                        <div class='wjy-screen-res-block' style='padding: 0;' v-if='categoryNameMap.length'>
                            <van-nav-bar>
                                <div slot='left'>分类</div>
                                <div slot='title'>{{this.classifyTitle.join(',')}}</div>
                                <div slot='right' @click='handleShowFilter(2)'>
                                    全部
                                    <span class='iconfont'>&#xe600;</span>
                                </div>
                            </van-nav-bar>
                            <div class='wjy-screen-res-block-tags-selection'>
                                <div v-for='(item, index) in categoryNameMap' :key='index' v-if='index < 9'>
                                    <span :class='{active: item.bj}' @click='handleChoiceClick(index, item)'>{{item.categoryName}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class='wjy-van-filter' v-if='van_filter'>
                        <van-nav-bar class='wjy-van-nav-bar' v-show='whole'>
                            <div style='margin-left: 15px;' slot='left' @click='handleHindFilter(1)'>返回</div>
                            <div slot='title'>{{whole === 1 ? '品牌名称' : '分类名称'}}</div>
                            <div slot='right' @click='handleHindFilter(2)'>确定</div>
                        </van-nav-bar>
                        <div class='amgs' v-show='whole === 2'>
                            <Scroll
                                class='scroll-wrapper'
                                :data='categoryNameMap'
                                :listenScroll='listenScroll'
                                :probeType='probeType'
                                :scrollStop='0'
                                ref='scroll_wrapper'
                            >
                                <ul>
                                    <li
                                        style='padding-left: 15px; border-bottom: 1px solid rgba(209,209,208,1);'
                                        class='list-group'
                                        v-for='(item, index) in categoryNameMap'
                                        :key='index'
                                    >
                                        <div
                                            :class='{"van-checkbox": true, active: item.bj}'
                                            @click='handleChoiceClick(index, item)'
                                        >
                                            {{ item.categoryName }}
                                        </div>
                                        <div style="display: none;">{{count}}</div>
                                    </li>
                                </ul>
                            </Scroll>
                        </div>
                        <div class='amgs' v-show='whole === 1'>
                            <Scroll
                                class='scroll-wrapper'
                                :data='data'
                                :listenScroll='listenScroll'
                                :probeType='probeType'
                                @scroll='onScroll'
                                :scrollStop='0'
                                ref='van_wrapper'
                            >
                                <ul>
                                    <li v-for='group in data' class='list-group' ref='listGroup'>
                                        <h2 class='list-group-title'>{{group.tiltle}}</h2>
                                        <ul>
                                            <li v-for='item in group.items' class='list-group-item' @click='handleGroupClick(item)'>
                                                <div class='list_inner li_line'>
                                                    {{ item }}
                                                </div>
                                                <img class='after' src="./../../assets/yq.png" v-show='brandName !== item' />
                                                <img class='after' src="./../../assets/yas.png" v-show='brandName === item' />
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <div class='list-shortcut'
                                    @touchstart.stop.prevent='onshortcutTouchStart'
                                    @touchmove.stop.prevent='onshortcutTouchMove'
                                    @touchend.stop
                                >
                                    <ul>
                                        <li v-for='(item, index) in shortcutList'
                                            class='item'
                                            :data-index='index'
                                            :class="{'current' : currentIndex === index}"
                                            @click='handleCurrentIndexClick'
                                        >
                                            {{item}}
                                        </li>
                                    </ul>
                                </div>
                                <div class='list-fixed' v-show='fixedTitle' ref='fixed'>
                                    <h1 class='fixed-title'>{{fixedTitle}}</h1>
                                </div>
                            </Scroll>
                        </div>
                        <div class='filter_loading' v-if='whole === ""'>
                            <img :src="require('./../../assets/loading.gif')" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </van-popup>
        <NoList v-if='fms' />
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import { mapMutations } from 'vuex';
    import NoList from './../../base/noSearch'
    import fatch from './../../common/js/fatch'
    import Loading from './../../base/loading/index.vue'
    import Storage from './../../common/js/storage'
    import Scroll from './../../base/scroll/scroll'
    import {getData} from './../../common/js/dom'
    import { commonParams, api } from './../../common/js/config'
    import { formatPoint } from './../../common/js/utils'
    // 每个字母元素的高度
    const ANCHOR_HEIGHT = 18;
    // 歌手标题的高度
    const TITLE_HEIGHT = 30;
    export default {
        name: 'Search',
        data() {
            return {
                height: false,
                searchState: 0,
                searchLoading: false,
                search_name: '',
                name: '',
                recommendText: '',
                categoryList: [],
                pageNo: 1,
                pageSize: 10,
                pullUpText: '上拉查看更多',
                categoryData: '',
                categoryType: '',
                overlay: false,
                van_filter: false,
                brandNameMap: [],
                categoryNameMap: [],
                brandName: '',
                minMoney: '',
                maxMoney: '',
                screen: [],
                classifyTitle: [],

                data: [],
                scrollY: -1,
                currentIndex: 0,
                diff: -1,
                result: [],
                orderFlag: true,
                order: '',
                type: '',
                state: '',
                search_name_list: [],
                History: true,
                whole: '',
                fms: false,
                count: 0,
                loading_state: false,
                pullingDownText: '松开立即刷新...',
                fms_pull: false,
                afs: false,


                comprehensiveColor: true,
                priceColor: false,
                screenClick: false
            }
        }, 
        computed: {
            shortcutList(){
                return this.data.map((item) => {
                    return item.tiltle.substr(0, 1);
                });
            },
            fixedTitle(){
                if(this.scrollY > 0){
                    return '';
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].tiltle : '';
            }
        },
        updated() {
            this.fale = true;
        },
        created() {
            this.touch = {};
            this.listenScroll = true;
            this.listHeight = [];
            this.probeType = 3;
        },
        mounted() {
            this.categoryData = Storage.get('categoryData');
            this.categoryType = Storage.get('categoryType') || 1;
            this.type = Storage.get('type') || 1;
            this.state = Storage.get('state');
            this.item = Storage.get('item');
            this.search_name_list = Storage.get('search_name_list');
            if (this.categoryData !== undefined) this.recommendText = this.categoryData.name;
            if (this.categoryData && this.categoryType !== 1) {
                // this.getCategoryList({
                //     brandName: '',
                //     category: this.categoryData.categoryId,
                //     categoryPage: '',
                //     maxMoney: '',
                //     minMoney: '',
                //     order: '',
                //     screen: '',
                //     sign: '',
                //     userId: ''
                // }, false, true);
            }
            if (this.item === 1 && this.categoryType == 1) {
                this.handleSearchClick('', Storage.get('_search_name_'), true);
                // this.getCategoryList({
                //     brandName: '',
                //     category: this.categoryData.categoryId,
                //     categoryPage: '',
                //     maxMoney: '',
                //     minMoney: '',
                //     order: '',
                //     screen: '',
                //     sign: '',
                //     userId: ''
                // }, false, true);
            } else if (this.categoryData && this.categoryType !== 1) {
                this.getCategoryList({
                    brandName: '',
                    category: this.categoryData.categoryId,
                    categoryPage: '',
                    maxMoney: '',
                    minMoney: '',
                    order: '',
                    screen: '',
                    sign: '',
                    userId: ''
                }, false, true);
            }
        },
        methods: {
            _formatPoint(price) {
                return formatPoint(price);
            },
            handleComprehensiveClick() {
                this.categoryList = [];
                this.priceColor = false;
                this.screenClick = false;
                this.comprehensiveColor = true;
                this.order = '';
                this.getCategoryList({
                    brandName: '',
                    category: this.categoryData.categoryId,
                    categoryPage: '',
                    maxMoney: '',
                    minMoney: '',
                    order: '',
                    screen: '',
                    sign: '',
                    userId: ''
                }, false, true);
            },
            goodsDetail(sysSku) {
                this.setSysSku(sysSku);
                Storage.set({item: 1});
                this.$router.push({ path: '/product' });
            },
            /*************获取数据列表******************/
            getCategoryList(params, loading, fn, whole) {
                if (!loading) this.searchLoading = true;
                const url = `${api}goods/search`;
                // const url = `${api}basic/homepageGoods`;
                const data = Object.assign(commonParams(), params, {
                    type: this.type,
                    categoryState: this.categoryType,
                    timestamp: new Date().getTime(),
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    name: this.name,
                    state: this.state == undefined ? '' : this.state
                });
                fatch(url, 'get', data, (err, state) => {
                    this.searchLoading = false;
                    this.pullUpText = '没有数据了...';
                }).then((res) => {
                    this.searchData = true;
                    if (res.code === '0') {
                        if (res.data === null) {
                            if (!loading) {
                                this.categoryList = [];
                            }
                            this.pullUpText = '没有数据了...';
                        } else {
                            Storage.set('category', res.data.category);
                            if (res.data.category.brandNameMap.length) {
                                if (params.categoryPage === '1') {
                                    if (this.count === 0) {
                                        this.formatData(1, Storage.get('category').brandNameMap);
                                        this.formatData(2, Storage.get('category').categoryNameMap);
                                    }
                                    this.count++;
                                }
                            }
                            if (res.data.searchResultMap.length) {
                                this.fms = false;
                                for (let i = 0; i < res.data.searchResultMap.length; i++) {
                                    this.categoryList.push(res.data.searchResultMap[i]);
                                }
                                this.fms_pull = false;
                                setTimeout(() => {
                                    let maxHeight = this.$refs.prolistWrapper.$el.offsetHeight
                                    let minHeight = this.$refs.categoryList.offsetHeight;   
                                    if (minHeight >= maxHeight) {
                                        this.height = true;
                                    } else {
                                        this.height = false;
                                    }
                                }, 500);
                                this.pullUpText = '上拉查看更多';
                            } else {
                                this.pullUpText = '没有数据了...';
                            }
                            this.afs = false;
                        }
                        this.searchLoading = false; 
                    } else {
                        if (!loading) this.fms = true;
                        this.pullUpText = '没有数据了...';
                        this.searchLoading = false;
                        this.fms_pull = false;
                    }
                });
            },
            /***************获取全部分类*******************/
            handleShowFilter(whole) {
                this.whole = whole;
                this.van_filter = true;
                this.formatData(1, Storage.get('category').brandNameMap);
            },
            /*************显示筛选数据***************/
            handleShowScreenClick() {
                let category = '';
                if (this.categoryData) {
                    category = this.categoryData.categoryId;
                }
                this.comprehensiveColor = false;
                this.screenClick = true;
                this.priceColor = false;
                this.order = '';
                this.getCategoryList({
                    brandName: '',
                    category: category,
                    categoryPage: '1',
                    maxMoney: '',
                    minMoney: '',
                    order: '',
                    screen: '',
                    sign: '',
                    userId: '',
                }, true, true);
                this.overlay = true;
            },
            /***************格式化商品名称***************/
            formatData(type, data) {
                let arr = [];
                let ams = [];
                if (type === 1) {
                    for (let i = 0; i < data.length; i++) {
                        for (let k = 0; k < data[i].items.length; k++) {
                            ams.push({
                                name: data[i].items[k],
                                bj: false
                            });
                        }
                    }
                    this.brandNameMap = ams;
                    if (this.whole === 1) {
                        this.data = data;
                    }
                } else if (type === 2) {
                    if (!data) return;
                    if (!data.length) return;
                    data.map((item, index) => {
                        item.bj = false;
                        arr.push(item);
                    });
                    this.categoryNameMap = arr;
                }
            },
            handleScroll(pos) {
                
            },
            handleInput() {
                if (this.search_name.length === 0) {

                } else {

                }
            },
            pullingHandleDown(pos) {
                setTimeout(() => {
                    this.$refs.prolistWrapper.scroll.finishPullDown();
                    this.pullingDownText = '松开立即刷新...';
                }, 2000);
                setTimeout(() => {
                    this.pullUpText = '';
                    this.categoryList = [];
                    this.fms_pull = true;
                    this.pageNo = 1;
                    let category = '';
                    if (this.categoryData) {
                        category = this.categoryData.categoryId;
                    }
                    this.getCategoryList({
                        brandName: this.brandName,
                        category: category,
                        categoryPage: '',
                        maxMoney: this.maxMoney,
                        minMoney: this.minMoney,
                        order: this.order,
                        screen: '',
                        sign: '',
                        userId: '',
                    }, true, false);
                }, 3000);
            },
            /*************上拉加载数据******************/
            handlePullinpUp(pos) {
                if (pos.y > 60) {
                    this.pullingDownText = '加载中...';
                } else if (pos.y < (this.$refs.prolistWrapper.scroll.maxScrollY - 30)) {
                    this.pullUpText = '加载中...';
                    this.pageNo++;
                    let category = '';
                    if (this.categoryData) {
                        category = this.categoryData.categoryId;
                    }
                    this.getCategoryList({
                        brandName: this.brandName,
                        category: category,
                        categoryPage: '',
                        maxMoney: this.maxMoney,
                        minMoney: this.minMoney,
                        order: this.order,
                        screen: '',
                        sign: '',
                        userId: '',
                    }, true, false);
                }
            },
            /*************品牌查询数据******************/
            handleSearchBrankName() {
                this.height = false;
                this.pageNo = 1;
                this.overlay = false;
                this.categoryList = [];
                let category = '';
                if (this.categoryData) {
                    category = this.categoryData.categoryId;
                }
                this.afs = true;
                this.getCategoryList({
                    brandName: this.brandName,
                    category: category,
                    categoryPage: '',
                    maxMoney: this.maxMoney,
                    minMoney: this.minMoney,
                    order: this.order,
                    screen: this.screen.join(','),
                    sign: '',
                    userId: '',
                }, false, true);
            },
            handleDeleteHistory() {
                Storage.set({search_name_list: []});
                this.search_name_list = Storage.get('search_name_list');
            },
            /*************搜索商品******************/
            handleSearchClick(e, name, fn) {
                if (name) {
                    this.search_name = name;
                }
                if (this.search_name === '' && !fn) {
                    this.$toast('请输入搜索的商品名称');
                    return;
                }
                this.History = false;
                this.classifyTitle = []
                let search_name_list;
                if (Storage.get('search_name_list')) {
                    search_name_list = Storage.get('search_name_list');
                } else {
                    search_name_list = [];
                }
                if (search_name_list.length) {
                    for (let i = 0; i < search_name_list.length; i++) {
                        if (search_name_list[i] !== this.search_name) {
                            search_name_list.push(this.search_name);
                        }
                    }
                } else {
                    search_name_list.push(this.search_name);
                }
                this.count = 0;
                Storage.set({type: 1, search_name_list: this.removeDuplicateItems(search_name_list)});
                this.type = Storage.get('type');
                this.categoryList = [];
                this.searchLoading = true;
                this.pageNo = 1;
                this.searchState = 1;
                this.name = this.search_name;
                Storage.set({_search_name_: this.name});
                this.getCategoryList({
                    brandName: '',
                    category: '',
                    categoryPage: '',
                    maxMoney: '',
                    minMoney: '',
                    order: '',
                    screen: '',
                    sign: '',
                    userId: ''
                }, false, true);
            },
            removeDuplicateItems(arr) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr.indexOf(arr[i]) != i) {
                        arr.splice(i, 1);
                        i--;
                    }
                }
                return arr;
            },
            /***************价格排序********************/
            handleElevatorClick() {
                if(this.orderFlag){
                    this.orderFlag = false;
                    this.pageNo = 1;
                    this.order = 1;
                }else{
                    this.orderFlag = true;
                    this.pageNo = 1;
                    this.order = 2;
                }
                this.comprehensiveColor = false;
                this.screenClick = false;
                this.priceColor = true;
                this.categoryList = [];
                this.searchLoading = true;
                this.pageNo = 1;
                let category = '';
                if (this.categoryData) {
                    category = this.categoryData.categoryId;
                }
                this.getCategoryList({
                    brandName: this.brandName,
                    category: category,
                    categoryPage: '',
                    maxMoney: this.maxMoney,
                    minMoney: this.minMoney,
                    order: this.order,
                    screen: this.screen.join(','),
                    sign: '',
                    userId: ''
                }, false, true);
            },
            /*************选择分类******************/
            handleChoiceClick(id, name) {
                let classifyTitle = this.classifyTitle;
                let categoryNameMap = this.categoryNameMap;
                for (let i = 0; i < categoryNameMap.length; i++) {
                    if (id === i) {
                        if (categoryNameMap[i].bj) {
                            let index = classifyTitle.indexOf(name.categoryName);
                            if (index > -1) {
                                classifyTitle.splice(index, 1);
                                this.screen.splice(index, 1);
                            }
                            categoryNameMap[i].bj = false;
                        } else {
                            classifyTitle.push(name.categoryName);
                            this.screen.push(name.categoryId);
                            categoryNameMap[i].bj = true;
                        }
                    }
                }
            },
            /*************选择品牌******************/
            handleGoodsClick(id, name) {
                if (this.brandName === name) {
                    this.brandName = '';
                } else {
                    this.brandName = name;
                }
            },
            handleHindFilter() {
                // this.whole = '';
                this.van_filter = false;
            },
            /************点击蒙层关闭筛选数据****************/
            handleOverlay() {
                // this.classifyTitle = []
                // this.brandNameMap = [];
                // this.categoryNameMap = [];
                // this.brandName = '';
                // this.screen = [];
                this.currentIndex = 0;
                this.van_filter = false;
            },
            /*************重置筛选条件******************/
            handleEmpty() {
                this.brandName = '';
                this.classifyTitle = [];
                this.maxMoney = '';
                this.minMoney = '';
                this.screen = [];
                this.categoryNameMap.map((item) => {
                    item.bj = false;
                });
            },
            /***************更多分类选择数据****************/
            handleGroupClick(value) {
                if (this.brandName === value) {
                    this.brandName = '';
                } else {
                    this.brandName = value;
                }
            },  
            handleCurrentIndexClick(e) {
                this._scrollTo(getData(e.target, 'index'));
            },
            onScroll(pos) {
                this.scrollY = pos.y;
            },
            _calculateHeight() { 
                this.listHeight = [];
                const list = this.$refs.listGroup;
                // 默认高度
                let height = 0;
                // 第一组默认高度
                this.listHeight.push(height);
                for(let i = 0 ; i < list.length ; i++){
                    let item = list[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            onshortcutTouchStart(e) {
                // 获取当前点击的索引
                let anchorIndex = getData(e.target, 'index');
                // 获取第一次点击的位置
                let firstTouch = e.touches[0];
                // 记录点击的位置
                this.touch.y1 = firstTouch.pageY;
                // 记录当前点击的索引
                this.touch.anchorIndex = anchorIndex;
                this._scrollTo(anchorIndex);
            },
            onshortcutTouchMove(e) {
                // 获取移动为位置
                let firstTouch = e.touches[0];
                // 记录移动为位置
                this.touch.y2 = firstTouch.pageY;
                // 计算从y1移动到y2一共移动了几个元素
                let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
                // 计算移动的位置第一次点击的位置加上delta
                let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
                this._scrollTo(anchorIndex);
            },
            _scrollTo(index) {
                // 点击事件边距处理
                if (!index && index !== 0) {
                    return;
                }
                // 移动事件边距处理
                if (index < 0) {
                    index = 0;
                } else if(index > this.listHeight.length - 2) {
                    index = this.listHeight.length -2;
                }
                // 点击事件高亮同步
                this.scrollY = -this.listHeight[index];
                this.$refs.van_wrapper.scrollToElement(this.$refs.listGroup[index], 0);
            },
            back() {
                console.log(window.history.length)
                Storage.set({item: 0})
                this.$router.back(-1);
            },
            ...mapMutations({
                'setSysSku': 'SYS_SKU'
            })
        },
        watch: {
            categoryList () {
                setTimeout(() => {
                    this.scroll && this.scroll.refresh();
                }, 20);
            },
            data() {
                setTimeout(() => {
                    this._calculateHeight();
                }, 20);
            },
            scrollY(newY) {
                const listHeight = this.listHeight;
                // 当滚动到顶部，newY>0
                if(newY > 0){
                    this.currentIndex = 0;
                    return;
                }
                // 在中间部分滚动
                for(let i = 0; i < listHeight.length - 1; i++){
                    // 当前滚动的下线
                    let height1 = listHeight[i];
                    // 当前滚动的上线
                    let height2 = listHeight[i + 1];
                    if(-newY >= height1 && -newY < height2){
                        this.currentIndex = i;
                        this.diff = height2 + newY;
                        return;
                    }
                }
                // 当滚动到底部，且-newY大于最后一个元素的上限
                this.currentIndex = listHeight.length - 2;
            },
            diff(newVal) {
                let fiexdTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
                if(this.fiexdTop === fiexdTop){
                    return;
                }
                this.fiexdTop = fiexdTop;
                this.$refs.fixed.style.transform = `translate3d(0,${fiexdTop}px,0)`;
            }
        },
        components: {
            NoList,
            Loading,
            Scroll
        }
    }
</script>

<style scoped lang='stylus'>
    .slide-enter-active, .slide-leave-active
        transition all 0.3s
    .slide-enter, .slide-leave-to
        transform translate3d(100%, 0, 0)
    .wjy-container >>> .wjy-van-popup .van-nav-bar__right
        right 15px
    .wjy-container >>> .van-overlay
        min-height 100vh
    .wjy-container >>> .van-popup--right
        width 90%
        height 100%
    .wjy-container >>> [class*=van-hairline]::after
        border none
    .wjy-container >>> .van-nav-bar__right
        right 0
        font-size 16px
        color #A3A3A3
        font-family 'PingFang-SC-Medium'
    .wjy-container >>> .van-card__title
        color #666
        font-weight 400
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
        .wjy-header
            max-width 640px
            margin 0 auto
            height 44px
            line-height 44px
            display flex
            background-color #fff
            border-bottom 1px solid #e5e5e5
            box-sizing border-box
            font-size 18px
            .back
                width 44px
                height 44px
                font-size 16px
                text-align center
                span
                    font-size 16px
            .title
                flex 1
                text-align center
            .menu
                width 44px
                height 44px
        .wyj-screen
            position fixed
            top 0
            right 0
            left 0
            bottom 0
            z-index 99
            background-color rgba(0, 0, 0, .7)
            padding-left 30px
        .wjy-header-search
            height 44px
            display flex
            border-bottom 1px solid #eee
            .wjy-header-search-back
                width 40px
                height 44px
                display flex
                justify-content center
                align-items center
                span
                    font-size 20px
                    display block
                    color #666
                    
            .wjy-header-search-input
                flex 1
                height 44px
                box-sizing border-box
                div
                    height 30px
                    width 95%
                    display flex
                    background #F0F0EF
                    border-radius 15px
                    margin 0 auto
                    margin-top 7px
                    position relative
                    input
                        font-size 14px
                        height 30px
                        width 100%
                        background #f7f7f7
                        border-radius 15px
                        box-sizing border-box
                        padding-right 10px
                        color #ccc
                        padding-left 30px
                    input::-webkit-input-placeholder
                        color #ccc
                    span
                        position absolute
                        left 10px
                        top 50%
                        font-size 14px
                        transform translateY(-50%)
                        color #ccc
            .wjy-header-search-btn
                width 55px
                height 44px
                padding-top 7px
                box-sizing border-box
                button
                    padding-left: 7px;
                    padding-right: 7px;
                    display block
                    height 30px
                    font-size 14px
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    margin 0 auto
                    margin-left 0
                    border none
                    background #e93b3d
                    color #fff
                    border-radius 5px
                    font-family '微软雅黑'
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
            display block
            .pro-filter-items
                display flex
                font-size 14px
                border-bottom 1px solid #eee
                a
                    flex 1
                    height 46px
                    text-align center
                    line-height 46px
                    color #333
                    span
                        font-size 13px
                a:nth-child(2)
                    border-left 1px solid #eee
                    border-right 1px solid #eee
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
                        p:nth-child(2)
                            align-items flex-end
                            margin-top 9px
        .wjy-search-prolist
            max-width 640px
            margin 0 auto
            position fixed
            left 0
            top 92px
            right 0
            bottom 0
            overflow hidden
            .loading
                width 100%
                height 500px
                display flex
                justify-content center
                align-items center
                img
                    width 25px
                    height 25px
            .wjy-tip
                position absolute
                left 0
                right 0
                top -46px
                height 50px
                line-height 50px
                font-size 18px
                text-align center
                display flex
                justify-content center
                align-items center
            .wjy-search-pullUp-text
                text-align center
                font-size 16px
                height 40px
                line-height 40px
        .wjy-van-popup
            .warper
                position relative
                min-width 100%
                width 100%
                height 100%
                transform translate(0,0)
                .wjy-van-btn
                    position fixed
                    width 100%
                    left 0
                    bottom 0
                    right 0
                    display flex
                    button
                        display block
                        width 50%
                        border none
                div
                    overflow hidden
                    overflow-y auto
                    .warper_loading
                        height 100%
                        width 100%
                        display flex
                        justify-content center
                        align-items center
                        img
                            display block
                            width 45px
                            height 45px
                    .wjy-van-header
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
                                line-height 35px
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
                        padding-bottom 44px
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
                    .wjy-van-filter
                        position fixed
                        width 100%
                        height 100%
                        right 0
                        top 0
                        left 0
                        bottom 0
                        font-size 16px
                        background-color #fff
                        transform translate(0,0)
                        z-index 30
                        .filter_loading
                            height 100%
                            width 100%
                            display flex
                            justify-content center
                            align-items center
                            img
                                display block
                                width 45px
                                height 45px
                        .wjy-van-nav-bar
                            position fixed
                            top 0
                            left 0
                            right 0
                        .amgs
                            position fixed
                            top 45px
                            left 0
                            right 0
                            bottom 0
                            overflow hidden
                            .scroll-wrapper
                                position relative
                                width 100%
                                height 100%
                                overflow hidden
                                .list-group
                                    .van-checkbox
                                        height 50px
                                        line-height 50px
                                        &.active
                                            color red
                                    .list-group-title
                                        height 30px
                                        line-height 30px
                                        padding-left 15px
                                        font-size 16px
                                        color #fff
                                        background rgba(210,211,211,1)
                                    ul
                                        padding-left 10px
                                        .list-group-item
                                            padding 10px 10px 10px 30px
                                            position relative
                                            line-height 25px
                                            .after
                                                position: absolute;
                                                top: 50%;
                                                left: 0;
                                                -webkit-transform: translate(0,-50%);
                                                transform: translate(0,-50%);
                                                width: 20px;
                                                height: 20px;
                                .list-shortcut
                                    position absolute
                                    z-index 30
                                    right 0
                                    top 50%
                                    transform translateY(-50%)
                                    width 20px
                                    padding 20px 0
                                    border-radius 10px
                                    text-align center
                                    background-color #d2d3d3
                                    .item
                                        padding 3px
                                        line-height 1
                                        color #000
                                        font-size 12px
                                        &.current
                                            color red
                                .list-fixed
                                    position absolute
                                    top 0
                                    left 0
                                    width 100%
                                    .fixed-title
                                        height 30px
                                        line-height 30px
                                        padding-left 15px
                                        font-size 16px
                                        color #fff
                                        background rgba(210,211,211,1)
</style>