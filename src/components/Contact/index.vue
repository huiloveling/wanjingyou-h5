<template>
    <div class="customer_wrap">
        <div class='header'>
            <van-nav-bar title="联系客服">
                <span slot="left" class="iconfont" style="color:#333;" @click="toback">&#xe6dc;</span>
            </van-nav-bar>
        </div>
        <div class='content_talk'>
            <ul>
                <li v-for="(talk, index) in talkList" :class='{left: talk.type === "1", right: talk.type === "0"}'>
                    <div class='time'>{{formatDateTime(talk.createTime)}}</div>
                    <div class='desc'>
                        <div v-show='talk.type === "1"'>
                            <div class='imgs'>
                                <img src='./../../assets/kf.png' />
                            </div>
                            <div class='message_wrap'>
                                {{talk.content}}
                            </div>
                        </div>
                        <div v-show='talk.type === "0"'>
                            <div class='message_wrap'>
                                <p>
                                    {{talk.content}}
                                </p>
                            </div>
                            <div class='imgs'>
                                <img src='./../../assets/dh.png' />
                            </div>
                        </div>
                    </div>
                </li>
                <li id="bt"></li>
            </ul>
        </div>
        <div class="send_wrap">
            <van-field id='input' @focus='focus' @blur='blur' v-model="talk_content" />
            <button @click='send'>发送</button>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import fatch from './../../common/js/fatch'
    import { commonParams, api } from './../../common/js/config'
    import { isLogin } from './../../common/js/utils'
    import Storage from './../../common/js/storage'
    export default {
        data(){
            return{
                talk_content: '',
                talkList: [],
                timer: null,
                interval: null
            }
        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        mounted(){
            if (!isLogin()) {
                Storage.set({login_path: this.$route.path })
                this.$router.push({ path: '/login' });
                return;
            }
            this._getAllMessages();
            this.timer = setInterval(() => {
                this._getAllMessages();
            }, 5000);
        },
        updated(data){
            // document.getElementById('bt').scrollIntoView(true);
        },
        methods:{
            focus() {
                var u = navigator.userAgent, app = navigator.appVersion;
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isIOS) {
            　　　　setTimeout(() => {
                        document.body.scrollTop = document.body.scrollHeight
                    }, 100);
                }
            },
            blur() {
                setTimeout(() => {
                    document.body.scrollTop = document.body.scrollHeight
                }, 100);
            },
            _getAllMessages() {
                const url = `${api}message/getAllMessages`;
                const params = Object.assign({}, commonParams(true), {
                    timestamp: new Date().getTime(),
                    sign: ''
                });
                fatch(url, 'get', params, (err, state) => {

                }).then((res) => {
                    if (res.code === '0') {
                        this.talkList = res.data;
                        
                    } else {

                    }
                });
            },
            send() {
                if (this.talk_content === '') {
                    this.$toast('请输入要发送的信息！');
                    return;
                }
                const url = `${api}message/send`;
                const params = Object.assign({}, commonParams(true), {
                    timestamp: new Date().getTime(),
                    message: this.talk_content,
                    sign: '',
                });
                fatch(url, 'get', params, (err, state) => {

                }).then((res) => {
                    if (res.code === '0') {
                        this.talk_content = '';
                        this._getAllMessages();
                    } else {
                        console.log(res);
                    }
                });
            },
            formatDateTime(time) {
                let date = new Date(time);
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                let d = date.getDate();
                let h = date.getHours();
                let minute = date.getMinutes();
                let second = date.getSeconds();
                m = m < 10 ? ('0' + m) : m;
                d = d < 10 ? ('0' + d) : d;
                h = h < 10 ? ('0' + h) : h;
                minute = minute < 10 ? ('0' + minute) : minute;
                second = second < 10 ? ('0' + second) : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            },
            toback(){
                window.history.go(-1);
                // this.$router.push({
                //     path: Storage.get('login_path') === '' || Storage.get('login_path') === undefined || Storage.get('login_path') === null ? '/mall' : '/mall'
                // })
            }
        },
        watch: {
            talkList() {
                setTimeout(() => {
                    document.getElementById('bt').scrollIntoView(true)
                }, 10);
            }
        }
    }
</script>
<style lang="stylus" scoped>
.customer_wrap
    font-size 16px
    background blue
    .header
        position absolute
        height 46px
        top 0
        left 0
        right 0
        z-index 9999
        display: block;
    .content_talk 
        background #F5F5F4
        position absolute
        overflow-y: auto;
        padding 0 5px
        box-sizing border-box
        top 46px
        left 0
        right 0
        bottom 45px
        display: block;
        ul
            li
                width 100%
                box-sizing border-box
                padding 10px 0
                .time
                    text-align center
                    font-size 12px
                    margin-bottom 5px
                .desc
                    word-wrap:break-word
                    div
                        display flex
                        word-wrap:break-word
                        .imgs
                            img 
                                border-radius 5px
                        .message_wrap
                            min-height 45px
                            display block
                            max-width calc(100% - 100px)
                            position relative
                            padding 10px
                            box-sizing border-box
                            p
                                display block
                                height 100%
                                line-height 25px
            .left
                .desc
                    div
                        display flex
                        .imgs
                            width 45px
                            height 45px
                            margin-right 20px
                            img
                                width 45px
                                height 45px
                        .message_wrap
                            background #fff
                            min-height 45px
                            display block
                            max-width calc(100% - 100px)
                            position relative
                            padding 10px
                            box-sizing border-box
                            word-wrap:break-word
                            display block
                            height 100%
                            line-height 25px
                        ::after
                            content:'';
                            position:absolute;
                            right:100%;
                            top:0px;
                            width:10px;
                            height:10px;
                            border-width:0;
                            border-style:solid;
                            border-color:transparent;
                            border-bottom-width:9px;
                            border-bottom-color: #fff;
                            border-radius:0 0 0 32px;
                            color:#dddddd;
            .right
                .desc
                    div
                        display flex
                        justify-content flex-end
                        .imgs
                            width 45px
                            height 45px
                            margin-left 20px
                            img
                                width 45px
                                height 45px
                        .message_wrap
                            background #FADB0E
                            p
                                word-wrap:break-word
                        .message_wrap ::after
                            content:'';
                            position:absolute;
                            left:100%;
                            top:0px;
                            width:10px;
                            height:10px;
                            border-width:0;
                            border-style:solid;
                            border-color:transparent;
                            border-bottom-width:9px;
                            border-bottom-color:#FADB0E;
                            border-radius:0 0 62px 0;
                            color:#dddddd;
    .send_wrap
        position absolute
        bottom 0 
        left 0
        right 0
        height 45px
        z-index 99999
        border-top 1px solid #D1D1D0
        border-bottom 1px solid #D1D1D0
        display flex
        .input
            flex 1
            font-size 18px
            background-color blue
        button  
            width 76px
            height 45px
            color #333
            background #F5F5F4
            border none
</style>