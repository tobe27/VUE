<template>
    <div class="overview">
        <div class="map" ref="map"></div>
    </div>
</template>

<script>
    import actions from '@/store/action-types'
    import inMap from 'inmap'

    export default {
        name: 'OverView',
        data() {
            return {
                gridCode: '',
                gridData: {},
                isEdit: false,
                inmap: null,
                overlay: null,
                point: null,
                gridName: ''
            }
        },
        mounted: function () {
            //获取到传进来的gridCode值
            this.gridCode = this.$route.query.gridCode
            // 拿到坐标
            //根据gridCode值来获取对应的网格坐标
            this.getGridMap(this.gridCode).then(rep => {
                var mapData = []
                let datab = []
                let centerIf=['117.169665','32.487062']//定义一个地图定位
                if(0 !== rep.data.length){
                    this.gridData = JSON.parse(rep.data[0].coordinate)
                    this.gridName = rep.data[0].gridName
                    const count = this.gridData.length



                    if(0 != this.gridData.length){
                        for (let i = 0; i < count; i++) {
                            var points = []
                            mapData = [];
                            this.gridData[i].forEach(point => {
                                points.push([point.lng, point.lat])
                            })
                            mapData.push(points)
                            datab.push({
                                "type": "Feature",
                                "geometry": {
                                    "type": "Polygon",
                                    "coordinates": mapData,
                                    'style':{
                                        normal: {
                                            backgroundColor: "#0f0",
                                            borderWidth: 1.5,
                                        }
                                    }
                                },
                                "gridName": this.gridName,
                                "gridCode": this.gridCode
                            })
                        }
                        centerIf=[mapData[0][0][0], mapData[0][0][1]]//如果网格已经创建 则重新定义地图坐标
                    }


                }else{
                    this.$Message.error('此网格地图信息未分配！')
                }
                //创建一个地图实例
                this.inmap = new inMap.Map({
                    id: this.$refs.map,
                    //通过获取到的网格坐标 来设置地图的定位位置
                    center: centerIf,
                    zoom: {
                        value: 14,
                        show: true,
                        max: 20
                    }
                })
                //创建一个围栏
                this.overlay = new inMap.PolygonOverlay({
                    tooltip: {
                        show: true,//鼠标悬浮配置
                        formatter: "'网格信息<br>网格编号:'+{gridCode}+'<br>网格名称:'+{gridName}"
                    },
                    style: {
                        normal: {
                            // backgroundColor: "#0f0",
                            borderWidth: 1.5,
                        }
                    }
                })
                this.inmap.add(this.overlay)
                this.overlay.setData(datab);


            })
        },
        methods: {
            getGridMap(gridCode) {
                return this.$store.dispatch(actions.get.GRID_MAP, gridCode)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .overview {
        ul {
            display: flex;
            width: 100%;
            text-align: center;
            background-color: #fff;
        }
        li {
            flex: 1;
            margin-left: 5px;
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 14px;
            background-color: #eee;
            list-style: none;
            &:first-child {
                margin-left: 0;
            }
            .icon {
                margin-bottom: 5px;
            }
            .num {
                font-size: 14px;
                font-weight: 500;
            }
        }
        .map {
            height: 650px;
        }
    }
</style>
