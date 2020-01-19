import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/mall',
            name: 'mall',
            component: () => import('@/Mall')
        },
        // 消息
        {
            path: '/message',
            name: 'message',
            component: () => import('@/Message')
        },
        // 系统公告信息
        {
            path: '/message/showContent',
            name: 'showContent',
            component: () => import('@/Message/showContent')
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/Search')
        },
        // 我的
        {
            path: '/mine',
            name: 'mine',
            component: () => import('@/Mine')
        },
        // 设置
        {
            path: '/set',
            name: 'set',
            component: () => import('@/Set')
        },
        // 设置
        {
            path: '/change_phone',
            name: 'change_phone',
            component: () => import('@/Set/change_phone')
        },
        //地址列表
        {
            path: '/address_management',
            name: 'address_management',
            component: () => import('@/Address_management')
        },
        //地址管理
        {
            path: '/address_handle',
            name: 'address_handle',
            component: () => import('@/Address_handle')
        },
        //编辑地址/新增地址
        {
            path: '/edit_address',
            name: 'edit_address',
            component: () => import('@/Edit_address')
        },
        {
            path: '/add_address',
            name: 'add_address',
            component: () => import('@/Add_address')
        },
        //我的订单
        {
            path: '/my_order/:active',
            name: 'my_order',
            component: () => import('@/My_order')
        },
        // 订单详情
        {
            path: '/order_detail/:item',
            name: 'order_detail',
            component: () => import('@/My_order/order_detail')
        },
        // 订单跟踪
        {
            path: '/order_track/:item',
            name: 'order_track',
            component: () => import('@/My_order/order_track')
        },
        // 联系客服
        {
            path: '/contact',
            name: 'contact',
            component: () => import('@/Contact')
        },
        // 订单支付
        {
            path: '/order_pay',
            name: 'order_pay',
            component: () => import('@/Pay')
        },
        // 售后服务
        {
            path: '/after_sales/:item',
            name: 'after_sales',
            component: () => import('@/My_order/after_sales')
        },
        // 售后服务详情
        {
            path: '/sales_detail/:item',
            name: 'sales_detail',
            component: () => import('@/My_order/sales_detail')
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/Search'),
        },
        {
            path: '/product',
            name: 'product',
            component: () => import('@/Product')
        },
        {
            path: '/card',
            name: 'card',
            component: () => import('@/Card')
        },
        {
            path: '/category',
            name: 'category',
            component: () => import('@/Category')
        },
        {
            path: '/pay',
            name: 'pay',
            component: () => import('@/PaySuccess')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/Login')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/Register')
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: () => import('@/Recommend')
        },
        {
            path: '/goodsOrder',
            name: 'goodsOrder',
            component: () => import('@/GoodsOrder')
        },
        {
            path: '/wxpay',
            name: 'wxpay',
            component: () => import('@/wxpay')
        },
        {
            path: '/area',
            name: 'area',
            component: () => import('@/Area')
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('@/test')
        }
    ]
})