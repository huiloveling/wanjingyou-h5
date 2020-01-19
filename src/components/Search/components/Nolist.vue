<template>
    <div class='wjy-search-nolist-warp'>
        <div>
            <img src='./../../../assets/search-logo.png' />
        </div>
        <p>抱歉，没有找到商品额~</p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang='stylus'>
    .wjy-search-nolist-warp
        position fixed
        top 92px
        left 0
        right 0
        bottom 0
        padding-top 150px
        max-width 640px
        margin 0 auto
        img
            display block
            width 100px
            height 100px
            margin 0 auto
        p
            font-size 18px
            text-align center
            color #BCBCBC
</style>