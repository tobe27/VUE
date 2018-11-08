<template>
    <div>
        <div class="regionBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>配置管理</BreadcrumbItem>
                <BreadcrumbItem>区域信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="region-split">
            <div class="region-split-pane-left">
                <Tree ref="tree" :data="data" :load-data="loadData" :render="renderContent"/>
            </div>
            <div class="region-split-pane-right">
                <div>
                    <div class="regionButton">
                        <Button class="addcreateBtn" type="primary" @click="addRegion(row)">新建</Button>
                        <Button class="editcreateBtn" type="primary" @click="editRegion(row)">编辑</Button>
                        <Button class="delcreateBtn" type="primary" @click="delRegion(row)">删除</Button>
                    </div>
                    <table class="regionTable">
                        <tr>
                            <td style="width: 30%">行政区域编号</td>
                            <td>{{ row.regionCode }}</td>
                        </tr>
                        <tr>
                            <td>行政区域名称</td>
                            <td>{{ row.regionName }}</td>
                        </tr>
                        <tr>
                            <td>区域上级编号</td>
                            <td>{{ row.preRegionCode }}</td>
                        </tr>
                        <tr>
                            <td>行政区域级别</td>
                            <td>{{ row.regionLevel==0?'国家':(row.regionLevel==1?'省/直辖市':(row.regionLevel==2?'地级市/区':(row.regionLevel==3?'县/县级市':(row.regionLevel==4?'乡/镇':(row.regionLevel==5?'村':(row.regionLevel==6?'村组':'')))))) }}</td>
                        </tr>
                        <tr>
                            <td>行政区域描述</td>
                            <td>{{ row.description }}</td>
                        </tr>
                    </table>
                </div>
                <Modal width="35%" v-model="add.show" :footer-hide="true" title="行政区域管理">
                    <div class="form">
                        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120">
                            <Row v-show="false">
                                <Col span="8">
                                <FormItem label="行政区域代码" prop="regionCode">
                                    <Input v-model="form.regionCode" disabled></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="20">
                                <FormItem label="行政区域名称" prop="regionName">
                                    <Input v-model="form.regionName" placeholder="请输入区域名称:"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="20">
                                <FormItem label="上级区域编号" prop="preRegionCode">
                                    <Input v-model="form.preRegionCode" disabled></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="20">
                                <FormItem label="行政区域级别" prop="regionLevel">
                                    <Select v-model="form.regionLevel" disabled>
                                        <Option value="0">国家</Option>
                                        <Option value="1">省/直辖市</Option>
                                        <Option value="2">地级市/区</Option>
                                        <Option value="3">县/县级市</Option>
                                        <Option value="4">乡/镇</Option>
                                        <Option value="5">村</Option>
                                        <Option value="6">村组</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="20">
                                <FormItem label="行政区域描述" prop="description">
                                    <Input v-model="form.description" placeholder="请输入描述:"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('form')">提交</Button>
                                <Button @click="goBack" style="margin-left: 8px">取消</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Modal>
                <Modal v-model="model.show" footer-hide width="320" :styles="{top: '200px'}" :closable="false">
                    <p style="padding: 10px;font-size: 16px;">
                        <Icon type="ios-information-circle" style="color:#f60;padding-right: 10px;" size="40px"></Icon>
                        <span>你确定要删除当前行政区域？</span>
                    </p>
                    <div style="font-size: 14px;padding-left: 40px">
                        <p>{{ row.regionName }}</p>
                    </div>
                    <div style="text-align: right">
                        <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
                        <Button type="primary" size="large" :loading="model.loading" @click="onConfirm">确定</Button>
                    </div>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>
import actions from '@/store/action-types'
import { UPLOAD_API_URL } from '@/config'

export default {
    data() {
        return {
            data:[],
            id: '',
            buttonProps: {
                type: 'default',
                size: 'small',
            },
            split: 0.25,
            row:{},
            add:{
                show: false,
                type:0
            },
            model: {
                show: false,
                title: '你确定要删除当行政区域么？',
                id: null,
                content: '',
                loading: false
            },
            form:{ },
            ruleValidate:{
                regionName: [
                { required: true, message: '行政区域名称不能为空', trigger: 'blur' },
                { type: 'string', min: 1,max: 100, message: '行政区域名称最大长度为100位', trigger: 'blur' }
                ],
                preRegionCode: [
                { required: true, message: '上级区域编号不能为空', trigger: 'blur' },
                { type: 'string', min: 1,max: 20, message: '上级区域编号最大长度为20位', trigger: 'blur' }
                ],
                regionLevel: [
                { required: true, message: '行政区域级别不能为空', trigger: 'blur' }
                ],
                description: [
                { required: true, message: '行政区域描述不能为空', trigger: 'blur' },
                { type: 'string', min: 1,max: 30, message: '行政区域描述最大长度为30位', trigger: 'blur' }
                ],
            }
        }
    },
    mounted () {
        // 获取父节点id，返回直接后代列表
        this._loadData(this.id, (array) => {
            this.data = array
        })
        for (var k in this.form) {
          if (typeof (this.form[k]) === 'number') {
            this.form[k] = this.form[k] + ''
          }
        }
    },
    methods: {
        loadData (region,callback) {
            this._loadData(region,callback)
        },
        loop(item){
            var list = []
            for(let i in item){
                list.push({id: item[i].regionCode, title: item[i].regionName,
                    children: (item[i].childList.length>0?this.loop(item[i].childList):[]), source: item[i]
                })
            }
            return list
        },
        _loadData (id, callback) {
            var vue = this
            this.$store.dispatch(actions.get.REGION_PERSON, id).then((rep) => {
                if(rep.code==200){
                    const array = []
                    if(rep.data.length>0){
                        for (let i = 0; i < rep.data.length; i++) {
                            let item = rep.data[i]
                            array.push(item = {id: item.regionCode, title: item.regionName,
                                expand: (item.regionCode==1?true:false),children: (item.childList.length>0?this.loop(item.childList):[]), source: item ,
                                render: (h, { root, node, data }) => {
                                    return h('span', {
                                        style: {
                                            display: 'inline-block',
                                            width: '90%',
                                            fontSize : '16px',
                                            fontFamily:'PingFangSC-Regular'
                                        },
                                        on: {
                                            click: () => {
                                                this.onclick(data)
                                            }
                                        }
                                    }, [h('span', {
                                        style:{fontSize:'16px',cursor:'pointer' },
                                    },[
                                        h('Icon', {
                                            props: {
                                                type: data.children.length==0?'ios-paper-outline':'ios-folder-outline'
                                            },
                                            style: {
                                                marginRight: '5px',
                                                marginLeft: '7px'
                                            },
                                        }),
                                        h('span', data.title)
                                    ])
                                    ]);
                                },
                            })
                        }
                        callback(array)
                        let obj={}
                        let item1 = rep.data[0]
                        obj.source=item1
                        this.onclick(obj)
                    }else{
                        this.$Message.error('没有节点')
                    }
                }else if (rep.code!=204){
                    vue.$Message.error(rep.message)
                }
            })
        },
        renderContent(h, { root, node, data }){
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '90%',
                    fontSize : '14px',
                    fontFamily:'PingFangSC-Regular'
                },
                on: {
                    click: () => {
                        this.onclick(data)
                    }
                }
            }, [
                h('span', {
                    style:{fontSize:'14px',cursor:'pointer' },
                },[
                    h('Icon', {
                        props: {
                            type: data.children.length==0?'ios-paper-outline':'ios-folder-outline'
                        },
                        style: {
                            marginRight: '5px',
                            marginLeft: '7px'
                        }
                    }),
                    h('span', data.title)
                ])
            ]);
        },
        //新建机构信息
        addRegion (row) {
            if((row.regionLevel+1)<=6){
                this.form={}
                this.$refs['form'].resetFields()
                this.add.show=true
                this.type=0
                this.form.preRegionCode=row.regionCode+''
                this.form.regionLevel=(row.regionLevel+1) + ''
            }else{
                this.$Message.error('已区分到最小区域')
            }

        },
        //编辑机构信息
        editRegion (row) {
            this.form={}
            this.$refs['form'].resetFields()
            this.add.show=true
            this.type=1
            this.form.regionCode=row.regionCode
            this.form.regionName=row.regionName
            this.form.preRegionCode=row.preRegionCode+''
            this.form.regionLevel=row.regionLevel + ''
            this.form.description=row.description
        },
        //删除机构信息
        delRegion (data) {
            this.model.show=true
        },
        onConfirm () {
            var vue = this
            vue.model.loading = true
            vue.$store.dispatch(actions.delete.REGION_PERSON, vue.row.regionCode).then(rep => {
                if ( rep.data.code === 200){
                    setTimeout(() => {
                        vue.model.loading = false
                        vue.model.show = false
                        vue.$Message.success('删除成功')
                        vue._loadData('', (array) => {
                            vue.data = array
                        })
                    }, 1000)
                }else{
                    vue.$Message.error( rep.data.message )
                    vue.model.loading = false
                    vue.model.show = false
                }
            })
        },
        onclick(data){
            this.row=data.source
        },
        handleSubmit(name) {
            const payload = { ...this[name] }
            var vue = this
            this.$refs[name].validate((valid) => {
                if(valid){
                    if ( vue.type == 1 ) {
                        vue.$store.dispatch(actions.put.REGION_PERSON, payload).then(rep => {
                            if ( rep.data.code != 200 ) {
                                vue.$Message.error(rep.data.message)
                            } else {
                                vue.$Message.success('修改成功')
                                vue.add.show = false
                                vue._loadData('', (array) => {
                                    vue.data = array
                                })
                            }
                        })
                    } else {
                        vue.$store.dispatch(actions.post.REGION_PERSON, payload).then(rep => {
                            if ( rep.data.code != 200 ) {
                                vue.$Message.error(rep.data.message)
                            } else {
                                vue.$Message.success('提交成功')
                                vue.add.show = false
                                vue._loadData('', (array) => {
                                    vue.data = array
                                })
                            }
                        })
                    }
                }else{
                    vue.$Message.error('表单验证错误')
                }
            })
        },
        goBack () {
            if ( this.add.show ) {
                this.add.show = false
            }
            if ( this.model.show ) {
                this.model.show = false
            }
        }
    }
}
</script>

<style lang="scss">
.regionBreadcrumb {
    height: 54px;
    background-color: #fff;
    font-size: 14px;
    font-family:PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
    border-radius: 4px;
    border: 1px solid #eee;
}
.region-split{
    margin: 24px;
    height: calc(79vh);
    background-color: #fff;
    font-size: 14px;
    font-family:PingFangSC-Regular;
    border-radius: 4px;
    .region-split-pane-left{
        margin: 10px;
        padding-left: 10px;
        width: 25%;
        float: left;
        height: calc(77vh);
        overflow-y:auto; overflow-x:auto;
        border: 1px solid #eee;
        border-radius: 4px;
    }
    .region-split-pane-right{
        margin: 10px;
        width: 70%;
        float: left;
        font-size: 14px;
        .addcreateBtn {
            font-size: 14px;
        }
        .editcreateBtn {
            margin-left: 10px;
            font-size: 14px;
        }
        .delcreateBtn {
            margin-left: 10px;
            font-size: 14px;
        }
        .regionButton {
            margin-left: 10%;
            margin-bottom: 20px;
        }
        .regionTable {
            font-size: 14px;
            width: 80%;
            margin: auto;
            tr{
                td{
                    line-height: 50px;
                    margin: 1%;
                    padding-left: 2%;
                    background-color: gainsboro;
                    border-radius:3px;
                }
            }

        }
    }

}

</style>
