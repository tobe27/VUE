<template>
  <div>
    <!--客户管理页面-->
    <div class="customerpagetop">
      <div style="font-size:14px;font-family:PingFangSC-Regular;">
        <span>请选择网格：</span>
        <Button type="text" style="font-size:14px;padding:0 5px;height:30px;border-radius:4px" :class="currentGridCode==null?'active':''" @click="changeGrid(null)">全部
        </Button>
        <Button type="text" style="font-size:14px;padding:0 5px;margin-left:10px;height:30px;border-radius:4px;" v-for="(h, index) in gridNameList" :key="index" :class="currentGridCode==h.gridCode?'active':''" @click="changeGrid(h.gridCode,h.gridName)">{{ h.gridName }}
        </Button>
      </div>
      <Divider v-if="roleId ==1 " style="margin: 14px 0;" />
      <div v-if="roleId ==1 " class="import">批量导入:   <a class="ivu-btn ivu-btn-default" :href="downloadUrl"><Icon type="ios-download-outline"/>上传文件</a></div>
    </div>
    <div class="customerPage">
      <div class="searchdiv">
        <Button v-if="roleId ==1 " @click="onAdd" type="primary" icon="ios-add">新建</Button>
        <Button class="searchButton" type="primary" icon="ios-search" clearable @click="onSearch" style="float: right">查询</Button>
        <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull">
          <Select v-model="search.type" slot="prepend" style="width: 80px">
            <Option value="customerName">姓名</Option>
            <Option value="idNumber">身份证号</Option>
            <Option value="nativeAddress">户籍地址</Option>
          </Select>
        </Input>
        <span class="search-span">
            状态:&nbsp;
            <Select v-model="search1.status" style="width: 64px" @on-change="changeStatus">
              <Option value="1">全部</Option>
              <Option value="0">暂存</Option>
              <Option value="5">正常</Option>
              <Option value="6">冻结</Option>
            </Select>
      </span>
      </div>
      <div class="customerTable">
        <Table :columns="columns" :data="list"></Table>
      </div>
      <div class="pagination">
        <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
        <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
      </div>
    </div>
    <Modal v-model="delmodel.show" footer-hide width="320">
        <div style="padding: 0 0 10px 0;font-size: 16px;">
        <Icon type="ios-information-circle" style="color:#f60;line-height:24px;"></Icon>
        <span>{{ delmodel.title }}</span>
        </div>
        <div style="font-size: 14px;padding-left: 20px;padding-bottom: 20px">
        <p>{{ delmodel.content }}</p>
        </div>
        <div style="text-align: right">
        <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
        <Button type="primary" size="large" :loading="delmodel.loading" @click="delTemporaryUser">确定</Button>
        </div>
    </Modal>
    <Modal v-model="model.show" footer-hide width="320">
        <div style="padding: 0 0 10px 0;font-size: 16px;">
        <Icon type="ios-information-circle" style="color:#f60;line-height:24px;"></Icon>
        <span>{{ model.title }}</span>
        </div>
        <div style="font-size: 14px;padding-left: 20px;padding-bottom: 20px">
        <p>{{ model.content }}</p>
        </div>
        <div style="text-align: right">
        <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
        <Button type="primary" size="large" :loading="model.loading" @click="deleteUser">确定</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import actions from '@/store/action-types'
import { API_BASE_URL, LOGO_NAME } from '@/config'
import store from '@/store/index'
// const user = store.state.login.user
const user = JSON.parse(sessionStorage.getItem('userObj'))
console.log(store)
// console.log(this.$store)
export default {
  data () {
    return {
      roleId: user.roles[0].roleId,
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts: [5, 10, 15, 20],
      apiUrl: API_BASE_URL,
      downloadUrl: API_BASE_URL + '/file/customer/0?gridName=全部网格&accountId=' + user.accountId,
      logoName: LOGO_NAME,
      currentGridCode: null,
      currentGridName: null,
      delmodel: {
        show: false,
        title: '你确定要删除该客户么？',
        id: null,
        content: '',
        loading: false
      },
      model: {
        show: false,
        title: '你确定要更改该客户状态么？',
        id: null,
        content: '',
        loading: false
      },
      search: {
        type: 'customerName',
        keyword: ''
      },
      search1: {
        type: 'status',
        keyword: '',
        status: '1'
      },
      columns: [
        {
          title: '姓名',
          key: 'customerName',
          width: 96,
          align: 'center'
        },
        {
          title: '身份证',
          key: 'idNumber',
          width: 185,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phoneNumber',
          minWidth: 50,
          align: 'center'
        },
        {
          title: '网格名称',
          key: 'gridName',
          minWidth: 20,
          align: 'center'
        },
        {
          title: '户号',
          key: 'householdId',
          minWidth: 20,
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          minWidth: 10,
          render: (h, params) => {
            let type = ''
            let status = ''
            if (params.row.status === 0) {
              type = '暂存'
              status = 'processing'
            } else if (params.row.status === 5) {
              type = '正常'
              status = 'success'
            } else if (params.row.status === 6) {
              type = '冻结'
              status = 'error'
            }
            return h('span', {
            },
            [
              h('Badge', {
                props: {
                  status: status
                }
              }),
              h('p', {
                style: {
                  display: 'inline-block'
                }
              }, type)
            ]
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 170,
          render: (h, params) => {
            let name = ''
            let delType = 'Button'
            let editType = 'Button'
            let updateType = 'Button'
            if (user.roles[0].roleId === 1) {
              if (params.row.status === 6) {
                delType = ''
                name = '启用'
              } else if (params.row.status === 5) {
                delType = ''
                name = '冻结'
              } else {
                delType = 'Button'
                editType = ''
              }
            } else {
              delType = ''
              editType = ''
              updateType = ''
            }
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
              }, '详情'),
              // 编辑
              h(updateType, {
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
              // 状态编辑
              h(editType, {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delete(params.row)
                  }
                }
              }, name),
              h(delType, {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delTemporary(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      gridNameList: [],
      selectList: []
    }
  },
  computed: {
    ...mapState({
      list: state => state.customer.list,
      total: state => state.customer.total
    })
  },
  mounted () {
    let vue = this
    // 获取列表
    if ('pageNum' in vue.$route.query) {
      vue.pageNum = parseInt(vue.$route.query.pageNum)
    }
    vue.onSearch()
    // vue.$store.dispatch(actions.get.GRIDNAME_LIST, {pageNum:1,pageSize:10}).then(rep => {
    //   if (rep.code === 200) {
    //     vue.gridNameList = [ ...rep.data ]
    //   } else {
    //     vue.$Message.error(rep.message)
    //   }
    // })
  },
  methods: {
    changeGrid (gridCode, gridName) {
      if (gridCode == null) {
        this.downloadUrl = this.apiUrl + '/file/customer/0?gridName=全部网格&accountId=' + user.accountId
      } else {
        this.downloadUrl = this.apiUrl + '/file/customer/' + gridCode + '?gridName=' + gridName + '&accountId=' + user.accountId
      }
      this.currentGridCode = gridCode
      this.currentGridName = gridName
      this.onSearch()
    },
    goBack () {
      this.model.show = false
      this.$router.push('/customer')
    },
    // 添加客户先选择网格
    onAdd () {
      if (this.currentGridCode == null) {
        this.$Message.error('请先选择网格')
      } else {
        this.$router.push('/customer/InDetail?currentGridCode=' + this.currentGridCode + '&currentGridName=' + this.currentGridName)
      }
    },
    // 根据状态筛选角色所对应的客户
    changeStatus () {
      this.onSearch()
    },
    onSearch () {
      let status = this.search1.status
      let param
      if (status === '1') {
        param = {
          [this.search.type]: this.search.keyword
        }
        if (this.currentGridCode != null) {
          param = {
            [this.search.type]: this.search.keyword,
            gridCode: this.currentGridCode
          }
        }
      } else {
        param = {
          [this.search.type]: this.search.keyword,
          status: status
        }
        if (this.currentGridCode != null) {
          param = {
            [this.search.type]: this.search.keyword,
            gridCode: this.currentGridCode,
            status: status
          }
        }
      }
      this.fetchList(param)
    },
    fetchList (params = {}) {
      var vue = this
      return this.$store.dispatch(actions.get.CUSTOMER_LIST, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...params
      }).then(rep => {
        if (rep.code !== 200 && rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    },
    show (row) {
      this.$router.push('/customer/Detail?customerId=' + row.customerId)
    },
    edit (row) {
      this.$router.push('/customer/InDetail?customerId=' + row.customerId + '&status=' + row.status)
    },
    delTemporary (row) {
      this.delmodel.data = row
      this.delmodel.content = row.customerName
      this.delmodel.id = row.customerId
      this.delmodel.show = true
    },
    delTemporaryUser () {
      this.delmodel.loading = true
      setTimeout(() => {
        this.delmodel.loading = false
        this.delmodel.show = false
        this.$store.dispatch(actions.delete.TEMPORARY_PERSON, this.delmodel.id).then(rep => {
          if (rep.data.code !== 200) {
            this.$Message.error(rep.data.message)
          } else {
            this.$Message.success('删除成功')
            this.onSearch()
          }
        })
      }, 100)
    },
    delete (row) {
      this.model.data = row
      this.model.content = row.customerName
      this.model.id = row.customerId
      this.model.show = true
      this.model.status = row.status
      if (row.status === 6) {
        this.model.title = '请确认是否启用该客户'
        this.model.status = 5
      } else {
        this.model.title = '请确认是否冻结该客户'
        this.model.status = 6
      }
    },
    deleteUser () {
      this.model.loading = true
      setTimeout(() => {
        this.model.loading = false
        this.model.show = false
        this.$store.dispatch(actions.put.CUSTOMERS_PERSON, { id: this.model.id, status: this.model.status }).then(rep => {
          if (rep.data.code !== 200) {
            this.$Message.error(rep.data.message)
          } else {
            this.$Message.success('编辑状态修改成功')
            this.onSearch()
          }
        })
      }, 100)
    },
    onChangeNull () {
      if (this.search.keyword === '') {
        this.$router.replace({ query: { pageNum: this.pageNum } })
        this.onSearch()
      }
    },
    onPageSizeChange (pageSize1) {
      this.pageSize = pageSize1
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.onSearch()
    },
    changePage (num) {
      this.pageNum = num
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.onSearch()
    }
  }
}
</script>

<style lang="scss">
  @page {
    size:A4 portrait;
    margin: 0px 30px
  }
  .PageNext{
    page-break-after:always;
  }
  .customerpagetop {
    margin: 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #eee;
    .import {
      font-size: 14px;
    }
    button:hover, button.active {
      background: #1890FF;
      border-radius: 2px;
      color: #fff;
    }
  }
  .customerPage {
    margin: 16px 24px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    .searchdiv{
      height: 32px;
      margin-bottom: 16px;
      .search-input {
        width: 300px;
        float: right;
        margin-right: 10px
      }
      .search-span {
        float: right;
        margin-right: 10px
      }
      Button {
        float: left;
      }
    }
    .customerTable {
      margin-bottom: 20px;
      Button {
        color: #2d8cf0;
      }
    }
    .pagination {
      width: 100%;
      height: 60px;
      .text {
        float: left;
        line-height: 60px;
      }
      .pager {
        float: right;
      }
    }
  }
</style>
