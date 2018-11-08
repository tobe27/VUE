<template>
  <!--
  面谈面签表
  -->
  <div class="form">
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
      <Row>
        <Col span="8">
          <FormItem label="客户姓名" prop="customerName">
            <Input v-model="form.customerName" placeholder="请输入客户姓名"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="身份证号" prop="idNumber">
            <Input v-model="form.idNumber" placeholder="请输入身份证号"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="联系方式" prop="phoneNumber">
            <Input v-model="form.phoneNumber" placeholder="请输入联系方式"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="网格编号" prop="gridCode">
            <Input v-model="form.gridCode" placeholder="请输入网格编号"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="授信开始日期" >
            <DatePicker type="date" prop="beginAt" placeholder="请输入授信开始日期" v-model="form.beginAt"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="授信总额" prop="rental">
            <Input v-model="form.rental" placeholder="请输入授信总额"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="授信结束日期" >
            <DatePicker type="date" prop="endAt" placeholder="请输入授信结束日期" v-model="form.endAt"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="备注" prop="comment">
            <Input v-model="form.comment" placeholder="请输入备注"></Input>
          </FormItem>
        </Col>
         <Col span="8">
          <FormItem label="地址" prop="address">
            <Input v-model="form.address" placeholder="请输入地址"></Input>
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button type="primary" @click="handleSubmit('form')">提交</Button>
        <Button @click="goBack" style="margin-left: 8px">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import actions from '@/store/action-types'

export default {
  name: 'Detail',
  data () {
    return {
      form: {},
      ruleValidate: {
        customerName: [
          { required: true, message: '客户姓名不能为空', trigger: 'blur' }
        ],
        idNumber: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: false, message: '', trigger: 'blur' }
        ],
        gridCode: [
          { required: true, message: '网格编号不能为空', trigger: 'blur' }
        ],
        beginAt: [
          { required: true, message: '授信开始日期不能为空', trigger: 'blur' }
        ],
        rental: [
          { required: true, message: '授信总额不能为空', trigger: 'blur' }
        ],
        endAt: [
          { required: true, message: '授信结束日期不能为空', trigger: 'blur' }
        ],
        comment: [
          { required: false, message: '', trigger: 'blur' }
        ],
        adress: [
          { required: false, message: '', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const payload = { ...this[name] }
          const date = new Date(payload.beginAt)
          const month = date.getMonth() + 1
          const day = date.getDate()
          payload.beginAt = `${date.getFullYear()}${month >= 10 ? month : '0' + month}${day >= 10 ? day : '0' + day}`
          date = new Date(payload.endAt)
          month = date.getMonth() + 1
          day = date.getDate()
          payload.endAt = `${date.getFullYear()}${month >= 10 ? month : '0' + month}${day >= 10 ? day : '0' + day}`
          this.$store.dispatch(actions.post.RESULT_PERSON, payload).then(() => {
            this.$Message.success('信息已经添加成功!')
            this.$router.go(-1)
          })
        }else{
           this.$Message.error('表单验证错误!');
        }
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
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
}
</style>
