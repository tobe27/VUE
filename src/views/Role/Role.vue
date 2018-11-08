<template>
  <div>
    <div class="roleBreadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>角色管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
  <div class="rolePage">
    <div class="search">
      <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull">
        <Select v-model="search.type" slot="prepend" style="width: 80px">
          <Option value="roleName">角色名称</Option>
          <Option value="roleScope">角色作用域</Option>
        </Select>
      </Input>
      <Button type="primary" icon="ios-search" @click="onSearch" >查询</Button>
      <Button class="createrole" to="/user/role/detail" type="primary" style="margin-left: 10px" icon="ios-add">新建</Button>
    </div>
    <div class="table">
      <Table :columns="columns" :data="list"></Table>
    </div>
    <div class="pagination">
      <div class="text">共{{ total }}条记录 第 {{ pageNo }} / {{ Math.ceil(total / pageSize) }} 页</div>
      <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNo" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
    </div>
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
    <Modal width="45%" :styles="{top: '200px'}"
      v-model="detail.show"
      :footer-hide="true"
      title="角色详情">
      <table class="detail-table">
        <tr>
          <td width="15%">角色名称:</td>
          <td width="35%">{{ person.roleName }}</td>
        </tr>
        <tr>
          <td width="18%">角色作用域:</td>
          <td width="32%">{{ person.roleScope }}</td>
        </tr>
        <tr>
          <td>角色描述:</td>
          <td colspan="3">{{ person.description }}</td>
        </tr>
        <tr>
          <td>创建时间:</td>
          <td> {{this.detail.createdAt}} </td>
        </tr>
        <tr>
          <td>修改时间:</td>
          <td> {{this.detail.updatedAt}} </td>
        </tr>
      </table>
    </Modal>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import actions from '@/store/action-types'

import { UPLOAD_API_URL } from '@/config'

export default {
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      pageSizeOpts:[5, 10, 15, 20],
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
        show: false,
        createdAt:'',
        updatedAt:''
      },
      search: {
        type: 'roleName',
        keyword: ''
      },
      columns: [
        {
          title: '角色名称',
          align: 'center',
          key: 'roleName',
        },
        {
          title: '角色作用域',
          align: 'center',
          key: 'roleScope'
        },
        {
          title: '角色描述',
          align: 'center',
          key: 'description'
        },
        {
          title: '创建时间',
          key: 'createdAt',
          align: 'center',
          render: (h, params) => {
            var date = new Date()
            date.setTime(params.row.createdAt)
            var month=date.getMonth() + 1
            var day = date.getDate()
            var dateType = `${date.getFullYear()}${month >= 10 ? month : '0' + month}${day >= 10 ? day : '0' + day}`
            return h('span', {
                props: {
                  },
              },dateType)
          }
        },
        {
          title: '修改时间',
          key: 'updatedAt',
          align: 'center',
          render: (h, params) => {
            var date = new Date()
            date.setTime(params.row.updatedAt)
            var month=date.getMonth() + 1
            var day = date.getDate()
            var dateType = `${date.getFullYear()}${month >= 10 ? month : '0' + month}${day >= 10 ? day : '0' + day}`
            return h('span', {
                props: {
                  },
              },dateType)
          }
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
      list: state => state.role.rolelist,
      person: state => state.role.roleperson,
      total: state => state.role.roletotal
    })
  },
  mounted () {
    // 获取列表
    if ( 'pageNo' in this.$route.query ) {
      this.pageNo = parseInt(this.$route.query.pageNo)
    }
    this.fetchList()
  },
  methods: {
    fetchList (params = {}) {
        var vue = this
      return this.$store.dispatch(actions.get.ROLE_LIST, {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...params
      }).then( rep => {
          if ( rep.code!=200 && rep.code!=204 ) {
              vue.$Message.error(rep.message)
          }
      })
    },
    changePage (num) {
      this.pageNo = num
      this.$router.replace({query: { pageNo: this.pageNo }})
      this.onSearch()
    },
    onChangeNull(){
      if( "" == this.search.keyword ){
          this.$router.replace({query: { pageNo: this.pageNo }})
          this.onSearch()
      }
    },
    onPageSizeChange(pageSize1){
        this.pageSize=pageSize1
        this.$router.replace({query: { pageNo: this.pageNo }})
        this.onSearch()
      },
    show (row) {
        var vue = this
      this.$store.dispatch(actions.get.ROLE_PERSON, row.roleId).then( rep => {
          if ( rep.code == 200 ){
              this.detail.show = true
              var createdDate = new Date()
              createdDate.setTime(row.createdAt)
              var createdMonth=createdDate.getMonth() + 1
              var createdDay = createdDate.getDate()
              var createdDateType = `${createdDate.getFullYear()}${createdMonth >= 10 ? createdMonth : '0' + createdMonth}${createdDay >= 10 ? createdDay : '0' + createdDay}`
              var updatedAt = new Date()
              updatedAt.setTime(row.updatedAt)
              var updatedAtMonth=updatedAt.getMonth() + 1
              var updatedAtDay = updatedAt.getDate()
              var updatedAtDateType = `${updatedAt.getFullYear()}${updatedAtMonth >= 10 ? updatedAtMonth : '0' + updatedAtMonth}${updatedAtDay >= 10 ? updatedAtDay : '0' + updatedAtDay}`
              this.detail.createdAt=createdDateType
              this.detail.updatedAt=updatedAtDateType
          } else if ( rep.code!=204 ){
              vue.$Message.error(rep.message)
          }
      })
    },
    edit (row) {
      sessionStorage.setItem("plist",JSON.stringify(row.permissionList))
      this.$router.push('/user/role/detail?roleId=' + row.roleId)
    },
    delete (row) {
      this.model.data = row
      this.model.content = row.roleName
      this.model.id = row.roleId
      this.model.show = true
    },
    deleteUser () {
      this.model.loading = true
      setTimeout(() => {
        this.model.loading = false
        this.model.show = false
        this.$store.dispatch(actions.delete.ROLE_PERSON, this.model.id).then(rep => {
          if ( rep.data.code!=200 ) {
              this.$Message.error(rep.data.message)
          } else {
              this.$Message.success('删除成功')
          }
          this.onSearch()
        })
      }, 2000)
    },
    onSearch () {
        this.fetchList({
            [this.search.type]: this.search.keyword
        })
    },
    goBack () {
      this.model.show=false
    }
  }
}
</script>

<style lang="scss">
  .roleBreadcrumb {
    height: 54px;
    background-color: #fff;
    font-size: 14px;
    font-family:PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
    border-radius: 4px;
    border: 1px solid #eee;
  }
.rolePage {
  margin: 24px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  .search {
    height: 32px;
    margin-bottom: 20px;
    .search-input {
      float: left;
      width: 400px;
    }
    Button {
      float: left;
      margin-left: 10px;
    }
  }
  .button-group {
    margin-top: 20px;
    margin-bottom: 20px;
    .import {
      margin-left: 10px;
    }
  }
  .table {
    margin-top: 15px;
    margin-bottom: 20px;
    Button {
      color: #2d8cf0;
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
