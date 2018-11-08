<template>
    <!--
    新建用户版块
    -->
    <div>
        <div class="userDetailBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>系统管理</BreadcrumbItem>
                <BreadcrumbItem to="/user">用户管理</BreadcrumbItem>
                <BreadcrumbItem v-if="this.flag">编辑</BreadcrumbItem>
                <BreadcrumbItem v-if="!this.flag">新建</BreadcrumbItem>
            </Breadcrumb>
        </div>
    <div class="form">
        <Form ref="form" :model="form" :rules="ruleValidate">
            <Row>
                <Col span="6">
                <FormItem label="用户名：" prop="accountName">
                    <Input v-model="form.accountName" placeholder="请输入用户名"></Input>
                </FormItem>
                </Col>
                <Col offset="2" span="6">
                <FormItem label="密码：" prop="password">
                    <Input type="password" v-model="letPassOwrd"  :disabled="form.password == '' ? false : true" :placeholder="form.password == '' ? '请设置用户密码':'************'"></Input>
                </FormItem>
                </Col>

                <Col offset="2" span="6">
                <FormItem label="联系方式：" prop="phoneNumber">
                    <Input v-model="form.phoneNumber" placeholder="请输入手机号"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                <FormItem label="姓名：" prop="realName">
                    <Input v-model="form.realName" placeholder="请输入姓名"></Input>
                </FormItem>
                </Col>
                <Col offset="2" span="6">
                <FormItem label="身份证号码：" prop="idNumber">
                    <Input v-model="form.idNumber" placeholder="请输入身份证号码"></Input>
                </FormItem>
                </Col>
                <Col offset="2"  span="6">
                <FormItem label="用户角色：" prop="roleName">
                    <Select v-model="checkAllGroup">
                        <Option v-for="roleNames in roleNameList" :value="roleNames.roleId" :key="roleNames.roleId">{{ roleNames.roleName }}</Option>
                    </Select>
                    <!--<div>{{checkAllGroup}}</div>-->
                </FormItem>
                </Col>

            </Row>
            <Row>
                <Col span="6">
                <FormItem label="邮箱：" prop="email">
                    <Input v-model="form.email" placeholder="请输入邮箱"></Input>
                </FormItem>
                </Col>
                <Col offset="2" span="6">
                <FormItem label="机构名称：">
                    <Cascader v-model="value2" :data="data1" :render-format="format" @on-change="dianjiOk" change-on-select filterable></Cascader>
                </FormItem>
                </Col>
                <Col offset="2"  span="6">
                <FormItem label="法人名称：" prop="corpName">
                    <Input v-model="form.corpName" placeholder="请输入法人名称"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>

                <Col span="6">
                <FormItem label="性别：" prop="sex">
                    <RadioGroup v-model="form.sex" style="width:100%">
                        <Radio label="1">男</Radio>
                        <Radio label="2">女</Radio>
                    </RadioGroup>
                </FormItem>
                </Col>
                <Col offset="2" span="6">
                <FormItem label="用户状态：" prop="status">
                    <RadioGroup v-model="form.status" style="width:100%">
                        <Radio label="0">冻结</Radio>
                        <Radio label="1">正常</Radio>
                    </RadioGroup>
                </FormItem>
                </Col>
            </Row>
            <FormItem>
                <Button type="primary" @click="handleSubmit('form')">提交</Button>
                <Button @click="goBack" style="margin-left: 8px">取消</Button>
            </FormItem>
        </Form>
    </div>
    </div>
</template>

<script>
import actions from '@/store/action-types'
export default {
    name: 'userDetail',
    data() {
        return {
            flag:false,
            data1: [],
            value2:[],
            // userList:[],
            roleNameList: [],//所有的角色数组
            //这个用户的所有信息
            form: {
                accountName:'',
                avatar:'',
                qrCode:'',
                password:'',
                realName:'',
                idNumber:'',
                sex: '',
                phoneNumber:'',
                email:'',
                status:'1',
                corpCode:'',
                corpName:'',
                orgCode:'',
                orgName:'',
                roleIds:''
            },
            letPassOwrd:'',
            //存储选择的角色id
            checkAllGroup: '',
            //表单验证
            ruleValidate: {
                accountName: [
                    {required: true, message: '用户名不能为空', trigger: 'blur'},
                    {type: 'string', min: 2, max: 20, message: '用户名最大长度为20位', trigger: 'blur'}
                ],
                password: [
                    {required: false, message: '密码不能为空', trigger: 'blur'}
                ],
                realName: [
                    {required: true, message: '姓名不能为空', trigger: 'blur'},
                    {type: 'string', max:10, message: '姓名最大长度为10位', trigger: 'blur'},
                ],
                idNumber: [
                    {required: true, message: '请输入身份证号', trigger: 'blur'},
                    {
                        type: 'string',
                        min: 15,
                        max: 18,
                        pattern: '/(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)/',
                        message: '请输入正确的中国居民身份证',
                        trigger: 'blur'
                    }
                ],
                sex: [
                    {required: true, message: '请选择性别', trigger: 'blur'}
                ],
                status: [
                    {required: false, message: '请确认用户状态', trigger: 'blur'}
                ],
                email: [
                    {required: false, message: '邮箱不能为空', trigger: 'blur'},
                    {type: 'string', min: 0, max: 30, message: '邮箱最大长度为30位', trigger: 'blur'}
                ],
                phoneNumber: [
                    {required: true, message: '联系方式不能为空', trigger: 'blur'},
                    {
                        type: 'string',
                        pattern: '^1[34578]\\d{9}',
                        message: '联系方式必须是1开头11位手机号',
                        trigger: 'blur'
                    }
                ],
                 abAccountId: [
                    {required: false, message: '审核经理不能为空', trigger: 'change'},
                ],
                corpName: [
                    {required: false, message: '法人名称不能为空', trigger: 'blur'},
                    {type: 'string', min: 0, max: 100, message: '法人名称最大长度为100位', trigger: 'blur'}
                ],
                orgName: [
                    {required: false, message: '机构名称不能为空', trigger: 'blur'},
                    {type: 'string', min: 0, max: 20, message: '机构名称最大长度为20位', trigger: 'blur'}
                ],
            }
        }
    },
    mounted() {
        var vue = this
        //如果有accountId 认为是编辑操作  获取此用户相关消息
        if ('accountId' in this.$route.query) {//根据传过来得accountId先获取信息
            this.flag=true
            this.getDetail(this.$route.query.accountId)
        }else{
            //获取所有的机构名称
            this.$store.dispatch(actions.get.MECHANISM_PERSON, 1).then(rep => {
                if( rep.code==200 ) {
                    vue.data1=this.recursion(rep.data)
                }else{
                    vue.$Message.error(rep.message)
                }
            })
        }
        this.roleList()

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
            if(selectedData.length > 0){
                this.form.orgName=selectedData[selectedData.length - 1].label//选中的机构name
                this.form.orgCode=selectedData[selectedData.length - 1].value.toString()//选中的机构id
            }else{
                this.form.orgName=''
                this.form.orgCode=''
            }
        },
            //获取全部的角色信息
            roleList() {
                var vue = this
                return this.$store.dispatch(actions.get.ROLE_LIST, {//获取所有角色
                    pageNo: 1,
                    pageSize: 20,
                }).then(rep => {
                    if( rep.code==200 ) {
                        for (let i in rep.data) {
                            rep.data[i].roleId = rep.data[i].roleId.toString()
                        }
                        vue.roleNameList = rep.data
                    }else if(rep.code!=204){
                        vue.$Message.error(rep.message)
                    }
                })
            },
            //通过accountId获取此用户相关消息
            getDetail(accountId) {
                let vue = this
                return this.$store.dispatch(actions.get.USER_PERSON, accountId).then(rep => {
                    if( rep.code==200 ){
                        vue.form = { ...rep.data }
                        // vue.form.abAccountId=vue.form.abAccountId+''
                        vue.checkAllGroup=vue.form.roles[0].roleId.toString()
                        // vue.value2.push(parseInt(vue.form.orgCode))
                        if({...rep.data}.sex){
                            vue.form.sex={...rep.data}.sex.toString()
                        }
                        if({...rep.data}.phoneNumber){
                            vue.form.phoneNumber={...rep.data}.phoneNumber.toString()
                        }
                        if(null != {...rep.data}.status){
                            vue.form.status={...rep.data}.status.toString()
                        }
                        let orgCode = vue.form.orgCode
                        //获取机构名称
                        vue.$store.dispatch(actions.get.MECHANISM_PERSON, 1).then(rep1 => {
                            if( rep1.code==200 ) {
                                vue.data1=this.recursion(rep1.data)
                                let arrList=this.recursion1(rep1.data,orgCode)
                                // vue.value2=this.recursion1(rep1.data,orgCode)
                                for( let i=arrList.length - 1;i>=0; i--){
                                    vue.value2.push(arrList[i])
                                }
                            }else{
                                vue.$Message.error(rep1.message)
                            }
                        })
                    }else{
                        vue.$Message.error(rep.message)
                    }
                })
            },
            //提交按钮的事件
            handleSubmit(name) {
                let vue = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let payload = {...this[name]}
                        payload.phoneNumber=parseInt(payload.phoneNumber)
                        payload.roleIds = vue.checkAllGroup + ''
                        payload.sex=payload.sex ? parseInt(payload.sex) : null
                        payload.status = payload.status ? parseInt(payload.status) : null
                        //  如果有accountId字段 说明是编辑操作  调用下面axios  若没有 则认为是添加操作
                        if ('accountId' in this.$route.query) {
                            payload.accountId=payload.accountId.toString()
                            delete payload.roles//因为编辑用户得接口得参数里面没有roles字段
                            delete payload.password//不让编辑功能设置用户密码 所以把password字段干掉
                            vue.$store.dispatch(actions.put.USER_SET, payload).then(rep => {
                                //判断返回的消息，若返回得code为200 则认为操作成功
                                if ( "200" != rep.data.code ) {
                                    this.$Message.error(rep.data.message);
                                } else {//否则返回一个警告窗 并把错误信息显示
                                    this.$Message.success("用户资料修改成功！");
                                    this.$router.go(-1)
                                }
                            })
                        } else {   //若没有 则认为是添加操作
                            if('' == payload.orgCode){
                                this.$Message.error('请选择机构！');
                                return
                            }
                            if('' == payload.roleIds){
                                this.$Message.error('请分配角色！');
                                return
                            }
                            payload.password = '' == vue.letPassOwrd ? '123456' : vue.letPassOwrd
                            vue.$store.dispatch(actions.post.USER_PERSON, payload).then(rep => {
                                //判断返回的消息，若返回得code为200 则认为操作成功 否则返回一个警告窗 并把错误信息显示
                                if ( "200" != rep.data.code ) {
                                    this.$Message.error(rep.data.message);
                                } else {    //否则返回一个警告窗 并把错误信息显示
                                    this.$Message.success("新建用户成功！");
                                    this.$router.go(-1)
                                }
                            })
                        }
                    } else {
                        this.$Message.error('表单验证错误!')
                    }
                })
            },
            //取消按钮
            goBack () {
                this.$router.go(-1)
            }
        }
}
</script>

<style lang="scss">
    .userDetailBreadcrumb {
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
    }
</style>
