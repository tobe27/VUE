<template>
  <div>
    <div class="residentpagetop">
      <div style="font-size:14px;font-family:PingFangSC-Regular;">
        <span>请选择网格：</span>
        <Button
          type="text"
          style="font-size:14px;padding:0 5px;height:30px;border-radius:4px"
          :class="currentGridCode==null?'active':''"
          @click="changeGrid(null)"
        >全部</Button>
        <Button
          type="text"
          style="font-size:14px;padding:0 5px;margin-left:10px;height:30px;border-radius:4px;"
          v-for="(h, index) in gridNameList"
          :key="index"
          :class="currentGridCode==h.gridCode?'active':''"
          @click="changeGrid(h.gridCode,h.gridName)"
        >{{ h.gridName }}</Button>
      </div>
      <Divider v-if="roleId ==1 " style="margin: 14px 0;"/>
      <div v-if="roleId ==1 " class="import">批量导入:
        <Button class="import" icon="ios-download-outline" @click="onImport">导入户籍信息</Button>
      </div>
    </div>
    <div class="residentPage">
      <!--户籍管理页面-->
      <div class="residentSearch">
        <Button v-if="roleId ==1 " class="createBtn" @click="onAdd" type="primary" icon="ios-add">新建</Button>
        <Button class="searchBtn" type="primary" icon="ios-search" @click="beforeSearch">查询</Button>
        <Input class="search-input" v-model="search2.keyword" clearable @on-change="onChangeNull">
          <Select v-model="search2.type" slot="prepend" style="width: 80px">
            <Option value="householdId">户号</Option>
            <Option value="residentName">姓名</Option>
            <Option value="idNumber">证件号</Option>
          </Select>
        </Input>
      </div>
      <div class="table">
        <Table :columns="columns" :data="list"></Table>
      </div>
      <div class="pagination">
        <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
        <Page
          show-sizer
          class="pager"
          @on-page-size-change="onPageSizeChange"
          :page-size-opts="pageSizeOpts"
          :current="pageNum"
          :page-size="pageSize"
          :total="total"
          @on-change="changePage"
          show-elevator
        />
      </div>
      <Modal
        v-model="model.show"
        footer-hide
        width="320"
        :styles="{top: '200px'}"
        :closable="false"
      >
        <p style="padding: 10px;font-size: 16px;">
          <Icon type="ios-information-circle" style="color:#f60;padding-right: 10px;" size="40px"></Icon>
          <span>你确定要删除 {{ model.content }} 的户籍信息么？</span>
        </p>
        <!--<div style="font-size: 14px;padding-left: 40px">
        <p>{{ model.content }}</p>
        </div>-->
        <div style="text-align: right">
          <Button size="large" @click="goBack" style="margin: 5px">取消</Button>
          <Button type="primary" size="large" :loading="model.loading" @click="deleteUser">确定</Button>
        </div>
      </Modal>
      <Modal
        v-model="showImportModal"
        title="批量导入"
        width="400px"
        :footer-hide="true"
        :styles="{top: '200px'}"
      >
        <Upload
          ref="upload"
          multiple
          type="drag"
          :headers="headers"
          :data="uploadObj"
          :action="uploadUrl+'/file/resident'"
          :on-success="onUpload"
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或将文件拖拽到这里上传</p>
          </div>
        </Upload>

        <p>注：导入用户请先下载
          <a :href="uploadUrl+'/template/户籍导入模板.xls'">模板</a>，按要求填写、上传进行导入。
        </p>
      </Modal>
      <Modal
        width="45%"
        :styles="{top: '200px' }"
        v-model="detail.show"
        :footer-hide="true"
        title="户籍详情"
      >
        <table class="detail-table">
          <tr>
            <td width="15%">姓名：</td>
            <td width="35%">{{ person.residentName }}</td>
            <td width="18%">民族：</td>
            <td width="32%">{{ person.nation }}</td>
          </tr>
          <tr>
            <td>性别：</td>
            <td>{{ person.sex }}</td>
            <td>出生日期：</td>
            <td>{{ person.birthdate }}</td>
          </tr>
          <tr>
            <td>联系方式：</td>
            <td>{{ person.contact }}</td>
            <td>证件号码：</td>
            <td>{{ person.idNumber }}</td>
          </tr>
          <tr>
            <td>户别：</td>
            <td>{{ person.householdType }}</td>
            <td>户号：</td>
            <td>{{ person.householdId }}</td>
          </tr>
          <tr>
            <td>户主关系：</td>
            <td>{{ person.relationship }}</td>
            <td>纳入名单库：</td>
            <td>{{ person.isInList }}</td>
          </tr>
          <tr>
            <td>网格号：</td>
            <td>{{ person.gridCode }}</td>
            <td>网格名称：</td>
            <td>{{ person.gridName }}</td>
          </tr>
          <tr>
            <td>地址：</td>
            <td>{{ person.address }}</td>
            <td>备注：</td>
            <td>{{ person.remark }}</td>
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

const user = JSON.parse(sessionStorage.getItem('userObj'))

export default {
  name: 'resident',
  data () {
    return {
      roleId: user.roles[0].roleId,
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts: [5, 10, 15, 20],
      showImportModal: false,
      currentGridCode: null,
      currentGridName: null,
      uploadUrl: UPLOAD_API_URL,
      gridNameList: [],
      uploadObj: {
        gridCode: null
      },
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
      person: {},
      search2: {
        type: 'residentName',
        keyword: ''
      },
      columns: [
        {
          title: '姓名',
          align: 'center',
          fixed: 'left',
          key: 'residentName',
          minWidth: 99
        },
        {
          title: '性别',
          align: 'center',
          key: 'sex',
          minWidth: 70
        },
        {
          title: '民族',
          align: 'center',
          key: 'nation',
          minWidth: 100
        },
        {
          title: '证件号',
          align: 'center',
          key: 'idNumber',
          minWidth: 186
        },
        /* {
          title: '出生日期',
          align: 'center',
          key: 'birthdate',
          minWidth: 100
        }, */
        {
          title: '联系方式',
          align: 'center',
          key: 'contact',
          minWidth: 130
        },
        {
          title: '户号',
          align: 'center',
          key: 'householdId',
          minWidth: 110
        },
        {
          title: '网格名称',
          align: 'center',
          key: 'gridName',
          minWidth: 150
        },
        {
          title: '纳入名单库',
          key: 'isInList',
          align: 'center',
          minWidth: 115
        },
        {
          title: '地址',
          key: 'address',
          tooltip: 'true',
          align: 'center',
          minWidth: 90
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          align: 'center',
          minWidth: 180,
          render: (h, params) => {
            let editType = 'Button'
            let delType = 'Button'
            if (user.roles[0].roleId === 1) {
              editType = 'Button'
              delType = 'Button'
            } else {
              editType = ''
              delType = ''
            }
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.show(params.row)
                    }
                  }
                },
                '查看'
              ),
              h(
                editType,
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
                    }
                  }
                },
                '编辑'
              ),
              h(
                delType,
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delete(params.row)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      list: state => state.resident.list,
      total: state => state.resident.total
    })
  },
  mounted () {
    console.log(12345)
    // 获取列表
    if ('pageNum' in this.$route.query) {
      this.pageNum = parseInt(this.$route.query.pageNum)
    }
    this.onSearch()
    this.$store.dispatch(actions.get.GRIDNAME_LIST).then(rep => {
      if (rep.code === 200) {
        this.gridNameList = [...rep.data]
      } else {
        this.$Message.error(rep.message)
      }
    })
  },
  methods: {
    fetchList (params = {}) {
      var vue = this
      return this.$store
        .dispatch(actions.get.RESIDENT_LIST, {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...params
        })
        .then(rep => {
          if (rep.code !== 200 && rep.code !== 204) {
            vue.$Message.error(rep.message)
          }
        })
    },
    changePage (num) {
      this.pageNum = num
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.onSearch()
    },
    onChangeNull () {
      if (this.search2.keyword === '') {
        this.$router.replace({ query: { pageNum: this.pageNum } })
        this.onSearch()
      }
    },
    onPageSizeChange (pageSize1) {
      this.pageSize = pageSize1
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.onSearch()
    },
    show (row) {
      this.$store
        .dispatch(actions.get.RESIDENT_PERSON, row.residentId)
        .then(rep => {
          if (rep.code === 200) {
            this.detail.show = true
            this.person = { ...rep.data }
          } else {
            this.$Message.error(rep.message)
          }
        })
    },
    edit (row) {
      this.$router.push('/resident/detail?residentId=' + row.residentId)
    },
    delete (row) {
      this.model.data = row
      this.model.content = row.residentName
      this.model.id = row.residentId
      this.model.show = true
    },
    deleteUser () {
      this.model.loading = true
      setTimeout(() => {
        this.model.loading = false
        this.model.show = false
        this.$store
          .dispatch(actions.delete.RESIDENT_PERSON, this.model.id)
          .then(rep => {
            if (rep.data.code === 200) {
              this.$Message.success('删除成功')
              this.onSearch()
            } else {
              this.$Message.error(rep.message)
            }
          })
      }, 1000)
    },
    onSearch () {
      var param = {
        [this.search2.type]: this.search2.keyword
      }
      if (this.currentGridCode != null) {
        param = {
          [this.search2.type]: this.search2.keyword,
          gridCode: this.currentGridCode
        }
      }
      this.fetchList(param)
    },
    beforeSearch () {
      this.pageNum = 1
      this.$router.replace({ query: { pageNum: 1 } })
      this.onSearch()
    },
    onImport () {
      if (this.currentGridCode == null) {
        this.$Message.error('请先选择网格')
      } else {
        this.$refs.upload.clearFiles()
        this.uploadObj.gridCode = this.currentGridCode
        this.uploadObj.realName = user.realName
        this.uploadObj.orgName = user.orgName
        this.showImportModal = true
      }
    },
    onAdd () {
      if (this.currentGridCode == null) {
        this.$Message.error('请先选择网格')
      } else {
        this.$router.push(
          '/resident/detail?gridCode=' +
            this.currentGridCode +
            '&gridName=' +
            this.currentGridName
        )
      }
    },
    onUpload (data) {
      if (data.code === 200) {
        this.showImportModal = false
        this.onSearch()
        this.$Message.success(
          '有' +
            data.data.successCount +
            '条记录导入成功,有' +
            data.data.failCount +
            '条记录导入失败！'
        )
      } else {
        this.$Message.error(data.message)
      }
    },
    handleError (response, file, fileList) {
      this.$Message.error('批量导入失败，请重新上传')
    },
    formatError () {
      this.$Message.error('批量导入失败，请选择Excel文件上传')
    },
    goBack () {
      this.model.show = false
    },
    // 页面头部网格选择与查询
    changeGrid (gridCode, gridName) {
      this.currentGridCode = gridCode
      this.currentGridName = gridName
      this.onSearch()
    }
  }
}
</script>

<style lang="scss">
.residentpagetop {
  margin: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  .import {
    font-size: 14px;
  }
  button:hover,
  button.active {
    background: #1890ff;
    border-radius: 2px;
    color: #fff;
  }
}
.residentPage {
  margin: 24px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  .residentSearch {
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
  .residentButton-group {
    margin-bottom: 20px;
    .import {
      margin-left: 10px;
    }
  }
  .table {
    margin-bottom: 20px;
    table {
      font-size: 14px;
    }
    button {
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
.detail-table {
  width: 100%;
  font-size: 14px;
  line-height: 38px;
}
</style>
