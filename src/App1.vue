<template>
  <div id="app">
    <Layout>
      <Header class="header" v-show="islogin">
          <Row>
            <div class="logo">
                <img src="./static/images/logocopy.png"/>
                <div>网格化信息服务平台</div>
            </div>
            <div class="nav">
              <Menu mode="horizontal" theme="dark" active-name="1" @on-select="currentPageChange">
                  <MenuItem :name="h.code" v-for="h in role" v-if="h.child.length==0">
                    <router-link :to="h.url" :class="currentPage==h.code?'active':''"><Icon :type="h.type"></Icon>{{ h.name }}</router-link>
                  </MenuItem>
                  <Submenu :name="h.code" :class="currentPage==h.code?'active':''" v-for="h in role" v-if="h.child.length>0">
                      <template slot="title">
                          <Icon :type="h.type"/>{{ h.name }}
                      </template>
                      <MenuItem :name="hh.code" v-for="hh in h.child" :to="hh.url" class="tab">{{ hh.name }}</MenuItem>
                  </Submenu>
                </Menu>
            </div>
           <div class="user">
            <User/>
           </div>
        </Row>
      </Header>
      <Content class="main">
        <router-view/>
      </Content>
    </Layout>
  </div>
</template>

<script>
    import User from '@/components/User'

    export default {
        data() {
            return {
                islogin: false,
                currentPage:1,
                currentPageChild:0,
                role:[
                    {
                        name:'首页',
                        type:'ios-navigate',
                        code:'1',
                        url:'/home',
                        child:[]
                    },
                    {
                        name:'户籍管理',
                        type:'ios-keypad',
                        code:'2',
                        url:'/resident',
                        child:[]
                    },
                    {
                        name:'客户管理',
                        type:'ios-keypad',
                        code:'3',
                        url:'/customer',
                        child:[]
                    },
                    {
                        name:'网格管理',
                        type:'ios-keypad',
                        code:'4',
                        url:'/grid',
                        child:[]
                    },
                    {
                        name:'配置管理',
                        type:'ios-keypad',
                        code:5,
                        child:[
                            {
                                name:'标签管理',
                                code:'5-1',
                                url:'/configuration/label'
                            },
                            {
                                name:'产品管理',
                                code:'5-2',
                                url:'/configuration/product'
                            },
                            {
                                name:'区域管理',
                                code:'5-3',
                                url:'/configuration/region'
                            },
                            {
                                name:'机构管理',
                                code:'5-4',
                                url:'/configuration/mechanism'
                            },
                            {
                                name:'字典管理',
                                code:'5-5',
                                url:'/configuration/dictionaries'
                            }
                        ]
                    },
                    {
                        name:'集中授信',
                        type:'ios-keypad',
                        code:'6',
                        child:[
                            {
                                name:'背靠背评议',
                                code:'6-1',
                                url:'/credit/whitelist'
                            },
                            {
                                name:'面谈面签',
                                code:'6-2',
                                url:'/credit/result'
                            },
                            {
                                name:'贷款审批',
                                code:'6-3',
                                url:'/credit/loanApproval'
                            },
                        ]
                    },
                    {
                        name:'系统管理',
                        type:'ios-keypad',
                        code:'7',
                        child:[
                            {
                                name:'用户管理',
                                code:'7-1',
                                url:'/user'
                            },
                            {
                                name:'角色管理',
                                code:'7-2',
                                url:'/user/role'
                            },
                            {
                                name:'权限管理',
                                code:'7-3',
                                url:'/user/authority'
                            },
                        ]
                    }
                ],
                role1:[
                    {
                        name:'户籍管理',
                        type:'ios-keypad',
                        code:'2',
                        url:'/resident',
                        child:[]
                    },
                    {
                        name:'客户管理',
                        type:'ios-keypad',
                        code:'3',
                        url:'/customer',
                        child:[]
                    },
                    {
                        name:'网格管理',
                        type:'ios-keypad',
                        code:'4',
                        url:'/grid',
                        child:[]
                    },
                    {
                        name:'集中授信',
                        type:'ios-keypad',
                        code:'6',
                        child:[
                            {
                                name:'背靠背评议',
                                code:'6-1',
                                url:'/credit/whitelist'
                            },
                            {
                                name:'面谈面签',
                                code:'6-2',
                                url:'/credit/result'
                            },
                            {
                                name:'贷款审批',
                                code:'6-3',
                                url:'/credit/loanApproval'
                            },
                        ]
                    }
                ],
                role2:[
                    {
                        name:'贷款审批',
                        code:'6',
                        url:'/credit/loanApproval'
                    },
                ],
                role3:[
                    {
                        name:'首页',
                        type:'ios-navigate',
                        code:'1',
                        url:'/home',
                        child:[]
                    },
                ],
                role4:[
                    {
                        name:'首页',
                        type:'ios-navigate',
                        code:'1',
                        url:'/home',
                        child:[]
                    },
                ],
                role5:[
                    {
                        name:'首页',
                        type:'ios-navigate',
                        code:'1',
                        url:'/home',
                        child:[]
                    },
                ],
                role6:[
                    {
                        name:'户籍管理',
                        type:'ios-keypad',
                        code:'2',
                        url:'/resident',
                        child:[]
                    },
                ],
                role7:[
                    {
                        name:'网格管理',
                        type:'ios-keypad',
                        code:'4',
                        url:'/grid',
                        child:[]
                    },
                    {
                        name:'配置管理',
                        type:'ios-keypad',
                        code:5,
                        child:[
                            {
                                name:'标签管理',
                                code:'5-1',
                                url:'/configuration/label'
                            },
                            {
                                name:'产品管理',
                                code:'5-2',
                                url:'/configuration/product'
                            },
                            {
                                name:'区域管理',
                                code:'5-3',
                                url:'/configuration/region'
                            },
                            {
                                name:'机构管理',
                                code:'5-4',
                                url:'/configuration/mechanism'
                            },
                            {
                                name:'字典管理',
                                code:'5-5',
                                url:'/configuration/dictionaries'
                            }
                        ]
                    },
                    {
                        name:'系统管理',
                        type:'ios-keypad',
                        code:'7',
                        child:[
                            {
                                name:'用户管理',
                                code:'7-1',
                                url:'/user'
                            },
                            {
                                name:'角色管理',
                                code:'7-2',
                                url:'/user/role'
                            },
                            {
                                name:'权限管理',
                                code:'7-3',
                                url:'/user/authority'
                            },
                        ]
                    }
                ]
            }
        },
        mounted() {
            var islogin = sessionStorage.getItem('islogin')
            if (!islogin) {
                this.islogin = false
            } else {
                let usr=JSON.parse(sessionStorage.getItem('userObj'))
                let roleId = usr.roles[0].roleId
                if(! sessionStorage.getItem('islogincount')){
                    this.$Message.success('登录成功')
                    sessionStorage.setItem('islogincount',1)
                    if(roleId==3||roleId==4||roleId==5){
                        this.$router.push('/home')
                    }else if(roleId==1||roleId==6){
                        this.$router.push('/customer')
                    }else if(roleId==2){
                        this.$router.push('/credit/loanApproval')
                    }else if(roleId==7){
                        this.$router.push('/user')
                    }
                }
                this.islogin = true

                if(roleId==1){
                    // this.role=this.role1
                    this.currentPage=3
                }else if(roleId==2){
                    // this.role=this.role2
                    this.currentPage=6
                }else if(roleId==3){
                    // this.role=this.role3
                    this.currentPage=1
                }else if(roleId==4){
                    // this.role=this.role4
                    this.currentPage=1
                }else if(roleId==5){
                    // this.role=this.role5
                    this.currentPage=1
                }else if(roleId==6){
                    // this.role=this.role6
                    this.currentPage=3
                }else if(roleId==7){
                    // this.role=this.role7
                    this.currentPage=7
                }

                let url=window.location.href
                if(url.indexOf("#/home")>0){
                    this.currentPage=1
                }else if(url.indexOf("#/resident")>0){
                    this.currentPage=2
                }else if(url.indexOf("#/customer")>0){
                    this.currentPage=3
                }else if(url.indexOf("#/grid")>0){
                    this.currentPage=4
                }else if(url.indexOf("#/configuration")>0){
                    this.currentPage=5
                }else if(url.indexOf("#/credit")>0){
                    this.currentPage=6
                }else if(url.indexOf("#/user")>0){
                    this.currentPage=7
                }
            }
        },
        methods : {
            currentPageChange (name) {
                if(name.indexOf("-")==-1){
                    this.currentPage=name
                }else{
                    this.currentPage=name.substring(0,1)
                    this.currentPageChild=name.substring(2)
                }
            }
        },
        components: {
            User
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        min-width:1200px;
        min-height: 100%;
        background-color: #F0F2F5;
        .header {
            width: 100%;
            height: 64px;
            padding: 0;
            background-color: #001529;
            .logo {
                width:17%;
                height: 30px;
                color: #fff;
                font-size: 18px;
                border-radius: 3px;
                position: relative;
                top: 17px;
                left: 5px;
                line-height: 20px;
                float:left;
                img {
                    float:left;
                }
                div {
                    margin-top: 3px;
                    margin-left:5px;
                    float:left;
                }
            }
            .nav {
                width:70%;
                height: 64px;
                line-height: 64px;
                float:left;
                .ivu-menu-dark {
                    background-color: #001529;
                }
                ul {
                    li {
                        a {
                            color:#A6ADB4;
                        }
                        .tab {
                            color: #000;
                        }
                        i {
                            margin-right: 0px;
                        }
                    }
                }
                .active {
                    color: #FFFFFF;
                }
            }
            .user {
                width:13%;
                float:left;
            }
        }
    }
#app > div{
    height: 100%;
}
</style>
