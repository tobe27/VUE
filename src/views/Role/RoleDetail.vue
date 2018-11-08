<template>
  <!--
  新建用户版块
  -->
  <div>
    <div class="roleDetailBreadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem to="/user/role">角色管理</BreadcrumbItem>
        <BreadcrumbItem v-if="this.flag">编辑</BreadcrumbItem>
        <BreadcrumbItem v-if="!this.flag">新建</BreadcrumbItem>
      </Breadcrumb>
    </div>
  <div class="form">
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
      <div style="float: left;width: 50%">
      <Row>
        <Col span="16">
          <FormItem label="角色名称" prop="roleName">
            <Input v-model="form.roleName" placeholder="请输入角色名称"></Input>
          </FormItem>
        </Col>
        </Row>
      <Row>
        <Col span="16">
          <FormItem label="角色作用域" prop="roleScope">
            <Input v-model="form.roleScope" placeholder="请输入角色作用域"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="16">
          <FormItem label="角色描述" prop="description">
            <Input v-model="form.description" placeholder="请输入角色描述"></Input>
          </FormItem>
        </Col>
      </Row>
      </div>
      <div>
      <Transfer
        :data="data1"
        :titles="titles"
        :target-keys="targetKeys1"
        :render-format="render1"
        @on-change="handleChange1">
      </Transfer>
      </div>
      <FormItem class="item">
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
  data () {
    return {
      flag:false,
      data1: [],
      titles:['待选权限', '已有权限'],
      targetKeys1: this.getTargetKeys(),
      form: {
        permissionIds:[1]
      },
      ruleValidate: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '角色名称最大长度为20位', trigger: 'blur' }
        ],
        roleScope: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', min: 0,max: 225, message: '角色作用域最大长度为225位', trigger: 'blur' }
        ],
        description: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', min: 0,max: 225, message: '角色描述最大长度为225位', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    if ('roleId' in this.$route.query) {
      this.flag=true
      this.getDetail(this.$route.query.roleId).then(rep => {
          this.form = { ...rep.data }
      })
    }
    this.getMockData()
  },
  methods: {
    getDetail (id) {
        var vue = this
      return this.$store.dispatch(actions.get.ROLE_PERSON, id)/*.then( rep => {
          if(rep.code!=200&&rep.code!=204){
              vue.$Message.error(rep.message)
          }
      })*/
    },
    handleSubmit (name) {
      const payload = { ...this[name] }
      this.$refs[name].validate((valid) => {
          if(valid){
              if ('roleId' in this.$route.query) {
                  payload.permissionList=[]
                  this.$store.dispatch(actions.put.ROLE_PERSON, payload).then(rep => {
                      if(rep.data.code==200) {
                        this.$Message.success('角色已修改!')
                        this.$router.go(-1)
                      }else{
                          this.$Message.error(rep.data.message)
                      }
                  })
              } else {
                  this.$store.dispatch(actions.post.ROLE_PERSON, payload).then(rep => {
                      if(rep.data.code==200) {
                        this.$Message.success('角色已创建成功!')
                        this.$router.go(-1)
                      }else{
                          this.$Message.error(rep.data.message)
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
    },
    getMockData () {
        var vue=this
        this.$store.dispatch(actions.get.AUTHORITY_LIST, {
          pageNo: 1,
          pageSize: 1000
        }).then(rep => {
            if(rep.code==200){
                let authorityList =[ ...rep.data ]
                let mockData = [];
                for (var i in authorityList) {
                    mockData.push({
                        key: authorityList[i].permissionId,
                        label: authorityList[i].permissionName
                    });
                }
                vue.data1 = mockData
            }else if(rep.code!=204){
                vue.$Message.error(rep.message)
            }
      })
    },
    getTargetKeys () {
      if ('roleId' in this.$route.query) {
        var list=JSON.parse(sessionStorage.getItem("plist"))
        var arr=[];
        for(var i in list){
          arr.push(list[i].permissionId)
        }
        return arr
      }else{
        sessionStorage.removeItem("plist")
        return []
      }

    },
    render1 (item) {
        return item.label;
    },
    handleChange1 (newTargetKeys, direction, moveKeys) {
        this.targetKeys1 = newTargetKeys
        this.form.permissionIds = newTargetKeys + ''
    }
  }
}
</script>

<style lang="scss">
  .roleDetailBreadcrumb {
    height: 54px;
    background-color: #fff;
    font-size: 14px;
    font-family:PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
    border-radius: 4px;
    border: 1px solid #eee;
  }
.form {
  margin: 24px;
  padding: 20px;
  background-color: #fff;
  .item {
    margin-top: 10px;
  }
  .ivu-form-item-label {
    font-size: 14px;
  }
  .ivu-radio-group-item {
    font-size: 14px;
  }
}
</style>
