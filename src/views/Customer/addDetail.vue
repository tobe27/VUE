<template>
  <div class="customeraddDetail">
    <!-- <div class="customerBreadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/customer">客户管理</BreadcrumbItem>
        <BreadcrumbItem v-if="this.flag">编辑</BreadcrumbItem>
        <BreadcrumbItem v-if="!this.flag">新建</BreadcrumbItem>
      </Breadcrumb>
    </div> -->
    <div class="adddiv">
      <div class="tabsForm">
        <Form ref="form" :model="form" :rules="ruleValidate" :label-width="130">
          <div class="divpage">
            <Row>
              <Col span="8">
                <FormItem label="姓名" prop="memberName">
                  <Input v-model="form.memberName" placeholder="请输入姓名"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="与该客户的关系" prop="relationship">
                  <Select v-model="form.relationship" placeholder="请选择关系类型">
                    <Option value="祖父">祖父</Option>
                    <Option value="祖母">祖母</Option>
                    <Option value="父亲">父亲</Option>
                    <Option value="母亲">母亲</Option>
                    <Option value="丈夫">丈夫</Option>
                    <Option value="妻子">妻子</Option>
                    <Option value="儿子">儿子</Option>
                    <Option value="女儿">女儿</Option>
                    <Option value="孙子">孙子</Option>
                    <Option value="孙女">孙女</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="出生日期" prop="birthday">
                  <DatePicker type="date" placeholder="请选择出生日期" v-model="form.birthday"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="证件类型" prop="idType">
                  <Select v-model="form.idType" placeholder="请选择证件类型">
                    <Option value="中国居民身份证">中国居民身份证</Option>
                    <Option value="外国人永久居留身份证">外国人永久居留身份证</Option>
                    <Option value="港澳台居民居住证">港澳台居民居住证</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="证件号码" prop="idNumber">
                  <Input v-model="form.idNumber" placeholder="请输入18位有效证件号码"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="民族" prop="nation">
                  <Input v-model="form.nation" placeholder="请输入民族"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="是否户主" prop="isHouseholdHead">
                  <RadioGroup v-model="form.isHouseholdHead">
                    <Radio label="是">是</Radio>
                    <Radio label="否">否</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="联系方式" prop="contact">
                  <Input v-model="form.contact" placeholder="请输入11有效手机号码"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="16">
                <FormItem label="居住地址" prop="address">
                  <Input v-model="form.address" placeholder="请输入居住地址"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="村委会评价" prop="remark">
                  <Input v-model="form.remark" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="请输入村委会评价"></Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="buttonpage">
            <FormItem>
              <Button type="primary" style="margin-left: 8px" @click="handleSubmit('form')">保存</Button>
              <Button @click="goBack()" style="margin-left: 8px">返回</Button>
            </FormItem>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>

import actions from '@/store/action-types'
import { UPLOAD_API_URL } from '@/config'
const user=JSON.parse(sessionStorage.getItem('userObj'));

export default {
  user,
  name: 'customeraddDetail',
  data () {
    return {
      add:{},
      form:{},
      ruleValidate:{
        memberName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { type: 'string', min: 2,max: 20, message: '姓名长度为2-20位', trigger: 'blur' }
        ],
        relationship: [
          { required: true, message: '与该客户关系不能为空', trigger: 'change' },
        ],
        birthday: [
          { required: true,type:'date', message: '生日不能为空', trigger: 'change' }
        ],
        idType: [
          { required: true, message: '证件类型不能为空', trigger: 'change' },
        ],
        idNumber: [
          { required: true, message: '证件号码不能为空', trigger: 'blur' },
          { type: 'string', min: 18,max: 18, message: '输入18位证件号码', trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '民族不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 5, message: '民族长度为1-5位', trigger: 'blur' }
        ],
        isHouseholdHead: [
          { required: true, message: '请确定是否户主', trigger: 'change' },
        ],
        contact: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' },
          { type: 'string', min: 11,max: 11, message: '输入11有效手机号码', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '居住地址不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 100, message: '居住地址不能超过100字', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '村委会评价不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 500, message: '村委会评价500字', trigger: 'blur' }
        ]
      }
    }

  },
  mounted () {
    if ('memberId' in this.$route.query) {
      var vue=this
      this.flag=true
      this.getDetail(this.$route.query.memberId).then(rep => {
          vue.form = { ...rep.data }
          for (var k in vue.form) {
              if (typeof (vue.form[k]) === 'number') {
                  vue.form[k] = vue.form[k] + ''
              }
          }
          if ( vue.form.birthday && vue.form.birthday.length == 8 ) {
              vue.form.birthday=vue.form.birthday.substring(0,4)+"-"+vue.form.birthday.substring(4,6)+"-"+vue.form.birthday.substring(6)
          }
      })
    }
  },
  
  methods: {
    getDetail (memberId) {
      var vue = this
      return this.$store.dispatch(actions.get.MEMBER_PERSON, memberId)
    },
    handleSubmit(name){
      var vue = this
      this.$refs[name].validate((valid) => {
        if(valid){
          const payload = {...this[name]}
          const date = new Date(payload.birthday)
          const month = date.getMonth() + 1
          const day = date.getDate()
          payload.birthday = `${date.getFullYear()}${month >= 10 ? month : '0' + month}${day >= 10 ? day : '0' + day}`
          this.form.birthday=payload.birthday
          if ('customerId' in this.$route.query){
            this.form.customerId=this.$route.query.customerId
          }
          if ('memberId' in this.$route.query) {
            this.$store.dispatch(actions.put.MEMBER_PERSON, this.form).then(rep => {
              if (rep.data.code != 200) {
                vue.$Message.error(rep.data.message)
              } else {
                vue.$Message.success('编辑成功')
                vue.goBack()
              }
            })
          } else {
            this.$store.dispatch(actions.post.MEMBER_PERSON, this.form).then(rep => {
              if (rep.data.code != 200) {
                vue.$Message.error(rep.data.message)
              } else {
                vue.$Message.success('添加成功')
                vue.goBack()
                
              }
            })
          }
        }else{
          this.$Message.error('表单验证错误')
        }
      })
    },
    goBack(){
      this.$router.push('/customer/InDetail?customerId=' + this.$route.query.customerId)
    }
  }
}
</script>

<style lang="scss">
.customeraddDetail {
  padding: 20px;
  background:rgba(240,242,245,1);
  .adddiv {
    background-color: #fff;
    padding-right: 20px;
    padding-top: 20px;
  }
}
</style>
