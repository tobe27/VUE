<template>
  <div>
    <!--客户管理页面-->
    <div class="customerpagetop">
      <div style="font-size:14px;font-family:PingFangSC-Regular;">
        <span>请选择网格：</span>
        <Button type="text" style="font-size:14px;padding:0 5px;height:30px;border-radius:4px" :class="currentGridCode==null?'active':''" @click="changeGrid(null)">全部
        </Button>
        <Button type="text" style="font-size:14px;padding:0 5px;margin-left:10px;height:30px;border-radius:4px;" v-for="h in gridNameList" :class="currentGridCode==h.gridCode?'active':''" @click="changeGrid(h.gridCode,h.gridName)">{{ h.gridName }}
        </Button>
      </div>
      <Divider style="margin: 14px 0;" />
      <div class="import">批量下载:&nbsp&nbsp&nbsp<Button class="import"  icon="ios-download-outline" @click="download">下载客户信息</Button></div>
    </div>
  <div class="customerPage">
    <div class="searchdiv">
      <Button class="searchButton" type="primary" icon="ios-search" clearable @click="onSearch">搜索</Button>
      <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull">
        <Select v-model="search2.type" slot="prepend" style="width: 80px">
          <Option value="customerName">姓名</Option>
          <Option value="idNumber">证件号</Option>
          <Option value="nativeAddress">户籍地址</Option>
        </Select>
      </Input>
      <span style="float: right">
            状态:&nbsp;
            <Select v-model="search1.status" style="width: 64px" @on-change="changeStatus">
              <Option value="1">全部</Option>
              <Option value="0">暂存</Option>
              <Option value="5">正常</Option>
              <Option value="6">冻结</Option>
            </Select>
      </span>
    </div>
    <div class="button-group">
      <Button class="create"  @click="onAdd" type="primary" icon="ios-add">添加</Button>
    </div>
    <div class="customerTable">
      <Table :columns="columns" :data="list" @on-selection-change="printCancel"></Table>
    </div>
    <div class="pagination">
      <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
        <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
    </div>
    <Modal
      v-model="model.show"
      width="320">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>确定要编辑该客户状态么？</span>
      </p>
      <div style="text-align:center">
        <p>{{ model.content }}</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="model.loading" @click="deleteUser">{{ model.title }}</Button>
      </div>
    </Modal>
    <Modal
      v-model="delmodel.show"
      width="320">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>确定要删除该客户么？</span>
      </p>
      <div style="text-align:center">
        <p>{{ delmodel.content }}</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="delmodel.loading" @click="delTemporaryUser">{{ delmodel.title }}</Button>
      </div>
    </Modal>
    <!-- 失信人查询 -->
    <!-- <Modal width="35%"  v-model="detail.showDishonest" :footer-hide="true"  title="失信记录">
      <table border class="detail-dishonestTable">
        <tr>
          <td width="36%" class="tds1">被执行人姓名/名称</td>
          <td width="64%" class="tds2">{{ dishonest.performedName }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">身份证号码/组织机构代码</td>
          <td width="64%" class="tds2">{{ dishonest.cardNumber }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">性别</td>
          <td width="64%" class="tds2">{{ dishonest.sex }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">年龄</td>
          <td width="64%" class="tds2">{{ dishonest.age }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">省份</td>
          <td width="64%" class="tds2">{{ dishonest.areaName }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">执行法院</td>
          <td width="64%" class="tds2">{{ dishonest.courtName }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">执行依据文号</td>
          <td width="64%" class="tds2">{{ dishonest.gistId }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">立案时间</td>
          <td width="64%" class="tds2">{{ dishonest.registerDate }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">案号</td>
          <td width="64%" class="tds2">{{ dishonest.caseCode }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">做出执行依据单位</td>
          <td width="64%" class="tds2">{{ dishonest.gistInstitution }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">生效法律文书确定的义务</td>
          <td width="64%" class="tds2">{{ dishonest.duty }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">被执行人的履行情况</td>
          <td width="64%" class="tds2">{{ dishonest.performance }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">失信被执行人行为具体情形</td>
          <td width="64%" class="tds2">{{ dishonest.concreteReason }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">失信类别</td>
          <td width="64%" class="tds2">{{ dishonest.type }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">发布时间戳</td>
          <td width="64%" class="tds2">{{ dishonest.publishedAt }}</td>
        </tr>
      </table>
      <div style="margin-top: 10px;text-align: center;">
        <Page :page-size="1" :total="dishonestlen" :current="pageNum" @on-change="onChangePage"/>
      </div>
    </Modal> -->
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import actions from '@/store/action-types'
import { API_BASE_URL } from '@/config'

const user=JSON.parse(sessionStorage.getItem('userObj'));

export default {
  user,
  data () {
    return {
      user,
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts:[5, 10, 15, 20],
      apiUrl: API_BASE_URL,
      currentGridCode:null,
      currentGridName:null,
      model: {
        show: false,
        title: '你确定要更改该客户状态么？',
        id: null,
        content: '',
        loading: false
      },
      delmodel:{
        show: false,
        title: '你确定要删除该客户么？',
        id: null,
        content: '',
        loading: false
      },
      detail: {
        show: false,
        //showDishonest: false
      },
      search: {
        customerName:'',
        idNumber:'',
        nativeAddress:''
      },
      search1:{
        type:'status',
        keyword: '',
        status:'1'
      },
      search2:{
        type: 'customerName',
        keyword: ''
      },
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'customerName',
          width: 96,
          align: 'center'
        },
        {
          title: '身份证',
          key: 'idNumber',
          width: 184,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phoneNumber',
          minWidth:50,
          align: 'center'
        },
       {
          title: '网格名称',
          key: 'gridName',
          minWidth:20,
          align: 'center'
        },
        {
          title: '户号',
          key: 'householdId',
          minWidth:20,
          align: 'center'
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
              let type=""
              let status=params.row.status
              if(status==0){
                type='暂存'
              }else if(status==5){
                type='正常'
              }else if(status==6){
                type='冻结'
              }
              return h('span', {
                props: {
                  },
              },type)
          }
        },
        {
          title: '资料信息',
          minWidth: 10,
          align: 'center',
          key:'action',
          render: (h, params) => {
            let name='申请表'
            if( params.row.status == 6 ){
              name='申请表'
            } else if ( params.row.status == 5 ){
              name='申请表'
            } else {
              name=''
            }
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showApplication(params.row)
                  }
                }
              }, name),
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 170,
          render: (h, params) => {

            let name=''
            let delType='Button'
            let type='Button'
            if( params.row.status == 6 ){
              delType=''
              name='启用'
            } else if ( params.row.status == 5 ){
              delType=''
              name='冻结'
            } else {
              delType='Button'
              type=''
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
              //编辑
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
              //状态编辑
              h(type, {
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
              }, '删除'),
            ])
          }
        }
      ],
      gridNameList:[],
      dishonestperson:[],
      dishonestlen:0,
      dishonest:{},
      lists:[],
      selectList:[]
    }
  },
  computed: {
    ...mapState({
      list: state => state.customer.list,
      person: state => state.customer.person,
      total: state => state.customer.total,
      property: state => state.customer.propertyperson,
      familys: state => state.customer.familysperson,
      credit: state => state.customer.creditperson
    })
  },
  mounted () {
    let vue = this
    // 获取列表
    if ('pageNum' in vue.$route.query) {
      vue.pageNum = parseInt(vue.$route.query.pageNum)
    }
    vue.onSearch()
    vue.$store.dispatch(actions.get.GRIDNAME_LIST, {}).then(rep => {
        if ( rep.code == 200 ) {
          vue.gridNameList=[ ...rep.data ]
        } else {
          vue.$Message.error(rep.message)
        }
    })
  },
  methods: {
    changeGrid (gridCode,gridName) {
      this.currentGridCode=gridCode
      this.currentGridName=gridName
      this.onSearch()
    },
    fetchList (params = {}) {
      var vue=this
      return this.$store.dispatch(actions.get.CUSTOMER_LIST, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...params
      }).then(rep => {
          if(rep.code!=200 && rep.code!=204){
              vue.$Message.error(rep.message)
          }
      })
    },
    changePage (num) {
      this.pageNum = num
      this.$router.replace({query: { pageNum: this.pageNum }})
      this.fetchList({
        customerName: this.search.customerName,
        nativeAddress: this.search.nativeAddress,
        idNumber: this.search.idNumber
      })
    },
    onPageSizeChange(pageSize1){
        this.pageSize=pageSize1
        this.$router.replace({query: { pageNum: this.pageNum }})
        this.onSearch()
    },
    show(row){
      this.$router.push('/customer/Detail?idNumber=' + row.idNumber)
    },
    //申请表
    showApplication () {

    },
    //查询失信人失信信息
    // showDishonest(row){
    //   var vue=this
    //   this.$store.dispatch(actions.post.DISHONEST_PERSON, {performedName:row.customerName,cardNumber:row.idNumber}).then(rep => {
    //     if(rep.code!=200){
    //       vue.$Message.error(rep.message)
    //     }else{
    //       vue.dishonestperson = [ ...rep.data ]
    //       vue.detail.showDishonest = true
    //       vue.dishonest=vue.dishonestperson[0]
    //       vue.dishonestlen=vue.dishonestperson.length
    //     }
    //   })
    // },
    edit (row) {
      this.$router.push('/customer/InDetail?customerId=' + row.customerId)
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
            if(rep.data.code!=200){
                vue.$Message.error(rep.data.message)
            }else{
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
      if(row.status==6){
        this.model.title='启用'
        this.model.status=5
      }else{
        this.model.title='冻结'
        this.model.status=6
      }
    },
    deleteUser () {
      this.model.loading = true
      setTimeout(() => {
        this.model.loading = false
        this.model.show = false
        this.$store.dispatch(actions.put.CUSTOMERS_PERSON, {id:this.model.id,status:this.model.status}).then(rep => {
            if(rep.data.code!=200){
                vue.$Message.error(rep.data.message)
            }else{
                this.$Message.success('编辑状态修改成功')
                this.onSearch()
            }
        })
      }, 100)
    },
    onChangeNull(){
      if("" == this.search.keyword){
          this.$router.replace({query: { pageNum: this.pageNum }})
          this.onSearch()
      }
    },
    onSearch () {
      let status = this.search1.status
      if(status==1){
        var param={
          [this.search.type]: this.search.keyword
        }
        if ( this.currentGridCode != null ) {
          param={
            [this.search.type]: this.search.keyword,
            gridCode:this.currentGridCode,
          }
        }
      }else{
        var param={
          customerName: this.search.customerName,
          nativeAddress: this.search.nativeAddress,
          idNumber: this.search.idNumber,
          status:status
        }
        if ( this.currentGridCode != null ) {
          param={
            customerName: this.search.customerName,
            nativeAddress: this.search.nativeAddress,
            idNumber: this.search.idNumber,
            gridCode:this.currentGridCode,
            status:status
          }
        }
      }
      this.fetchList(param)
    },
    //下载客户信息
    download () {
      if(this.currentGridCode==null){
        window.location.href=this.apiUrl+'/file/customer/0?gridName=0&accountId='+user.accountId
      }else{
        window.location.href=this.apiUrl+'/file/customer/'+this.currentGridCode+'?gridName='+this.currentGridName+'&accountId='+user.accountId
      }
    },
    //失信记录条数跳转
    onChangePage(num){
      this.dishonest=this.dishonestperson[num-1]
    },
    //添加客户先选择网格
    onAdd () {
      if(this.currentGridCode==null){
           this.$Message.error('请先选择网格')
      }else{
        this.$router.push('/customer/InDetail?currentGridCode='+this.currentGridCode)
      }
    },
    //批量获取客户ID,改变状态
    printCancel(selection){
        this.selectList=[]
        for(let i in selection){
            this.selectList.push(selection[i])
        }
    },
    //AB批签审核改变客户状态
    onbatch(){
      this.lists=[]
      for(let i in this.selectList){
            let a={customerId:this.selectList[i].customerId,status:3}
            this.lists.push(a)
        }
      this.$store.dispatch(actions.put.BATCH_PERSON, this.lists).then(rep => {
          if(rep.data.code!=200){
              this.$Message.error(rep.data.message)
          }
          this.onSearch()
      })
    },
    onexamine(){
      for(let i in this.selectList){
            this.lists=[]
            let a={customerId:this.selectList[i].customerId,status:5}
            this.lists.push(a)
        }
      this.$store.dispatch(actions.put.BATCH_PERSON, this.lists).then(rep => {
          if(rep.data.code!=200){
              this.$Message.error(rep.data.message)
          }
          this.onSearch()
      })
    },
    onrefuse(){
      for(let i in this.selectList){
            this.lists=[]
            let a={customerId:this.selectList[i].customerId,status:4}
            this.lists.push(a)
        }
      this.$store.dispatch(actions.put.BATCH_PERSON, this.lists).then(rep => {
          if(rep.data.code!=200){
              this.$Message.error(rep.data.message)
          }
          this.onSearch()
      })
    },
    //根据状态筛选角色所对应的客户
    changeStatus(){
      this.onSearch()
    }
  }
}
</script>

<style lang="scss">
.customerpagetop {
  margin: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  .import {
    font-size: 14px;
    // margin: 5px;
  }
  button:hover, button.active {
    background: #1890FF;
    border-radius: 2px;
    color: #fff;
  }
}
.customerPage {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  .searchdiv{
    height: 32px;
    margin-bottom: 20px;
    float: right;
    .search-input{
      margin-left: 10px;
      float: right;
      width:300px;
    }
    .searchButton{
      float: right;
      margin-left: 10px;
    }
  }
  .button-group {
    height: 32px;
    margin-bottom: 20px;
    .import {
      margin-left: 10px;
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

.detail-dishonestTable {
  width: 100%;
  font-size: 12px;
  line-height: 25px;
  border-collapse: collapse;
  border-color: #A6A6A6;
  border:0px solid rgba(166,166,166,1);
  .tds1 {
    margin-right: 10px;
    background:rgba(0,18,31,0.05);
    text-align: right;
    padding-right: 10px;
  }
  .tds2 {
    text-align: left;
    padding-left: 10px;
  }
  .pageDishonest {
    float: right;
    align-content: center;
  }


}
</style>
