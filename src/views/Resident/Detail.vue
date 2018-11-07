<template>
  <!--
  户籍管理--新建用户版块
  -->
  <div class="allDiv">
  <div class="residentBreadcrumb">
    <Breadcrumb>
      <BreadcrumbItem v-if="this.routeFlag" :to="url">客户管理</BreadcrumbItem>
      <BreadcrumbItem v-if="!this.routeFlag" to="/resident">户籍管理</BreadcrumbItem>
      <BreadcrumbItem v-if="this.flag">编辑</BreadcrumbItem>
      <BreadcrumbItem v-if="!this.flag">新建</BreadcrumbItem>
    </Breadcrumb>
  </div>
  <div class="residentForm">
    <Form ref="form" :model="form" :rules="ruleValidate" >
      <Row>
        <Col span="7">
          <FormItem label="姓名" prop="residentName">
            <Input v-model="form.residentName" placeholder="请输入姓名..."></Input>
          </FormItem>
        </Col>
        <Col offset="1" span="7">
          <FormItem label="民族" prop="nation">
            <Input v-model="form.nation" placeholder="请输入民族..."></Input>
          </FormItem>
        </Col>
        <Col offset="1" span="7">
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="form.sex" style="width: 100%">
              <Radio label="男">男</Radio>
              <Radio label="女">女</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="7">
          <FormItem label="证件号码" prop="idNumber">
            <Input v-model="form.idNumber" placeholder="请输入证件号码..."></Input>
          </FormItem>
        </Col>
        <Col offset="1" span="7">
          <FormItem label="联系方式" prop="contact">
            <Input v-model="form.contact" placeholder="请输入联系方式..."></Input>
          </FormItem>
        </Col>
        <Col offset="1" span="7">
          <FormItem label="出生日期" prop="birthdate">
            <DatePicker type="date" placeholder="请输入出生日期" v-model="form.birthdate" style="width: 100%"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="7">
          <FormItem label="户别" prop="householdType">
                <Select v-model="form.householdType" placeholder="请选择户别..." >
                  <Option value="居民家庭户">居民家庭户</Option>
                  <Option value="居民集体户">居民集体户</Option>
                </Select>
          </FormItem>
        </Col>
        <Col offset="1" span="7">
          <FormItem label="户号" prop="householdId">
            <Input v-model="form.householdId" placeholder="请输入户号..."></Input>
          </FormItem>
        </Col>
        <Col offset="1" span="7">
          <FormItem label="户主关系" prop="relationship">
            <Input v-model="form.relationship" placeholder="请输入户主关系..."></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="7">
          <FormItem label="地址" prop="address">
            <Input v-model="form.address" placeholder="请输入地址..."></Input>
          </FormItem>
        </Col>
        <Col offset="1" span="7">
          <FormItem label="网格名称" prop="gridCode">
            <Input v-model="form.gridName" placeholder="请输入网格名称..." readonly></Input>
          </FormItem>
        </Col>
        <Col offset="1" span="7">
          <FormItem label="纳入名单库" prop="isInList">
            <RadioGroup v-model="form.isInList" style="width: 100%">
              <Radio label="是">是</Radio>
              <Radio label="否">否</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="7">
          <FormItem label="备注" prop="remark">
            <Input v-model="form.remark" type="textarea" :rows="2" placeholder="请输入备注..." />
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button type="primary" @click="handleSubmit('form')">提交</Button>
        <Button @click="goBack" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
  </div>
</template>

<script>
import actions from '@/store/action-types'

export default {
  name: 'Detail',
  data () {
    return {
      flag:false,
      routeFlag:false,
      url:'',
      form: {},
      ruleValidate: {
        residentName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { type: 'string', min: 2,max: 20, message: '姓名长度为2-20位', trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '民族不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 5, message: '民族长度为1-5位', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'blur' }
        ],
        birthdate: [
          { required: true, type:'date', message: '出生日期不能为空', trigger: 'change'}
        ],
        idNumber: [
          { required: true, message: '证件号码不能为空', trigger: 'blur' },
          { type: 'string', min: 18,max: 18, message: '身份证号长度为18位', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '联系方式不能为空', trigger: 'blur' },
          { type: 'string', min: 11,max: 11,pattern:'^1[34578]\\d{9}', message: '手机号码必须是1开头11位手机号', trigger: 'blur' }
        ],
        householdType: [
          { required: true, message: '户别不能为空', trigger: 'blur' }
        ],
        householdId: [
          { required: true, message: '户号不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '户号最大长度为20位', trigger: 'blur' }
        ],
        relationship: [
          { required: true, message: '户主关系不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 10, message: '户号最大长度为10位', trigger: 'blur' }
        ],
        isInList: [
          { required: true, message: '纳入库名单不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 100, message: '地址最大长度为100位', trigger: 'blur' }
        ],
        career: [
          { required: true, message: '职业不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '职业最大长度为20位', trigger: 'blur' }
        ],
        remark: [
          { required: false},
          { type: 'string', min: 0,max: 100, message: '备注最大长度为100位', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
      //从路由中获取参数
      if( 'gridCode' in this.$route.query ){
            this.form = { gridCode : this.$route.query.gridCode,
                           gridName : this.$route.query.gridName }
      }
      if ('residentId' in this.$route.query) {
          var vue=this
          this.flag=true
          this.getDetail(this.$route.query.residentId).then(rep => {
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
    if ('householdId' in this.$route.query) {
          this.routeFlag=true
          this.form.householdId = this.$route.query.householdId+''
          sessionStorage.setItem('fromCustomerToResident',1)
          this.url = '/customer/InDetail?customerId=' + this.$route.query.customerId
    }
  },
  methods: {
    getDetail (id) {
      var vue = this
      return this.$store.dispatch(actions.get.RESIDENT_PERSON, id)
    },
    handleSubmit (name) {
        var vue = this
        this.$refs[name].validate((valid) => {
            if(valid){
                const payload = {...this[name]}
                const date = new Date(payload.birthdate)
                const month = date.getMonth() + 1
                const day = date.getDate()
                payload.birthdate = `${date.getFullYear()}${month >= 10 ? month : '0' + month}${day >= 10 ? day : '0' + day}`
                this.form.birthdate=payload.birthdate
                if ('gridCode' in this.$route.query){
                  this.form.gridCode=this.$route.query.gridCode
                }
                if ('residentId' in this.$route.query) {
                    this.$store.dispatch(actions.put.RESIDENT_PERSON, this.form).then(rep => {
                        if (rep.data.code != 200) {
                            vue.$Message.error(rep.data.message)
                        } else {
                            vue.$Message.success('编辑成功')
                            vue.$router.go(-1)
                        }
                    })
                } else {
                    this.$store.dispatch(actions.post.RESIDENT_PERSON, payload).then(rep => {
                        if (rep.data.code != 200) {
                            vue.$Message.error(rep.data.message)
                        } else {
                            vue.$Message.success('添加成功')
                            vue.$router.go(-1)
                        }
                    })
                }
            }else{
                this.$Message.error('表单验证错误')
            }
        })
    },
    goBack(){
      if ('householdId' in this.$route.query) {
        sessionStorage.setItem('fromCustomerToResident',1)
        this.$router.push('/customer/InDetail?customerId=' + this.$route.query.customerId)
      }else{
        this.$router.go(-1)
      }

    }
  }
}
</script>

<style lang="scss">
  .allDiv {
    .residentBreadcrumb {
      height: 54px;
      background-color: #fff;
      font-size: 14px;
      font-family:PingFangSC-Regular;
      line-height: 54px;
      padding-left: 20px;
      border-radius: 4px;
      border: 1px solid #eee;
    }
    .residentForm {
      margin: 24px;
      padding: 20px;
      background-color: #fff;
      .ivu-form-item-label {
        font-size: 14px;
      }
      .ivu-radio-group-item {
        font-size: 14px;
      }
    }
  }

</style>
