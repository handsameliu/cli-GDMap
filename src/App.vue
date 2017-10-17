<template>
    <div id="app">
        <!-- <img src="./assets/logo.png"> -->
        <!-- <router-view/> -->
        <div class="amap-page-container">
            <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
            <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
                <el-amap-marker v-for="(marker,key) in markers" :position="marker" :key="key"></el-amap-marker>
            </el-amap>
            <div class="toolbar">
                <button @click="getMap">get map</button>
            </div>
            <div class="toolbar">
                <span v-if="loaded">
                    location: lng = {{ lng }} lat = {{ lat }}
                </span>
                <span v-else>正在定位</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { lazyAMapApiLoaderInstance, AMapManager } from 'vue-amap'
    let amapManager = new AMapManager()
    export default {
        name: 'app',
        data () {
            let self = this
            return {
                amapManager,
                zoom: 12,
                center: [114.298572, 30.584355],
                lng: 0,
                lat: 0,
                map: null,
                loaded: false,
                events: {
                    init: (o) => {
                        console.log('init', new Date().getTime())
                        console.log(o.getCenter())
                        console.log(this.$refs.map.$$getInstance())
                        o.getCity(result => {
                            console.log(result)
                        })
                        // self.getMap()
                    },
                    'moveend': () => {
                    },
                    'zoomchange': () => {
                    },
                    'click': (e) => {
                        alert('map clicked')
                    }
                },
                markers: [],
                searchOption: {
                    city: '北京',
                    citylimit: true
                },
                plugin: ['ToolBar', {
                    pName: 'MapType',
                    defaultType: 0,
                    events: {
                        init (o) {
                            console.log(o)
                        }
                    }
                }, {
                    pName: 'Geolocation',
                    events: {
                        init (o) {
                            console.log(o)
                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {
                                if (result && result.position) {
                                    self.lng = result.position.lng
                                    self.lat = result.position.lat
                                    self.center = [self.lng, self.lat]
                                    self.loaded = true
                                    self.$nextTick()
                                }
                            })
                        }
                    }
                }, {
                    pName: 'Driving',
                    events: {
                        init (o) {
                            // 导航，报错 INVALID_USER_DOMAIN 需要有域名白名单
                            // console.log(o)
                            // o.search([{keyword:'方恒国际',city:'北京'},{keyword:'壶口瀑布'}], function(status, result){
                            //     console.log(result)
                            // })
                        }
                    }
                }]
            }
        },
        mounted () {
            lazyAMapApiLoaderInstance.load().then(() => {
                console.log(new Date().getTime())

                this.map = new window.AMap.Map('amapContainer', {
                    center: new window.AMap.LngLat(121.59996, 31.197646)
                })

                console.log(this.map)
                // let driving= new AMap.Driving({
                //     map: this.amapManager.getMap(), //this.map,
                //     panel: AMap.DrivingPolicy.LEAST_TIME
                // })

                // console.log(driving)

                // driving.search([{keyword:'方恒国际',city:'北京'},{keyword:'壶口瀑布'}], function(status, result){
                //     console.log(result)
                // })
            })
        },
        methods: {
            getMap () {
                console.log('getMap component')
                // amap vue component
                console.log(this.amapManager._componentMap)
                console.log('getMap instance')
                // gaode map instance
                console.log(this.amapManager._map)
            },
            addMarker () {
                let lng = 121.5 + Math.round(Math.random() * 1000) / 10000
                let lat = 31.197646 + Math.round(Math.random() * 500) / 10000
                this.markers.push([lng, lat])
            },
            onSearchResult (pois) {
                // 搜索，也是 INVALID_USER_DOMAIN 域名有误，无法看到结果
                let latSum = 0
                let lngSum = 0
                if (pois.length > 0) {
                    pois.forEach(poi => {
                        let { lng, lat } = poi
                        lngSum += lng
                        latSum += lat
                        this.markers.push([poi.lng, poi.lat])
                    })
                    let center = {
                        lng: lngSum / pois.length,
                        lat: latSum / pois.length
                    }
                    this.mapCenter = [center.lng, center.lat]
                }
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .amap-page-container {
        position: relative;
        height: 500px;
        width: 100%;
        font-size: 12px;
    }

    .search-box {
        position: absolute;
        top: 50px;
        left: 70px;
    }
</style>
