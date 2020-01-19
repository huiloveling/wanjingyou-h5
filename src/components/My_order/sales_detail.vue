<template>
    <div class="after_sale_wrap">
        <van-nav-bar title="售后服务">
            <span slot="left" class="iconfont" @click="toback">&#xe6dc;</span>
        </van-nav-bar>
        <div class="detail_content" v-for="i in goodsList">
            <div class="goods_wrap">
                <div class="detail_img">
                    <img :src="i.order_img" alt="">
                </div>
                <div class="detail_info">
                    <p class="goods_title">{{_formatPoint(i.order_title)}}</p>
                    <p class="goods_price">
                        <span>单价：{{_formatPoint(i.order_price)}}</span>
                        <label>购买数量：{{i.order_num}}</label>
                    </p>
                </div>
            </div>
        </div>
        <div class="step_wrap">
            <span>申请数量</span>
            <van-stepper v-model="value" />
        </div>
        <div class="line_height"></div>
        <ul class="change_and_return">
            <li @click="to_sales_detail(1)" class="reason_type">
                <div>
                    <p class="p_title">售后类型</p>
                    <p class="p_content">退货</p>
                </div>
                <span class="iconfont">&#xe600;</span>
            </li>
            <li class="reason_wrap">
                <p class="apply_reason">
                    <span>申请原因</span>
                    <span class="other_span" @click="show_picker()">
                        <label v-if="this.radio=='1'">质量问题</label>
                        <label v-else-if="radio=='2'">商品与描述不符</label>
                        <label v-else-if="radio=='3'">七天无理由退换货</label>
                        <label v-else-if="radio=='4'">卖家发错货</label>
                        <label v-else="radio=='5'">其他</label>
                    </span>
                </p>
                <p class="p_content p_gray">请描述具体问题，建议先于客服沟通确认。</p>
            </li>
        </ul>
        <div class="line_height"></div>
        <div class="sale_center">
            <div class="ask_wrap">
                <p class="ask_title">问题描述</p>
                <van-cell-group>
                    <van-field
                        v-model="message"
                        type="textarea"
                        placeholder="请输入问题"
                        rows="2"
                        autosize
                    />
                </van-cell-group>
            </div>
            <div class="ask_wrap upload_wrap">
                <div class="upload">
                    <div>
                        <img src="./../../assets/camera.png" alt="">
                    </div>
                    最多可上传5张图片
                </div>
                <div class="img_wrap">
                    <div v-for='(item, index) in img_wrap_list' :key='index'>
                        <img :src='item.url' />
                        <span class="iconfont" @click='deletPic(index)'>&#xe605;</span>
                    </div>
                    <div class='upload-file' v-show='img_wrap_list.length < 5'>
                        <p>
                            <img src='./../../assets/AddPhotoIcon.png' height="30" width="30" />
                            <input type='file' ref='file' @change='handleChangeClick' />
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="line_height"></div>
        <div class="send_back_way">
            <div class="send_back_title">商品寄回方式</div>
            <ul class="send_back_info">
                <p class="data_info">请正确填写取件信息</p>
                <li>
                    <span>*联系人:</span>
                    <input class="info_input" type="text" name="" id="" placeholder="请输入联系人姓名">
                </li>
                <li>
                    <span>*联系电话:</span>
                    <input class="info_input" type="text" name="" id="" placeholder="请输入联系电话">
                </li>
                <li>
                    <span>*所在地区:</span>
                    <p class="info_input" style="height:15px;" @click="choose_area()"></p>
                    <span class="iconfont">&#xe600;</span>
                </li>
                <li>
                    <span>*详细地址:</span>
                    <input class="info_input" type="text" name="" id="">
                </li>
            </ul>
            <div class="back_way_btn">
                <button @click="home_back()" id="home_btn">上门取件</button>
                <button @click="express_back" id="express_btn">快递寄回商家</button>
            </div>
            <van-popup v-model="showArea" position="bottom" :overlay="true">
                <van-picker
                    show-toolbar#
                    title="标题"
                    :columns="columns2"
                    @cancel="onCancel"
                    @confirm="onConfirm"
                    />
            </van-popup>
            <van-popup v-model="show_express_btn" :overlay="true" class="van_wrap">
                <p class="express_btn_title">提示<span class="iconfont" @click='close_van_wrap()'>&#xe605;</span></p>
                <div class="black_code">商品退回地址将会在平台通过审核后“退换/售后"列表内展示请查收。</div>
                <div class="red_code">
                    <span>注意: 如您将返回方式由“上门取件”改为“快递寄回商家”需要您自行承担物流费用，无法享受免费上门取件。</span><br>
                    <span class="red_note">（备注：特殊商品不支持快递寄回商家，最终寄回方式以平台审核为准）</span>
                </div>
            </van-popup>
        </div>
        <div class="send_back_way">
            <div class="send_back_title">换货收货信息</div>
            <ul class="send_back_info">
                <li>
                    <span>*联系人:</span>
                    <input class="info_input" type="text" name="" id="" placeholder="请输入联系人姓名">
                </li>
                <li>
                    <span>*联系电话:</span>
                    <input class="info_input" type="text" name="" id="" placeholder="请输入联系电话">
                </li>
                <li>
                    <span>*所在地区:</span>
                    <p class="info_input" style="height:15px;" @click="choose_area()"></p>
                    <span class="iconfont">&#xe600;</span>
                </li>
                <li>
                    <span>*详细地址:</span>
                    <input class="info_input" type="text" name="" id="">
                </li>
            </ul>
        </div>
        <div class="line_height"></div>
        <div class="back_money">
            <li>
                <span>退款金额：￥8388.00</span>
            </li>
            <li>
                <span>退款方式：退款原路返回</span>
            </li>
        </div>
        <div class="bottom_btn">
            <button class="cancel_btn">取消</button>
            <button class="sub_btn" @click="put_in()">提交</button>
        </div>
        <div class="bottom_choose" v-show="show">
            <van-popup v-model="show" position="bottom" :overlay="false">
                <div class="close_wrap">
                    <span>申请原因</span>
                    <span class="icon_close" @click="close_reason()">X</span>
                </div>
                <van-radio-group v-model="radio">
                    <van-cell-group>
                        <van-cell title="质量问题" clickable @click="change_radio('1')">
                            <van-radio name="1" />
                        </van-cell>
                        <van-cell title="商品与描述不符" clickable @click="change_radio('2')">
                            <van-radio name="2" />
                        </van-cell>
                        <van-cell title="七天无理由退换货" clickable @click="change_radio('3')">
                            <van-radio name="3" />
                        </van-cell>
                        <van-cell title="卖家发错货" clickable @click="change_radio('4')">
                            <van-radio name="4" />
                        </van-cell>
                        <van-cell title="其他" clickable @click="change_radio('5')">
                            <van-radio name="5" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </van-popup>
        </div>
    </div>
</template>
<script>
    import { isLogin, formatPoint } from './../../common/js/utils'
    import Storage from './../../common/js/storage'
    export default {
        data(){
            return{
                order_id:null,
                showArea:false,//选择地区
                show:true,
                show_express_btn:false, // 点击快递寄回商家按钮出现的提示窗
                value:1,
                columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
                picker_true:false,
                radio: '5',
                radio_state:'1',
                columns2: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
                goodsList:[
                    {
                        order_time:'2018-6-24',
                        order_id:1,
                        order_state:1,
                        order_title:'[Apple Iphone8 (A1863) 641 高短金色 移动联通电信4G手机]',
                        order_img:"https://img14.360buyimg.com/n0/jfs/t10675/253/1344769770/66891/92d54ca4/59df2e7fN86c99a27.jpg",
                        order_goods_info:"颜色：金色  版本：全网通64G",
                        order_price:6400.00,
                        order_num:1
                    },
                ],
                dataArr:[],
                message:"",
                img_wrap_list: [
                ]
            }
        },
        mounted(){
            if (!isLogin()) {
                Storage.set({login_path: this.$route.path })
                this.$router.push({ path: '/login' });
                return;
            }
        },
        methods:{
            _formatPoint(price) {
                return formatPoint(price);
            },
            close_van_wrap(){
                this.show_express_btn = false;
            },
            home_back(){
                document.getElementById("home_btn").style.borderColor = "#EA0808";
                document.getElementById("express_btn").style.borderColor = "#B5B5B5";
            },
            express_back(){
                this.show_express_btn = true;
                document.getElementById("home_btn").style.borderColor = "#B5B5B5";
                document.getElementById("express_btn").style.borderColor = "#EA0808";
            },
            toback(){
                window.history.go(-1);
            },
            onConfirm(value, index) {
                this.$toast(`当前值：${value}, 当前索引：${index}`);
            },
            to_sales_detail(item){
                location.href = `#/after_sales/${item}`;
                location.href = `#/sales_detail/${item}`
            },
            onChange(picker, value, index) {
                this.$toast(`当前值：${value}, 当前索引：${index}`);
            },
            show_picker(){
                this.show = !this.show;
            },
            change_radio(item){
                this.radio = item;
                this.show = false;
            },
            close_reason(){
                this.show = false;
            },
            deletPic(nowIndex) {
                this.img_wrap_list.splice(nowIndex, 1);
            },
            handleChangeClick() {
                const fileData = this.$refs.file.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.img_wrap_list.push({
                        url: e.target.result
                    })
                }
                reader.readAsDataURL(fileData);
            },
            add_img(){
                if(this.dataArr.length==4){
                    alert("最多上传4张图片");
                    return;
                }
                var oInput = document.getElementById("file_input");
                oInput.value = "";   // 先将oInput值清空，否则选择图片与上次相同时change事件不会触发
                oInput.click();
            },
            readFile(){
                const this_ = this;
                var fd;
                fd = new FormData();
                console.log(this_)
                return;
                var iLen = this.files.length;
                console.log(this)
                var size = this.files[0].size/1024;
                if(size>2000){
                    alert("不能上传超过两M的照片");
                    return;
                }
                for(var i=0;i<iLen;i++){
                    if (!input['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)){　　//判断上传文件格式
                        return alert("上传的图片格式不正确，请重新选择");
                    }
                    var reader = new FileReader();
                    fd.append(i,this.files[i]);
                    reader.readAsDataURL(this.files[i]);  //转成base64
                    reader.fileName = this.files[i].name;
                    reader.onload = function(e){
                        var imgMsg = {
                            name : this.fileName,//获取文件名
                            base64 : this.result   //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里
                        }
                        var i = 0;
                        i++;
                        this_.dataArr.push(imgMsg);
                        result = '<div class="delete">delete</div><div class="result"><img class="subPic" src="'+this.result+'" alt="'+this.fileName+'"/></div>';
                        var div = document.createElement('div');
                        div.innerHTML = result;
                        div['className'] = 'float';
                        document.getElementsByClassName('show_img')[0].appendChild(div);  　　//插入dom树
                        var img = div.getElementsByTagName('img')[0];
                        img.onload = function(){
                            var nowHeight = ReSizePic(this); //设置图片大小
                            this.parentNode.style.display = 'block';
                            var oParent = this.parentNode;
                            if(nowHeight){
                                oParent.style.paddingTop = (oParent.offsetHeight - nowHeight)/2 + 'px';
                            }
                        }
                        for(var i=0;i<this_.dataArr.length;i++){
                            this_.dataArr[i].index=i;
                            div.onclick = function(){
                                console.log(this_.dataArr);
                            }
                        }
                        div.onclick = function(num){
                            this_.dataArr.splice(num,1);
                            $(this).remove();                 // 在页面中删除该图片元素
                            console.log(this_.dataArr);
                        }
                    }
                }
            },
            choose_area(){
                this.showArea = true;
            },
            onConfirm(value, index) {
                this.$toast(`当前值：${value}, 当前索引：${index}`);
            },
            onCancel() {
                this.showArea = false;
            },
            put_in(){
                this.$toast("您的售后申请已提交，具体售后进度请到售后列表内查看");
            }
        }
    }
</script>
<style lang="stylus" scoped>
.after_sale_wrap >>>[class*=van-hairline]::after
    border-bottom 1px solid #DADAD9
.after_sale_wrap >>>.van-nav-bar
    z-index 0
.after_sale_wrap
    font-size 16px
    letter-spacing .6px
    position relative
    height 100%
    width 100vw
    color #333
    min-width 275px
    max-width 640px
    background #fff
    .iconfont
        font-size 14px
        color #999
    .detail_content
        background #fff
        font-size 20px
        width 100%
        display flex
        justify-content space-between
        align-items center
        padding 0 20px 0 20px
        box-sizing border-box
        .goods_wrap
            height 112px
            display flex
            justify-content space-between
            align-items center
            padding-right 20px
            border-bottom 1px solid #EAEAE9
            .detail_img
                max-width 98px
                min-width 80px
                max-height 98px
                min-height 80px
                width 98px
                height 98px
                margin-right 31px
                img
                    width 95px
                    height 95px
            .detail_info
                flex 1
                letter-spacing .6px
                .goods_title
                    font-size 14px
                    color #333
                    margin-bottom 16px
                    line-height 20px
                .goods_price
                    color #666666
                    display flex
                    align-items center
                    justify-content space-between
                    font-size 12px
                    color #666666
    .step_wrap
        display flex
        justify-content space-between
        padding 0 15px
        height 40px
        align-items center
        background #fff
        color #333
        span
            font-size 13px
    .line_height
        height 10px
        background #F5F5F4
    .change_and_return
        background #fff
        padding-top 8px
        li
            color #333
            padding 12px 15px
            border-bottom 1px solid #DFDFDE
            .p_content
                font-size 12px
                color #555555
                text-indent 24px
                margin-top 8px
        .reason_type
            display flex
            align-items center
            justify-content space-between
            .p_title
                font-size 14px
            .iconfont
                font-size 24px
                color #666666
        .reason_wrap
            .p_gray
                color #999999
            .apply_reason
                display flex
                font-size 14px
                justify-content space-between
                .other_span
                    font-size 14px
    .sale_center
        padding 10px 15px 10px 15px
        .ask_wrap
            .ask_title
                height 28px
                line-height 28px
                font-size 14px
                color #333
            .van-field
                background #F5F5F4
            .van-cell
                padding 6px 11px
        .upload_wrap
            .upload
                color #B3B3B3
                font-size 14px
                height 28px
                display flex
                align-items center
                margin-top 5px
                div
                    height 28px
                    width 28px
                    img
                        width 100%
                        height 100%
            .img_wrap
                display flex
                min-height 72px
                overflow-x auto
                div
                    width 62px
                    min-width 62px
                    max-width 62px
                    height 62px
                    padding 5px
                    position relative
                    img
                        width 62px
                        height 62px
                        display block
                    span
                        position absolute
                        width 18px
                        height 18px
                        background-color rgba(0, 0, 0, .8)
                        right 5px
                        top 5px
                        color #fff
                        border-radius 50%
                        text-align center
                        line-height 18px
                        font-size 12px
                .upload-file
                    opacity 1
                    p
                        background-color #f2f2f2
                        display flex
                        justify-content center
                        align-items center
                        width 62px
                        height 62px
                        img
                            display block
                            width 30px
                            height 30px
                        input
                            position absolute
                            width 100%
                            height 100%
                            opacity 0
                            z-index 99
                            left 0
                            top 0
    .send_back_way
        padding 0 15px
        padding-top 20px
        .send_back_title
            font-size 14px
            padding-bottom 10px
            border-bottom 1px solid #DFDFDE
        .send_back_info
            li
                height 36px
                display flex
                align-items center
                color #333
                font-size 13px
                position relative
                border-bottom 1px solid #D3D3D3
                .info_input
                    color #555555
                    flex 1
                    padding 5px 15px 5px 24px
                .iconfont
                    position absolute
                    right 10px
        .data_info
            font-size 13px
            color #333
            height 30px
            line-height 30px
            padding-top 8px
        .back_way_btn
            height 60px
            display flex
            align-items center
            justify-content space-around
            button
                width 141px
                height 32px
                border 1px solid #B5B5B5
                border-radius 6px
                background #fff
            button:nth-child(1)
                border-color #EA0808
        .van_wrap
            width 84%
            padding 30px 26px 26px 26px
            box-sizing border-box
            font-size 16px
            letter-spacing 0
            .express_btn_title
                font-size 18px
                text-align center
                position relative
                .iconfont
                    position absolute
                    right -15px
                    top -15px
            .black_code
                font-size 16px
                padding 16px 0
                line-height 20px
            .red_code
                line-height 20px
                color #F31919
                .red_note
                        text-decoration underline
    .back_money
        margin-bottom 50px
        li
            height 45px
            line-height 45px
            padding 0 15px
            font-size 14px
            color #333
        li:nth-child(1)
            border-bottom 1px solid #DFDFDE
    .bottom_choose
        height 100vh
        width 100vw
        background rgba(0,0,0,.4)
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        z-index 99 !important
        .close_wrap
           display flex
           justify-content center
           position relative
           height 50px
           align-items center
           .icon_close
                position absolute
                right 20px
                top 20px
                font-size 12px
                text-align center
    .bottom_btn
        z-index 0
        position fixed
        bottom 0
        left 0
        right 0
        height 49px
        display flex
        align-items center
        button
            width 50%
            height 49px
            border none
        .cancel_btn
            color #333333
            background #D7D6D8
        .sub_btn
            background #EA0808
            color #fff
</style>
