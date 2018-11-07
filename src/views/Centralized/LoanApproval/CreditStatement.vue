<template>
    <div class="creditDiv">
        <!--信贷系统报表-->
        <div class="loanApproval-Breadcrumb">
            <Breadcrumb style="float: left">
                <BreadcrumbItem>集中授信</BreadcrumbItem>
                <BreadcrumbItem to="/credit/loanApproval">贷款审批</BreadcrumbItem>
                <BreadcrumbItem>信贷系统报表</BreadcrumbItem>
            </Breadcrumb>
            <Button type="primary" style="float: right;margin: 6px" @click="getPdf()">下载</Button>
        </div>
        <div id="pdfDom"> <!--  要打印得区域 以id为记号-->
            <div>
                <Card title="身份信息" icon="ios-bookmark" :paddomg="50" :bordered="false" shadow>
                    <CellGroup>
                        <Row class="rowStyle">
                            <Col span="3" style="text-align: right">
                            客户姓名：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.customerName?list.CustomerInfo.customerName:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            性别：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.sex?list.CustomerInfo.sex:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            证件类型：</Col>
                            <Col span="4">
                            {{list.CustomerInfo.idNumber?'居民身份证':'&nbsp;'}}</Col>
                            <Col span="2" style="text-align: right">
                            证件号码：</Col>
                            <Col span="2">
                            {{list.CustomerInfo.idNumber?list.CustomerInfo.idNumber:'&nbsp;'}}</Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="3" style="text-align: right">
                            出生日期：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.birthday?list.CustomerInfo.birthday:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            国籍：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.nationality?list.CustomerInfo.nationality:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            政治面貌：</Col>
                            <Col span="4">
                            {{list.CustomerInfo.politicsStatus?list.CustomerInfo.politicsStatus:'&nbsp;'}}</Col>
                            <Col span="2" style="text-align: right">
                            婚姻状况：</Col>
                            <Col span="2">
                            {{list.CustomerInfo.maritalStatus?list.CustomerInfo.maritalStatus:'&nbsp;'}}</Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="3" style="text-align: right">
                            移动电话：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.phoneNumber?list.CustomerInfo.phoneNumber:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            居住状况：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.livingSituation?list.CustomerInfo.livingSituation:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            身体状况：</Col>
                            <Col span="4">
                            {{list.CustomerInfo.physicalCondition?list.CustomerInfo.physicalCondition:'&nbsp;'}}</Col>
                            <Col span="2" style="text-align: right">
                            最高学历：</Col>
                            <Col span="2">
                            {{list.CustomerInfo.educationLevel?list.CustomerInfo.educationLevel:'&nbsp;'}}</Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="3" style="text-align: right">
                            最高学位：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.academicDegree?list.CustomerInfo.academicDegree:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            行政区域：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.nativePlace?list.CustomerInfo.nativePlace:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            年收入：</Col>
                            <Col span="4">
                            {{list.CustomerInfo.yearSalary?list.CustomerInfo.yearSalary:'&nbsp;'}}</Col>
                            <Col span="2" style="text-align: right">
                            借贷人性质：</Col>
                            <Col span="2">
                            {{list.CustomerInfo.borrowerNature?list.CustomerInfo.borrowerNature:'&nbsp;'}}</Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="3" style="text-align: right">
                            是否本行股东：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.isStockholder?list.CustomerInfo.isStockholder:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            本行员工标志：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.isStaff?list.CustomerInfo.isStaff:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            是否企业主：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.isOwner?list.CustomerInfo.isOwner:'&nbsp;'}}</Col>
                        </Row>
                    </CellGroup>
                </Card>

            </div>
            <div>
                <Card title="家庭信息" icon="ios-bookmark" :paddomg="50" :bordered="false" shadow>
                    <CellGroup>
                        <Row class="rowStyle">
                            <Col span="3" style="text-align: right">
                            档案编号(户号)：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.householdId?list.CustomerInfo.householdId:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            家庭人口：</Col>
                            <Col span="3">
                            {{list.FamilyInfo.population?list.FamilyInfo.population:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            详细地址：</Col>
                            <Col span="9">
                            {{list.CustomerInfo.residenceAddress?list.CustomerInfo.residenceAddress:'&nbsp;'}}</Col>

                        </Row>
                        <Row class="rowStyle">
                            <Col span="3" style="text-align: right">
                            邮政编码：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.postcode?list.CustomerInfo.postcode:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            当地信用环境：</Col>
                            <Col span="3">
                            {{list.FamilyInfo.localCredit?list.FamilyInfo.localCredit:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            家庭是否和睦：</Col>
                            <Col span="3">
                            {{list.FamilyInfo.isHarmony?list.FamilyInfo.isHarmony:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            维护客户经理：</Col>
                            <Col span="3">
                            {{list.FamilyInfo.accountId?list.FamilyInfo.accountId:'&nbsp;'}}</Col>

                        </Row>
                        <Row class="rowStyle">
                            <Col span="4" style="text-align: right">
                            主营业务是不是自办实体：</Col>
                            <Col span="2">
                            <!--{{list.CustomerInfo.isSelfEntity?list.CustomerInfo.householdId:'&nbsp;'}}</Col>-->
                            {{list.FamilyInfo.isSelfEntity?list.FamilyInfo.isSelfEntity:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            是否欠缴税收(除个税)：</Col>
                            <Col span="3">
                            {{list.FamilyInfo.isOweTax?list.FamilyInfo.isOweTax:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            生产经营能力：</Col>
                            <Col span="4">
                            {{list.FamilyInfo.produceCapacity?list.FamilyInfo.produceCapacity:'&nbsp;'}}</Col>
                            <Col span="2" style="text-align: right">
                            生产经营场景：</Col>
                            <Col span="2">
                            {{list.FamilyInfo.produceScene?list.FamilyInfo.produceScene:'&nbsp;'}}</Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="3" style="text-align: right">
                            参加保险情况：</Col>
                            <Col span="3">
                            {{list.FamilyInfo.insuranceType?list.FamilyInfo.insuranceType:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            社会评价(村委会评价)：</Col>
                            <Col span="12">
                            {{list.FamilyInfo.socialEvaluation?list.FamilyInfo.socialEvaluation:'&nbsp;'}}</Col>
                        </Row>
                    </CellGroup>
                </Card>
            </div>
            <div>
                <Card title="职业信息" icon="ios-bookmark" :paddomg="50" :bordered="false" shadow>
                    <CellGroup>
                        <Row class="rowStyle">
                            <Col span="3" style="text-align: right">
                            职业：</Col>
                            <Col span="3">
                            {{(list.FinanceInfo && list.FinanceInfo.career)?list.FinanceInfo.career:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            行业类别：</Col>
                            <Col span="3">
                            {{(list.FinanceInfo && list.FinanceInfo.industry)?list.FinanceInfo.industry:'&nbsp;'}}</Col>
                        </Row>
                    </CellGroup>
                </Card>

            </div>
            <div>
                <Card title="地址信息" icon="ios-bookmark" :paddomg="50" :bordered="false" shadow>
                    <CellGroup>
                        <Row class="rowStyle">
                            <Col span="3" style="text-align: right">
                            地址类型：</Col>
                            <Col span="3">
                            {{list.CustomerInfo.residenceAddress?'常住地址':'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            地址：</Col>
                            <Col span="7">
                            {{list.CustomerInfo.residenceAddress?list.CustomerInfo.residenceAddress:'&nbsp;'}}</Col>
                            <Col span="3" style="text-align: right">
                            邮编：</Col>
                            <Col span="4">
                            {{list.CustomerInfo.postcode?list.CustomerInfo.postcode:'&nbsp;'}}</Col>

                        </Row>
                    </CellGroup>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
    import html2Canvas from 'html2canvas'
    import JsPDF from 'jspdf'
    import {mapState} from 'vuex'
    import actions from '@/store/action-types'

    export default {
        name: "credit-statement",
        data() {
            return {

                htmlTitle: '',
                list: {
                    FinanceInfo:'',
                    CustomerInfo:'',
                    FamilyInfo:''

                },//客户信息
            }
        },
        mounted() {
            // let idIndex = JSON.parse(sessionStorage.getItem("rowTatement")).idNumber//拿到存在session里的数据 也就是要显示谁的信贷系统报表
            let idNumber=this.$route.query.idNumber

            this.$store.dispatch(actions.get.CREDIT_LIST,idNumber ).then(rep => {//请求客户个人信息
                if(200 == rep.data.code){
                    this.list.CustomerInfo=rep.data.CustomerInfo
                    this.list.FamilyInfo=rep.data.FamilyInfo
                    this.list.FinanceInfo=rep.data.FinanceInfo
                    // for(){}
                }else{
                    this.$router.go(-1)
                    this.$Message.error(rep.data.message)
                }

                // this.htmlTitle=rep.data.CustomerInfo.customerName+'的信贷系统报表'
            })
        },
        methods: {
            getPdf() {
                var title = this.list.CustomerInfo.customerName+'-信贷系统报表'
                html2Canvas(document.querySelector('#pdfDom'), {
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
            }
        }
    }
</script>

<style scoped>
    .loanApproval-Breadcrumb {
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        font-family:PingFangSC-Regular;
        line-height: 54px;
        padding-left: 20px;
        border-radius: 4px;
        border: 1px solid #eee;
    }
    .creditDiv {
        font-size: 14px;
    }

    .rowStyle {
        margin: 12px 0;
    }
    #pdfDom > div{
        padding:10px 24px 0 24px;
        background: #f8f8f9
    }
</style>
