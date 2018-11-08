<template>
  <!--
  新建灰名单版块
  -->
  <div class="form">
    <Form :model="form" :rules="ruleValidate" label-position="top">
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
          <FormItem label="地址" prop="address">
            <Input v-model="form.address" placeholder="请输入地址"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="备注" prop="comment">
            <Input v-model="form.comment" placeholder="请输入备注"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
              <FormItem label="待观察原因" prop="reason">
                <Select v-model="form.reason" placeholder="请选择原因">
                  <Option value="游手好闲">游手好闲</Option>
                  <Option value="欠债较多">欠债较多</Option>
                  <Option value="贫困、低保户">贫困、低保户</Option>
                  <Option value="五保户">五保户</Option>
                  <Option value="贷款被诉讼">贷款被诉讼</Option>
                </Select>
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
        address: [
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
      this.form=JSON.parse(sessionStorage.getItem("greylist"))
    }
    for(var k in this.form) {
            if (typeof(this.form[k])=='number') {
                this.form[k]=this.form[k]+'';
            }
        }
  },
  methods: {
    handleSubmit (name) {
      const payload = { ...this[name] }
      if ('id' in this.$route.query) {
        this.$store.dispatch(actions.put.GREY_PERSON, payload).then(rep => {
            //判断返回的消息，若返回得code为200 则认为操作成功
            if("200" != rep.data.code){
                this.$Message.error(rep.data.message);
            }else{//否则返回一个警告窗 并把错误信息显示
                this.$Message.success("用户资料修改成功！");
                this.$router.push('/whitelist?tabname=1')
            }
        })
      } else {
        this.$store.dispatch(actions.post.GREY_PERSON, payload).then(rep => {
            //判断返回的消息，若返回得code为200 则认为操作成功
            if("200" != rep.data.code){
                this.$Message.error(rep.data.message);
            }else{//否则返回一个警告窗 并把错误信息显示
                this.$Message.success("用户资料修改成功！");
                this.$router.push('/whitelist?tabname=1')
            }
        })
      }
    },
    goBack(){
      this.$router.push('/whitelist?tabname=1')
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
