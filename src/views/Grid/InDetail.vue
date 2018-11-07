<template>
    <div>
        <div class="gridBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/grid">网格管理</BreadcrumbItem>
                <BreadcrumbItem v-if="this.flag">编辑</BreadcrumbItem>
                <BreadcrumbItem v-if="!this.flag">新建</BreadcrumbItem>
            </Breadcrumb>
        </div>
    <div class="form">
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
            <Row>
                <Col span="8">
                <FormItem label="网格编号" prop="gridCode">
                    <Input v-model="form.gridCode" placeholder="请输入网格编号"></Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="网格名称" prop="gridName">
                    <Input v-model="form.gridName" placeholder="请输入网格名称"></Input>
                </FormItem>
                </Col>

                <Col span="8">
                <FormItem label="机构名称" prop="value2">
                    <Cascader v-model="form.value2" :data="data1" @on-change="dianjiOk" change-on-select filterable></Cascader>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <FormItem label="网格类型" prop="gridType">
                    <Select v-model="form.gridType" placeholder="请选择网格类型">
                        <Option value="1">村社型</Option>
                        <Option value="2">社区型</Option>
                        <Option value="3">专业市场</Option>
                        <Option value="4">工业园</Option>
                        <Option value="5">企业</Option>
                        <Option value="6">事业单位</Option>
                        <Option value="7">临界商户</Option>
                    </Select>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="描述" prop="description">
                    <Input v-model="form.description" placeholder="请输入描述"></Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="管理员" prop="accountId">
                    <Select v-model="form.accountId" placeholder="请选择网格管理员">
                        <Option v-for="h in userList" :value="h.accountId+''">{{ h.realName }}</Option>
                    </Select>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                <FormItem label="协管员" prop="assistManager">
                    <Input v-model="form.assistManager" placeholder="请输入协管员姓名"></Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem label="监督员" prop="superviseManager">
                    <Input v-model="form.superviseManager" placeholder="请输入监督员姓名"></Input>
                </FormItem>
                </Col>
            </Row>
        </Form>
        <div class="page">
            <Button type="primary" @click="addReview" style="margin-bottom: 20px">添加评议员</Button>
            <span style="font-size: 15px;color: orangered">&nbsp;&nbsp;(必填)</span>
            <Table :columns="colums" :data="listReview"></Table>
        </div>
        <div style="margin-top:20px">
            <Button type="primary" @click="handleSubmit('form')">提交</Button>
            <Button to="/grid" style="margin-left: 8px">取消</Button>
        </div>
        <Modal width="35%" v-model="detail.show" :footer-hide="true" title="网格评议员">
            <Form ref="review" :model="review" :rules="reviewValidate" :label-width="100">
                <Row>
                    <Col span="20">
                    <FormItem label="评议员姓名：" prop="gridReviewName">
                        <Input v-model="review.gridReviewName" placeholder="请输入评议员姓名"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="20">
                    <FormItem label="身份证号：" prop="idNumber">
                        <Input v-model="review.idNumber" placeholder="请输入身份证号"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                        <FormItem label="职务：" prop="duties">
                            <Input v-model="review.duties" placeholder="请输入职务"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="正式/备选：" prop="type">
                            <Select v-model="review.type">
                                <Option value="1">正式</Option>
                                <Option value="2">备选</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="20">
                    <FormItem label="描述：" prop="description">
                        <Input v-model="review.description" placeholder="请输入描述"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="20">
                    <FormItem label="地址：" prop="address">
                        <Input v-model="review.address" placeholder="请输入地址"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <FormItem>
                    <Button v-show="detail.type==0" type="primary" @click="postReview('review')">添加</Button>
                    <Button v-show="detail.type==1" type="primary" @click="putReview('review')">修改</Button>
                    <Button style="margin-left: 8px" @click="quit">取消</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
    </div>
</template>

<script>
    import actions from '@/store/action-types'

    export default {
        data() {
            return {
                flag:false,
                data1:[],
                colums: [
                    {
                        title: '评议员姓名',
                        align: 'center',
                        key: 'gridReviewName'
                    },
                    {
                        title: '身份证件',
                        align: 'center',
                        key: 'idNumber'
                    },
                    {
                        title: '职务',
                        align: 'center',
                        key: 'duties'
                    },
                    {
                        title: '正式/备选',
                        align: 'center',
                        key: 'type',
                        render: (h, params) => {
                            let texts = '';
                            if (params.row.type == '1') {
                                texts = '正式'
                            }else if(params.row.type == '2'){
                                texts = '备选'
                            }
                            return h('div', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                }
                            }, texts)
                        }
                    },
                    {
                        title: '描述',
                        align: 'center',
                        key: 'description'
                    },
                    {
                        title: '地址',
                        align: 'center',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 200,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.editReview(params.row)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.deleteReview(params.row)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ],
                detail: {
                    type: 0,
                    show: false
                },
                review: {},
                form: {
                    listReview: []
                },
                listReview: [],
                ruleValidate: {
                    gridCode: [
                        {required: true, message: '网格编号不能为空', trigger: 'blur'},
                        { type: 'string', min: 1,max: 100, message: '网格编号最大长度为100位', trigger: 'blur' }
                    ],
                    gridName: [
                        {required: true, message: '网格名称不能为空', trigger: 'blur'},
                        { type: 'string', min: 1,max: 20, message: '网格名称最大长度为20位', trigger: 'blur' }
                    ],
                    value2: [
                        {required: true,type: 'array', min: 1, message: '机构名称不能为空', trigger: 'change'},
                    ],
                    gridType: [
                        {required: true, message: '网格类型不能为空', trigger: 'blur'},
                    ],
                    description: [
                        {required: false, message: '', trigger: 'blur'},
                        { type: 'string', min: 1,max: 255, message: '描述 最大长度为255位', trigger: 'blur' }
                    ],
                    assistManager: [
                        {required: false, message: '', trigger: 'blur'},
                        { type: 'string', min: 1,max: 50, message: '网格协管员最大长度为50位', trigger: 'change' }
                    ],
                    superviseManager: [
                        {required: false, message: '', trigger: 'blur'},
                        { type: 'string', min: 1,max: 50, message: '网格监督员最大长度为50位', trigger: 'blur' }
                    ]
                },
                reviewValidate: {
                    gridReviewName: [
                        {required: true, message: '评议员姓名不能为空', trigger: 'blur'},
                        { type: 'string', min: 1,max: 50, message: '评议员姓名最大长度为50位', trigger: 'blur' }
                    ],
                    idNumber: [
                        {required: true, message: '身份证号不能为空', trigger: 'blur'},
                        { type: 'string', min: 1,max: 20, message: '身份证号最大长度为20位', trigger: 'blur' }
                    ],
                    duties: [
                        {required: false, message: '', trigger: 'blur'},
                        { type: 'string', min: 1,max: 20, message: '职务最大长度为20位', trigger: 'blur' }
                    ],
                    description: [
                        {required: false, message: '', trigger: 'blur'},
                        { type: 'string', min: 1,max: 255, message: '描述最大长度为255位', trigger: 'blur' }
                    ],
                    address: [
                        {required: false, message: '', trigger: 'blur'},
                        { type: 'string', min: 1,max: 255, message: '地址最大长度为255位', trigger: 'blur' }
                    ]
                },
                userList:[]

            }
        },
        mounted() {
            var vue = this
            this.$store.dispatch(actions.get.RESIDENT_USER_ROLEID, {roleId:1}).then(rep => {
                if( rep.code==200 ) {
                    vue.userList = [ ...rep.data ]

                }else{
                    vue.$Message.error(rep.message)
                }
            })
            if ('id' in this.$route.query) {
                this.flag=true
                this.getDetail(this.$route.query.id).then(rep => {
                    if( rep.code==200 ) {
                        vue.form = {...rep.data}
                        vue.form.value2 = []
                        vue.listReview = [...rep.data.listReview]
                        for (var i in this.listReview) {
                            vue.listReview[i].id = i
                        }
                        for (var k in vue.form) {
                            if (typeof(vue.form[k]) == 'number') {
                                vue.form[k] = vue.form[k] + '';
                            }
                        }
                        let orgCode = vue.form.orgCode
                        //获取机构名称
                        vue.$store.dispatch(actions.get.MECHANISM_PERSON, 1).then(rep1 => {
                            if( rep1.code==200 ) {
                                vue.data1=this.recursion(rep1.data)
                                let arrList=this.recursion1(rep1.data,orgCode)
                                // vue.value2=this.recursion1(rep1.data,orgCode)
                                for( let i=arrList.length - 1;i>=0; i--){
                                    vue.form.value2.push(arrList[i])
                                }
                            }else{
                                vue.$Message.error(rep1.message)
                            }
                        })
                    }else{
                        vue.$Message.error(rep.message)
                    }
                })
            }else{
                vue.form.value2 = []
                //获取所有的机构名称
                this.$store.dispatch(actions.get.MECHANISM_PERSON, 1).then(rep => {
                    if( rep.code==200 ) {
                        vue.data1=this.recursion(rep.data)
                    }else{
                        vue.$Message.error(rep.message)
                    }
                })
            }

        },
        methods: {
            //递归把 机构名称 做出级联选择
            recursion (obj){
                let result=[]
                for(var i in obj){
                    let o={
                        value:obj[i].orgCode,
                        label:obj[i].orgName
                    }
                    if(obj[i].childList.length>0){
                        o.children=this.recursion(obj[i].childList)
                    }
                    result.push(o)
                }

                return result
            },
            recursion1 (obj,orgcode){
                let result=[]
                for(var i in obj){
                    if(obj[i].childList.length>0){
                        let code=this.recursion1(obj[i].childList,orgcode)
                        if(code.length>0){
                            code.push(obj[i].orgCode)
                            result= code
                        }
                    }else{
                        if (orgcode == obj[i].orgCode){
                            result.push(obj[i].orgCode)
                        }
                    }
                }
                return result
            },
            //级联选择的方法 控制级联选择input框里显示的信息
            format (labels, selectedData) {

                const index = labels.length - 1;
                const data = selectedData[index] || false;
                if (data && data.code) {
                    return labels[index] + ' - ' + data.code;
                }
                return labels[index];
            },
            //机构名称选择之后的事件
            dianjiOk(labels, selectedData){

                console.log(this.form.value2)
            },
            getDetail(id) {
                return this.$store.dispatch(actions.get.GRID_PERSON, id)
            },
            addReview() {
                    this.detail.type = 0
                    this.detail.show = true
                    this.review = {
                        type : '1'
                    }
            },
            editReview(row) {
                this.detail.type = 1
                this.detail.show = true
                this.review = row
            },
            deleteReview(row) {
                this.listReview.splice(row.id, 1)
                for (var i in this.listReview) {
                    if (this.listReview[i].id > row.id) {
                        this.listReview[i].id = this.listReview[i].id - 1
                    }
                }
            },
            postReview(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.detail.show = false
                        this.review.id = this.listReview.length
                        this.listReview.push(this.review)
                    }
                })
            },
            putReview(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.detail.show = false
                        this.listReview[this.review.id]=this.review
                    }
                })
            },
            quit() {
                this.detail.show = false
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const payload = {...this[name]}
                        if(this.listReview.length==0){
                            this.$Message.error("请填写评议员信息！");
                        }else{
                            for (var i in this.listReview) {
                                this.listReview[i].gridCode = payload.gridCode
                                this.listReview[i].gridName = payload.gridName
                                this.listReview[i].id = null
                            }
                            payload.listReview = this.listReview
                            payload.orgCode=this.form.value2[this.form.value2.length - 1]
                            delete payload['value2']
                            if ('id' in this.$route.query) {
                                this.$store.dispatch(actions.put.GRID_PERSON, payload).then(rep => {
                                    //判断返回的消息，若返回得code为200 则认为操作成功
                                    if ("200" != rep.data.code) {
                                        this.$Message.error(rep.data.message);
                                    } else {     //否则返回一个警告窗 并把错误信息显示
                                        this.$Message.success("信息修改成功！");
                                        this.$router.go(-1)
                                    }
                                })
                            } else {
                                this.$store.dispatch(actions.post.GRID_PERSON, payload).then(rep => {
                                    //判断返回的消息，若返回得code为200 则认为操作成功
                                    if ("200" != rep.data.code) {
                                        this.$Message.error(rep.data.message);
                                    } else {     //否则返回一个警告窗 并把错误信息显示
                                        this.$Message.success("信息添加成功！");
                                        this.$router.go(-1)
                                    }
                                })
                            }
                        }
                    } else {
                        this.$Message.error('请按要求填写信息!');
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .gridBreadcrumb {
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        font-family:PingFangSC-Regular;
        line-height: 54px;
        padding-left: 20px;
        border-radius: 4px;
        border: 1px solid #eee;
    }
    .form {
        margin: 24px;
        padding: 20px;
        background-color: #fff;
        .ivu-form-item-label {
            font-size: 14px;
        }
        .ivu-radio-group-item {
            font-size: 14px;
        }
        .table {
            margin-bottom: 20px;
        }
    }

    .detail-table {
        .td1 {
            width: 30%;
            height: 40px;
            font-size: 14px;
            text-align: right;
        }
        .td2 {
            width: 60%;
            height: 40px;
            font-size: 14px;
        }
    }
</style>
