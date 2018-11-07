<template>
  <div>
    <div class="authorityBreadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>权限管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
  <div class="authorityPage">
    <div class="search">
      权限名称：<i-input v-model="search.permissionName" placeholder="请输入需要查询的权限名称：" style="width: 270px">权限名称</i-input>
      <i-button type="primary" icon="ios-search" style="float:none" @click="onSearch">搜索</i-button>
      <i-button  @click="addAuthority" type="primary" style="float:none" icon="ios-add">新建</i-button>
    </div>
    <div class="table">
      <Table :columns="columns" :data="list"></Table>
    </div>
    <div class="pagination">
      <div class="text">共{{ total }}条记录 第 {{ pageNo }} / {{ Math.ceil(total / pageSize) }} 页</div>
      <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNo" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
    </div>
    <Modal width="35%" v-model="add.show" :footer-hide="true" title="权限管理">
        <div class="form">
          <Form ref="form" :model="form" :rules="ruleValidate" :label-width="120">
            <Row v-show="add.type==1">
              <Col span="20">
                <FormItem label="权限编号" prop="permissionId">
                  <Input v-model="form.permissionId" disabled></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="20">
                <FormItem label="系统编码" prop="sysCode">
                  <Input v-model="form.sysCode" placeholder="请输入系统编码:"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="20">
                <FormItem label="权限名称" prop="permissionName">
                  <Input v-model="form.permissionName" placeholder="请输入权限名称:"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="20">
                <FormItem label="权限类别" prop="permissionType">
                  <Input v-model="form.permissionType" placeholder="请输入权限类别:"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="20">
                <FormItem label="URL" prop="permissionUrl">
                  <Input v-model="form.permissionUrl" placeholder="请输入URL:"></Input>
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
    <!--<Modal
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
    <Modal width="35%" :styles="{top: '200px'}"
      v-model="detail.show"
      :footer-hide="true"
      title="权限详情">
      <table class="detail-table">
        <tr>
          <td width="15%">权限编号:</td>
          <td width="35%">{{ person.permissionId }}</td>
        </tr>
        <tr>
          <td width="18%">系统编码:</td>
          <td width="32%">{{ person.sysCode }}</td>
        </tr>
        <tr>
          <td>权限名称:</td>
          <td>{{ person.permissionName }}</td>
        </tr>
        <tr>
          <td>权限类别:</td>
          <td>{{ person.permissionType }}</td>
        </tr>
        <tr>
          <td>创建时间:</td>
          <td> {{this.detail.createdAt}} </td>
        </tr>
        <tr>
          <td>修改时间:</td>
          <td> {{this.detail.updatedAt}} </td>
        </tr>
        <tr>
          <td>URL:</td>
          <td>{{ person.permissionUrl }}</td>
        </tr>
      </table>
    </Modal>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import actions from '@/store/action-types'

export default {
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      pageSizeOpts:[5, 10, 15, 20],
      showImportModal: false,
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
      form: {

      },
      add: {
        show: false,
        type:0
      },
      ruleValidate: {
        sysCode: [
          { required: true, message: '系统编码不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '系统编码最大长度为20位', trigger: 'blur' }
        ],
        permissionName: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '权限名称最大长度为20位', trigger: 'blur' }
        ],
        permissionType: [
          { required: true, message: '权限类别不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '权限类别最大长度为20位', trigger: 'blur' }
        ],
         permissionUrl: [
          { required: true, message: 'URL不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: 'URL最大长度为50位', trigger: 'blur' }
        ],
      },
      search: {
        permissionName: ''
      },
      columns: [
        /*{
          title: '权限编号',
          align: 'center',
          key: 'permissionId'
        },*/
        {
          title: '系统编码',
          align: 'center',
          key: 'sysCode'
        },
        {
          title: '权限名称',
          align: 'center',
          key: 'permissionName'
        },
        {
          title: '权限类别',
          align: 'center',
          key: 'permissionType'
        },
        {
          title: 'URL',
          align: 'center',
          tooltip: 'true',
          minWight: 150,
          key: 'permissionUrl'
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
      list: state => state.authority.list,
      person: state => state.authority.person,
      total: state => state.authority.total
    })
  },
  mounted () {
    // 获取列表
    if ('pageNo' in this.$route.query) {
      this.pageNo = parseInt(this.$route.query.pageNo)
    }
    this.authorityList()
  },
  methods: {
    authorityList (params = {}) {
      return this.$store.dispatch(actions.get.AUTHORITY_LIST, {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        ...params
      }).then(rep => {
          if (rep.code!=200) {
              this.$Message.error(rep.message)
          }
      })
    },
    changePage (num) {
      this.pageNo = num
      this.onSearch()
    },
    onPageSizeChange(pageSize1){
        this.pageSize=pageSize1
        this.onSearch()
    },
    onSearch () {
      this.authorityList({
        permissionName: this.search.permissionName
      })
    },
    onChangeNull(){
        if("" == this.search.keyword){
            this.onSearch()
        }
    },
    show (row) {
      this.$store.dispatch(actions.get.AUTHORITY_PERSON, row.permissionId).then(rep => {
          if (rep.code!=200) {
              this.$Message.error(rep.message)
          }
      })
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
    },
    delete (row) {
      this.model.data = row
      this.model.content = row.permissionName
      this.model.id = row.permissionId
      this.model.show = true
    },
    deleteUser () {
      this.model.loading = true
      setTimeout(() => {
        this.model.loading = false
        this.model.show = false
        this.$store.dispatch(actions.delete.AUTHORITY_PERSON, this.model.id).then(rep => {
          if (rep.data.code!=200) {
            this.$Message.error(rep.data.message)
          }else{
            this.$Message.success('删除成功')
          }
          this.onSearch()
        })
      }, 1000)
    },
    addAuthority () {
      this.form={}
      this.$refs['form'].resetFields()
      this.add.show=true
      this.add.type=0
    },
    edit (row) {
      this.form={}
      this.$refs['form'].resetFields()
      this.add.show=true
      this.add.type=1
      this.form.permissionId=row.permissionId
      this.form.sysCode=row.sysCode
      this.form.permissionName=row.permissionName
      this.form.permissionType=row.permissionType
      this.form.permissionUrl=row.permissionUrl
      this.form.createdAt=row.createdAt
      this.form.updatedAt=row.updatedAt
    },
    handleSubmit (name) {
      const payload = { ...this[name] }
        this.$refs[name].validate((valid) => {
          if(valid){
              if (this.add.type==1) {
                  this.$store.dispatch(actions.put.AUTHORITY_PERSON, payload).then(rep => {
                      if (rep.data.code!=200) {
                          this.$Message.error(rep.data.message)
                      }else{
                          this.$Message.success('修改成功')
                          this.add.show=false
                          this.onSearch()
                      }
                  })
              } else {
                  this.$store.dispatch(actions.post.AUTHORITY_PERSON, payload).then(rep => {
                      if (rep.data.code!=200) {
                          this.$Message.error(rep.data.message)
                      }else{
                          this.$Message.success('提交成功')
                          this.add.show=false
                          this.onSearch()
                      }
                  })
              }
          }else{
              this.$Message.error('表单验证错误')
          }
        })
    },
    goBack (){
      this.add.show=false
      this.model.show=false
    }
  }
}
</script>

<style lang="scss">
  .authorityBreadcrumb {
    height: 54px;
    background-color: #fff;
    font-size: 14px;
    font-family:PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
    border-radius: 4px;
    border: 1px solid #eee;
  }
.authorityPage {
  margin: 24px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  .create {
      margin-top: 10px;
    }
  .search {
    height: 32px;
    margin-bottom: 20px;
    .create {
      margin-top: 20px;
      margin-left: 10px;
    }
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
    margin-bottom: 20px;
    margin-top: 15px;
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
  font-size: 16px;
  line-height: 32px;
}
</style>
