<template>
  <!-- 背靠背评议 -->
  <div>
    <div class="whilteBreadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>集中授信</BreadcrumbItem>
        <BreadcrumbItem>背靠背评议</BreadcrumbItem>
      </Breadcrumb>
    </div>
  <div class="pagetop">
    <div style="font-size:14px;font-family:PingFangSC-Regular;">
      <span>请选择网格：</span>
      <Button type="text" style="font-size:14px;padding:0 5px;height:30px;border-radius:4px" :class="uploadObj.gridCode==null?'active':''" @click="changeGrid(null)">全部
      </Button>
      <Button type="text" style="font-size:14px;padding:0 5px;margin-left:10px;height:30px;border-radius:4px;" v-for="h in gridNameList" :class="uploadObj.gridCode==h.gridCode?'active':''" @click="changeGrid(h.gridCode)">{{ h.gridName }}
      </Button>
    </div>
    <Divider style="margin: 14px 0;"/>
    <div class="import">
      导入名单:  <Button class="import" @click="onImport"  icon="ios-download-outline">上传文件</Button>
    </div>
    <Modal v-model="showImportModal" title="上传文件" width="300px" :footer-hide="true">
      <Upload ref="upload" multiple type="drag" :headers="headers" :data="uploadObj" :action="uploadUrl+'/file/importcreditlist'" :on-success="onUpload">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或将文件拖拽到这里上传</p>
        </div>
      </Upload>
      <p>注：上传文件请先下载<a :href="uploadUrl+'/template/white-grey-blackList.xls'">模板</a>，按要求填写、上传进行导入。</p>
    </Modal>
  </div>
  <div class="page">
    <Tabs size="small" class="listTabs" v-model="tabname">
      <!-- 白名单标签页 -->
        <TabPane label="白名单">
            <div class="search">
              <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull">
                <Select v-model="search.type" slot="prepend" style="width: 80px">
                  <Option value="customerName">姓名</Option>
                  <Option value="idNumber">身份证号</Option>
                </Select>
              </Input>
              <Button type="primary" icon="ios-search" @click="onSearch" >查询</Button>
              <Button class="createBtn" type="primary" @click="addCustomer">添加白名单客户</Button>
            </div>
            <div class="table">
              <Table :columns="columns" :data="list"></Table>
            </div>
            <div class="pagination">
              <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
              <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
            </div>
            <!-- 单个添加名单客户 -->
            <Modal
                v-model="modal1"
                title="添加个体客户"
                @on-ok="addCustomer1">
                <div class="searchBtn">
                  <i-input v-model="search1.idNumber" placeholder="请输入身份证号进行查询..." clearable style="width: 270px"></i-input>
                  <i-button type="primary" icon="ios-search" style="float:none" @click="onSearch1">查询</i-button>
                </div>

                <div style="margin: 10px 0px">
                  <RadioGroup v-model="customerIndex">
                    <Radio  style="margin: 5px" :label="index" v-for="(h,index) in customerNameList">{{ h.customerName }}</Radio>
                  </RadioGroup>
                </div>

            </Modal>
            <!-- 白名单转换至灰名单 -->
            <Modal
                width="30%"
                v-model="modal2"
                title="白名单转移至灰名单"
                @on-ok="changeCustomer">
                <div class="changeBtn">
                  <Form :model="changeform"  :label-width="100">
                    <Row>
                      <Col span="19">
                        <FormItem label="转移原因" prop="reason">
                          <Select v-model="changeform.reason" placeholder="请选择转移原因......">
                            <Option value="游手好闲">游手好闲</Option>
                            <Option value="欠债较多">欠债较多</Option>
                            <Option value="贫困、低保户">贫困、低保户</Option>
                            <Option value="五保户">五保户</Option>
                            <Option value="贷款被诉讼">贷款被诉讼</Option>
                            <Option value="服刑">服刑</Option>
                            <Option value="长期外出">长期外出</Option>
                            <Option value="信用观念差">信用观念差</Option>
                            <Option value="赌博、吸毒、放高利贷">赌博、吸毒、放高利贷</Option>
                            <Option value="光棍">光棍</Option>
                            <Option value="年龄大">年龄大</Option>
                            <Option value="患病、残疾">患病、残疾</Option>
                            <Option value="有前科">有前科</Option>
                            <Option value="有不良贷款（含担保、挂息）">有不良贷款（含担保、挂息）</Option>
                            <Option value="婚变">婚变</Option>
                            <Option value="家庭不和睦">家庭不和睦</Option>
                            <Option value="常年不回家">常年不回家</Option>
                            <Option value="去世人员">去世人员</Option>
                            <Option value="其他">其他</Option>
                          </Select>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </div>
            </Modal>

            <Modal v-model="model.show" width="320" footer-hide :styles="{top: '120px'}">
            <div style="padding: 0 0 10px 0;font-size: 16px;color:rgba(0,0,0,0.85);" >
              <Icon style="color:#1890FF;line-height:24px;" type="ios-paper"></Icon>
                <span> 你确定要删除该用户么？</span>
            </div >
            <p style="margin:0 0 30px 10px;padding-left: 20px;font-size:14px;color:rgba(0,0,0,0.65);">{{ model.content }}</p>
            <div style="width: 100%;text-align: right">
              <Button style="width:65px;height:32px;" size="large" @click="goBack">取消</Button>
              <Button type="primary" style="margin-left:10px;width:65px;height:32px;background-color:#1890FF" size="large" @click="deleteUser">确定</Button>
            </div>
          </Modal>
        </TabPane>
        <!-- 灰名单标签页 -->
        <TabPane label="灰名单" class="ta">
          <div class="search">
            <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull">
              <Select v-model="search1.type" slot="prepend" style="width: 80px">
                <Option value="customerName">姓名</Option>
                <Option value="idNumber">身份证号</Option>
              </Select>
            </Input>
            <Button type="primary" icon="ios-search" @click="onSearch" >查询</Button>
            <Button class="createBtn" type="primary" @click="addCustomer">添加灰名单客户</Button>
          </div>
          <div class="table">
            <Table :columns="columns1" :data="list"></Table>
          </div>
          <div class="pagination">
            <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
            <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
          </div>
          <!-- 灰名单转换至白名单 -->
            <Modal
                width="30%"
                v-model="modal3"
                title="灰名单转移至白名单"
                @on-ok="changeCustomer1">
                <div class="changeBtn">
                  <Form :model="changeform1"  :label-width="100">
                  </Form>
                </div>
                <div style="padding: 0 0 10px 0;font-size: 16px;color:rgba(0,0,0,0.85);" >
                  <Icon style="color:#1890FF;line-height:24px;" type="ios-paper"></Icon>
                  <span> 你确定将该客户转移至白名单么？</span>
                </div >
            </Modal>
        </TabPane>
        <!-- 黑名单标签页 -->
        <TabPane label="黑名单">
          <div class="search">
            <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull">
              <Select v-model="search2.type" slot="prepend" style="width: 80px">
                <Option value="customerName">姓名</Option>
                <Option value="idNumber">身份证号</Option>
              </Select>
            </Input>
            <Button type="primary" icon="ios-search" @click="onSearch" >查询</Button>
            <Button class="createBtn" type="primary" @click="addCustomer">添加黑名单客户</Button>
          </div>
          <div class="table">
            <Table :columns="columns2" :data="list"></Table>
          </div>
          <div class="pagination">
            <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
            <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
          </div>
        </TabPane>
        <!-- 金融顾问授信意见标签页 -->
        <TabPane label="金融顾问授信意见">
          <div class="search">
            <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull">
              <Select v-model="search3.type" slot="prepend" style="width: 80px">
                <Option value="customerName">姓名</Option>
                <Option value="idNumber">身份证号</Option>
                <Option value="gridCode">网格编号</Option>
                <Option value="adviserName">金融顾问姓名</Option>
              </Select>
            </Input>
            <Button type="primary" icon="ios-search" @click="onSearch" >查询</Button>
            <Button class="createBtn" type="primary" @click="addCustomer">添加金融顾问授信意见客户</Button>
          </div>
          <div class="table">
            <Table :columns="columns3" :data="list"></Table>
          </div>
          <div class="pagination">
            <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
            <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
          </div>
        </TabPane>
    </Tabs>
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
      headers:{
          'Authorization':sessionStorage.getItem('token')
      },
      tabname:0,
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts:[5, 10, 15, 20],
      showImportModal: false,
      uploadUrl: UPLOAD_API_URL,
      uploadObj:{
        gridCode:null
      },
      //单个添加白名单客户，默认弹窗关闭
      modal1: false,
      modal2: false,
      modal3: false,
      customerNameList: [],
      form: {},
      changeform:{
        idNumber:'',
        reason:''
      },
      changeform1:{
        idNumber:'',
        reason:''
      },
      customerIndex:'',
      search1: {
        idNumber: ''
      },
      model: {
        show: false,
        id: null,
        content: '',
        loading: false
      },
      detail: {
        show: false
      },
      search: {
        type: 'customerName',
        keyword: ''
      },
      search1: {
        type: 'customerName',
        keyword: ''
      },
      search2: {
        type: 'customerName',
        keyword: ''
      },
      search3: {
        type: 'customerName',
        keyword: ''
      },
      columns: [
        {
          title: '客户姓名',
          align: 'center',
          width: 100,
          key: 'customerName'
        },
        {
          title: '身份证号',
          align: 'center',
          width: 180,
          key: 'idNumber'
        },
        {
          title: '联系方式',
          align: 'center',
          width: 130,
          key: 'phoneNumber'
        },
        {
          title: '网格编码',
          align: 'center',
          width: 130,
          key: 'gridCode'
        },
        {
          title: '地址',
          align: 'center',
          key: 'adress',
          tooltip:true
        },
        {
          title: '备注',
          align: 'center',
          key: 'comment'
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
                    this.change(params.row)
                  }
                }
              }, '转灰名单'),
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
      ],
      columns1: [
        {
          title: '客户姓名',
          align: 'center',
          width: 100,
          key: 'customerName'
        },
        {
          title: '身份证号',
          align: 'center',
          width: 180,
          key: 'idNumber'
        },
        {
          title: '联系方式',
          align: 'center',
          width: 130,
          key: 'phoneNumber'
        },
        {
          title: '网格编码',
          align: 'center',
          width: 130,
          key: 'gridCode'
        },
        {
          title: '待观察原因',
          align: 'center',
          minWidth: 100,
          key: 'reason',
          tooltip:true
        },
        {
          title: '地址',
          align: 'center',
          key: 'address',
          minWidth: 60,
          tooltip:true
        },
        {
          title: '备注',
          align: 'center',
          minWidth: 60,
          key: 'comment'
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
                    this.change1(params.row)
                  }
                }
              }, '转白名单'),
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
      ],
      columns2: [
        {
          title: '客户姓名',
          align: 'center',
          width: 100,
          key: 'customerName'
        },
        {
          title: '身份证号',
          align: 'center',
          width: 180,
          key: 'idNumber'
        },
        {
          title: '联系方式',
          align: 'center',
          width: 130,
          key: 'phoneNumber'
        },
        {
          title: '网格编码',
          align: 'center',
          width: 130,
          key: 'gridCode'
        },
        {
          title: '待观察原因',
          align: 'center',
          minWidth: 100,
          key: 'reason',
          tooltip:true
        },
        {
          title: '地址',
          align: 'center',
          key: 'adress',
          minWidth: 60,
          tooltip:true
        },
        {
          title: '备注',
          align: 'center',
          minWidth: 60,
          key: 'comment'
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
                    this.delete(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      columns3: [
        {
          title: '客户姓名',
          align: 'center',
          fixed: 'left',
          width: 100,
          key: 'customerName'
        },
        {
          title: '身份证号',
          align: 'center',
          width: 180,
          key: 'idNumber'
        },
        {
          title: '联系方式',
          align: 'center',
          width: 130,
          key: 'phone'
        },
        {
          title: '网格编号',
          align: 'center',
          minWidth: 130,
          key: 'gridCode'
        },
        {
          title: '收入(万元)',
          align: 'center',
          minWidth: 110,
          key: 'income'
        },
        {
          title: '支出(万元)',
          align: 'center',
          minWidth: 110,
          key: 'expenditure'
        },
        {
          title: '授信额(0-10万元)',
          align: 'center',
          minWidth: 150,
          key: 'rental'
        },
        {
          title: '金融顾问姓名',
          align: 'center',
          minWidth: 120,
          key: 'adviserName'
        },
        {
          title: '签字日期',
          align: 'center',
          minWidth: 150,
          key: 'signingTime'
        },
        {
          title: '地址',
          align: 'center',
          key: 'address',
          minWidth: 130,
          tooltip:true
        },
        {
          title: '备注',
          align: 'center',
          minWidth: 120,
          key: 'comment',
          tooltip:true
        },
        {
          title: '创建时间',
          align: 'center',
          minWidth: 100,
          key: 'credtedAt',
          render: (h, params) => {
            var date = new Date()
            date.setTime(params.row.credtedAt)
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
          align: 'center',
          minWidth: 100,
          key: 'updatedAt',
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
          fixed: 'right',
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
                    this.delete(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      list:[],
      total:0,
      gridNameList:[]
    }
  },
  mounted () {
    // 获取列表
      var vue = this
    if ('pageNum' in this.$route.query) {
      this.pageNum = parseInt(this.$route.query.pageNum)
    }
    if ('tabname' in this.$route.query) {
      this.tabname = parseInt(this.$route.query.tabname)
    }
    this.lettersList()

    this.$store.dispatch(actions.get.GRIDNAME_LIST, {}).then(rep => {
        if(rep.code==200){
            vue.gridNameList=[ ...rep.data ]
        }else if (rep.code!=200&&rep.code!=204){
            vue.$Message.error(rep.message)
        }
    })
  },
  watch:{
      'tabname':function (newVal,oldVal) {
        var param={}
        if(this.uploadObj.gridCode!=null){
          param={gridCode:this.uploadObj.gridCode}
        }
        this.lettersList(param)
      }
  },
  methods: {
    //白名单转黑名单
    change (row) {
      this.modal2 = true
      this.idNumber=row.idNumber
    },
    change1 (row) {
      this.modal3 = true
      this.idNumber=row.idNumber
    },
    //提交转换名单确定事件
    changeCustomer () {
      this.changeform.reason=this.changeform.reason
      this.changeform.idNumber=this.idNumber
      this.changeform.type='1'
      this.$store.dispatch(actions.post.WHITEGREY_PERSON,this.changeform).then(rep => {
            //判断返回的消息，若返回得code为200 则认为操作成功
            if(rep.data.code!=200){
                this.$Message.error(rep.data.message);
            }else{//否则返回一个警告窗 并把错误信息显示
                this.$Message.success("客户已成功转移至灰名单！");
                this.modal2 = false
                this.onSearch ()
            }
        })
    },
    changeCustomer1 () {
      this.changeform1.reason=''
      this.changeform1.idNumber=this.idNumber
      this.changeform1.type='2'
      this.$store.dispatch(actions.post.WHITEGREY_PERSON,this.changeform1).then(rep => {
            //判断返回的消息，若返回得code为200 则认为操作成功
            if(rep.data.code!=200){
                this.$Message.error(rep.data.message);
            }else{//否则返回一个警告窗 并把错误信息显示
                this.$Message.success("客户已成功转移至白名单！");
                this.modal3 = false
                this.onSearch ()
            }
        })
    },
    //单个添加单个名单的点击事件
    addCustomer1 () {
      let customer=this.customerNameList[this.customerIndex]
      this.form = {
        customerName:customer.customerName,
        idNumber:customer.idNumber,
        phone:customer.phoneNumber,
        gridCode:customer.gridCode,
        adress:customer.nativeAddress,
      }
      var url=''
      if(this.tabname==0){
        url=actions.post.WHITE_PERSON
      }else if(this.tabname==1){
        url=actions.post.GREY_PERSON
      }else if(this.tabname==2){
        url=actions.post.BLACK_PERSON
      }
      if(this.tabname==3){
        this.form.phone=customer.phoneNumber
        this.form.signingTime=customer.phoneNumber
        url=actions.post.ADVISORY_PERSON
      }else {
        this.form.phoneNumber=customer.phoneNumber
        
      }
      var vue=this
      this.$store.dispatch(url, this.form).then(rep => {
            //判断返回的消息，若返回得code为200 则认为操作成功
            if(rep.data.code!=200){
                vue.$Message.error(rep.data.message);
            }else{//否则返回一个警告窗 并把错误信息显示
                vue.$Message.success("添加成功！");
                vue.$router.push('/credit/whitelist?tabname=0')
                vue.modal1 = false
                vue.onSearch ()
            }
        })
    },
    onSearch1 () {
      var vue=this
      this.$store.dispatch(actions.get.CUSTOMER_LIST, {
            pageNum: 1,
            pageSize: 1000,
            idNumber:this.search1.idNumber
        }).then(rep => {
            if(rep.code==200){
                vue.customerNameList = rep.data
            }else if (rep.code!=204){
                vue.$Message.error(rep.message)
            }
        })
    },
    //单个添加白名单客户--确认与取消

    lettersList (params = {}) {
      var url;
      var vue = this
      if(this.tabname==0){
        url=actions.get.WHITE_LIST
      }
      if(this.tabname==1){
        url=actions.get.GREY_LIST
      }
      if(this.tabname==2){
        url=actions.get.BLACK_LIST
      }
      if(this.tabname==3){
        url=actions.get.ADVISORY_LIST
      }
      this.$store.dispatch(url, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...params
      }).then(rep => {
          if(rep.code==200){
              vue.total=rep.count
              vue.list=[ ...rep.data ]
          }else{
              vue.$Message.error(rep.message)
          }
      })
    },
    changeGrid (gridCode) {
      this.uploadObj.gridCode=gridCode
      var param={}
      if(this.uploadObj.gridCode!=null){
        param={gridCode:this.uploadObj.gridCode}
      }
      this.lettersList(param)
    },
    changePage (num) {
      this.pageNum = num
      this.$router.replace({query: { pageNum: this.pageNum }})
      this.onSearch()
    },
    onChangeNull(){
        if("" == this.search.keyword){
            this.$router.replace({query: { pageNum: this.pageNum }})
            this.onSearch()
        }
      },
    onPageSizeChange(pageSize1){
        this.pageSize=pageSize1
        this.$router.replace({query: { pageNum: this.pageNum }})
        this.onSearch()
      },
    // edit (row) {
    //   if(this.tabname==0){
    //     sessionStorage.setItem("whitelist",JSON.stringify(row));
    //       this.$router.push('/whitelist/WDetail?id=' + row.id)
    //   }
    //   if(this.tabname==1){
    //     sessionStorage.setItem("greylist",JSON.stringify(row));
    //       this.$router.push('/grey/GDetail?id=' + row.id)
    //   }
    //   if(this.tabname==2){
    //     sessionStorage.setItem("blacklist",JSON.stringify(row));
    //       this.$router.push('/black/BDetail?id=' + row.id)
    //   }
    //   // sessionStorage.setItem("whitelist",JSON.stringify(row));
    //   // this.$router.push('/white/WDetail?id=' + row.id)
    // },
    delete (row) {
      this.model.data = row
      this.model.content = row.customerName
      this.model.id = row.id
      this.model.show = true
    },
    deleteUser () {
        var vue = this
      this.model.loading = true
      setTimeout(() => {
        this.model.loading = false
        this.model.show = false
        var urls;
          if(this.tabname==0){
            urls=actions.delete.WHITE_PERSON
          }
          if(this.tabname==1){
            urls=actions.delete.GREY_PERSON
          }
          if(this.tabname==2){
            urls=actions.delete.BLACK_PERSON
          }
          if(this.tabname==3){
            urls=actions.delete.ADVISORY_PERSON
          }
        this.$store.dispatch(urls, this.model.id).then(rep => {
            if(rep.data.code==200){
                vue.$Message.success('删除成功')
                vue.onSearch()
            }else {
                vue.$Message.error(rep.data.message)
            }
        })
      }, 1000)
    },
    onSearch () {
        // if(Number != typeof this.search.keyword){
        //     console.log(typeof this.search.keyword)
        // }else {
            this.lettersList({
                [this.search.type]: this.search.keyword
            })
        // }
    },
    addCustomer () {
      if(this.uploadObj.gridCode==null){
           this.$Message.error('请先选择网格')
      }else{
          this.customerNameList=[]
          this.modal1 = true
      }
    },
    onImport () {
      if(this.uploadObj.gridCode==null){
           this.$Message.error('请先选择网格')
      }else{
          this.$refs.upload.clearFiles()
          this.showImportModal = true
      }
    },
    onUpload (data) {
        if (data.code == 200) {
            this.showImportModal = false
            this.onSearch()
            this.$Message.success('有' + data.data.whitelist + '条白名单导入成功，'+
                                  '有' + data.data.greylist + '条灰名单导入成功，'+
                                  '有' + data.data.blockList + '条黑名单导入成功，'+
                                  '有' + data.data.customerCreditAdviserList + '条金融顾问授信意见导入成功')
        } else {
            this.$Message.error(data.message)
            if(data.code == 300){
                sessionStorage.clear()
                window.location.href="/"
            }
        }
    },
    goBack() {
      this.model.show = false
    },
  }
}
</script>

<style lang="scss">
  .whilteBreadcrumb {
    height: 54px;
    background-color: #fff;
    font-size: 14px;
    font-family:PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
    border-radius: 4px;
    border: 1px solid #eee;
  }
.pagetop {
  margin: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #eee;
  .import {
    font-size: 14px;
    //margin: 5px;
  }
  button:hover, button.active {
    background: #1890FF;
    border-radius: 2px;
    color: #fff;
  }
}
.page {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  .listTabs {
    .ivu-tabs-tab {
      font-size: 18px;
      font-weight: 600;
    }
  }

  .search {
    height: 32px;
    .search-input {
      float: left;
      width: 400px;
    }
    .createBtn {
      margin-left: 10px;
    }
    .createwp {
      margin-left: 10px;
    }
    Button {
      float: left;
      margin-left: 10px;
    }
  }
  .table {
    margin-top: 10px;
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
</style>
