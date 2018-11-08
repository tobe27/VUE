<template>
    <!--
    字典管理--新建
    -->
    <div>
        <div class="dictDetailBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>集中授信</BreadcrumbItem>
                <BreadcrumbItem to="/configuration/dictionaries">字典管理</BreadcrumbItem>
                <BreadcrumbItem v-if="this.flag">编辑</BreadcrumbItem>
                <BreadcrumbItem v-if="!this.flag">新建</BreadcrumbItem>
            </Breadcrumb>
        </div>
    <div class="form">
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120">
            <Row>
                <Col span="7">
                <FormItem label="类型" prop="type">
                    <Input v-model="form.type" placeholder="请输入字典类型"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="字典名称" prop="name">
                    <Input v-model="form.name" placeholder="请输入字典名称"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="字典描述" prop="description">
                    <Input v-model="form.description" placeholder="请输入字典描述"></Input>
                </FormItem>
                </Col>
                <!--<Col span="8">-->
                <!--<FormItem label="用户密码" prop="password">-->
                <!--<Input v-model="form.password" placeholder="请输入用户密码"></Input>-->
                <!--</FormItem>-->
                <!--</Col>-->
            </Row>
            <Row>
                <!--<Col span="8">-->
                <!--<FormItem label="出生日期">-->
                <!--<DatePicker type="date" prop="birthdate" placeholder="请输入出生日期" v-model="form.birthdate"></DatePicker>-->
                <!--</FormItem>-->
                <!--</Col>-->
                <Col span="7">
                <FormItem label="字典项value值" prop="dictionaryValue">
                    <Input v-model="form.dictionaryValue" placeholder="请输入字典项value值"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="字典项Key值" prop="dictionaryKey">
                    <Input v-model="form.dictionaryKey" placeholder="请输入字典项Key值"></Input>
                </FormItem>
                </Col>
                <Col span="7">
                <FormItem label="父级Id" prop="parentId">
                    <Input v-model="form.parentId" placeholder="请输入父级Id"></Input>
                </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="7">
                <FormItem label="是否启用" prop="isenable">
                    <RadioGroup v-model="form.isenable">
                        <Radio label="0">启用</Radio>
                        <Radio label="1">不启用</Radio>
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
    import {mapState} from 'vuex'
    import actions from '@/store/action-types'

    export default {
        name: 'userDetail',
        data() {
            return {
                flag: false,
                form: {},//这个用户的所有信息
                message: "",
                ruleValidate: {
                    type: [
                        {required: true, message: '类型不能为空', trigger: 'blur'},
                        { type: 'string', min: 1,max: 20,pattern:'^[0-9]{1,10}$', message: '类型应由20位以内的纯数字组成', trigger: 'blur' }
                    ],
                    name: [
                        {required: true, message: '字典组名称不能为空', trigger: 'blur'},
                        { type: 'string', min: 1,max: 100, message: '字典组名称最大长度为100位', trigger: 'blur' }
                    ],
                    isenable: [
                        {required: true, message: '是否启用不能为空', trigger: 'blur'},
                    ],
                    dictionaryKey: [
                        {required: true, message: '字典项Key值不能为空', trigger: 'blur'},//
                        { type: 'string', min: 1,max: 20, pattern:'^[0-9]{1,10}$',message: '字典项Key值应由20位以内的纯数字组成', trigger: 'blur' }
                    ],
                    dictionaryValue: [
                        {required: true, message: '字典项value值不能为空', trigger: 'blur'},
                        { type: 'string', min: 1,max: 255, message: '字典项value值最大长度为255位', trigger: 'blur' }
                    ],
                    description: [
                        {required: true, message: '字典描述不能为空', trigger: 'blur'},
                        { type: 'string', min: 1,max: 255, message: '字典描述最大长度为255位', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            if ('code' in this.$route.query) {
                this.flag=true
                let code=this.$route.query.code
                this.roleList(code)
            }
        },
        methods: {
            roleList(code) {
                var vue = this
                return this.$store.dispatch(actions.get.DICTIONARIES_SHOW, code).then(rep => {
                    if(rep.code==200){
                        vue.form=rep.data[0]
                        vue.form.isenable=String(this.form.isenable)
                        vue.form.type=String(this.form.type)
                        vue.form.dictionaryKey=String(this.form.dictionaryKey)
                    }else if(rep.code!=204){
                        vue.$Message.error(rep.message)
                    }
                })
            },
            handleSubmit(name) {
                var vue = this

                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let payload ={
                            description: vue.form.description,
                            dictionaryKey:Number(vue.form.dictionaryKey),
                            dictionaryValue: vue.form.dictionaryKey,
                            isenable:Number(vue.form.isenable),
                            name: vue.form.name,
                            parentId:vue.form.parentId,
                            type: Number(vue.form.type)
                        }
                        //  如果有accountId字段 说明是编辑操作  调用下面axios  若没有 则认为是添加操作

                        if ('code' in this.$route.query) {
                            payload.code=this.$route.query.code
                            this.$store.dispatch(actions.put.DICTIONARIES_LIST, payload).then(rep => {
                                //判断返回的消息，若返回得code为200 则认为操作成功
                                if ("200" != rep.data.code) {
                                    this.$Message.error(rep.data.message);
                                } else {//否则返回一个警告窗 并把错误信息显示
                                    this.$Message.success("字典信息修改成功！");
                                    this.$router.go(-1)
                                }
                            })
                        } else {   //若没有 则认为是添加操作
                            this.$store.dispatch(actions.post.DICTIONARIES_LIST, payload).then(rep => {
                                //判断返回的消息，若返回得code为200 则认为操作成功 否则返回一个警告窗 并把错误信息显示
                                if ("200" != rep.data.code) {
                                    this.$Message.error(rep.data.message);
                                } else {    //否则返回一个警告窗 并把错误信息显示
                                    this.$Message.success("新建字典成功！");
                                    this.$router.go(-1)
                                }
                            })
                        }
                    } else {
                        this.$Message.error('表单验证错误!')
                    }
                })
            },
            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="scss">
    .dictDetailBreadcrumb {
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
