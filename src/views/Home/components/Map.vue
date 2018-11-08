<template>
    <div class="inmap">
        <div class="title"><p>{{ title }}</p></div>
        <div class="map" ref="map"></div>
    </div>
</template>
<script>
    import inMap from 'inmap'
    import actions from '@/store/action-types'

    export default {
        name: 'InMap',
        data() {
            return {
                title: '网格全局概况',
                isEdit: false,
                inmap: null,
                overlay: null,
                overlay1:null,
                colorList:['rgba(93,158,247,1)','rgba(93,128,207,1)']
            }
        },
        mounted() {
            let userList=JSON.parse(sessionStorage.getItem('userObj'))//获取一下存在sessionStorage的用户信息
            var vue=this
            this.$store.dispatch(actions.get.GRID_HOME, {//发请求  获取这个用户的所有网格信息
                roleId:userList.roles[0].roleId,
                orgCode:userList.orgCode
            }).then(rep =>{
                vue.inmap = new inMap.Map({//创建一个地图实例
                    id: this.$refs.map, //地图显示在哪个容器里
                    center: ["117.161541", "32.494655"],//中心点
                    zoom: {//右下角控件
                        value: 14,
                        show: true,
                        max: 22
                    }
                });

                if(rep.code == 200){
                    //遍历获取到的此用户所有网格信息
                    for(let i in rep.data){//一个i就是一个网格
                        let list =rep.data[i]
                        let coordinateLists=JSON.parse(list.coordinate)

                        for(let j in coordinateLists){//一个j就是一个多边形
                            let coordinateList=coordinateLists[j]
                            let polygon = new BMap.Polygon()
                            polygon.setFillColor(vue.colorList[ j%2])//设置填充颜色
                            polygon.setStrokeWeight(1)//边线的宽度
                            let arr=[]//一个arr代表一个多边形
                            for(let p in coordinateList){
                                // console.log(coordinateList[p])
                                arr.push(new BMap.Point(coordinateList[p].lng,coordinateList[p].lat))
                            }
                            polygon.setPath(arr)
                            vue.inmap.add(polygon);   //增加多边形
                        }
                    }
                }else  if(rep.code != 204){
                    vue.$Message.error(rep.message)
                }
            })
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .inmap {
        .title {
            padding: 10px 20px;
            font-size: 18px;
            font-weight: 500;
            border-bottom: 1px solid #ddd;
        }
        .map {
            margin: 0 10px;
            height: 410px;
        }
    }
</style>
