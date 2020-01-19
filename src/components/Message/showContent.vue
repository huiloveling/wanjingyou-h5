<template lang="html">
    <div class="content">
        <van-nav-bar :title="titles">
            <span slot="left" class="iconfont" style="color:#999;font-size:14px;" @click="toback">&#xe6dc;</span>
        </van-nav-bar>
        <div style="font-size:16px;padding:15px 15px 15px 15px;" class="" v-html="this.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            content:"",
            titles:"",
        }
    },
    mounted(){
        this.content = this.$route.params.id;
        this.titles = this.$route.params.title;
        if(this.titles.length>8){
            this.titles = this.titles.substring(0,8);
        }
    },
    methods:{
        toback() {
            window.history.go(-1);
        },
    }
}
</script>

<style lang="stylus" scoped="">
</style>
