<template>
    <!--网格管理页面-->
    <div class="gridPage">
        <div class="gridSearch">
            <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull">
            <Select v-model="search.type" slot="prepend" style="width: 80px">
                <Option value="gridCode">网格编号</Option>
                <Option value="gridName">网格名称</Option>
            </Select>
            </Input>
            <Button type="primary" icon="ios-search" @click="onSearch">查询</Button>&nbsp;&nbsp;
        </div>
        <div class="gridButton-group">
            <Button class="create" to="/grid/InDetail" type="primary" icon="ios-add">新建</Button>
        </div>
        <div class="table">
            <Table :columns="columns" :data="list"></Table>
        </div>
        <div class="pagination">
            <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
            <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts"
                  :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
        </div>

        <Modal v-model="model.show" footer-hide width="320" :styles="{top: '200px'}" :closable="false">
            <p style="padding: 10px;font-size: 16px;">
                <Icon type="ios-information-circle" style="color:#f60;padding-right: 10px;" size="40px"></Icon>
                <span>你确定这个网格吗？</span>
            </p>
            <div style="font-size: 14px;padding-left: 40px">
                <p>{{ model.content}}</p>
            </div>
            <div style="text-align: right">
                <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
                <Button type="primary" size="large" :loading="model.loading" @click="deleteUser">确定</Button>
            </div>
        </Modal>
       <!-- <Modal
                v-model="model.show"
                width="320">
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

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import actions from '@/store/action-types'
    import {UPLOAD_API_URL} from '@/config'

    export default {
        data() {
            return {
                listType:[ "村社型","社区型","专业市场","工业园","企业","事业单位","临界商户"],
                pageNum: 1,
                pageSize: 10,
                pageSizeOpts: [5, 10, 15, 20],
                showImportModal: false,
                uploadUrl: UPLOAD_API_URL,
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
                    type: 'gridCode',
                    keyword: ''
                },
                columns: [
                    {
                        title: '网格名称',
                        key: 'gridName',
                        fixed: 'left',
                        align: 'center',
                        minWidth: 120
                    },
                    {
                        title: '网格编号',
                        key: 'gridCode',
                        align: 'center',
                        minWidth: 120
                    },
                    {
                        title: '网格类型',
                        key: 'gridType',
                        align: 'center',
                        minWidth: 100,
                        render: (h, params) => {
                            let listType=this.listType[params.row.gridType - 1]
                            return h('span', {
                                props: {
                                },
                            },listType)
                        }
                    },
                    {
                        title: '网格管理员',
                        key: 'realName',
                        align: 'center',
                        minWidth: 110
                    },
                    {
                        title: '网格协管员',
                        key: 'assistManager',
                        align: 'center',
                        minWidth: 120
                    },
                    {
                        title: '网格监督员',
                        key: 'superviseManager',
                        align: 'center',
                        minWidth: 120
                    },
                    {
                        title: '机构号',
                        key: 'orgCode',
                        align: 'center',
                        minWidth: 80
                    },
                    {
                        title: '描述',
                        key: 'description',
                        tooltip: 'true',
                        align: 'center',
                        minWidth: 80
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        align: 'center',
                        width: 210,
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
                                            this.editMap(params.row)
                                        }
                                    }
                                }, '地图'),
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
                list: state => state.grid.gridlist,
                person: state => state.grid.gridperson,
                total: state => state.grid.gridtotal
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
                return this.$store.dispatch(actions.get.GRID_LIST, {
                    pageNum: this.pageNum,
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
            show(row) {
                this.$router.push('/grid/mesher?gridCode=' + row.gridCode+'&id='+ row.id)
            },
            edit(row) {
                this.$router.push('/grid/InDetail?id=' + row.id)
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
                this.model.content = row.gridName
                this.model.id = row.id
                this.model.show = true
            },
            deleteUser() {
                this.model.loading = true
                setTimeout(() => {
                    this.model.loading = false
                    this.model.show = false
                    this.$store.dispatch(actions.delete.GRID_PERSON, this.model.id).then(rep => {
                        if(200 == rep.data.code){
                            this.$Message.success('删除成功')
                            this.fetchList()
                        }else{
                            this.$Message.error(rep.data.message)
                        }

                    })
                }, 2000)
            },
            onSearch() {
                this.fetchList({
                    [this.search.type]: this.search.keyword
                })
            },
            goBack(){
                this.model.show=false
            }
        }
    }
</script>

<style lang="scss">
    .gridPage {
        margin: 24px;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        .gridSearch {
            height: 32px;
            float: right;
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
        .gridButton-group {
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
        font-size: 16px;
        line-height: 32px;
    }
</style>
