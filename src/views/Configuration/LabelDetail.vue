<template>
  <!--
  新建用户版块
  -->
  <div>
    <div class="labelDetailBreadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>集中授信</BreadcrumbItem>
        <BreadcrumbItem to="/configuration/label">标签管理</BreadcrumbItem>
        <BreadcrumbItem v-if="this.flag">编辑</BreadcrumbItem>
        <BreadcrumbItem v-if="!this.flag">新建</BreadcrumbItem>
      </Breadcrumb>
    </div>
  <div class="form">
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
      <Row>
        <Col span="8">
          <FormItem label="标签名称" prop="tagName">
            <Input v-model="form.tagName" placeholder="请输入标签名称"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="标签描述" prop="description">
            <Input v-model="form.description" placeholder="请输入标签描述"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="标签类型" prop="type">
            <Select v-model="form.type" placeholder="请输入标签类型">
              <Option value="1">黑白灰名单</Option>
              <Option value="2">农户/非农户</Option>
              <Option value="3">企业</Option>
              <Option value="4">产品</Option>
              <Option value="5">画像</Option>
              <Option value="6">星级</Option>
              <Option value="7">年龄</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="备注" prop="remark">
            <Input v-model="form.remark" placeholder="请输入备注"></Input>
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
      form: {},
      ruleValidate: {
        tagName: [
          { required: true, message: '标签名称不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '标签名称最大长度为20位', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '标签描述不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '标签描述最大长度为20位', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 10, message: '类型最大长度为10位', trigger: 'blur' }
        ],
        remark: [
          { required: false},
          { type: 'string', min: 0,max: 100, message: '备注最大长度为100位', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    if ('tagId' in this.$route.query) {
      this.flag=true
      this.getDetail(this.$route.query.tagId).then(rep => {
        this.form = { ...rep.data }
      })
    }
  },
  methods: {
    getDetail (id) {
      return this.$store.dispatch(actions.get.TAG_PERSON, id).then(rep => {
          this.form = { ...rep.data }
          for (var k in this.form) {
              if (typeof (this.form[k]) === 'number') {
                  this.form[k] = this.form[k] + ''
              }
          }
      })
    },
    handleSubmit (name) {
      const payload = { ...this[name] }
      this.$refs[name].validate((valid) => {
          if (valid) {
            if ('tagId' in this.$route.query) {
              this.$store.dispatch(actions.put.TAG_PERSON, payload).then(rep => {
                if (rep.data.code!=200) {
                    this.$Message.error(rep.data.message)
                }else{
                    this.$Message.success('编辑成功')
                    this.$router.go(-1)
                }
              })
            } else {
              this.$store.dispatch(actions.post.TAG_PERSON, payload).then(rep => {
                if (rep.data.code!=200) {
                    this.$Message.error(rep.data.message)
                }else{
                    this.$Message.success('提交成功')
                    this.$router.go(-1)
                }
              })
            }
          }else{
              this.$Message.error('表单验证错误')
          }
      })
    },
    goBack(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
  .labelDetailBreadcrumb {
    height: 54px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #eee;
    font-size: 14px;
    font-family:PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
  }
.form {
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
</style>
