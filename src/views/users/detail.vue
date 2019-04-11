<template>
  <!--
  新建用户版块
  -->

   <div>
    <div class="userDetailBreadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>系统管理</BreadcrumbItem>
        <BreadcrumbItem to="/users">用户管理</BreadcrumbItem>
        <BreadcrumbItem v-if="this.flag">编辑</BreadcrumbItem>
        <BreadcrumbItem v-if="!this.flag">新建</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="form">
      <!-- :rules="ruleValidate" -->
      <Form ref="form" :model="form">
        <Row>
          <Col span="6">
          <FormItem label="用户名：" prop="username">
            <Input v-model="form.username" placeholder="请输入用户名"></Input>
          </FormItem>
          </Col>
          <Col offset="2" span="6">
          <FormItem label="密码：" prop="password">
            <Input type="password" v-model="form.password" :disabled="flag" placeholder="请设置用户密码"></Input>
          </FormItem>
          </Col>
          <Col offset="2" span="6">
          <FormItem label="用户角色：">
            <Select v-model="form.checkAllGroup">
              <Option v-for="role in roleNameList" :value="role.id" :key="role.id">{{
                role.roleCh }}
              </Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
          <FormItem label="姓名：" prop="name">
            <Input v-model="form.name" placeholder="请输入姓名"></Input>
          </FormItem>
          </Col>
          <Col offset="2" span="6">
          <FormItem label="身份证号码：">
            <Input v-model="form.idNumber" placeholder="请输入身份证号码"></Input>
          </FormItem>
          </Col>
          <Col offset="2" span="6">
          <FormItem label="联系方式：">
            <Input v-model="form.contact" placeholder="请输入联系方式"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
          <FormItem label="邮箱：">
            <Input v-model="form.email" placeholder="请输入邮箱"></Input>
          </FormItem>
          </Col>
          <Col offset="2" span="6">
          <FormItem label="机构名称：" prop="value2">
            <Cascader v-model="form.value2" :data="data1" :render-format="format" @on-change="dianjiOk" change-on-select
                      filterable></Cascader>
          </FormItem>
          </Col>
          <Col offset="2" span="6">
          <FormItem label="法人名称：" prop="corpName">
            <Input v-model="form.corpName" placeholder="请输入法人名称"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
          <FormItem label="工号：" prop="workId">
            <Input v-model="form.workId" placeholder="请输入工号"></Input>
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="性别：">
            <RadioGroup v-model="form.gender" style="width:100%">
              <!-- <Radio label="0">未知</Radio> -->
              <Radio label="1">男</Radio>
              <Radio label="2">女</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
          <Col offset="2" span="6">
          <FormItem label="用户状态：" prop="status">
            <RadioGroup v-model="form.status" style="width:100%">
              <Radio label="0">停用</Radio>
              <Radio label="1">正常</Radio>
            </RadioGroup>
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
  name: 'userDetail',
  data () {
    const validateIdNumber = (rule, value, callback) => {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (reg.test(value) === false) {
        callback(new Error('请请输入正确的居民身份证号码'))
      } else {
        callback()
      }
    }
    return {
      flag: false,
      data1: [],

      // userList:[],
      roleNameList: [
        {
          id: 1,
          roleCh: '客户经理'
        },
        {
          id: 2,
          roleCh: '支行行长'
        },
        {
          id: 3,
          roleCh: '支行查询员'
        },
        {
          id: 4,
          roleCh: '法人机构管理员'
        },
        {
          id: 5,
          roleCh: '总行查询员'
        },
        {
          id: 6,
          roleCh: '总行管理员'
        }
      ], // 所有的角色数组
      // 这个用户的所有信息
      form: {
        username: '',
        password: '',
        name: '',
        idNumber: '',
        gender: '',
        contact: '',
        email: '',
        status: '1',
        corpCode: '',
        corpName: '',
        orgCode: '',
        orgName: '',
        roleIds: '',
        checkAllGroup: '1',
        workId: '',
        value2: []
      },
      // 存储选择的角色id

      // 表单验证
      ruleValidate: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'string', min: 2, max: 20, message: '用户名最大长度为20位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码最小长度为6位', trigger: 'blur' }
        ],
        value2: [
          { required: true, type: 'array', min: 1, message: '机构名称不能为空', trigger: 'change' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { type: 'string', max: 10, message: '姓名最大长度为10位', trigger: 'blur' }
        ],
        corpName: [
          { required: true, message: '法人名称不能为空', trigger: 'blur' },
          { type: 'string', max: 10, message: '法人名称最大长度为10位', trigger: 'blur' }
        ],
        workId: [
          { required: true, message: '工号不能为空', trigger: 'blur' },
          { type: 'string', max: 20, message: '姓名最大长度为20位', trigger: 'blur' }
        ]
        // idNumber: [
        //   { required: true, message: '请输入身份证号', trigger: 'blur' },
        //   { validator: validateIdNumber, trigger: 'blur' }
        // ],
        // gender: [
        //   { required: true, message: '请选择性别', trigger: 'blur' }
        // ],
        // checkAllGroup: [
        //   { required: false, message: '请选择角色', trigger: 'blur' }
        // ]
      }
    }
  },
  mounted () {
    let orgCode = JSON.parse(sessionStorage.getItem('userObj')).orgCode
    var vue = this
    // 如果有accountId 认为是编辑操作  获取此用户相关消息
    if ('id' in this.$route.query) { // 根据传过来得id先获取信息
      this.flag = true
      this.getDetail(this.$route.query.id)
    } else {
      // 获取所有的机构名称
      this.$store.dispatch(actions.get.MECHANISM_PERSON, orgCode).then(rep => {
        console.log(rep)
        if (rep.code === 200) {
          vue.data1 = this.recursion(rep.data)
        } else {
          vue.$Message.error(rep.message)
        }
      })
    }
    // this.roleList()
  },
  methods: {
    // 递归把 机构名称 做出级联选择
    recursion (obj) {
      let result = []
      for (var i in obj) {
        let o = {
          value: obj[i].orgCode,
          label: obj[i].orgName
        }
        if (obj[i].childList.length > 0) {
          o.children = this.recursion(obj[i].childList)
        }
        result.push(o)
      }

      return result
    },
    recursion1 (obj, orgcode) {
      let result = []
      for (var i in obj) {
        if (obj[i].childList.length > 0) {
          let code = this.recursion1(obj[i].childList, orgcode)
          if (code.length > 0) {
            code.push(obj[i].orgCode)
            result = code
          }
        }

        if (orgcode === obj[i].orgCode) {
          result.push(obj[i].orgCode)
        }
      }
      return result
    },
    // 级联选择的方法 控制级联选择input框里显示的信息
    format (labels, selectedData) {
      const index = labels.length - 1
      const data = selectedData[index] || false
      if (data && data.code) {
        return labels[index] + ' - ' + data.code
      }
      return labels[index]
    },
    // 机构名称选择之后的事件
    dianjiOk (labels, selectedData) {
      if (selectedData.length > 0) {
        this.form.orgName = selectedData[selectedData.length - 1].label// 选中的机构name
        this.form.orgCode = selectedData[selectedData.length - 1].value.toString()// 选中的机构id
      } else {
        this.form.orgName = ''
        this.form.orgCode = ''
      }
    },
    // 获取全部的角色信息
    roleList () {
      var vue = this
      return this.$store.dispatch(actions.get.ROLE_LIST, {// 获取所有角色
        pageNo: 1,
        pageSize: 20
      }).then(rep => {
        if (rep.code === 200) {
          for (let i in rep.data) {
            rep.data[i].roleId = rep.data[i].roleId.toString()
          }
          vue.roleNameList = rep.data
        } else if (rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    },
    // 通过accountId获取此用户相关消息
    getDetail (accountId) {
      let vue = this
      return this.$store.dispatch(actions.get.USER_PERSON, accountId).then(rep => {
        if (rep.code === 200) {
          vue.form = { ...rep.data }
          // vue.form.abAccountId=vue.form.abAccountId+''
          vue.form.checkAllGroup = vue.form.roles[0].id.toString()
          // vue.value2.push(parseInt(vue.form.orgCode))
          if ({ ...rep.data }.gender) {
            vue.form.gender = { ...rep.data }.gender.toString()
          }
          if ({ ...rep.data }.contact) {
            vue.form.contact = { ...rep.data }.contact.toString()
          }
          if ({ ...rep.data }.status != null) {
            vue.form.status = { ...rep.data }.status.toString()
          }
          let orgCode = vue.form.orgCode
          console.log(orgCode)
          // 获取机构名称
          vue.$store.dispatch(actions.get.MECHANISM_PERSON, 1).then(rep1 => {
            if (rep1.code === 200) {
              vue.data1 = this.recursion(rep1.data)
              let arrList = this.recursion1(rep1.data, orgCode)
              // vue.value2=this.recursion1(rep1.data,orgCode)
              for (let i = arrList.length - 1; i >= 0; i--) {
                vue.form.value2.push(arrList[i])
              }
            } else {
              vue.$Message.error(rep1.message)
            }
          })
        } else {
          vue.$Message.error(rep.message)
        }
      })
    },
    // 提交按钮的事件
    handleSubmit (name) {
      console.log({ ...this[name] })
      // let payload={
      //   "username": "xiao2",
      //   "password": "123456",
      //   "name": "萧峰1",
      //   "workId": "52102",
      //   "idNumber": "123456789987654333",
      //   "gender": "2",
      //   "contact": "15555413244",
      //   "email": "lcy@test.com",
      //   "orgCode": "19920102",
      //   "corpName": "丐帮",
      //   "status": "1",
      //   "roles": [
      //       {
      //           "id": 1
      //       }
      //   ]
      // }
      // this.$store.dispatch(actions.post.USER_PERSON, payload).then(rep => {
      //   console.log(rep)
      // })
      let vue = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          let payload = { ...this[name] }
          payload.contact = payload.contact ? parseInt(payload.contact) : null
          payload.roles = [{ id: payload.checkAllGroup + '' }]
          payload.gender = payload.gender ? parseInt(payload.gender) : null
          payload.status = payload.status ? parseInt(payload.status) : null
          console.log(payload)
          //  如果有accountId字段 说明是编辑操作  调用下面axios  若没有 则认为是添加操作
          if ('id' in this.$route.query) {
            payload.accountId = payload.accountId.toString()
            delete payload.roles// 因为编辑用户得接口得参数里面没有roles字段
            delete payload.password// 不让编辑功能设置用户密码 所以把password字段干掉
            delete payload.orgName// 编辑提交时不传机构名称
            vue.$store.dispatch(actions.put.USER_SET, payload).then(rep => {
              // 判断返回的消息，若返回得code为200 则认为操作成功
              if (rep.data.code !== 200) {
                this.$Message.error(rep.data.message)
              } else { // 否则返回一个警告窗 并把错误信息显示
                this.$Message.success('用户资料修改成功！')
                this.$router.go(-1)
              }
            })
          } else { // 若没有 则认为是添加操作
            // if (payload.orgCode === '') {
            //   this.$Message.error('请选择机构！')
            //   return
            // }
            // if (payload.roleIds === '') {
            //   this.$Message.error('请分配角色！')
            //   return
            // }
            console.log(payload.idNumber)
            console.log(payload.email)
            console.log(payload.contact)
            if (payload.email=="") {
              delete payload.email
            }
            if (payload.idNumber==="") {
              delete payload.idNumber
            }
            if (payload.contact===null) {
              delete payload.contact
            }
            console.log(payload)
            // vue.$store.dispatch(actions.post.USER_PERSON, payload).then(rep => {
            //   // 判断返回的消息，若返回得code为200 则认为操作成功 否则返回一个警告窗 并把错误信息显示
            //   if (rep.data.code !== 200) {
            //     this.$Message.error(rep.data.message)
            //   } else { // 否则返回一个警告窗 并把错误信息显示
            //     this.$Message.success('新建用户成功！')
            //     this.$router.go(-1)
            //   }
            // })
          }
        } else {
          this.$Message.error('请完善用户信息!')
        }
      })
    },
    // 取消按钮
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
  .userDetailBreadcrumb {
    height: 54px;
    background-color: #fff;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
    border-radius: 4px;
    border: 1px solid #eee;
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
