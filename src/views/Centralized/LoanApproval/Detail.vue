<template>
    <div>
        <div class="loan-Breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>集中授信</BreadcrumbItem>
                <BreadcrumbItem to="/credit/loanApproval">贷款审批</BreadcrumbItem>
                <BreadcrumbItem>信贷系统报表</BreadcrumbItem>
            </Breadcrumb>

            <Button type="primary"  style="float: right;margin: 6px;" @click="onApproval()">审查</Button>
            <Button  style="float: right;margin: 6px;" @click="onApproval()">返回</Button>
        </div>
        <div class="customerDet">

            <div class="table">
                <Tabs>
                    <TabPane label="申请表" name="name1">
                        <div class="content">
                            <img :src="sqb" style="width: 100%;"/>
                        </div>
                    </TabPane>
                    <TabPane label="合同" name="name2">
                        <div class="content">
                            <div class="demo-upload-list" v-for="(image,imgIndex) in ht">
                                <img :src="image.baseCode">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(imgIndex)"></Icon>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="客户详情" name="name3">
                        <customerDetail></customerDetail>
                    </TabPane>
                </Tabs>
                <Modal title="预览" v-model="visible.show" footer-hide width="640px">
                    <div>
                        <div style="position:relative;z-index:9999;top:200px;">
                            <Icon type="ios-arrow-back" size="50" style="float: left;cursor:pointer;"
                                  v-if="visible.imgIndex!=0" @click="handleView(visible.imgIndex-1)"/>
                            <Icon type="ios-arrow-forward" size="50" style="float: right;cursor:pointer;"
                                  v-if="visible.imgIndex!=(visible.len-1)" @click="handleView(visible.imgIndex+1)"/>
                        </div>
                        <img :src="visible.baseCode" style="width: 100%;margin-top: -50px;">
                    </div>
                </Modal>
                <!--批量审批弹窗-->
                <Modal v-model="model1" title="审核" footer-hide>
                    <Card :bordered="false" dis-hover>
                        结果:
                        <RadioGroup v-model="animals.animal" style="margin-left: 20px">
                            <Radio label="0" style="margin-left: 40px">同意</Radio>
                            <Radio label="1" style="margin-left: 60px">驳回</Radio>
                        </RadioGroup>
                    </Card>
                    <Card :bordered="false" dis-hover  v-show="animals.animal =='1'">
                        <span>审核意见：</span>
                        <Input style="width:300px;margin-left: 25px" v-model.trim="animals.value"
                               type="textarea" :rows="3" placeholder="请输入您的意见...."/>
                    </Card>
                    <div style="width: 100%;text-align: right">
                        <Button style="margin-left: auto;" type="primary" @click="ok">确认</Button>
                        <Button style="margin-left: 20px" type="primary" @click="cancel">取消</Button>
                    </div>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>
    import actions from '@/store/action-types'
    import customerDetail from '../../Customer/Detail.vue'

    export default {
        data() {
            return {
                sqb: '',
                animals:{
                    value:'',
                    animal:''
                },//审批结果和意见
                model1:false,
                ht: [{}],
                visible: {
                    baseCode: '',
                    show: false,
                    imgIndex: 0,
                    len: 0
                },
                userData:{}
            }
        },
        mounted() {
            let vue = this
            vue.userData = JSON.parse(sessionStorage.getItem("userObj"))
            vue.userData.roleId = vue.userData.roles[0].roleId //把用户ID提取出来
            this.$store.dispatch(actions.get.IMAGE_LIST, {
                idNumber: this.$route.query.idNumber,
                type: '4.2'
            }).then(rep => {
                if (rep.data.code != 200 && rep.data.code != 204) {
                    vue.$Message.error(rep.data.message)
                } else {
                    vue.sqb = rep.data.data[0].baseCode
                }
            })
            this.$store.dispatch(actions.get.IMAGE_LIST, {
                idNumber: this.$route.query.idNumber,
                type: '4.1'
            }).then(rep => {
                if (rep.data.code != 200 && rep.data.code != 204) {
                    vue.$Message.error(rep.data.message)
                } else {
                    vue.ht = rep.data.data
                }
            })

        },
        methods: {
            handleView(imgIndex) {
                this.visible.baseCode = this.ht[imgIndex].baseCode;
                this.visible.show = true;
                this.visible.imgIndex = imgIndex;
                this.visible.len = this.ht.length
            },
            ok() {
                let idw=this.$route.query.idNumber
                console.log(idw)
                var vue = this
                let startReg = /^\s*!/;
                let endReg = /\s*$/;
                let str = vue.animals.value.replace(startReg, '').replace(endReg, '')
                if ('' == vue.animals.animal) {
                    this.$Message.error("请选择结果!");
                } else if (1 != vue.userData.roleId && '1' == vue.animals.animal && '' == str) {
                    this.$Message.error("请填写审批意见!");
                } else {
                    //按照后台要求格式制作请求参数
                    let printlists = vue.printlist
                    let payload = {//这个是请求得参数 参数格式为  一个对象 里面有三个数组
                        'list': [{
                            approvalOpinion: vue.animals.value,//审批意见
                            approvalResult: vue.animals.animal,
                            approvalName: vue.userData.accountName,
                            idNumber: id ,
                            approvalAccountId: vue.userData.accountId,
                            approvalNode: vue.userData.roleId  //审批节点  可为 1：客户经理 2会计 3支行长
                        }],
                        'roleIds': [1, 2, 3],//角色  可为 1：客户经理 2会计 3支行长  可多选
                        'customerCreditDetailList': [{
                            id: printlists[i].id,
                            approvalStatus: printlists[i].approvalStatus,
                            idNumber: printlists[i].idNumber,
                            customerName: printlists[i].customerName
                        }],
                        interestRate: vue.animals.interestRate
                    }

                    // this.$store.dispatch(actions.post.APPROVAL_RECORD, payload).then(rep => {//发送请求
                    //     if (rep.data.code == 200) {
                    //         vue.$Message.success("审核成功！");
                    //         vue.modal1 = false
                    //         vue.fetchList()
                    //         // this.$refs.selection.selectAll(false);//把选项框清空  因为此数据已不在此列表 所以不需要清空
                    //     } else {
                    //         this.$Message.success(rep.data.message);
                    //     }
                    // })
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
                this.model1 = true
                this.$router.push('/credit/loanApproval/file-test?idNumber=123' )
            },
        },
        components: {
            customerDetail
        }
    }
</script>

<style lang="scss">
    .customerDet {
        background-color: #fff;
        margin: 24px;
        .table {
            margin: 10px;
            .content {
                margin: 20px;
                img {
                    width: 100%;
                }
                .demo-upload-list {
                    display: inline-block;
                    width: 120px;
                    height: 120px;
                    text-align: center;
                    line-height: 120px;
                    border: 1px solid transparent;
                    border-radius: 4px;
                    overflow: hidden;
                    background: #fff;
                    position: relative;
                    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
                    margin-right: 4px;
                }
                .demo-upload-list img {
                    width: 100%;
                    height: 100%;
                }
                .demo-upload-list-cover {
                    display: none;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(0, 0, 0, .6);
                }
                .demo-upload-list:hover .demo-upload-list-cover {
                    display: block;
                }
                .demo-upload-list-cover i {
                    color: #fff;
                    font-size: 35px;
                    cursor: pointer;
                    margin: 35px 2px;
                }
            }
        }
    }
    .loan-Breadcrumb {
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        font-family:PingFangSC-Regular;
        line-height: 54px;
        padding-left: 20px;
        border-radius: 4px;
        border: 1px solid #eee;
        div{
            display: inline-block;
        }

    }
</style>
