<template>
    <div class="change_phone_wrap">
        <van-nav-bar title="修改手机号">
            <span slot="left" class="iconfont" style="color:#333;" @click="toback">&#xe6dc;</span>
        </van-nav-bar>
        <div class="input_wrap">
            <van-cell-group>
                <van-field
                    v-model="oldPhone"
                    label="原手机号"
                    clearable
                    disabled
                />
                <van-field
                    v-model="newPhone"
                    label="新手机号"
                    clearable
                    maxLength='13'
                    @input='handleInput'
                    placeholder="请输入新手机号"
                />
                <li>
                    <div class="img_wrap">
                        <img :src="imgCodeUrl" @click='changeImage' />
                    </div>
                    <input type="text" v-model="imgCode" placeholder="请输入验证码">
                </li>
                <van-field
                    v-model="smsCode"
                    center
                    clearable
                    maxLength='4'
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                >
                    <van-button
                        slot="button"
                        size="small"
                        type="primary"
                        @click='getSmsToken'
                    >
                        {{sendButtonText}}
                    </van-button>
                </van-field>
            </van-cell-group>
            <van-button class="confirm_btn" :loading='button_loading' @click='changePhone'>确认</van-button>
        </div>
    </div>
</template>
<script>
    import fatch from './../../common/js/fatch'
    import { trim } from './../../common/js/utils'
    import Storage from './../../common/js/storage'
    import { commonParams, api } from './../../common/js/config'
    export default {
        data() {
            return {
                
                newPhone: '',
                smsCode: '',
                imgCode: '',
                imgCodeUrl: `${api}basic/code?sign=''&uuid=${this.uuid()}&mimimallVersion=1.1.1.web&timestamp=${new Date().getTime()}`,
                sendStatus: false,
                sendTime: 120,
                sendButtonText: '获取验证码',
                button_loading: false
            }
        },
        computed: {
            oldPhone() {
                let oldPhone = Storage.get('user').phone;
                return oldPhone.substr(0, 3) + '****' + oldPhone.substr(oldPhone.length - 4);
            }
        },
        methods: {
            handleInput() {
                this.newPhone = this.formatNum(this.newPhone.replace(/\D/g, ''), true);
            },
            formatNum(num, isTel, count) {
                isTel = isTel || 0;
                count = count || 4;
                if (isTel) num = '0' + num;
                num = num.replace(new RegExp('\\d{' + count + '}', 'g'), ($0) => $0 + ' ')
                if (isTel) num = num.slice(1).trim();
                return num;
            },
            changePhone() {
                if (this.newPhone === '') {
                    this.$toast('手机号不能为空！');
                    return;
                } else if (this.newPhone.length !== 13) {
                    this.$toast('手机号格式不对！');
                    return;
                }
                if (this.imgCode === '') {
                    this.$toast('图片验证码不能为空！');
                    return;
                } else if (this.imgCode.length !== 4) {
                    this.$toast('请输入4位图片验证码！');
                    return;
                }
                if (this.smsCode === '') {
                    this.$toast('短信验证码不能为空！');
                    return;
                }
                this.button_loading = true;
                const url = `${api}user/changePhone`;
                const params = Object.assign({}, commonParams(true), {
                    code: this.smsCode,
                    newPhone: trim(this.newPhone, 1),
                    timestamp: new Date().getTime()
                });
                fatch(url, 'get', params, (err, state) => {
                    this.button_loading = false;
                    this.$toast('修改手机号失败！');
                    this.changeImage();
                }).then((res) => {
                    if (res.code === '0') {
                        this.button_loading = false;
                        this.$toast(res.msg);
                        let user = Storage.get('user');
                        user.phone = trim(this.newPhone, 1);
                        Storage.set({user: user});
                        window.history.go(-1);
                    } else {
                        this.button_loading = false;
                        this.$toast(res.msg);
                        this.changeImage();
                    }
                });
            },
            changeImage() {
                this.imgCodeUrl = `${api}basic/code?sign=''&uuid=${this.uuid()}&mimimallVersion=1.1.1.web&timestamp=${new Date().getTime()}`
            },
            getURL(url, name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = url.substr(1).match(reg);
                if (r != null) return r[2];
                return null;
            },
            getSmsToken() {
                if (this.sendStatus) {
                    return false;
                }
                if (this.newPhone === '') {
                    this.$toast('手机号不能为空！');
                    return;
                } else if (this.newPhone.length !== 13) {
                    this.$toast('手机号格式不对！');
                    return;
                }
                if (this.imgCode === '') {
                    this.$toast('图片验证码不能为空！');
                    return;
                } else if (this.imgCode.length !== 4) {
                    this.$toast('请输入4位图片验证码！');
                    return;
                }
                const url = `${api}basic/getSmsToken`;
                const params = Object.assign({}, commonParams(), {
                    timestamp: new Date().getTime(),
                });
                fatch(url, 'get', params, (err, state) => {
                    this.$toast('短信发送失败！');
                    this.changeImage();
                }).then((res) => {
                    if (res.code === '0') {
                        if (res.data) {
                            this.sendMessageCode(res.data);
                        } else {
                            this.$toast('短信发送失败！');
                            this.changeImage();
                        }
                    } else {
                        this.changeImage();
                        this.$toast('短信发送失败！');
                    }
                })
            },
            sendMessageCode(messageToken) {
                const url = `${api}user/updatePhoneCode`;
                const params = Object.assign({}, commonParams(true), {
                    timestamp: new Date().getTime(),
                    phone: trim(this.newPhone, 1),
                    uuid: this.getURL(this.imgCodeUrl, 'uuid'),
                    code: this.imgCode,
                    messageToken: messageToken
                });
                this.sendStatus = true;
                fatch(url, 'get', params, (err, state) => {
                    this.$toast('短信发送失败！');
                    this.changeImage();
                }).then((res) => {
                    if (res.code === '0') {
                        this.sendTime = 120;
                        this.computeSendTime();
                        this.changeImage();
                    } else {
                        this.$toast(res.msg);
                        this.sendStatus = false;
                        this.changeImage();
                    }
                })
            },
            computeSendTime() {
                if (this.sendStatus) {
                    if (this.sendTime == 0) {
                        this.sendStatus = false;
                        this.sendButtonText = '重新发送'
                    } else {
                        this.sendTime = this.sendTime - 1;
                        this.sendButtonText = this.sendTime + 's';
                        setTimeout(() => {
                            this.computeSendTime();
                        }, 1000);
                   }
                }
            },
            uuid() {
                return (this.random() + this.random() + "-" + this.random() + "-" + this.random() + this.random() + this.random());
            },
            random() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            },
            toback() {
                window.history.go(-1);
            },
        }
    }
</script>


<style lang="stylus" scoped>
.change_phone_wrap >>> .van-field__button
    padding-left none
.change_phone_wrap >>> .van-hairline--bottom::after
    border-bottom none
.change_phone_wrap >>>.van-cell:not(:last-child)::after
    border-bottom none
.change_phone_wrap >>> .van-field__control
    font-size .3rem
.change_phone_wrap >>>.van-cell
    padding 6px 14px
    .van-cell__title
        display flex 
        align-items center
        font-size 14px
        color #333
    .van-field__control
        background #FAFAF9
        height 38px
        padding-left 6px
    .van-button
        height 29px
        background #151514
        border-radius 29px
        border none
        font-size 12px
.change_phone_wrap
    font-size 16px
    letter-spacing .4px
    color #333
    .input_wrap
        li
            padding 0 15px
            display flex
            align-items center
            height 43px
            .img_wrap
                max-width 90px
                flex 1
                height 32px
                img     
                    width 74px 
                    height 32px
                    border-radius 40px
            input   
                color #969799;
                overflow hidden
                position relative
                vertical-align middle
                padding-left 6px
                background #FAFAF9
                height 38px
                flex 1
                color #333
                font-size .3rem
            ::-webkit-input-placeholder
                color    #999
            :-moz-placeholder
                color    #999
            ::-moz-placeholder 
                color    #999
            ::-ms-input-placeholder 
                color    #999
        .confirm_btn
            margin-top 110px
            background #DE1E1D
            border none 
            border-bottom 1px solid #D91716
            width 90%
            margin-left 5%
            height 44px 
            border-radius 44px
            color #fff
            font-size 17px
</style>
