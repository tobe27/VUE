<template>
    <div>
        <div class="mechanismBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>配置管理</BreadcrumbItem>
                <BreadcrumbItem>机构信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="mechanism-split">
            <div class="mechanism-split-pane-left">
                <Tree ref="tree" :data="data" :load-data="loadData" :render="renderContent"/>
            </div>
            <div class="mechanism-split-pane-right">
                <div class="MButton">
                    <Button class="addcreateBtn" type="primary" @click="addRegion(row)">新建</Button>
                    <Button class="editcreateBtn" type="primary" @click="editRegion(row)">编辑</Button>
                    <Button class="delcreateBtn" type="primary" @click="delRegion(row)">删除</Button>
                </div>
                <h3 class="Mh">机构名称:{{row.orgName}}</h3>
                <table class="Mdetail-table">
                    <tr>
                        <td>机构代码</td>
                        <td class="Mtd">{{ row.orgCode }}</td>
                        <td>上级机构代码</td>
                        <td class="Mtd">{{ row.preOrgId }}</td>
                    </tr>
                    <tr>
                        <td>法人代码</td>
                        <td class="Mtd">{{ row.corpCode }}</td>
                        <td>机构归属关系</td>
                        <td class="Mtd">{{ row.relationType==0?'行政归属':(row.relationType==1?'报表归属':(row.relationType==2?'其他隶属':'')) }}</td>
                    </tr>
                    <tr>
                        <td>状态</td>
                        <td class="Mtd">{{ row.status==0?'停用':(row.status==1?'正常':'') }}</td>
                        <td>是否是虚拟机构</td>
                        <td class="Mtd">{{ row.virtualOrgFlag==0?'实体':(row.virtualOrgFlag==1?'虚拟':'') }}</td>
                    </tr>
                    <tr>
                        <td>机构类型</td>
                        <td class="Mtd">{{ row.type==0?'非机构一般组':(row.type==1?'机构':'') }}</td>
                        <td>机构级别</td>
                        <td class="Mtd">{{ row.orgLevel==0?'总机构':(row.orgLevel==1?'一级机构':(row.orgLevel==2?'二级机构':(row.orgLevel==3?'三级机构':(row.orgLevel==4?'四级机构':'')))) }}</td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                        <td>描述</td>
                        <td colspan="3" class="Mtd">{{ row.description }}</td>
                    </tr>
                </table>
                <Modal width="50%" v-model="add.show" :footer-hide="true" title="行政机构管理">
                    <div class="form">
                        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
                            <Row v-show="false">
                                <Col span="8">
                                <FormItem label="ID" prop="orgId">
                                    <Input v-model="form.orgId" disabled></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10">
                                <FormItem label="机构代码" prop="orgCode">
                                    <Input v-model="form.orgCode" placeholder="请输入机构代码:"></Input>
                                </FormItem>
                                </Col>
                                <Col span="10">
                                <FormItem label="法人代码" prop="corpCode">
                                    <Input v-model="form.corpCode" placeholder="请输入法人代码:"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10">
                                <FormItem label="机构名称" prop="orgName">
                                    <Input v-model="form.orgName" placeholder="请输入机构名称:"></Input>
                                </FormItem>
                                </Col>
                                <Col span="10">
                                <FormItem label="上级机构代码" prop="preOrgCode">
                                    <Input v-model="form.preOrgId" placeholder="请输入上级机构代码:" disabled></Input>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10">
                                <FormItem label="机构归属关系" prop="relationType">
                                    <Select v-model="form.relationType" >
                                        <Option value="0">行政归属</Option>
                                        <Option value="1">报表归属</Option>
                                        <Option value="2">其他隶属</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10">
                                <FormItem label="状态" prop="status">
                                    <Select v-model="form.status" >
                                        <Option value="0">停用</Option>
                                        <Option value="1">正常</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10">
                                <FormItem label="是否是虚拟机构" prop="virtualOrgFlag">
                                    <Select v-model="form.virtualOrgFlag" >
                                        <Option value="0">实体</Option>
                                        <Option value="1">虚拟</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10">
                                <FormItem label="机构类型" prop="type">
                                    <Select v-model="form.type" >
                                        <Option value="0">非机构一般组</Option>
                                        <Option value="1">机构</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10">
                                <FormItem label="机构级别" prop="orgLevel">
                                    <Select v-model="form.orgLevel" >
                                        <Option value="0">总机构</Option>
                                        <Option value="1">一级机构</Option>
                                        <Option value="2">二级机构</Option>
                                        <Option value="3">三级机构</Option>
                                        <Option value="4">四级机构</Option>
                                    </Select>
                                </FormItem>
                                </Col>
                                <Col span="10">
                                <FormItem label="描述" prop="description">
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
                        <span>你确定要删除当前机构信息？</span>
                    </p>
                    <div style="font-size: 14px;padding-left: 40px">
                        <p>{{ row.orgName }}</p>
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

    import { mapState } from 'vuex'
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
                    ButtonType:0
                },
                model: {
                    show: false,
                    title: '你确定要删除当行政区域么？',
                    id: null,
                    content: '',
                    loading: false
                },
                form: {},
                ruleValidate:{
                    orgCode: [
                        { required: true, message: '机构代码不能为空', trigger: 'blur' },
                        { type: 'string', min: 1,max: 20, message: '机构代码最大长度为20位', trigger: 'blur' }
                    ],
                    orgName: [
                        { required: true, message: '机构名称不能为空', trigger: 'blur' },
                        { type: 'string', min: 1,max: 100, message: '机构名称最大长度为100位', trigger: 'blur' }
                    ],
                    corpCode: [
                        { type: 'string', min: 1,max: 20, message: '法人代码最大长度为20位', trigger: 'blur' }
                    ],
                    description: [
                        { type: 'string', min: 1,max: 30, message: '描述最大长度为30位', trigger: 'blur' }
                    ],
                    orgLevel: [
                        { required: true, message: '机构级别不能为空', trigger: 'blur' },
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
                var vue = this
                var list = []
                for(let i in item){
                        list.push({id: item[i].orgCode, title: item[i].orgName,
                            children: (item[i].childList.length>0?this.loop(item[i].childList):[]), source: item[i]
                        })
                }
                return list
            },
            _loadData (id, callback) {
                var vue = this
                this.$store.dispatch(actions.get.MECHANISM_PERSON, id).then((response) => {
                    if(response.code==200){
                        const array = []
                        if(response.data.length>0){
                            for (let i = 0; i < response.data.length; i++) {
                                let item = response.data[i]
                                array.push(item = {id: item.orgCode, title: item.orgName,
                                    expand: (item.orgId==1?true:false),children: (item.childList.length>0?this.loop(item.childList):[]), source: item,
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
                                                    type: data.children.length==0?'ios-paper-outline':'ios-folder-outline',
                                                },
                                                style: {
                                                    paddingRight: '5px',
                                                    paddingLeft: '7px'
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
                            let item1 = response.data[0]
                            obj.source=item1
                            this.onclick(obj)
                        }else{
                            this.$Message.error('没有节点')
                        }
                    }else if(rep.code!=204){
                        vue.$Message.error(response.message)
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
                    h('span',{
                        style:{fontSize:'14px',cursor:'pointer'},
                    }, [
                        h('Icon', {
                            props: {
                                type: data.children.length==0?'ios-paper-outline':'ios-folder-outline'
                            },
                            style: {
                                paddingRight: '5px',
                                paddingLeft: '7px'
                            }
                        }),
                        h('span', data.title)
                    ])
                ]);
            },
            //新建机构信息
            addRegion (row) {
                this.form={}
                this.$refs['form'].resetFields()
                this.add.show=true
                this.ButtonType=0
                this.form.preOrgId=(row.orgId?row.orgId:'0')
                this.form.status= '1'
                this.form.virtualOrgFlag='0'
            },
            //编辑机构信息
            editRegion (row) {
                this.form={}
                this.$refs['form'].resetFields()
                this.add.show=true
                this.ButtonType=1
                this.form.orgCode=row.orgCode+''
                this.form.orgName=row.orgName
                this.form.corpCode=row.corpCode
                this.form.preOrgId=row.preOrgId
                this.form.relationType=row.relationType+''
                this.form.status=row.status+''
                this.form.virtualOrgFlag=row.virtualOrgFlag+''
                this.form.description=row.description
                this.form.type=row.type+''
                this.form.orgLevel=row.orgLevel+''
                this.form.orgId=row.orgId
            },
            //删除机构信息
            delRegion (data) {
                this.model.show=true
            },
            onConfirm () {
                this.model.loading = true
                var vue = this
                this.$store.dispatch(actions.delete.MECHANISM_PERSON, this.row.orgId).then(rep => {
                    if(rep.data.code==200){
                        setTimeout(() => {
                            vue.model.loading = false
                            vue.model.show = false
                            if (rep.data.code!=200) {
                                vue.$Message.error(rep.data.message)
                            }else{
                                vue.$Message.success('删除成功')
                            }
                            vue._loadData('', (array) => {
                                vue.data = array
                            })
                        }, 1000)
                    }else if (rep.data.code!=204){
                        vue.model.loading = false
                        vue.model.show = false
                        vue.$Message.error(rep.data.message)
                    }
                })
            },
            onclick(data){
                this.row=data.source
            },
            handleSubmit(name) {
                var vue = this
                this.$refs[name].validate((valid) => {
                    if(valid){
                        const payload = {...this[name]}
                        if (this.ButtonType == 1) {
                            this.$store.dispatch(actions.put.MECHANISM_PERSON, payload).then(rep => {
                                if (rep.data.code != 200) {
                                    if(rep.data.code!=204){
                                        vue.$Message.error(rep.data.message)
                                    }
                                } else {
                                    vue.$Message.success('修改成功')
                                    vue.add.show = false
                                    vue._loadData('', (array) => {
                                        vue.data = array
                                    })
                                }
                            })
                        } else {
                            this.$store.dispatch(actions.post.MECHANISM_PERSON, payload).then(rep => {
                                if (rep.data.code != 200) {
                                    if(rep.data.code!=204){
                                        vue.$Message.error(rep.data.message)
                                    }
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
                        this.$Message.error('表单验证错误')
                    }

                })
            },
            goBack () {
                if(this.add.show){
                    this.add.show=false
                }
                if(this.model.show){
                    this.model.show=false
                }
            }
        },
    }

</script>


<style lang="scss">
    .mechanismBreadcrumb{
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        font-family:PingFangSC-Regular;
        line-height: 54px;
        padding-left: 20px;
        border-radius: 4px;
        border: 1px solid #eee;
    }
    .mechanism-split{
        margin: 24px;
        height: calc(79vh);
        background-color: #fff;
        font-size: 14px;
        font-family:PingFangSC-Regular;
        border-radius: 4px;
        .mechanism-split-pane-left{
            margin: 10px;
            padding-left: 10px;
            width: 25%;
            float: left;
            height: calc(77vh);
            overflow-y:auto; overflow-x:auto;
            border: 1px solid #eee;
            border-radius: 4px;
        }
        .mechanism-split-pane-right{
            margin: 10px;
            width: 70%;
            float: left;
            border-radius:5px;
            .Mh{
                margin-left: 10%;

            }
            .MButton {
                margin-left: 10%;
                margin-bottom: 10px;
            }
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
                font-size: 14px;
                margin-left: 10%;
                margin-bottom: 20px;
            }
            .Mdetail-table {
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


    /*
    .Mdemo-split-pane-right{
        padding: 10px;
        margin: 50px;
        min-height: 400px;
        width: calc(100vw - 50vw);
        background-color: white;
        border-radius:5px;
        .Mh{
            margin-left: 5%;
        }
        .MButton {
            margin-left: 5%;
            margin-bottom: 20px;
        }
        .editcreateBtn {
            margin-left: 10px;
        }
        .delcreateBtn {
            margin-left: 10px;
        }
        .Mdetail-table ,tr{
            font-size: 18px;
            width: 80%;
            margin: auto;
            tr{
                td{
                    line-height: 50px;
                    width: 24%;
                    margin: 1%;
                    padding-left: 2%;
                    background-color: gainsboro;
                    border-radius:3px;
                }
            }
        }
    }*/
</style>
