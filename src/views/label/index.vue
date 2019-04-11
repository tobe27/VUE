<template>
  <!--配置管理下的标签管理-->
  <div>
    <div class="labelBreadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>配置管理</BreadcrumbItem>
        <BreadcrumbItem>标签管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="labelPage">
      <div class="button-group">
        <Button class="create" to="/label/detail" type="primary" icon="ios-add">新建</Button>
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
          <span>该标签可能存在关联客户，请谨慎删除!</span>
        </p>
        <div style="font-size: 14px;padding-left: 40px">
          <p>{{ model.content }}</p>
        </div>
        <div style="text-align: right">
          <Button size="large" @click="goBack" style="margin: 5px">取消</Button>
          <Button type="primary" size="large" :loading="model.loading" @click="deleteUser">确定</Button>
        </div>
      </Modal>
      <Modal
        width="35%"
        :styles="{top: '200px' }"
        v-model="detail.show"
        :footer-hide="true"
        title="标签详情"
      >
        <table class="detail-table">
          <tr>
            <td>标签名称:</td>
            <td>{{ person.name }}</td>
            <td>标签描述:</td>
            <td width="40%">{{ person.description }}</td>
          </tr>
          <tr>
            <td>标签类型:</td>
            <td>{{ person.type==1?'黑白灰名单':(person.type==2?'农户/非农户':(person.type==3?'企业':(person.type==4?'产品':(person.type==5?'画像':(person.type==6?'星级':'年龄'))))) }}</td>
            <td>备注:</td>
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

export default {
  data () {
    return {
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
      search: {},
      columns: [
        {
          title: '标签名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '标签描述',
          key: 'description',
          align: 'center'
        },
        {
          title: '标签类型',
          key: 'type',
          align: 'center',
          render: (h, params) => {
            let types = [
              '黑白灰名单',
              '农户/非农户',
              '企业',
              '产品',
              '画像',
              '星级',
              '年龄',
              '其他'
            ]
            let type = types[params.row.type - 1]
            return h(
              'span',
              {
                props: {}
              },
              type
            )
          }
        },
        {
          title: '备注',
          key: 'remark',
          tooltip: 'true',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 200,
          render: (h, params) => {
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
                'Button',
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
                'Button',
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
      list: state => state.tag.taglist,
      person: state => state.tag.tagperson,
      total: state => state.tag.tagtotal
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
        ...params
      })
      return this.$store
        .dispatch(actions.get.TAG_LIST, {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...params
        })
        .then(rep => {
          if (rep.code !== 200) {
            if (rep.code !== 204) {
              vue.$Message.error(rep.message)
            }
          }
        })
    },
    changePage (num) {
      this.pageNum = num
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.fetchList()
    },

    onChangeNull () {
      if (this.search.keyword === '') {
        this.$router.replace({ query: { pageNum: this.pageNum } })
        this.fetchList()
      }
    },
    onPageSizeChange (pageSize1) {
      this.pageSize = pageSize1
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.fetchList()
    },
    show (row) {
      console.log(row)
      var vue = this
      this.$store.dispatch(actions.get.TAG_PERSON, row.id).then(rep => {
        if (rep.code !== 200) {
          if (rep.code !== 204) {
            vue.$Message.error(rep.message)
          }
        }
      })
      this.detail.show = true
    },
    edit (row) {
      this.$router.push('/label/detail?tagId=' + row.id)
    },
    delete (row) {
      this.model.data = row
      this.model.content = row.name
      this.model.id = row.id
      this.model.show = true
    },
    deleteUser () {
      this.model.loading = true
      setTimeout(() => {
        this.model.loading = false
        this.model.show = false
        var vue = this
        this.$store
          .dispatch(actions.delete.TAG_PERSON, this.model.data.id)
          .then(rep => {
            if (rep.data.code === 200) {
              vue.$Message.success('删除成功')
              vue.fetchList()
            } else if (rep.data.code !== 204) {
              vue.$Message.error(rep.data.message)
            }
          })
      }, 1000)
    },
    onSearch () {
      // if(Number != typeof this.search.keyword){
      //     console.log(typeof this.search.keyword)
      // }else {
      this.fetchList({
        [this.search.type]: this.search.keyword
      })
      // }
    },
    onImport () {
      this.showImportModal = true
    },
    onUpload () {
      this.showImportModal = false
      this.fetchList()
    },
    goBack () {
      this.model.show = false
    }
  }
}
</script>

<style lang="scss">
.labelBreadcrumb {
  height: 54px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  line-height: 54px;
  padding-left: 20px;
}
.labelPage {
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
    button {
      float: left;
      margin-left: 10px;
      font-size: 14px;
    }
  }
  .button-group {
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
