<template>
    <div ref='wrapper'>
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default{
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            },
            refreshDelay: {
                type: Number,
                default: 20
            },
            // 监听滚动事件
            listenScroll: {
                type: Boolean,
                default: false
            },
            pullup: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            flickLimitTime: {
                type: Number,
                default: 1
            },
            pullUpLoadThreshold: {
                type: Number,
                default: -50
            },
            pullingDown: {
                type: Boolean, 
                default: false
            },
            scrollStop: {
                type: Number,
                default: 50
            },
            flag: {
                type: Boolean,
                default: false
            }
        },
        mounted (){
            setTimeout(() => {
                this._initScroll();
            }, 20);
        },
        methods: {
            _initScroll(){
                if(!this.$refs.wrapper){
                    return;
                }
                let obj = null;
                if (this.flag) {
                    obj = {
                        probeType: this.probeType,
                        click: this.click,
                    }
                } else {
                    obj = {
                        probeType: this.probeType,
                        click: this.click,
                        pullDownRefresh: {
                            threshold: this.scrollStop,
                            stop: this.scrollStop
                        },
                        pullUpLoad: {
                            threshold: this.pullUpLoadThreshold
                        }
                    }
                }
                // 初始化BScroll
                this.scroll = new BScroll(this.$refs.wrapper, obj);

                // 监听滚动事件
                if(this.listenScroll){
                    let me = this;
                    this.scroll.on('scroll', (pos) => {
                        me.$emit('scroll', pos, this.scroll.maxScrollY);
                    }); 
                }
                if(this.beforeScroll){
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScroll');
                    });
                }
                if (this.pullup) {
                    this.scroll.on('touchEnd', (pos) => {
                        this.$emit('pullingUp', pos);
                    });
                }
                if (this.pullingDown) {
                    this.scroll.on('pullingDown', () => {
                        this.$emit('pullingDown');
                    })
                }
            },
            enable(){
                this.scroll && this.scroll.enable();
            },
            disable(){
                this.scroll && this.scroll.disable();
            },
            refresh(){
                this.scroll && this.scroll.refresh();
            },
            scrollTo(){
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
            }
        },
        watch: {
            data () {
                // 重新计算高度
                setTimeout(() => {
                    this.refresh();
                }, this.refreshDelay);
            }
        }
    }
</script>