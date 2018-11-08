<template>
    <div>
        <div class="loanBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>集中授信</BreadcrumbItem>
                <BreadcrumbItem>贷款审批</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--贷款审批页面-->
        <div style="font-size:14px;">
            <!--选择网格-->
            <div class="loanApproval-top"
                 style="font-size:14px;margin:5px 24px;height: 45px;line-height: 40px;font-family:PingFangSC-Regular;">
                <span>请选择网格：</span>
                <Button type="text" style="font-size:14px;padding:0 5px;height:30px;border-radius:4px"
                        :class="uploadObj.gridCode==null?'active':''" @click="changeGrid(null)">全部
                </Button>
                <Button type="text" style="font-size:14px;padding:0 5px;margin-left:10px;height:30px;border-radius:4px;"
                        v-for="h in gridNameList" :class="uploadObj.gridCode==h.gridCode?'active':''"
                        @click="changeGrid(h.gridCode)">{{ h.gridName }}
                </Button>
            </div>
            <!--主题-->
            <div class="loanApproval-page">
                <!--搜索窗等。。。-->
                <div class="search">
                    <Button style="font-size:14px;" @click="onApproval">批量{{operationList[userData.roleId - 1]}}
                    </Button>
                    <Button style="font-size:14px;" @click="onPrint()">批量打印</Button>
                    <Button type="primary" icon="ios-search" @click="onSearch" style="float: right">查询</Button>
                    <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull"
                           style="float: right" placeholder="请输入查询条件">
                    <Select v-model="search.type" slot="prepend" style="width: 80px">
                        <Option value="customerName">客户姓名</Option>
                        <Option value="idNumber">身份证号</Option>
                    </Select>
                    </Input>
                    <!--通过状态选择展示的信息-->
                    <!--<span class="search-span" style="float: right;width: 180px;">状态:&nbsp;
                    <Select v-model="state1" style="width: 120px" placeholder="请选择" @on-change="poi">
                          <Option value="0">客户经理待审批</Option>
                          <Option value="1">客户经理已同意</Option>
                          <Option value="2">客户经理已拒绝</Option>
                        <Option value="3">会计已同意</Option>
                        <Option value="4">会计已拒绝</Option>
                        <Option value="5">支行长已同意</Option>
                        <Option value="6">支行长已拒绝</Option>
                        </Select>
                    </span>-->
                </div>
                <!--授信客户数-->
                <div style="background-color: #FFF9E6;font-size:14px;margin-bottom: 10px;height: 40px;padding: 10px;">
                    <Icon type="ios-book" style="color: #FF9918"/>
                    当前授信客户数为： <span style="color: #FF9918;">{{total}}</span>人。
                    <!--授信总额合计：<span style="color: #FF9918;">500</span>万元-->
                </div>
                <!--标签页嵌套 表格 -->
                <div class="table">
                    <Tabs type="card" @on-click="tabsClick" v-model="tabName" :name="tabName">
                        <TabPane v-for="(name1,index) in zt1[userData.roleId - 1]" :name="name1"
                                 :label="tabTittlelist[userData.roleId - 1][index]">
                            <Table ref="selection" :columns="columns" :data="list"
                                   @on-selection-change="printCancel"></Table>
                        </TabPane>
                    </Tabs>
                </div>
                <!--网格的页脚  信息数量等等。。-->
                <div class="pagination">
                    <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange"
                          :page-size-opts="pageSizeOpts"
                          :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage"
                          show-elevator/>
                </div>
                <!--删除本行弹窗-->
                <Modal v-model="model.show" width="320">
                    <p slot="header" style="color:#f60;text-align:center">
                        <Icon type="ios-information-circle"></Icon>
                        <span>你确定要删除这行内容么？</span>
                    </p>
                    <div>
                        <p>{{ model.content }}</p>
                    </div>
                    <div slot="footer">
                        <Button type="error" size="large" long :loading="model.loading" @click="deleteUser">删除</Button>
                    </div>
                </Modal>
                <!--批量审批弹窗-->
                <Modal v-model="modal1" title="审批" footer-hide>

                    <Card :bordered="false" dis-hover>
                        结果:
                        <RadioGroup v-model="animals.animal" style="margin-left: 20px">
                            <Radio label="0" style="margin-left: 40px">同意</Radio>
                            <Radio v-show="userData.roleId != 1" label="1" style="margin-left: 60px">驳回</Radio>
                        </RadioGroup>
                    </Card>
                    <!--//如果是角色一：客户经理 那就加一个利率填写-->
                    <Card :bordered="false" dis-hover v-if="userData.roleId == 1">
                        <span style="float: left;line-height: 40px">利率：</span>
                        <div style="float: left">
                            <Input style="width:100px;margin-left: 50px" v-model.trim="animals.interestRate"
                                   placeholder="请填写利率">
                            <span slot="append">%</span>
                            </Input>
                        </div>

                    </Card>
                    <Card :bordered="false" dis-hover v-show="userData.roleId != 1 && animals.animal =='1'">
                        <!--审批意见：<Select v-model="select1" style="width:300px;margin-left: 40px">-->
                        <!--<Option v-for="item in cityList" :value="item.label">{{ item.label }}</Option>-->
                        <!--</Select>-->

                        <span>审批意见：</span>
                        <Input style="width:300px;margin-left: 50px" v-model.trim="animals.value"
                               type="textarea" :rows="3" placeholder="请输入您的意见...."/>
                    </Card>
                    <div style="width: 100%;text-align: right">
                        <Button style="margin-left: auto;" type="primary" @click="ok">确认</Button>
                        <Button style="margin-left: 20px" type="primary" @click="cancel">取消</Button>
                    </div>
                </Modal>
                <!--确认批量下载弹窗-->
                <Modal v-model="modelTips.show" width="320" footer-hide :styles="{top: '120px'}">
                    <div style="padding: 0 0 10px 0;font-size: 16px;color:rgba(0,0,0,0.85);">
                        <Icon style="color:#1890FF;line-height:24px;" type="ios-paper"></Icon>
                        <span> 确定要下载信贷系统报表吗？</span>
                    </div>
                    <p style="margin:0 0 30px 10px;padding-left: 20px;font-size:14px;color:rgba(0,0,0,0.65);">您共选择 <span
                            style="color: red">{{ modelTips.num }}</span> 份信贷系统报表。</p>
                    <div style="width: 100%;text-align: right">
                        <Button style="width:65px;height:32px;" size="large" @click="goBack">取消</Button>
                        <Button type="primary" style="margin-left:10px;width:65px;height:32px;background-color:#1890FF"
                                size="large" @click="perviewShow">确定
                        </Button>
                    </div>


                </Modal>
            </div>
            <!--要打印得部分v-show="divPdf"-->
            <div v-show="divPdf" id="print"> <!--  要打印得区域 以id为记号-->
                <div v-for="(customerList,index) in perviewList" style="font-size: 20px;color: rgba(0,0,0,0.85)">
                    <div style="padding:15px 20px;background: #f8f8f9">
                        <Card title="身份信息" icon="ios-bookmark" :paddomg="50" :bordered="false" shadow>
                            <CellGroup>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        客户姓名：<span
                                            style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.customerName?customerList.CustomerInfo.customerName:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="8">
                                        性别：<span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.sex?customerList.CustomerInfo.sex:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="6">
                                        出生日期：<span
                                            style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.birthday?customerList.CustomerInfo.birthday:'&nbsp;'}}</span></Col>
                                </Row>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        证件类型：<span style="color: rgba(0,0,0,0.65)">居民身份证</span></Col>
                                    <Col offset="1" span="8">
                                        证件号码：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.idNumber?customerList.CustomerInfo.idNumber:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="6">
                                        国籍：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.nationality?customerList.CustomerInfo.nationality:'&nbsp;'}}</span></Col>
                                </Row>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        政治面貌：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.politicsStatus?customerList.CustomerInfo.politicsStatus:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="8">
                                        婚姻状况：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.maritalStatus?customerList.CustomerInfo.maritalStatus:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="6">
                                        移动电话：<span
                                            style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.phoneNumber?customerList.CustomerInfo.phoneNumber:'&nbsp;'}}</span></Col>
                                </Row>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        居住状况：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.livingSituation?customerList.CustomerInfo.livingSituation:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="8">
                                        身体状况：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.physicalCondition?customerList.CustomerInfo.physicalCondition:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="6">
                                        最高学历：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.educationLevel?customerList.CustomerInfo.educationLevel:'&nbsp;'}}</span></Col>
                                </Row>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        最高学位：<span
                                            style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.academicDegree?customerList.CustomerInfo.academicDegree:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="8">
                                        行政区域：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.nativePlace?customerList.CustomerInfo.nativePlace:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="6">
                                        年收入：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.yearSalary?customerList.CustomerInfo.yearSalary:'&nbsp;'}}</span></Col>
                                </Row>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        借贷人性质：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.borrowerNature?customerList.CustomerInfo.borrowerNature:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="8">
                                        是否本行股东：<span
                                            style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.isStockholder?customerList.CustomerInfo.isStockholder:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="6">
                                        本行员工标志：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.isStaff?customerList.CustomerInfo.isStaff:'&nbsp;'}}</span></Col>
                                </Row>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        是否企业主：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.isOwner?customerList.CustomerInfo.isOwner:'&nbsp;'}}</span></Col>
                                </Row>
                            </CellGroup>
                        </Card>

                    </div>
                    <div style="padding:15px 20px;background: #f8f8f9">
                        <Card title="家庭信息" icon="ios-bookmark" :paddomg="50" :bordered="false" shadow>
                            <CellGroup>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        档案编号(户号)：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.householdId?customerList.CustomerInfo.householdId:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="8">
                                        家庭人口：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.population?customerList.FamilyInfo.population:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="6">
                                        社会评价：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.socialEvaluation?customerList.FamilyInfo.socialEvaluation:'&nbsp;'}}</span></Col>

                                </Row>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        邮政编码：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.postcode?customerList.CustomerInfo.postcode:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="8">
                                        当地信用环境：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.localCredit?customerList.FamilyInfo.localCredit:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="6">
                                        家庭是否和睦：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.isHarmony?customerList.FamilyInfo.isHarmony:'&nbsp;'}}</span></Col>

                                </Row>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        维护客户经理：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.accountId?customerList.FamilyInfo.accountId:'&nbsp;'}}</span></Col>

                                    <Col offset="1" span="8">
                                        主营业务是不是自办实体：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.isSelfEntity?customerList.FamilyInfo.isSelfEntity:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="6">
                                        是否欠缴税收(除个税)：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.isOweTax?customerList.FamilyInfo.isOweTax:'&nbsp;'}}</span></Col>
                                </Row>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        生产经营能力：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.produceCapacity?customerList.FamilyInfo.produceCapacity:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="8">
                                        生产经营场景：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.produceScene?customerList.FamilyInfo.produceScene:'&nbsp;'}}</span></Col>

                                    <Col offset="1" span="6">
                                        参加保险情况：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.insuranceType?customerList.FamilyInfo.insuranceType:'&nbsp;'}}</span></Col>
                                </Row>
                                <Row class="rowStyle">

                                    <Col span="13">
                                        详细地址：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.residenceAddress?customerList.CustomerInfo.residenceAddress:'&nbsp;'}}</span></Col>
                                </Row>
                            </CellGroup>
                        </Card>
                    </div>
                    <div style="padding:15px 20px;background: #f8f8f9">
                        <Card title="职业信息" icon="ios-bookmark" :paddomg="50" :bordered="false" shadow>
                            <CellGroup>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        职业：
                                        <span style="color: rgba(0,0,0,0.65)">{{(customerList.FinanceInfo && customerList.FinanceInfo.career)?customerList.FinanceInfo.career:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="8">
                                        行业类别：
                                        <span style="color: rgba(0,0,0,0.65)">{{(customerList.FinanceInfo && customerList.FinanceInfo.industry)?customerList.FinanceInfo.industry:'&nbsp;'}}</span></Col>
                                </Row>
                            </CellGroup>
                        </Card>

                    </div>
                    <div style="padding:15px 20px;background: #f8f8f9">
                        <Card title="地址信息" icon="ios-bookmark" :paddomg="50" :bordered="false" shadow>
                            <CellGroup>
                                <Row class="rowStyle">
                                    <Col span="8">
                                        地址类型：
                                        <span style="color: rgba(0,0,0,0.65)">常住地址</span></Col>
                                    <Col span="10">
                                        地址：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.residenceAddress?customerList.CustomerInfo.residenceAddress:'&nbsp;'}}</span></Col>
                                    <Col offset="1" span="4">
                                        邮编：
                                        <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.postcode?customerList.CustomerInfo.postcode:'&nbsp;'}}</span></Col>
                                </Row>
                            </CellGroup>
                        </Card>
                    </div>
                    <div style="margin:20px 0;width: 100%;text-align: center" v-if="index<=perviewList.length-1">
                        {{index+1}}/{{perviewList.length}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import actions from '@/store/action-types'
    import {UPLOAD_API_URL} from '@/config'
    import html2Canvas from 'html2canvas'
    import JsPDF from 'jspdf'

    export default {
        data() {
            return {
                operationList: ['调查', '审核', '审批'],//批量审批按钮显示文字
                tabName: '0',//请求参数里的 审批状态 0-8
                tabTittlelist: [['待调查', '已调查'], ['待审查', '已审查', '已驳回'], ['待审批', '已通过', '已拒绝']],//标签页得头部
                zt1: [['0', '1'], ['7', '3', '4'], ['8', '5', '6']],//标签页得name值
                divPdf: false,//批量下载弹窗

                animals: {
                    animal: '',//审批结果
                    value: '',//审批意见
                    interestRate: ''//利率
                },//审批结果
                modal1: false,//批量审批弹窗
                printlist: [],//表格多选--被选中得信息
                pageNum: 1,
                pageSize: 10,
                modelTips: {
                    show: false,
                    title: '提示',
                    num: ''
                },//批量下载
                modelImg: {
                    show: false,
                    title: '附件',
                    images: [],
                    loading: false
                },//批量下载
                modelPreview: {
                    show: false,
                    title: '打印预览',
                    list: [],
                    loading: false
                },//批量下载
                pageSizeOpts: [5, 10, 15, 20],//页脚分页功能 -- 每页数据条数
                uploadObj: {
                    gridCode: null
                },//当前属于哪个网格
                model: {
                    show: false,
                    title: '你确定要删除这行内容么？',
                    id: null,
                    content: '',
                    loading: false
                },//删除弹窗
                search: {
                    type: 'customerName',
                    keyword: ''
                },//查询条件
                //打印功能,
                print: {
                    options: {
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
                                // textareas[k2].innerHTML = textareas[k2].value
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
                },
                state1: '0',//状态选择得value

                columns: [
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'customerName',
                        align: 'center',
                        minWidth: 45
                    },
                    {
                        title: '身份证号',
                        key: 'idNumber',
                        width: 180,
                        align: 'center'
                    },
                    {
                        title: '授信总额(万元)',
                        key: 'rental',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '授信开始日期',
                        key: 'beginAt',
                        align: 'center',
                        minWidth: 70,
                        // render: (h, params) => {
                        //
                        //     let data = params.row.beginAt
                        //     let offAt = ''
                        //     if (data && data.length == 8) {
                        //         offAt = data.substring(0, 4) + '-' + data.substring(4, 6) + '-' + data.substring(6, 8)
                        //     }
                        //     return h('span', {
                        //         props: {},
                        //     }, params.row.beginAt)
                        // }
                    },
                    {
                        title: '授信结束日期',
                        key: 'endAt',
                        align: 'center',
                        minWidth: 70,
                        // render: (h, params) => {
                        //
                        //     let data = params.row.endAt
                        //     let offAt = ''
                        //     if (data && data.length == 8) {
                        //         offAt = data.substring(0, 4) + '-' + data.substring(4, 6) + '-' + data.substring(6, 8)
                        //     }
                        //     return h('span', {
                        //         props: {},
                        //     }, offAt)
                        // }
                    },
                    {
                        title: '状态',
                        key: 'approvalStatus',
                        minWidth: 180,
                        render: (h, params) => {//在状态这一列里面加内容
                            let list1 = ['客户经理待调查', '客户经理已调查', '会计待审查', '会计已同意', '会计已驳回', '支行长同意', '支行长拒绝']//状态//在进度条框里展示的
                            let flag = parseInt(params.row.approvalStatus)//后台获取的状态  为数字
                            let listFlag = ['客户经理待申报', '会计待审核', '客户经理拒绝', '会计已同意', '会计已驳回', '已通过', '支行长拒绝'];//在状态列里需要展示的信息列表

                            let steps = []
                            let indexx = params.row.list.length
                            if (0 == indexx) {//如果indexx为0 那说明没有审批记录 那就认为是客户经理待调查
                                steps.push(h('Step', {
                                    props: {
                                        title: list1[0],
                                        icon: 'ios-information-circle'
                                    }
                                }))
                            } else {
                                for (let i = 1; i <= indexx; i++) {//循环遍历每一条审批记录
                                    let thisStatus = parseInt(params.row.list[i - 1].approvalResult)//结果
                                    let thisCode = parseInt(params.row.list[i - 1].approvalNode)//节点 谁审批得此数据
                                    let title = '' //步骤条每一步得头部
                                    let icon = '' //每一步得图标
                                    let time = ''//每一步得底部
                                    let status1 = 'finish'//每一步得状态 可选值为wait、process、finish、error， 默认process
                                    if (0 == thisStatus) {//同意
                                        if (3 != thisCode) {//不是支行长
                                            title = list1[thisCode]
                                        } else {//支行长
                                            title = list1[5]
                                        }
                                        icon = 'md-checkmark-circle'
                                    } else {//拒绝
                                        // if(3 == thisCode){//支行长拒绝
                                        //     title = list1[6]
                                        // }else{//会计拒绝
                                        title = list1[4]
                                        // }
                                        icon = 'md-close-circle'
                                        status1 = 'error'
                                    }

                                    if (params.row.list[i - 1].createdAt) {//处理一下或取到的审批时间
                                        let date = new Date()
                                        date.setTime(params.row.list[i - 1].createdAt)
                                        let month = date.getMonth() + 1
                                        let day = date.getDate()
                                        let hours = date.getHours()
                                        let min = date.getMinutes()
                                        time = `${date.getFullYear()}-${month >= 10 ? month : '0' + month}-${day >= 10 ? day : '0' + day} ${hours >= 10 ? hours : '0' + hours}:${min >= 10 ? min : '0' + min}`
                                    }
                                    steps.push(h('Step', {
                                        props: {
                                            title: title,
                                            content: time,
                                            icon: icon,
                                            status: status1
                                        }
                                    }))
                                }
                                if (flag == 1) {
                                    steps.push(h('Step', {
                                        props: {
                                            title: '会计待审核',
                                            icon: 'ios-information-circle',
                                            statu: 'wait'
                                        }
                                    }))
                                }
                                /* else if (flag == 3) {//因为已经没有支行长了 所以就不需要再加上 支行长待审批 状态
                                                                    steps.push(h('Step', {
                                                                        props: {
                                                                            title: '支行长待审批',
                                                                            icon: 'ios-information-circle',
                                                                            statu:'wait'
                                                                        }
                                                                    }))
                                                                }*/
                            }
                            /*  let statu = 'wait'  //当前步骤得状态
                              if (flag == 2 || flag == 4 || flag == 6) {
                                  statu = 'error'
                              } else if (flag == 5) {
                                  statu = 'finish'
                              }*/
                            let listColor = ['#1890FF', '#1890FF', ' #F5222D ', '#1890FF', ' #F5222D ', '#52C41A', ' #F5222D ']
                            return h('Poptip',
                                {
                                    props: {
                                        trigger: "click",
                                        transfer: ''
                                    },
                                    placement: "top"
                                },
                                [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-radio-button-on'
                                        },
                                        style: {
                                            color: listColor[flag]
                                        }
                                    }),
                                    h('p', {
                                        style: {
                                            display: 'inline-block',
                                            marginRight: '10px',
                                            marginLeft: '10px'
                                        },
                                        on: {
                                            click: () => {
                                                this.iconClick(params.row)
                                            }
                                        }
                                    }, listFlag[flag]),
                                    h('Icon', {
                                        props: {
                                            type: 'ios-eye-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.iconClick(params.row)
                                            }
                                        }
                                    }),
                                    h('Steps', {
                                            props: {
                                                current: indexx - 2,//当前步骤，从 0 开始计数
                                                // status: statu,//当前步骤得状态 可选值为wait、process、finish、error  默认process
                                                direction: "vertical",//水平 或者垂直
                                            },
                                            slot: "content",
                                            style: {}
                                        },
                                        steps
                                    )
                                ]
                            )
                        }
                    },
                    {
                        title: '原因',
                        key: '',
                        align: 'center'
                    },
                    {
                        title: '信贷系统报表',
                        key: '',
                        align: 'center',
                        minWidth: 50,
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
                                }, '详情')
                            ])
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        minWidth: 35,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            // this.delete(params.row)
                                            this.detail(params.row)
                                        }
                                    }
                                }, '查看')
                            ])
                        }
                    }
                ],//定义表格得每一列
                gridNameList: [],//网格数据
                list: [],//存储表格数据
                perviewList: [],//批量下载时 查询到的客户详细信息
                userData: {},//用户登录后传的参数
            }
        },
        computed: {
            ...mapState({
                person: state => state.result.resultperson,
                total: state => state.result.resulttotal
            })
        },//计算属性
        mounted() {
            // 获取列表
            var vue = this
            if ('pageNum' in this.$route.query) {
                this.pageNum = parseInt(this.$route.query.pageNum)
            }
            this.userData = JSON.parse(sessionStorage.getItem("userObj"))
            this.userData.roleId = this.userData.roles[0].roleId //把用户ID提取出来
            this.tabName = this.zt1[this.userData.roleId - 1][0] //确定标签页默认页面
            this.$store.dispatch(actions.get.GRIDNAME_LIST, {

            }).then(rep => {//获取一下网格列表
                if (rep.code == 200) {
                    vue.gridNameList = [...rep.data]
                } else if (rep.code != 204) {
                    vue.$Message.error(rep.message)
                }

            })
            this.fetchList()//每次进入页面 先执行请求 拿取数据
        },
        methods: {
            //调取此页面表格里数据
            fetchList(params = {}) {
                var vue = this
                vue.list = []
                return this.$store.dispatch(actions.get.APPROVAL_LIST, {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    orgCode: parseInt(this.userData.orgCode),
                    accountId: this.userData.accountId,
                    status: this.tabName,
                    roleId: this.userData.roleId,//this.userData.roles[0].roleId
                    gridCode: this.uploadObj.gridCode,//this.uploadObj.gridCode
                    ...params
                }).then(rep => {
                    if (rep.code == 200) {
                        vue.list = [...rep.data];

                        for (var i in vue.list) {
                            vue.list[i].list = [{}, {}, {}]
                            // vue.list[i]._disabled=true //先把所有选项给禁止选择
                            // if(indexs == 1 ){//通过当前审批人的节点来控制哪些客户可以被审批人审批
                            //     if(rep.data[i].approvalStatus == 0){
                            //         vue.list[i]._disabled=false
                            //     }
                            // }else if(indexs == 2 ){
                            //     if(rep.data[i].approvalStatus == 1){
                            //         vue.list[i]._disabled=false
                            //     }
                            // }else{
                            //     if(rep.data[i].approvalStatus == 3){
                            //         vue.list[i]._disabled=false
                            //     }
                            // }
                        }
                    } else if (rep.code != 204) {
                        vue.$Message.error(rep.message)
                    }
                })
            },

            //批量打印 因只能打印可视区域里内容 暂未用
            getPdf() {
                this.modelTips.show = false //关闭确认批量下载得弹窗
                var vue = this
                this.perviewList = []
                let len = 0
                for (let i in this.printlist) {
                    let row = this.printlist[i]
                    this.$store.dispatch(actions.get.CREDIT_LIST, '342224199910120661').then(rep => {//发送请求 根据idNumber请求这个客户得信息
                        if (rep.data.code == 200) {
                            let customer = rep.data
                            vue.perviewList.push(customer)//把拿到的所有选中得客户信息存起来
                        } else if (rep.data.code) {
                            vue.$Message.error(row.customerName + ' : ' + row.idNumber + vue.data.message)
                        }
                    })
                }
                setTimeout(() => {
                    var title = this.htmlTitle
                    html2Canvas(document.querySelector('#print'), {
                        allowTaint: true
                    }).then(function (canvas) {
                            let contentWidth = canvas.width
                            let contentHeight = canvas.height
                            let pageHeight = contentWidth / 392.28 * 841.89
                            let leftHeight = contentHeight
                            let position = 0
                            let imgWidth = 595.28  //控制pdf宽度
                            let imgHeight = 692.28 / contentWidth * contentHeight //控制pdf高度
                            let pageData = canvas.toDataURL('image/jpeg', 2.0)
                            let PDF = new JsPDF('', 'pt', 'a4')
                            if (leftHeight < pageHeight) {
                                PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                            } else {
                                while (leftHeight > 0) {
                                    PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                                    leftHeight -= pageHeight
                                    position -= 841.89
                                    if (leftHeight > 0) {
                                        PDF.addPage()
                                    }
                                }
                            }
                            PDF.save(title + '.pdf')
                        }
                    )
                    this.printlist = []
                }, 1000)

            },

            //选择按钮事件  把选中得信息存起来  selection：被选中得信息集合 数组
            printCancel(selection) {
                this.printlist = selection
                sessionStorage.setItem("printlist", JSON.stringify(this.printlist));
            },
            //切换标签页时触发
            tabsClick(name) {
                this.fetchList()
            },
            //批量下载弹窗里的确定按钮 触发
            perviewShow() {
                this.modelTips.show = false
                var vue = this
                this.perviewList = []
                let len = 0
                for (let i in this.printlist) {
                    let row = this.printlist[i]

                    this.$store.dispatch(actions.get.CREDIT_LIST, row.idNumber).then(rep => {

                        if (rep.data.code == 200) {
                            let customer = {
                                CustomerInfo: rep.data.CustomerInfo,
                                FamilyInfo: rep.data.FamilyInfo,
                                FinanceInfo: rep.data.FinanceInfo
                            }
                            vue.perviewList.push(customer)
                        } else if (rep.data.code != 204) {
                            vue.$Message.error(rep.data.message)
                        }
                        len++
                        if (len == vue.printlist.length) {
                            if (0 == vue.perviewList.length) {
                                this.$Message.error('您选择的客户皆找不到对应信息！')
                            } else {
                                setTimeout(() => {
                                    this.print.init()
                                }, 1000)
                            }
                        }
                    })
                }
            },

            //批量下载弹窗里的取消按钮
            goBack() {
                this.modelTips.show = false
            },

            //选择网格
            changeGrid(gridCode) {
                if (this.uploadObj.gridCode == gridCode) {
                    return
                }
                this.uploadObj.gridCode = gridCode
                this.tabName = this.zt1[this.userData.roleId - 1][0]
                this.fetchList()
            },

            //页脚方法：  显示第几页
            changePage(num) {
                this.pageNum = num
                this.$router.replace({query: {pageNum: this.pageNum}})
                this.fetchList()
            },

            //当搜索框为空时调用此方法  重新查询列表
            onChangeNull() {
                if ("" == this.search.keyword) {
                    // this.$router.replace({query: {pageNum: this.pageNum}})
                    this.fetchList()
                }
            },

            //与页脚配合 一页显示多少条数据
            onPageSizeChange(pageSize1) {
                this.pageSize = pageSize1
                this.$router.replace({query: {pageNum: this.pageNum}})
                this.fetchList()
            },

            //操作列-删除按钮  删除数据
            delete(row) {
                this.model.data = row
                this.model.content = row.customerName
                this.model.id = row.id
                this.model.show = true
            },
            detail(row) {
                this.$router.push('/credit/loanApproval/Detail?idNumber=' + row)
            },
            //删除数据窗口 确定删除按钮
            deleteUser() {
                this.model.loading = true
                var vue = this
                setTimeout(() => {
                    this.model.loading = false
                    this.model.show = false
                    this.$store.dispatch(actions.delete.RESULT_PERSON, this.model.id).then(rep => {
                        if (rep.data.code == 200) {
                            vue.$Message.success('删除成功')
                            vue.fetchList()
                        } else {
                            vue.$Message.error(rep.data.message)
                        }
                    })
                }, 1000)
            },

            //批量下载按钮
            onPrint() {
                if (this.printlist.length > 0) {
                    this.modelTips.num = this.printlist.length
                    this.modelTips.show = true
                } else {
                    this.$Message.error('请先选择客户信息')
                }
            },
            //查询按钮
            onSearch() {//查询
                this.fetchList({
                    [this.search.type]: this.search.keyword
                })
            },
            //信贷系统报表列--Icon点击弹出信息窗口
            iconClick(row) {
                var vue = this
                if (!row.list[0].createdAt) {
                    this.$store.dispatch(actions.get.APPROVAL_RECORD, row.idNumber).then(rep => {
                        if (rep.data.code == 200) {
                            row.list = [...rep.data.data]
                        } else if (rep.data.code != 204) {
                            vue.$Message.error(rep.data.message)
                        }
                    })
                }

            },

            //-查看信贷系统报表
            edit(row) {
                this.$router.push('/credit/loanApproval/tatement?idNumber=' + row.idNumber)
                // sessionStorage.setItem("rowTatement", JSON.stringify(row));

            },

            //批量审批弹窗-确定按钮按钮
            ok() {
                var vue = this
                let startReg = /^\s*!/;
                let endReg = /\s*$/;
                let str = vue.animals.value.replace(startReg, '').replace(endReg, '')
                if ('' == vue.animals.animal) {
                    this.$Message.error("请选择结果!");
                } else if (1 != vue.userData.roleId && '1' == vue.animals.animal && '' == str) {
                    this.$Message.error("请填写审批意见!");
                } else {
                    if (1 == vue.userData.roleId && '' == vue.animals.interestRate) {
                        this.$Message.error("请填写利率!");
                        return
                    }
                    //按照后台要求格式制作请求参数
                    let printlists = vue.printlist
                    let payload = {//这个是请求得参数 参数格式为  一个对象 里面有三个数组
                        'list': [],
                        'roleIds': vue.userData.roleId ,//角色  可为 1：客户经理 2会计 3支行长  可多选
                        'customerCreditDetailList': [],
                        interestRate: vue.animals.interestRate
                    }
                    for (let i in printlists) {
                        let listApproval = {
                            approvalOpinion: vue.animals.value,//审批意见
                            approvalResult: vue.animals.animal,
                            approvalName: vue.userData.accountName,
                            idNumber: printlists[i].idNumber,
                            approvalAccountId: vue.userData.accountId,
                            approvalNode: vue.userData.roleId  //审批节点  可为 1：客户经理 2会计 3支行长
                        }
                        let customerCreditDetail = {
                            id: printlists[i].id,
                            approvalStatus: printlists[i].approvalStatus,
                            idNumber: printlists[i].idNumber,
                            customerName: printlists[i].customerName
                        }
                        payload.list.push(listApproval)
                        payload.customerCreditDetailList.push(customerCreditDetail)
                    }

                    this.$store.dispatch(actions.post.APPROVAL_RECORD, payload).then(rep => {//发送请求
                        if (rep.data.code == 200) {
                            vue.$Message.success("审核成功！");
                            vue.modal1 = false
                            vue.fetchList()
                            // this.$refs.selection.selectAll(false);//把选项框清空  因为此数据已不在此列表 所以不需要清空
                        } else {
                            this.$Message.success(rep.data.message);
                        }
                    })
                }
            },

            //批量审批弹窗-取消按钮
            cancel() {
                this.animals.value = ''
                this.animals.animal = ''
                this.modal1 = false
            },

            //批量审批按钮
            onApproval() {
                this.animals.value = ''
                this.animals.animal = ''
                if (0 < this.printlist.length) {
                    this.modal1 = true
                } else {
                    this.$Message.error('请选择审批客户！')
                }
            },

            //选择状态的select的回调函数 返回的是当前选项的值
            poi(row) {
                this.tabName = row
                this.fetchList(row)
            }
        }
    }
</script>

<style lang="scss">
    .loanBreadcrumb {
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        line-height: 54px;
        padding-left: 20px;
        border-radius: 4px;
        border: 1px solid #eee;
    }

    .loanApproval-top {
        margin: 20px;
        padding-left: 10px;
        height: 68px;
        line-height: 68px;
        background-color: #fff;
        border: 1px solid #eee;
        button:hover, button.active {
            background: #1890FF;
            border-radius: 2px;
            color: #fff;
        }
    }

    .rowStyle {
        margin: 15px 0;
    }

    .loanApproval-page {
        margin: 5px 24px 20px 24px;
        padding: 10px 20px 20px 20px;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        .search {
            height: 32px;
            margin-bottom: 10px;
            .search-input {
                float: left;
                width: 350px;
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
            font-size: 14px;
            Button {
                color: #2d8cf0;
            }
            span {
                font-size: 14px;
            }
            p {
                font-size: 14px;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                line-height: 22px;
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
</style>
