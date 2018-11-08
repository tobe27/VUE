<template>
  <!--
  新建白名单版块
  -->
  <div class="form">
    <Form :model="form" :rules="ruleValidate" :label-width="100">
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
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="联系方式" prop="phoneNumber">
            <Input v-model="form.phoneNumber" placeholder="请输入联系方式"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="网格编号" prop="gridCode">
            <Input v-model="form.gridCode" placeholder="请输入网格编号"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="地址" prop="adress">
            <Input v-model="form.adress" placeholder="请输入地址"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="备注" prop="comment">
            <Input v-model="form.comment" placeholder="请输入备注"></Input>
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
          { required: true, message: '联系方式不能为空', trigger: 'blur' }
        ],
        gridCode: [
          { required: true, message: '网格编号不能为空', trigger: 'blur' }
        ],
        adress: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        comment: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
     if ('id' in this.$route.query) {
      this.form=JSON.parse(sessionStorage.getItem("whitelist"))
     }else{
       sessionStorage.getItem("whitelist")
     }
  },
  methods: {
    getDetail (id) {
      return this.$store.dispatch(actions.get.WHITE_PERSON, id)
    },
  handleSubmit (name) {
      const payload = { ...this[name] }
      // console.log(this.$route.query.id)
      if ('id' in this.$route.query) {
        this.$store.dispatch(actions.put.WHITE_PERSON, payload).then(rep => {
            //判断返回的消息，若返回得code为200 则认为操作成功
            if("200" != rep.data.code){
                this.$Message.error(rep.data.message);
            }else{//否则返回一个警告窗 并把错误信息显示
                this.$Message.success("用户资料修改成功！");
                this.$router.push('/whitelist?tabname=0')
            }
        })
      } else {
        this.$store.dispatch(actions.post.WHITE_PERSON, payload).then(rep => {
            //判断返回的消息，若返回得code为200 则认为操作成功
            if("200" != rep.data.code){
                this.$Message.error(rep.data.message);
            }else{//否则返回一个警告窗 并把错误信息显示
                this.$Message.success("用户资料修改成功！");
                this.$router.push('/whitelist?tabname=0')
            }
        })
      }
    },
    goBack(){
      this.$router.push('/whitelist?tabname=0')
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
