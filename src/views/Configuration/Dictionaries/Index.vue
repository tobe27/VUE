<template>
    <div>
        <div class="dictBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>配置管理</BreadcrumbItem>
                <BreadcrumbItem>字典管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
    <div class="dictPage">
        <!--字典管理-->
        <!--<div class="search">
            <Input placeholder="请输入条件以进行查询" class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull">
            <Select  v-model="search.type" slot="prepend" style="width: 80px">
                <Option value="accountName">登录名</Option>
                <Option value="realName">真实姓名</Option>
            </Select>
            </Input>
            <Button type="primary" icon="ios-search" @click="onSearch">查询</Button>&nbsp;&nbsp;
        </div>-->
        <div class="button-group">
            <Button class="create" to="/configuration/dictionaries/detail" type="primary" icon="ios-add">新建</Button>
        </div>
        <!--表格-->
        <div class="table">
            <Table :columns="columns" :data="list"></Table>
        </div>
        <!--表格底部-->
        <div class="pagination">
            <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
            <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts"
                  :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
        </div>
        <!--删除此条用户信息时弹窗-->
        <Modal v-model="model.show" footer-hide width="320" :styles="{top: '200px'}" :closable="false">
            <p style="padding: 10px;font-size: 16px;">
                <Icon type="ios-information-circle" style="color:#f60;padding-right: 10px;" size="40px"></Icon>
                <span>你确定要删除这行内容么？</span>
            </p>
            <div style="font-size: 14px;padding-left: 40px">
                <p>{{ model.content }}</p>
            </div>
            <div style="text-align: right">
                <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
                <Button type="primary" size="large" :loading="model.loading" @click="deleteUser">确定</Button>
            </div>
        </Modal>
        <!--<Modal v-model="model.show" width="320">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>你确定要删除这行内容么？</span>
            </p>
            <div style="text-align:center">
                <p>{{ model.content }}</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="model.loading" @click="deleteUser">删除</Button>
            </div>
        </Modal>-->
        <!--查看用户详情-->
        <Modal width="50%" :styles="{top: '200px'}" v-model="detail.show" :footer-hide="true" title="用户详情">
            <table class="detail-table">
                <tr v-for="(person,index) in persons" v-if="index == 0">
                    <td width="18%">字典组名称：</td>
                    <td width="20%">{{ persons[0].name}}</td>
                    <td width="20%">字典组编码：</td>
                    <td width="32%">{{ persons[0].code }}</td>
                </tr>
                <tr v-for="person in persons">
                    <td >字典组Key项：</td>
                    <td >{{ person.dictionaryKey}}</td>
                    <td >字典组Value项：</td>
                    <td>{{ person.dictionaryValue }}</td>
                </tr>
            </table>
        </Modal>
    </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import actions from '@/store/action-types'
    import {UPLOAD_API_URL} from '@/config'

    export default {
        data() {
            return {
                pwList:{
                    accountId:'',
                    oldPassword:'',
                    newPassword:'',
                    new1Password:''
                },
                modal1: false,
                pageNum: 1,
                pageSize: 10,
                pageSizeOpts: [5, 10, 15, 20],
                showImportModal: false,
                model: {
                    show: false,
                    title: '你确定要删除这行内容么？',
                    id: null,
                    content: '',
                    loading: false
                },
                detail: {
                    show: false
                },
                search: {
                    type: 'accountName',
                    keyword: ''
                },
                columns: [
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '字典组编码',
                        minWidth: 70,
                        key: 'code'
                    },
                    {
                        title: '字典组名称',
                        key: 'name'
                    },
                    {
                        title: '是否启用',
                        key: 'isenable',
                        render: (h, params) => {
                            let texts = '';
                            if(params.row.isenable == 0){
                                texts = '启用'
                            }else{
                                texts = '冻结'
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
                        tooltip: 'true',
                        key: 'description'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        width: 180,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.row)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row)
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
                                            this.delete(params.row)
                                        }
                                    }
                                }, '删除')
                            ])
                        }
                    }
                ]
            }
        },
        computed: {
            ...mapState({
                list: state => state.dictionaries.list,
                total: state => state.dictionaries.total,
                persons: state => state.dictionaries.person,
            })
        },
        mounted() {
            // 获取列表
            if ('pageNum' in this.$route.query) {
                this.pageNum = parseInt(this.$route.query.pageNum)
            }
            this.fetchList()

        },
        methods: {
            fetchList(params = {}) {
                return this.$store.dispatch(actions.get.DICTIONARIES_LIST, {
                    pageNo: this.pageNum,
                    pageSize: this.pageSize,
                    ...params
                })
            },
            changePage(num) {
                this.pageNum = num
                this.$router.replace({query: {pageNum: this.pageNum}})
                this.fetchList()
            },
            onChangeNull() {
                if ("" == this.search.keyword) {
                    this.$router.replace({query: {pageNum: this.pageNum}})
                    this.fetchList()
                }
            },
            onPageSizeChange(pageSize1) {
                this.pageSize = pageSize1
                this.$router.replace({query: {pageNum: this.pageNum}})
                this.fetchList()
            },
            show (row) {//1
                // this.$store.dispatch(actions.get.RESIDENT_PERSON, row.residentId)
                this.$store.dispatch(actions.get.DICTIONARIES_SHOW,row.code)
                this.detail.show = true
            },
            edit(row) {
                this.$router.push('/configuration/dictionaries/detail?code=' + row.code)
            },
            editMap(row) {
                let str=row.gridName,gridName='';
                for(var i=0;i<str.length;i++){
                    gridName += "\\u"+str.charCodeAt(i).toString(16);
                }
                this.$router.push('/grid/InMap?gridCode=' + row.gridCode+'&gridName='+gridName)
            },
            delete(row) {
                this.model.data = row
                this.model.content = row.name
                this.model.id = row.code
                this.model.show = true

            },
            deleteUser() {
                var  vue = this
                this.model.loading = true
                setTimeout(() => {
                    vue.model.loading = false
                    vue.model.show = false
                    vue.$store.dispatch(actions.delete.DICTIONARIES_LIST, this.model.id).then(rep => {
                        vue.$Message.success('删除成功')
                        vue.fetchList()
                    })
                }, 1000)
            },
            onSearch() {
                if ( 0 < this.search.keyword.trim().length){//把取到得查询条件处理一下 去掉两边得空格
                    this.fetchList({
                        [this.search.type]: this.search.keyword.trim()
                    }).then(rep => {
                        //判断返回的消息，若返回得code为200 则认为操作成功 关闭信息窗口
                        if( rep.code != 200){
                            this.$Message.error(rep.message);

                        }
                    })
                }

            },
            editPassWord(row){
                this.pwList.accountId=row.accountId//拿到要修改密码得用户的用户ID：accountID
            },
            ok(){
                if(this.pwList.newPassword == this.pwList.new1Password){
                    let payload={
                        accountId:this.pwList.accountId,
                        oldPassword:this.pwList.oldPassword,
                        newPassword:this.pwList.newPassword
                    }
                    this.$store.dispatch(actions.put.DICTIONARIES_LIST, payload).then(rep => {
                        //判断返回的消息，若返回得code为200 则认为操作成功 关闭信息窗口
                        if("200" == rep.data.code){
                            this.$Message.success("密码修改成功修改成功！");
                            this.modal1=false
                        }else{//否则返回一个警告窗 并把错误信息显示
                            this.$Message.error(rep.data.message);
                        }
                    })
                }else{
                    this.$Message.error("两次新密码不一致!");
                }

            },
            cancel(){//假如点击了取消按钮 则关闭修改密码窗口
                this.modal1=false
            },
            goBack(){
                this.model.show=false
            }
        },
        watch: {
            modal1: function () {
                this.pwList.oldPassword=""
                this.pwList.newPassword=""
                this.pwList.new1Password=""
            }
        }
    }
</script>

<style lang="scss">
    .dictBreadcrumb {
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        font-family:PingFangSC-Regular;
        line-height: 54px;
        padding-left: 24px;
        border-radius: 4px;
        border: 1px solid #eee;
    }
    .dictPage {
        margin: 24px;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        .search {
            height: 32px;
            .search-input {
                float: left;
                width: 400px;
                font-size: 14px;
            }
            Button {
                float: left;
                margin-left: 10px;
                font-size: 14px;
            }
        }
        .table {
            margin-bottom: 20px;
            Table {
                font-size: 14px;
            }
            Button {
                color: #2d8cf0;
            }
        }
        .button-group {
            margin-bottom: 20px;
            .import {
                margin-left: 10px;
            }
        }
        .pagination {
            width: 100%;
            height: 32px;
            .text {
                float: left;
                line-height: 32px;
            }
            .pager {
                float: right;
            }
        }
    }

    .detail-table {
        width: 100%;
        font-size: 14px;
        line-height: 32px;
    }
</style>
