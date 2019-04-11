<template>

    <div class="login">
        <Header :style="{ width: '100%',height:'50px',background:'#001529'}">
            <Breadcrumb class="layout-nav">
                <BreadcrumbItem to="">
                    <div class="logo">
                        <img src="@/static/images/logo-white.png" width="65px" height="19px"/>
                    </div>
                    <div class="ft">
                        <span style="font-size:22px">网格化管理系统</span>
                    </div>
                </BreadcrumbItem>
            </Breadcrumb>
        </Header>
        <div class="main">
            <div class="divHeader">
                <img src="../../static/images/login2.png"/>
            </div>
            <div class="divMain">
                <img src="../../static/images/login3.png" alt="">
                <div class="divMain_right">
                    <Form class="formStyle" ref="formInline" :model="formInline" :rules="ruleInline">
                        <p class="oneP">网格化数字信息平台</p>
                        <!--<p class="twoP">登录 <span>User Login</span></p>-->
                        <FormItem prop="user">
                            <Input @keyup.enter.native="handleSubmit('formInline')" type="text"
                                   v-model="formInline.user" placeholder="请输入用户名" autofocus>
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input @keyup.enter.native="handleSubmit('formInline')" type="password"
                                   v-model="formInline.password" placeholder="请输入密码">
                                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <template>
                            <Radio class="remember" v-model="single">记住密码</Radio>
                        </template>
                        <Button class="buttonDiv" type="primary" @click="handleSubmit('formInline')">登录</Button>
                    </Form>
                </div>
                <img class="right_bottom" src="../../static/images/login1.png" alt="">
            </div>

        </div>
    </div>
</template>

<script>
import actions from '@/store/action-types'
import { LOGO_NAME } from '@/config'

export default {
  name: 'loginpage',
  data () {
    return {
      userFlag: false,
      passwordFlag: false,
      single: false,
      logoName: LOGO_NAME,
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码由6位以上数字和字母构成', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    var islogin = sessionStorage.getItem('islogin')
    if (islogin) {
      sessionStorage.clear()
      window.location.href = '/'
    }
  },
  methods: {
    handleSubmit (name) {
      console.log(name)
      this.$refs[name].validate((valid) => {
        if (valid) {
          var payload = {
            username: this.formInline.user,
            password: this.formInline.password
          }
          console.log(payload)
          this.getLogin(payload).then(rep => {
            if (rep.code === 200) {
              sessionStorage.setItem('islogin', true)
              sessionStorage.setItem('username', this.formInline.user)
              let obj = rep.data
              obj.password = ''
              this.$store.dispatch(actions.post.USER_INFO, obj)
              sessionStorage.setItem('userObj', JSON.stringify(obj))
              sessionStorage.setItem('token', rep.token)
              window.location.href = '/'
            //   this.$router.push('/')
            } else {
              this.$Message.error(rep.message)
              this.formInline.password = ''
            }
          })
        }
      })
    },
    getLogin (dataLogin) {
      return this.$store.dispatch(actions.post.GRID_LOGIN, dataLogin)
    }
  }
}
</script>
<style lang="scss">
    .login {
        height: 100vh;
        background-color: white;
        .layout-nav {
            margin:0 auto;
            width: 50%;
            max-width: 800px;
            min-width: 710px;
            .logo {
                float: left;
                width: 65px;
                height: 19px;
                img {
                    display: inline-block;
                    width: 100%;
                }
            }
            .ft {
                margin-left: 5px;
                line-height: 50px;
                float: left;
                color: #fff;
            }
        }
        .main {
            width: 50%;
            max-width: 800px;
            min-width: 710px;
            height: 418px;
            margin: 5% auto;
            box-shadow: 0px 0px 19px -1px rgba(11, 56, 133, 0.22);
            background-color: #FFFFFF;
            border-radius: 10px;
            .divHeader {
                width: 100%;
                height: 70px;
                img {
                    width: 70%;
                    height: 70px;
                    margin-left: 20px;
                }
            }
            .divMain {
                width: 100%;
                height: calc(100% - 80px);
                img {
                    float: left;
                    margin-left: 2%;
                    width: 50%;
                    height: 100%;
                }
                .divMain_right {
                    float: right;
                    width: 40%;
                    height: 85%;
                    margin-right: 20px;
                    .formStyle {
                        width: 100%;
                        padding: 0px 20px;
                        .oneP {
                            width: 100%;
                            font-size: 26px;
                            font-family: PingFangSC-Semibold;
                            font-weight: 600;
                            color: rgba(44, 44, 44, 1);
                            line-height: 26px;
                            margin: 0 0 24px 0;
                            text-align: center;
                        }
                        .remember {
                            width: 59px;
                            height: 22px;
                            font-size: 14px;
                            font-family: PingFangSC-Regular;
                            color: rgba(0, 0, 0, 0.65);
                            line-height: 22px;
                        }
                        .buttonDiv {
                            width: 100%;
                            height: 40px;
                            background: rgba(24, 144, 255, 1);
                            border-radius: 4px;
                            margin: 10px auto;
                        }
                    }
                }
                .right_bottom {
                    float: right;
                    width: 45%;
                    height: 5%;
                    min-height: 60px;
                }
            }
        }
    }

    .login > div:nth-child(1) {
        padding: 0;
        text-align: center;
    }

</style>
