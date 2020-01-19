<template>
    <div class='container'>
        <div class='wjy-login-header'>
            <div class='left' @click='back'>
                <span class='iconfont'>&#xe6dc;</span>
            </div>
            <div class='title'>登录</div>
            <div></div>
        </div>
        <div class='wjy-login-logo' :style='{background: `url(${res})`}'>
            <div class='login-logo'>
                <img :src="require('./../../assets/login-logo.png')" >
            </div>
        </div>
        <div class='wjy-login-form'>
            <div>
                <div class='wjy-login-form-item'>
                    <div class='item-l'>
                        <van-field
                            class='input'
                            :border='false'
                            placeholder="请输入手机号"
                            maxLength='13'
                            v-model='phone'
                            @input='handleInput(1)'
                        />
                        <!-- <div class='icon'>
                            <span class='iconfont'>&#xe605;</span>
                        </div> -->
                    </div>
                </div>
                <div class='wjy-login-form-item'>
                    <div class='item-l'>
                        <van-field
                            placeholder="请输入短信验证码"
                            v-model='messageCode'
                            @input='handleInput(2)'
                            maxLength='4'
                        >
                            <van-button
                                :disabled='disabled'
                                slot="button"
                                size="small"
                                type="primary"
                                @click='getSmsToken'
                            >
                                {{ sendButtonText }}
                            </van-button>
                        </van-field>
                    </div>
                </div>
                <div class='wjy-login-form-item'>
                    <van-button
                        class='login-btn'
                        :disabled='loginDisabled'
                        round
                        type='danger'
                        @click='login'
                    >
                        登录
                    </van-button>
                </div>
                <div class='wjy-login-form-item'>
                    <div class='register' @click='register'>
                        新用户注册
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import fatch from './../../common/js/fatch'
    import Storage from './../../common/js/storage'
    import { commonParams, api } from './../../common/js/config'
    import { trim } from './../../common/js/utils'
    import { mapGetters } from 'vuex'
    import { isLogin } from './../../common/js/utils'
    export default {
        data() {
            return {
                token: '',
                phone: '',
                messageCode: '',
                sendButtonText: '发送验证码',
                disabled: true,
                loginDisabled: true,
                sendStatus: false,
                sendTime: 120,
                path: '',
                res: require('./../../assets/login-bj.png'),
            }
        },
        beforeRouteEnter(to, from, next) {
            if (isLogin()) {
                window.location = '#/mall'
                return;
            } else {
                next();
            }
        },
        beforeCreate() {
            if (isLogin()) {
                this.$router.push({ path: '/mall' });
                return;
            }
        },
        methods: {
            getSmsToken() {
                const url = `${api}basic/getSmsToken`;
                const params = Object.assign({}, commonParams(), {
                    timestamp: new Date().getTime(),
                });
                fatch(url, 'get', params, (err, state) => {
                }).then((res) => {
                    if (res.code === '0') {
                        this.token = res.data;
                        this.sendMessageCode();
                    } else {
                    }
                })
            },
            sendMessageCode() {
                if (this.sendStatus) {
                    return false;
                }
                const url = `${api}user/sendMessageCode`;
                const params = Object.assign({}, commonParams(), {
                    phone: trim(this.phone, 1),
                    sign: '',
                    timestamp: new Date().getTime(),
                    token: this.token
                });
                this.sendStatus = true;
                fatch(url, 'get', params, (err, state) => {
                }).then((res) => {
                    if (res.code === '0') {
                        this.sendTime = 120;
                        this.computeSendTime();
                    } else {
                        this.$toast.fail(res.msg);
                        this.sendStatus = false;
                    }
                })
            },
            login() {
                const url = `${api}user/login`;
                const params = Object.assign({}, commonParams(), {
                    messageCode: this.messageCode,
                    phone: trim(this.phone, 1),
                    sign: '',
                    timestamp: new Date().getTime(),
                });
                fatch(url, 'get', params, (err, state) => {

                }).then((res) => {
                    if (res.code === '0') {
                        const result = res.data;
                        Storage.set({'user': result});
                        this.$router.push({
                            path: Storage.get('login_path') === '' || Storage.get('login_path') === undefined || Storage.get('login_path') === null ? '/mall' : Storage.get('login_path')
                        })
                    } else {
                        this.$toast.fail(res.msg);
                    }
                });
            },
            handleInput(type) {
                if (type === 1) {
                    this.phone = this.formatNum(this.phone.replace(/\D/g, ''), true);
                    if (this.phone.length === 13) {
                        this.disabled = false;
                    } else {
                        this.disabled = true;
                    }
                }
                if (this.messageCode.length && this.phone.length === 13) {
                    this.loginDisabled = false;
                } else {
                    this.loginDisabled = true;
                }
            },
            formatNum(num, isTel, count) {
                isTel = isTel || 0;
                count = count || 4;
                if (isTel) num = '0' + num;
                num = num.replace(new RegExp('\\d{' + count + '}', 'g'), ($0) => $0 + ' ')
                if (isTel) num = num.slice(1).trim();
                return num;
            },
            register() {
                this.$router.push({
                    path: '/register'
                })
            },
            computeSendTime() {
                if (this.sendStatus) {
                    if (this.sendTime == 0) {
                        this.sendStatus = false;
                        this.sendButtonText = '重新发送'
                    } else {
                        this.sendTime = this.sendTime - 1;
                        this.sendButtonText = this.sendTime + '秒后重新获取';
                        setTimeout(() => {
                            this.computeSendTime();
                        }, 1000);
                   }
                }
            },
            back() {
                // this.$router.back(-1);
                this.$router.push({
                    path: '/mall'
                })
            }
        }
    }
</script>

<style lang='stylus' scoped>
.container
    background-color #FBFBFB
    min-height 100vh
    padding-bottom 20px
    box-sizing border-box
    .wjy-login-header
        height 48px
        line-height 48px
        position fixed
        max-width 640px
        margin 0 auto
        top 0
        left 0
        right 0
        font-size 18px
        display flex
        color #fff
        .title
            text-align center
        .left
            padding-left 10px
            box-sizing border-box
        div
            flex 1
    .wjy-login-logo
        height 289px
        width 100%
        background-repeat no-repeat
        background-size 100% 100%
        display flex
        justify-content center
        align-items center
        .login-logo
            width 150px
            height 150px
            img
                display block
                width 100%
                height 100%
    .wjy-login-form
        width 92%
        min-height 200px
        background-color #fff
        margin 0 auto
        margin-top 10px
        .wjy-login-form-item
            padding 0 10px
            .item-l
                display flex
                border-bottom 1px solid #E2E2E2
                .input
                    flex 1
                .icon
                    width 20px
                    font-size 12px
                    text-align center
                    line-height 42px
                    margin-right 15px
                    color #ccc
                button
                    border-radius 20px
                    background-color #30D6F8
                    border none
                    padding 0 15px
            .login-btn
                margin-top 20px
                display block
                width 100%
                font-size 16px
            .register
                font-size 16px
                text-align center
                color #30CAF4
                margin-top 10px
</style>