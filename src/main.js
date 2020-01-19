import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import store from './store'
import router from './router'
import fastclick from 'fastclick'
import './common/style/index.styl'
import './common/font/iconfont.css'
import VueLazyload from 'vue-lazyload'
import MescrollVue from 'mescroll.js/mescroll.vue'
import {
    ImagePreview, Dialog, AddressList, Icon, Switch, Collapse, CollapseItem, Steps, Step, List, Loading, RadioGroup, Radio, Toast, Picker, Area, Swipe, SwipeItem, Tabbar, TabbarItem, Field, Button, Card, NavBar, Popup, Tab, Tabs, Checkbox, CheckboxGroup, Cell, CellGroup, Stepper
}
from 'vant'


Vue.use(Swipe)
    .use(ImagePreview)
    .use(SwipeItem)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Field)
    .use(Button)
    .use(Card)
    .use(NavBar)
    .use(Popup)
    .use(Tab)
    .use(Tabs)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Cell)
    .use(CellGroup)
    .use(Stepper)
    .use(Picker)
    .use(Area)
    .use(Toast)
    .use(RadioGroup)
    .use(Radio)
    .use(Loading)
    .use(List)
    .use(Step)
    .use(Steps)
    .use(Collapse)
    .use(CollapseItem)
    .use(Switch)
    .use(Icon)
    .use(AddressList)
    .use(Dialog)

fastclick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyload, {
    // 默认加载图片
    loading: require('./assets/default.png')
})

Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})