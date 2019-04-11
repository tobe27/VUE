<template>
  <div>
    <div class="userBreadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem>用户管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="userPage">
      <div class="search">
        <Button class="createBtn" to="/users/detail" type="primary" icon="ios-add">新建</Button>
        <Button class="searchBtn" type="primary" icon="ios-search" @click="onSearch">查询</Button>
        <Input class="search-input" placeholder="请输入条件以进行查询" v-model="search.keyword" clearable
               @on-change="onChangeNull">
        <Select v-model="search.type" slot="prepend" style="width: 80px">
          <Option value="name">姓名</Option>
          <Option value="username">用户名</Option>
        </Select>
        </Input>
      </div>
      <!--表格-->
      <div class="table">
        <Table :columns="columns" :data="userList"></Table>
      </div>
      <!--表格底部-->
      <div class="pagination">
        <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
        <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts"
              :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
      </div>
    </div>
    <!--删除此条用户信息时弹窗-->
    <Modal v-model="model.show" width="320">
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
    </Modal>
    <!--修改用户状态时弹窗-->
    <Modal v-model="model1.show" width="320" footer-hide>

      <div style="text-align:center">
        <p style="color:#f60;text-align:center;margin: 20px 0">
          <Icon type="ios-information-circle"></Icon>
          <span>{{model1.title}}</span>
        </p>
        <p>{{ model1.content }}</p>
        <Button type="primary" size="large" long :loading="model1.loading" @click="setStatus">修改</Button>
      </div>
    </Modal>
    <!--查看用户详情-->
    <Modal width="50%" v-model="detail.show" :footer-hide="true" title="用户详情">
      <table class="detail-table">
        <tr>
          <td class="tdDtyle">用户名：</td>
          <td>{{ person.username}}</td>
          <td class="tdDtyle">用户ID：</td>
          <td>{{ person.id }}</td>

        </tr>
        <tr>
          <td class="tdDtyle">姓名：</td>
          <td>{{ person.name }}</td>
          <td class="tdDtyle">身份证号：</td>
          <td>{{ person.idNumber}}</td>

        </tr>
        <tr>
          <td class="tdDtyle">性别：</td>
          <td v-if="person.gender == 1">男</td>
          <td v-if="person.gender == 2">女</td>
          <td v-if="person.gender == null">&nbsp;&nbsp;&nbsp;</td>
          <td v-if="person.gender == ''">&nbsp;&nbsp;&nbsp;</td>
          <td class="tdDtyle">手机号：</td>
          <td>{{ person.contact }}</td>
        </tr>
        <tr>
          <td class="tdDtyle">邮箱：</td>
          <td>{{ person.email}}</td>
          <td class="tdDtyle">角色：</td>
          <td v-for="(roleList, index) in person.roles" :key="index">{{ roleList.roleCh }}</td>
        </tr>
        <tr>
          <td class="tdDtyle">法人名称：</td>
          <td>{{ person.corpName }}</td>
          <td class="tdDtyle">法人代码：</td>
          <td>{{ person.corpCode }}</td>
        </tr>
        <tr>
          <td class="tdDtyle">机构名称：</td>
          <td>{{ person.orgName }}</td>
          <td class="tdDtyle">机构代码：</td>
          <td>{{ person.orgCode }}</td>
        </tr>
        <tr>
          <!--<td class="tdDtyle">客户经理B的Id：</td>-->
          <!--<td>{{ person.abAccountId }}</td>-->
          <td class="tdDtyle">用户状态：</td>
          <td>{{ person.status == 0 ? '冻结' : '正常' }}</td>
        </tr>
      </table>
    </Modal>
    <!--修改密码-->
    <Modal v-model="modal1" title="修改密码" footer-hide>
      用户名：<Input :value="pwList.accountName" class="search-input" disabled></Input><br/><br/>
      新密码：<Input v-model="pwList.newPassword" type="password" placeholder="请输入新密码,2-20位" class="search-input"
                 clearable></Input><br/><br/>
      确认密码：<Input v-model="pwList.new1Password" type="password" placeholder="请确认密码,2-20位" class="search-input"
                  clearable></Input><br/><br/>
      <div style="width: 100%;text-align: right">
        <Button style="margin-left: auto;" type="primary" @click="ok">确认</Button>
        <Button style="margin-left: 20px" type="primary" @click="cancel">取消</Button>
      </div>

    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import actions from '@/store/action-types'
const user = sessionStorage.getItem('userObj')
export default {
  data () {
    return {
      pwList: {
        accountId: '',
        newPassword: '',
        new1Password: '',
        accountName: '',
        roleIds: '',
        phoneNumber: '',
        idNumber: '',
        realName: ''
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
      model1: {
        show: false,
        title: '你确定要修改此用户状态么？',
        accountId: '',
        content: '',
        status: '',
        loading: false
      },
      detail: {
        show: false
      },
      person: {},
      search: {
        type: 'name',
        keyword: ''
      },
      columns: [
        {
          title: '用户名',
          key: 'username',
          minWidth: 100,
          maxWidth: 140,
          fixed: 'left',
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          minWidth: 100,
          maxWidth: 200,
          align: 'center'
        },
        {
          title: '身份证',
          key: 'idNumber',
          minWidth: 160,
          maxWidth: 240,
          align: 'center'
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center',
          minWidth: 40,
          maxWidth: 100,
          render: (h, params) => {
            let listType = ['', '男', '女']
            return h('span', {
              props: {}
            }, listType[params.row.sex])
          }
        },
        {
          title: '手机号',
          key: 'contact',
          minWidth: 100,
          maxWidth: 180,
          align: 'center'
        },
        {
          title: '机构名称',
          key: 'orgName',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '角色',
          minWidth: 100,
          align: 'center',
          render: (h, params) => {
            let roleName = ''
            if (params.row.roles) {
              roleName = params.row.roles[0].roleCh
            }
            return h('span', {})
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          minWidth: 200,
          fixed: 'right',
          render: (h, params) => {
            let statusText = params.row.status === 0 ? '解冻' : '冻结'
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
                    this.modal1 = true
                    this.editPassWord(params.row)
                  }
                }
              }, '修改密码'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.model1.show = true
                    this.model1.status = params.row.status
                    this.model1.accountId = params.row.accountId
                  }
                }
              }, statusText)
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      userList: state => state.user.userList,
      total: state => state.user.total
    })
  },
  mounted () {
    // 获取列表
    if ('pageNum' in this.$route.query) {
      this.pageNum = parseInt(this.$route.query.pageNum)
    }
    this.fetchList()
  },
  methods: {
    fetchList (params = {}) {
      var vue = this
      console.log({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orgCode: JSON.parse(user).orgCode,
        ...params
      })
      return this.$store.dispatch(actions.get.RESIDENT_USER, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orgCode:  JSON.parse(user).orgCode,
        ...params
      }).then(rep => {
        console.log(rep)
        if (rep.code !== 200 && rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    },
    changePage (num) {
      this.pageNum = num
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.fetchList({
        [this.search.type]: this.search.keyword
      })
    },
    onChangeNull () {
      if (this.search.keyword === '') {
        this.$router.replace({ query: { pageNum: this.pageNum } })
        this.fetchList({
          [this.search.type]: this.search.keyword
        })
      }
    },
    onPageSizeChange (pageSize1) {
      this.pageSize = pageSize1
      this.pageNum = 1
      this.fetchList({
        [this.search.type]: this.search.keyword
      })
    },
    show (row) { // 1
      var vue = this
      this.$store.dispatch(actions.get.USER_PERSON, row.id).then(rep => {
        if (rep.code === 200) {
          console.log(rep)
          vue.person = { ...rep.data }
          vue.detail.show = true
        } else if (rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    },
    edit (row) {
      console.log(1234)
      this.$router.push('/users/detail?id=' + row.id)
    },
    delete (row) {
      this.model.data = row
      this.model.content = row.gridCode
      this.model.id = row.id
      this.model.show = true
    },
    deleteUser () {
      this.model.loading = true
      setTimeout(() => {
        this.model.loading = false
        this.model.show = false
        this.$store.dispatch(actions.delete.GRID_PERSON, this.model.id).then(rep => {
          if (rep.data.code !== 200) {
            this.$Message.error(rep.data.message)
          } else {
            this.$Message.success('删除成功')
          }
          this.onSearch()
        })
      }, 1000)
    },
    onSearch () {
      if (this.search.keyword.trim().length > 0) { // 把取到得查询条件处理一下 去掉两边得空格
        console.log({
          [this.search.type]: this.search.keyword.trim()
        })
        this.fetchList({
          [this.search.type]: this.search.keyword.trim()
        })
      }
    },
    editPassWord (row) {
      this.pwList.accountId = row.id// 拿到要修改密码得用户的用户ID：accountID
      this.pwList.accountName = row.name
      let roleIdList = ''
      for (let i in row.roles) {
        roleIdList += row.roles[i].id + ','
      }
      this.pwList.roleIds = roleIdList.substr(0, roleIdList.length - 1)
      this.pwList.phoneNumber = row.contact
      this.pwList.idNumber = row.idNumber
    },
    ok () {
      if (this.pwList.newPassword === '') {
        this.$Message.error('请输入密码!')
      } else if (this.pwList.new1Password === '') {
        this.$Message.error('请确认密码!')
      } else if (this.pwList.newPassword !== this.pwList.new1Password) {
        this.$Message.error('两次密码不一致!')
      } else {
        let payload = {
          id: this.pwList.accountId,
          password: this.pwList.newPassword
        }
        this.$store.dispatch(actions.put.USER_PERSON, payload).then(rep => {
          // 判断返回的消息，若返回得code为200 则认为操作成功 关闭信息窗口
          if (rep.data.code === 200) {
            this.$Message.success('密码修改成功！')
            this.modal1 = false
          } else { // 否则返回一个警告窗 并把错误信息显示
            this.$Message.error(rep.data.message)
          }
        })
      }
    },
    // 修改密码窗口取消按钮
    cancel () {
      this.modal1 = false
    },
    // 修改用户状态
    setStatus () {
      let payload = {
        id: this.model1.accountId,
        status: this.model1.status === 1 ? 0 : 1
      }
      this.$store.dispatch(actions.put.USER_PERSON, payload).then(rep => {
        // 判断返回的消息，若返回得code为200 则认为操作成功 关闭信息窗口
        if (rep.data.code === 200) {
          this.fetchList()
          this.$Message.success('用户状态修改成功！')
          this.model1.show = false
        } else { // 否则返回一个警告窗 并把错误信息显示
          this.$Message.error(rep.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .userBreadcrumb {
    height: 54px;
    background-color: #fff;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
    border-radius: 4px;
    border: 1px solid #eee;
  }

  .userPage {
    margin: 24px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    .search {
      height: 35px;
      margin-bottom: 10px;
      .createBtn {
        float: left;
      }
      .searchBtn {
        float: right;
        margin-left: 10px;
      }
      .search-input {
        float: right;
        width: 400px;
      }
    }
    .table {
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
    .ivu-table-column-center div {
      padding: 0;
    }
  }

  .detail-table {
    width: 100%;
    font-size: 14px;
    line-height: 32px;
    .tdDtyle {
      text-align: right;
    }
  }
</style>
