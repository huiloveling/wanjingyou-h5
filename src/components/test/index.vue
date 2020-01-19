<template>
    <div>
        <div class='container'>
            <div class='mod_address_slide'>
                <div class='mod_address_slide_main type_flex'>
                    <div class='mod_address_slide_body'>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
</script>

<style lang='stylus' scoped>
    .container
        background-color #f5f5f5
        position relative
        height 100vh
        .mod_address_slide
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 110;
            background-color: rgba(0,0,0,.7);
            .mod_address_slide_main
                position: absolute;
                bottom: 0;
                width: 100%;
                background-color: #fff;
                min-height 300px
</style>