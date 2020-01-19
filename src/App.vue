<template>
    <div id='app'>
        <!-- <keep-alive :exclude="['Search', 'Card']"> -->
            <router-view/>
        <!-- </keep-alive> -->
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="stylus">
    .className
        width 60%
        border-radius 10px
        .van-dialog__header
            padding-top: 15px
        .van-dialog__message
            padding 5px
            padding-top 20px
            font-size 16px
</style>

<!-- const url = `${api}basic/homepageGoods`; -->
