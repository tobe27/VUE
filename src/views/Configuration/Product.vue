<template>
    <!--配置管理下的产品管理-->
    <div>
        <div class="productBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>配置管理</BreadcrumbItem>
                <BreadcrumbItem>产品管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
    <div class="productPage">
        <div class="search">
          产品状态：
          <Select v-model="search.state" style="width:150px;">
            <Option value="1" >开启</Option>
            <Option value="0" >关闭</Option>
            <Option value="qb" >全部</Option>
          </Select>
          <i-button type="primary" icon="ios-search" style="float:none" @click="onSearch">搜索</i-button>
        </div>
        <div class="button-group">
          <Button class="create" @click="addProduct" type="primary" icon="ios-add">新建</Button>
        </div>
        <div class="table">
            <Table :columns="columns" :data="list"></Table>
        </div>

        <div class="pagination">
            <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
            <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
        </div>

         <Modal width="35%" v-model="detail.show" :footer-hide="true" title="银行产品">
           <div class="form">
          <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
            <Row>
              <Col span="25">
                <FormItem label="产品名称" prop="name">
                  <Input v-model="form.name" placeholder="请输入姓名"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row v-show="detail.type==1">
              <Col span="25">
                <FormItem label="产品编码" prop="name">
                  <Input v-model="form.code" disabled></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="25">
                <FormItem label="产品状态" prop="state">
                  <RadioGroup v-model="form.state">
                    <Radio label="0">关闭</Radio>
                    <Radio label="1">开启</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="25">
                  <FormItem label="产品利率" prop="rate">
                      <Input v-model="form.rate" placeholder="请输入产品利率，百分之几（数字）"></Input>
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="25">
                  <FormItem label="产品说明" prop="explain">
                      <Input v-model="form.explain" placeholder="请输入产品说明"></Input>
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
    </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import actions from '@/store/action-types'
export default {
  data () {
    return {
      search: {
        state: '1'
      },
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts: [5, 10, 15, 20],
      showImportModal: false,
      columns: [
        {
          title: '产品名称',
          key: 'name',
          align: 'center',
          width: 120,
        },
        {
          title: '产品编码',
          key: 'code',
          width: 120,
          align: 'center'
        },
        {
          title: '产品利率',
          key: 'rate',
          width: 165,
          align: 'center',
          render: (h, params) => {
              let texts = ''
              if(params.row.rate){
                  texts = params.row.rate + '%'
              }
              return h('span', {
                  props: {
                  },
              },texts)
          }
        },
        {
          title: '产品说明',
          key: 'explain',
          align: 'center',
          tooltip:true
        },
        {
          title: '产品状态',
          key: 'state',
          align: 'center',
          render: (h, params) => {
            let texts = ''
            if ( params.row.state == 0 ) {
                texts = '关闭'
            } else if ( params.row.state == 1 ) {
                texts = '开启'
            }
            return h('span', {
                props: {
                  },
              },texts)
          }
        },
        {
          title: '创建时间',
          key: 'createdAt',
          align: 'center',
          render: (h, params) => {
            let date = new Date()
            date.setTime( params.row.createdAt )
            let month = date.getMonth() + 1
            let day = date.getDate()
            let dateType = `${date.getFullYear()}${month >= 10 ? month : '0' + month}${day >= 10 ? day : '0' + day}`
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
            let date = new Date()
            date.setTime( params.row.updatedAt )
            let month = date.getMonth() + 1
            let day = date.getDate()
            let dateType = `${date.getFullYear()}${month >= 10 ? month : '0' + month}${day >= 10 ? day : '0' + day}`
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
          width: 100,
          render: (h, params) => {
            return h('div', [
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
            ])
          }
        }
      ],
      form: {

      },
      detail:{
        show:false,
        type:0
      },
      ruleValidate: {
        name: [
          { required: true, message: '产品名称不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '产品名称最大长度为20位', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '产品状态不能为空', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: '产品利率不能为空', trigger: 'blur' },
          { type: 'string', pattern:'(^[1-9]([0-9]{1})?(\\.\\d{1,2})?$)|(^0$)|(^\\d\\.\\d{1,2}$)', message: '产品利率为保留两位小数且整数部分最长2位的数字,', trigger: 'blur' }
        ],
        explain: [
          { required: false, message: '产品说明不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    ...mapState({
      list: state => state.product.list,
      person: state => state.product.person,
      total: state => state.product.total
    })
  },
  mounted () {
    // 获取列表
    if ( 'pageNum' in this.$route.query ) {
      this.pageNum = parseInt(this.$route.query.pageNum)
    }
    this.productList(this.search)
  },
  methods: {
    productList (params = {}) {
      let vue = this
      return this.$store.dispatch(actions.get.PRODUCT_LIST, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...params
      }).then(rep => {
          if ( rep.code != 200 && rep.code != 204 ){
              vue.$Message.error(rep.message)
          }
      })
    },
    changePage (num) {
      this.pageNum = num
      this.productList({
        state: this.search.state
      })
    },
    onPageSizeChange(pageSize1){
        this.pageSize=pageSize1
        this.onSearch()
    },
    addProduct () {
      this.detail.show=true
      this.detail.type=0
      this.$refs['form'].resetFields()
      this.form={
        state:'1'
      }
    },
    edit (row) {
      this.$refs['form'].resetFields()
      this.detail.show = true
      this.detail.type = 1
      this.form.id = row.id
      this.form.name = row.name
      this.form.code = row.code
      this.form.state = row.state + ''
      this.form.rate = row.rate == null ? '' : ( row.rate + '' )
      this.form.explain = row.explain
    },
    handleSubmit (name) {
      const payload = { ...this[name] }
      let vue = this
      this.$refs[name].validate((valid) => {
        if ( valid ) {
            if ( vue.detail.type == 1 ) {
                vue.$store.dispatch(actions.put.PRODUCT_PERSON, payload).then((rep) => {
                    if ( rep.data.code == 200 ){
                        vue.detail.show = false
                        vue.onSearch()
                    } else {
                        vue.$Message.error(rep.data.message)
                    }
                })
            } else {
                vue.$store.dispatch(actions.post.PRODUCT_PERSON, payload).then((rep) => {
                    if ( rep.data.code == 200 ){
                        vue.detail.show = false
                        vue.onSearch()
                    } else {
                        vue.$Message.error(rep.data.message)
                    }
                })
            }
        } else {
            this.$Message.error('表单验证错误')
        }
      })
    },
    goBack () {
      this.detail.show = false
    },
    onSearch () {
      this.productList({
        state: this.search.state
      })
    }
  }
}
</script>

<style lang="scss">
    .productBreadcrumb {
        height: 54px;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #eee;
        font-size: 14px;
        font-family:PingFangSC-Regular;
        line-height: 54px;
        padding-left: 20px;
    }
.productPage {
  margin: 24px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  .search {
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
  .button-group {
    margin-bottom: 20px;
    .import {
      margin-left: 10px;
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
.form {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  .ivu-form-item-label {
    font-size: 16px;
  }
  .ivu-radio-group-item {
    font-size: 16px;
  }

  .table {
    margin-bottom:20px;
  }

}
</style>
