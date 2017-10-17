// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAMap from 'vue-amap'

Vue.config.productionTip = false

Vue.use(VueAMap)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
    // 申请的高德key
    key: 'cff82cd9f15d3a4cbd0e1d948f02a2da',
    // 插件集合
    plugin: ['AMap.Geolocation', 'AMap.Driving', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
