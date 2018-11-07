<template>
  <!--面谈面签页面-->
  <div>
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>集中授信</BreadcrumbItem>
        <BreadcrumbItem to="/credit/result">面谈面签</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="respagetop">
      <div style="font-size:14px;font-family:PingFangSC-Regular; line-height: 30px;height: 30px">
        <span>请选择网格:&nbsp;&nbsp;&nbsp;</span>
        <Button type="text" style="font-size:14px;padding:0 5px;height:30px;border-radius:4px" :class="uploadObj.gridCode==null?'active':''" @click="changeGrid(null)">全部
        </Button>
        <Button class="topButton" type="text" v-for="h in gridNameList" :class="uploadObj.gridCode==h.gridCode?'active':''" @click="changeGrid(h.gridCode)">{{ h.gridName }}
        </Button>
      </div>
      <Divider style="margin: 14px 0;"/>
      <div class="import">导入预授信名单:&nbsp&nbsp&nbsp<Button class="import" @click="onImport"  icon="ios-download-outline">上传文件</Button></div>
      <Modal v-model="showImportModal" title="批量导入" width="400px" :footer-hide="true" :styles="{top: '200px'}">
        <Upload ref="upload" multiple type="drag" :headers="headers" :data="uploadObj" :action="uploadUrl+'/file/importcreditdetail'" :on-success="onUpload">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或将文件拖拽到这里上传</p>
          </div>
          <div></div>
        </Upload>
        <p style="margin-top: 16px">注：导入用户请先下载<a :href="uploadUrl+'/template/BackToBackCreditDetail.xls'">模板</a>，按要求填写、上传进行导入。</p>
      </Modal>
    </div>
    <div class="resultPage">
      <div class="search">
        <Button type="primary" icon="ios-print" @click="onPrint">批量打印</Button>
        <Button type="primary" icon="ios-search" @click="onSearch" style="float: right">查询</Button>
        <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull" style="float: right;font-size: 14px;margin-right: 10px">
        <Select v-model="search.type" slot="prepend" size="large" style="width: 90px;">
          <Option value="customerName">客户姓名</Option>
          <Option value="idNumber">身份证号</Option>
        </Select>
        </Input>
        <span class="search-span" style="float: right;font-size: 14px;">
            状态:&nbsp;
            <Select v-model="search.state" slot="prepend" size="large" style="width:90px;" @on-change="changeState">
              <Option value="4">全部</Option>
              <Option value="3">已上传</Option>
              <Option value="0">未上传</Option>
            </Select>
        </span>
      </div>
      <div class="table">
        <Table ref="selection" :columns="columns" :data="list" @on-selection-change="printCancel"></Table>
      </div>
      <div class="pagination">
        <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
        <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
      </div>
      <Modal v-model="model.show" footer-hide width="320" :styles="{top: '200px'}" :closable="false">
        <div style="padding: 0 0 10px 0;font-size: 16px;">
          <Icon type="ios-information-circle" style="color:#f60;line-height:24px;"></Icon>
          <span>你确定要删除这行内容么？</span>
        </div>
        <div style="font-size: 14px;padding-left: 20px;padding-bottom: 20px">
          <p>{{ model.content }}</p>
        </div>
        <div style="text-align: right">
          <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
          <Button type="primary" size="large" :loading="model.loading" @click="deleteUser">确定</Button>
        </div>
      </Modal>
      <Modal v-model="modelTips.show" footer-hide width="320" :styles="{top: '200px'}" :closable="false">
        <div style="padding: 0 0 10px 0;font-size: 16px;">
          <Icon type="ios-paper" style="color:#2d8cf0;line-height:24px;"></Icon>
          <span>确定要下载申请表吗？</span>
        </div>
        <div style="font-size: 14px;padding-left: 20px;padding-bottom: 20px">
          <p>您共选择 {{ modelTips.num }} 份授信申请表。</p>
        </div>
        <div style="text-align: right">
          <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
          <Button type="primary" size="large"  @click="perviewShow">确定</Button>
        </div>
      </Modal>
      <Modal title="附件" v-model="modelImg.show" width="60%" :footer-hide="true">
        <div>
          <div style="position:relative;z-index:9999;top:200px;">
            <Icon
                    type="ios-arrow-back"
                    size="50" style="float: left;cursor:pointer;"
                    v-if="modelImg.index!=0"
                    @click="handleView(modelImg.index-1)"
            />
            <Icon
                    type="ios-arrow-forward"
                    size="50" style="float: right;cursor:pointer;"
                    v-if="modelImg.index+1!=(modelImg.images.length)"
                    @click="handleView(modelImg.index+1)"
            />
          </div>
          <img :src="this.baseCode"
               style="width:100%;position:relative;z-index:1000;top:-25px;" >
        </div>
        <!--<Tabs>
          <TabPane>
            <img v-for="image in this.imgList" :src="image.baseCode" style="width:98%;margin:0px 1%;padding:10px;float: left" >
          </TabPane>
        </Tabs >
        <p v-if="this.imgList.length==0">无图片</p>-->
      </Modal>
      <Modal v-model="modelPreview.show" width="60%" :footer-hide="true">
        <div class="printpage">
          <div >
            <Button type="primary" @click="Print">打印</Button>
          </div>
          <div id="print">
            <div v-for="(person,index) in perviewList" style="font-family : SimSun;">
              <div style="margin-bottom: 10px;" >
                <br/>
                <br/>
                <br/>
                <h1 style="text-align: center;margin-bottom: 10px;">{{ logoName }}网格化授信面签申请表</h1>
                <p style="margin: 10px 0;text-align: left;text-indent: 2em;font-size: 14px;">“今天的信用是您明天的财富”，{{ logoName }}特别提醒您:积累提升自己的信用记录，会给您的家庭生活、子女学习工作等带来宝贵的财富。珍爱信用记录，享受幸福人生。</p>
              </div>
              <table class="detail-table" border="1" cellspacing="0" cellpadding="0" align="center">
                <tr>
                  <td rowspan="8" width="4%" style="text-align:center;"><h4>客<br/>户<br/>信<br/>息</h4></td>
                  <td width="15%" style="text-align:center;"><div style="line-height:30px;"><b>姓名</b></div></td>
                  <td width="17%" style="text-align:center;">{{ person.customerName }}</td>
                  <td width="16%" style="text-align:center;"><b>身份证号码</b></td>
                  <td colspan="3" width="48%" style="text-align:center;">{{ person.idNumber }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>性别</b></div></td>
                  <td style="text-align:center;">{{ person.sex==1?'男':(person.sex==2?'女':'')}}</td>
                  <td style="text-align:center;"><b>婚姻状况</b></td>
                  <td colspan="3" style="text-align:center;">{{ person.maritalStatus==0?'未婚':(person.maritalStatus==1?'已婚':(person.maritalStatus==2?'离异':(person.maritalStatus==3?'丧偶':'')))  }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>配偶姓名</b></div></td>
                  <td style="text-align:center;">{{  }}</td>
                  <td style="text-align:center;"><b>身份证号码</b></td>
                  <td colspan="3" style="text-align:center;">{{  }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>文化水平</b></div></td>
                  <td style="text-align:center;">{{ person.educationLevel==0?'无':(person.educationLevel==1?'小学':(person.educationLevel==2?'初中':(person.educationLevel==3?'高中':(person.educationLevel==4?'专科':(person.educationLevel==5?'本科':(person.educationLevel==5?'研究生':'')))))) }}</td>
                  <td style="text-align:center;"><b>手机号</b></td>
                  <td width="28%" style="text-align:center;">{{  }}</td>
                  <td width="12%" style="text-align:center;"><b>家庭人数</b></td>
                  <td width="8%" style="text-align:center;">{{  }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;"><b>经营(工作)单位</b></td>
                  <td colspan="2" style="text-align:center;">{{  }}</td>
                  <td colspan="3" style="text-align: left;">
                    <div style="width:38%;float:left;border-right:1px solid #000;line-height:65px;text-align: center;"><b>经营(工作)地址</b></div>
                    <div style="width:62%;float:left;text-align: center;">{{  }}</div>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>户籍住址</b></div></td>
                  <td colspan="5" style="text-align:center;">{{ person.nativeAddress }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>常驻地址</b></div></td>
                  <td colspan="5" style="text-align:center;">{{ person.residenceAddress }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;"><b>金农易贷户名</b></td>
                  <td style="text-align:center;">{{  }}</td>
                  <td style="text-align:center;"><b>金农易贷账(卡)号</b></td>
                  <td colspan="3" style="text-align: left;">{{  }}</td>
                </tr>
                <tr>
                  <td rowspan="2" width="4%" style="text-align:center;"><h4>申<br/>请</h4></td>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>授信金额大写</b></div></td>
                  <td colspan="2" style="text-align:center;">{{  }}</td>
                  <td colspan="3" style="text-align: left;">
                    <div style="width:25%;float:left;border-right:1px solid #000;line-height:30px;;text-align: center;"><b>期限</b></div>
                    <div style="width:25%;float:left;border-right:1px solid #000;line-height:30px;;text-align: center;">{{  }}</div>
                    <div style="width:25%;float:left;border-right:1px solid #000;line-height:30px;;text-align: center;"><b>发放方式</b></div>
                    <div style="width:25%;float:left;line-height:30px;;text-align: center;">{{  }}</div>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>借款用途</b></div></td>
                  <td colspan="2" style="text-align:center;">{{  }}</td>
                  <td style="text-align:center;"><b>还款方式</b></td>
                  <td colspan="2" style="text-align:center;">{{  }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <h4>面<br/>谈<br/>面<br/>签</h4>
                  </td>
                  <td colspan="6" style="text-align: left;line-height: 30px;">
                    <b>
                      <p style='margin-left: 20px;'>1.您个人年收入_________元；家庭的全年经济收入__________万元；</p>
                      <p style='margin-left: 20px;'>2.您所提供的个人的身份、职业、工作单位、住址、联系电话等个人资料是否准确？□是　□否（客户信息资料是否真实）</p>
                      <p style='margin-left: 20px;'>3.以上谈话内容是否真实？是否是您真实的意思表示？□是   □否</p>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <h4>申<br/>请<br/>人<br/>签<br/>名</h4>
                  </td>
                  <td colspan="6" style="text-align: left;line-height: 30px;">
                    <b>
                      <p style='margin-left: 20px;'>
                        &nbsp;&nbsp;本人声明:本人保证以上信息及提供给贵行资料的真实性，贵行可就本人或家庭的收入、财产状况及经营情况等进行调查评估、采集照片等资料。无论贵行是否发放贷款，贵行均有权保留此申请书及相关资料。本人承诺自主支付方式的贷款资金严格履行约定的用途，否则承担相应违约责任。
                      </p>
                      <p style='margin-left: 20px;'>
                        &nbsp;&nbsp;本人授权贵行在办理本笔业务审批、贷后管理过程中（从业务申请至业务终止）将本人信用信息提供给中国人民银行个人信用信息基础数据库及信贷征信主管部门批准建立的其他个人信用信息数据库。并授权贵行向上述个人信用信息数据库或有关单位、部门及个人查询本人的信用状况，查询获得的信用报告限用于中国人民银行颁布的《个人信用信息基础数据库管理暂行办法》规定用途范围内。贵行不得超出本授权查询，否则由贵行承担由此引发一切后果及法律责任。本授权人对上述授权条款含义及相应的法律后果已全部通晓并充分理解。
                      </p>
                      <p style='margin-left: 20px;'>
                        &nbsp;&nbsp;借款申请人签名:
                      </p>
                      <p style='float: right;margin-right: 20px;'>
                        日期:&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日
                      </p>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colspan="7" style="text-align: left;">
                    <p style="line-height:30px;float:left;padding-left: 40px"><b>银行受理人员:</b></p>
                    <p style="line-height:30px;float: right;margin-right: 20px;"><b>日期:&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日</b></p>
                  </td>
                </tr>
              </table>
              <div class="PageNext" v-if="index<perviewList.length-1"></div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    import actions from '@/store/action-types'
    import { UPLOAD_API_URL } from '@/config'
    import { LOGO_NAME } from  '@/config'

    export default {
        data () {
            return {
                headers:{
                    'Authorization':sessionStorage.getItem('token')
                },
                printlist:[],
                selectList:[],
                attachFlag:'',
                imgList : [],
                perviewList:[],
                accountId:0,
                pageNum: 1,
                pageSize: 5,
                pageSizeOpts:[5, 10, 15, 20],
                showImportModal: false,
                logoName : LOGO_NAME,
                uploadUrl: UPLOAD_API_URL,
                uploadObj:{
                    gridCode:null
                },
                model: {
                    show: false,
                    title: '你确定要删除这行内容么？',
                    id: null,
                    content: '',
                    loading: false
                },
                modelTips:{
                    show:false,
                    title:'提示',
                    num:''
                },
                baseCode : '',
                modelImg : {
                    show : false,
                    title : '附件',
                    images : [],
                    index : 0,
                    loading : false
                },
                modelPreview:{
                    show: false,
                    title: '打印预览',
                    list:[],
                    loading: false
                },
                detail: {
                    show: false
                },
                search: {
                    type: 'customerName',
                    keyword: '',
                    state : '4'
                },
                columns:  [
                    {
                        type: 'selection',
                        align: 'left',
                        fixed: 'left',
                        width: 50,
                    },
                    {
                        title: '客户姓名',
                        key: 'customerName',
                        align: 'left',
                        width: 99
                    },
                    {
                        title: '身份证号',
                        key: 'idNumber',
                        align: 'left',
                        minWidth: 180
                    },
                    {
                        title: '预授信总额(万元)',
                        key: 'rental',
                        align: 'left',
                        minWidth: 110
                    },
                    {
                        title: '授信开始日期',
                        key: 'beginAt',
                        align: 'left',
                        minWidth: 120,
                    },
                    {
                        title: '授信结束日期',
                        key: 'endAt',
                        align: 'left',
                        minWidth: 120,
                    },
                    {
                        title: '状态',
                        key: 'attachFlag',
                        align: 'left',
                        sortable: true,
                        sortType:'desc',
                        width: 100,
                        render: (h, params) => {
                            let texts = '';
                            if(params.row.attachFlag == 3){
                                texts = '已上传'
                            }/*else if(params.row.attachFlag == 1){
                                texts = '已上传申请表'
                            }else if(params.row.attachFlag == 2){
                                texts = '已上传合同'
                            }else if (params.row.attachFlag == 3) {
                                texts = '已上传'
                            }*/else{
                                texts = '未上传'
                            }
                            return h('div', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                }
                            }, texts)
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'left',
                        fixed: 'right',
                        width: 180,
                        render: (h, params) => {
                            let _this = this;
                            let texts = '';
                            let type = '';
                            if (params.row.attachFlag == 3) {
                                texts = "合同",
                                    type = "Button"
                            } else {
                                texts = "",
                                    type = ""
                            }
                            return h('div', {
                                style: {
                                    align: 'right',
                                    fontSize : '14px',
                                },
                            },[
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.preview(params.row)
                                        }
                                    }
                                },'申请表'),
                                h(type, {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.imgShow(params.row,"4.1")
                                        }
                                    }
                                }, texts),
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
                gridNameList:[],
                print: {
                    options:{
                        'noPrint': '.no-print'
                    },
                    init: function () {
                        var content = this.getStyle() + this.getHtml();
                        this.writeIframe(content);
                    },
                    getStyle: function () {
                        var str = "",
                            styles = document.querySelectorAll('style,link');
                        for (var i = 0; i < styles.length; i++) {
                            str += styles[i].outerHTML;
                        }
                        str += "<style>" + (this.options.noPrint ? this.options.noPrint : '.no-print') + "{display:none;}</style>";
                        return str;
                    },
                    getHtml: function () {
                        var inputs = document.querySelectorAll('input');
                        var textareas = document.querySelectorAll('textarea');
                        var selects = document.querySelectorAll('select');
                        for (var k in inputs) {
                            if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
                                if (inputs[k].checked == true) {
                                    inputs[k].setAttribute('checked', "checked")
                                } else {
                                    inputs[k].removeAttribute('checked')
                                }
                            } else if (inputs[k].type == "text") {
                                inputs[k].setAttribute('value', inputs[k].value)
                            }
                        }
                        for (var k2 in textareas) {
                            if (textareas[k2].type == 'textarea') {
                                textareas[k2].innerHTML = textareas[k2].value
                            }
                        }
                        for (var k3 in selects) {
                            if (selects[k3].type == 'select-one') {
                                var child = selects[k3].children;
                                for (var i in child) {
                                    if (child[i].tagName == 'OPTION') {
                                        if (child[i].selected == true) {
                                            child[i].setAttribute('selected', "selected")
                                        } else {
                                            child[i].removeAttribute('selected')
                                        }
                                    }
                                }
                            }
                        }
                        return document.getElementById('print').innerHTML;
                    },
                    writeIframe: function (content) {
                        var w, doc, iframe = document.createElement('iframe'),
                            f = document.body.appendChild(iframe);
                        iframe.id = "myIframe";
                        iframe.style = "position:absolute;width:0;height:0;top:-10px;left:-10px;";
                        w = f.contentWindow || f.contentDocument;
                        doc = f.contentDocument || f.contentWindow.document;
                        doc.open();
                        doc.write(content);
                        doc.close();
                        this.toPrint(w);
                        setTimeout(function () {
                            document.body.removeChild(iframe)
                        }, 100)
                    },
                    toPrint: function (frameWindow) {
                        try {
                            setTimeout(function () {
                                frameWindow.focus();
                                try {
                                    if (!frameWindow.document.execCommand('print', false, null)) {
                                        frameWindow.print();
                                    }
                                } catch (e) {
                                    frameWindow.print();
                                }
                                frameWindow.close();
                            }, 10);
                        } catch (err) {
                            /*console.log('err', err);*/
                        }
                    }
                }
            }
        },
        computed: {
            ...mapState({
                list: state => state.result.resultlist,
                person: state => state.result.resultperson,
                total: state => state.result.resulttotal,
            })
        },
        mounted () {
            // 获取列表
            var vue = this
            if ('pageNum' in this.$route.query) {
                this.pageNum = parseInt(this.$route.query.pageNum)
            }
            this.fetchList()
            this.$store.dispatch(actions.get.GRIDNAME_LIST, {}).then(rep => {
                if(rep.code==200){
                    vue.gridNameList=[ ...rep.data ]
                }else if (rep.code!=204){
                    vue.$Message.error(rep.message)
                }
            })
        },
        methods: {
            handleView(index){
                this.modelImg.index = index
                this.baseCode = this.imgList[index].baseCode
            },
            imgShow(row,params){
                var vue = this;
                /*vue.modelImg.data = row,*/
                vue.imgList = [],
                vue.$store.dispatch( actions.get.IMAGE_LIST, {
                    idNumber : row.idNumber,
                    type : params
                }).then( rep => {
                    if( rep.data.code == 200 ){
                        vue.imgList.push( ...rep.data.data )
                        vue.modelImg.images = vue.imgList
                        vue.modelImg.index = 0
                        vue.baseCode = vue.modelImg.images[0].baseCode
                        vue.modelImg.show = true
                    }else if ( rep.data.code != 204 ) {
                        vue.$Message.error( rep.data.message )
                    }
                })
            },
            perviewShow(){
                this.modelTips.show=false
                var vue=this
                this.perviewList=[]
                let len=0
                    for(let i in this.printlist){
                        let row=this.printlist[i]
                        this.$store.dispatch(actions.get.PREVIEW_PERSON, this.printlist[i].idNumber).then(rep => {
                            if(rep.code==200) {
                                let customer = [...rep.data]
                                vue.perviewList.push(customer[0])
                            }else{
                                vue.$Message.error(rep.message)
                            }
                            len++
                            if(len==vue.printlist.length&&vue.perviewList.length!=0){
                                setTimeout(() => {
                                    this.print.init()
                                },1000)
                            }
                        })
                    }
            },
            preview(row){
                var vue = this
                if(row.attachFlag!=0){
                    this.imgShow(row,"4.2");
                }else{
                    this.perviewList=[]
                    this.$store.dispatch(actions.get.PREVIEW_PERSON, row.idNumber).then(rep => {
                        if(rep.code==200) {
                            let customer = [...rep.data]
                            vue.perviewList.push(customer[0])
                            vue.modelPreview.show = true
                        }else{
                            vue.$Message.error(rep.message)
                        }
                    })
                }
            },
            printCancel(selection){
                this.printlist=[]
                this.selectList=[]
                for(let i in selection){
                    if(selection[i].attachFlag==0){
                        this.selectList.push(selection[i])
                    }else{
                        this.$Message.error(selection[i].customerName+' 附件已上传，无需打印')
                    }
                }
            },
            onPrint(){
                if(this.selectList.length>0){
                    this.printlist=this.selectList
                    this.modelTips.num=this.selectList.length
                    this.modelTips.show=true
                    /*this.perviewShow()*/
                }else{
                    this.$Message.error('请先选择客户信息')
                }
            },
            Print(){
                this.print.init()
            },
            changeGrid (gridCode) {
                this.uploadObj.gridCode=gridCode
                this.onSearch()
            },
            changeState(){
                this.onSearch()
            },
            fetchList (params = {}) {
                var vue = this
                return this.$store.dispatch(actions.get.RESULT_LIST, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    accountId: JSON.parse(sessionStorage.getItem('userObj')).accountId,
                    ...params
                }).then( rep => {
                    if(rep.code!=200&&rep.code!=204){
                        vue.$Message.error(rep.message)
                    }
                })
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
            show (row) {
                this.detail.show = true
            },
            quit(){
                this.detail.show = false
            },
            delete (row) {
                this.model.data = row
                this.model.content = row.customerName
                this.model.id = row.id
                this.model.show = true
            },
            deleteUser () {
                this.model.loading = true
                setTimeout(() => {
                    this.model.loading = false
                    this.model.show = false
                    this.$store.dispatch(actions.delete.RESULT_PERSON, this.model.id).then(rep => {
                        if (rep.data.code!=200) {
                            this.$Message.error(rep.data.message)
                        }else{
                            this.$Message.success('删除成功')
                        }
                        this.onSearch()
                    })
                }, 1000)
            },
            onSearch () {
                var param={
                    [this.search.type]: this.search.keyword,
                    attachFlag :  this.search.state
                }
                if(this.uploadObj.gridCode!=null){
                    param={
                        [this.search.type]: this.search.keyword,
                        gridCode:this.uploadObj.gridCode,
                        attachFlag :  this.search.state
                    }
                }
                this.fetchList(param)
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
                if (data.code === 200) {
                    this.showImportModal = false
                    this.onSearch()
                    this.$Message.success('有' + data.data.sum + '条记录导入成功')
                } else {
                    this.$Message.error(data.message)
                    if(data.code === 300){
                        sessionStorage.clear()
                        window.location.href="/"
                    }
                }
            },
            goBack(){
                this.modelTips.show=false
                this.model.show=false
                this.$router.push('/credit/result?tabname=0')
            }
        }
    }
</script>

<style lang="scss">
  .resultBreadcrumb {
    height: 54px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #eee;
    font-size: 14px;
    font-family:PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
  }
  .pagetop {
    margin: 16px 24px;
    padding: 10px;
    border-radius: 4px;
    background-color: #fff;
    .import {
        font-size: 14px;
      }
    .topButton {
      font-family: '微软雅黑';
      padding: 0px 5px 3px 5px;
      font-size:14px;
      margin-left: 10px;
      text-align: center;
      height:30px;
      border-radius:4px;
    }
    button:hover, button.active {
      background: #1890FF;
      border-radius: 2px;
      color: #fff;
    }
  }
  .resultPage {
    margin: 16px 24px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    .search {
      height: 32px;
      margin-bottom: 16px;
      .search-input {
        float: left;
        width: 400px;
        font-size: 14px;
      }
      .search-span {
        float: left;
        width: 140px;
      }
      Button {
        float: left;
        font-size: 14px;
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
    font-size: 10px;
    line-height: 32px;
  }
  @page {
    size:A4 portrait;
    margin: 0px 30px

  }
  .PageNext{
    page-break-after:always;
  }
  .printpage {
    margin:  5%;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    #print {
      .detail-table {
        width: 100%;
        font-size: 14px;
        text-align: center;
        border-collapse: collapse;
      }
    }
  }
</style>
