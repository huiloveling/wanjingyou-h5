<template>
    <transition name="slide">
        <div @click.stop class='wjy-container'>
            <van-nav-bar class='wjy-van-nav-bar'>
                <div slot='left' @click.stop='back'>返回</div>
                <div slot='title'>商品</div>
                <div slot='right'>确定</div>
            </van-nav-bar>
            <div class='amgs'>
                <Scroll
                    class='scroll-wrapper'
                    :data='data'
                    :listenScroll='listenScroll'
                    :probeType='probeType'
                    @scroll='scroll'
                    ref='wrapper'
                >
                    <ul>
                        <li v-for='group in data' class='list-group' ref='listGroup'>
                            <h2 class='list-group-title'>{{group.title}}</h2>
                            <ul>
                                <li v-for='item in group.items' class='list-group-item'>
                                    <van-checkbox-group v-model='result' @change='handleGroupClick'>
                                        <van-checkbox :name='item.name'>
                                            {{ item.name }}
                                        </van-checkbox>
                                    </van-checkbox-group>   
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
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll'
    import goods from './goods.json'
    import {getData} from './../../../common/js/dom'
    import Scroll from './../../../base/scroll/scroll'
    // 每个字母元素的高度
    const ANCHOR_HEIGHT = 18;
    // 歌手标题的高度
    const TITLE_HEIGHT = 30;
    export default {
        data() {
            return {
                data: [],
                checked: true,
                scrollY: -1,
                currentIndex: 0,
                diff: -1,
                result: [],
                fale: true
            }
        },
        computed: {
            shortcutList(){
                return this.data.map((item) => {
                    return item.title.substr(0, 1);
                });
            },
            fixedTitle(){
                if(this.scrollY > 0){
                    return '';
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
            }
        },
        updated() {
            this.fale = true;
        },
        created(){
            this.touch = {};
            this.listenScroll = true;
            this.listHeight = [];
            this.probeType = 3;
        },
        mounted() {
            this.data = goods;
        },
        methods: {
            handleGroupClick(value) {
                if (this.fale) {
                    this.fale = false;
                }
            },
            handleCurrentIndexClick(e) {
                this._scrollTo(getData(e.target, 'index'));
            },
            scroll(pos) {
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
                this.$refs.wrapper.scrollToElement(this.$refs.listGroup[index], 0);
            },
            // 从新计算页面高度方法，让调用方使用
            refresh() {
                this.$refs.wrapper.refresh();
            },
            back() {
                this.$router.back();
            },
        },
        watch: {
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
            Scroll,
        }
    }
</script>

<style scoped lang='stylus'>
    .slide-enter-active, .slide-leave-active
        transition all 0.5s
    .slide-enter, .slide-leave-to
        transform translate3d(100%, 0, 0)
    .wjy-container >>> .van-nav-bar__left
        padding-left 15px
    .wjy-container >>> .van-nav-bar__right
        right 15px
    .wjy-container
        position fixed
        top 0
        left 50px
        right 0
        background-color #fff
        z-index 3333
        transform translate(0,0)
        font-size 16px
        .wjy-van-nav-bar
            position fixed
            top 0
            left 0
            right 0
        .amgs
            position fixed
            top 46px
            left 0
            right 0
            bottom 0
            overflow hidden
            font-size 18px
            .scroll-wrapper
                position relative
                width 100%
                height 100%
                overflow hidden
                .list-group
                    .list-group-title
                        height 30px
                        line-height 30px
                        padding-left 15px
                        font-size 16px
                        color #fff
                        background rgba(210,211,211,1)
                    .list-group-item
                        display flex
                        align-items center
                        height 50px
                        line-height 50px
                        border-bottom 1px solid rgba(209,209,208,1)
                        padding-left 15px
                        padding-right 20px
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                        .name
                          margin-left 15px
                          color #666
                          font-size 16px
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