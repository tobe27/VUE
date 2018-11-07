<template>
  <div id="app">
      <Layout>
          <Sider ref="side1" width="256" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" v-show="islogin">
              <Header class="header_left">
                  <!--长丰logo-->
                  <!--<img src="./static/images/logo.png"/>-->
                  <!--广丰logo-->
                  <img src="./static/images/gflogo_login.png"/>
                  <div>{{ logo1 }}</div>
              </Header>
              <Menu ref="menu" theme="dark" width="auto" :class="menuitemClasses" v-bind:active-name="activeName" :open-names="openNames" @on-select="currentPageChange">
                  <div v-for="h in role">
                      <MenuItem :name="h.code"  v-if="h.child.length==0">
                          <Icon :type="h.type"></Icon>
                          <span>{{ h.name }}</span>
                      </MenuItem>
                      <Submenu :name="h.code" v-else>
                          <template slot="title">
                              <Icon :type="h.type"></Icon>
                              <span>{{ h.name }}</span>
                          </template>
                          <MenuItem :name="hh.code" v-for="hh in h.child" :to="hh.url" class="tab">{{ hh.name }}</MenuItem>
                      </Submenu>
                  </div>
              </Menu>
          </Sider>
          <Layout>
              <Header class="layout-header-bar" v-show="islogin">
                  <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                  <User/>
              </Header>
              <Content>
                  <router-view/>
              </Content>
          </Layout>
      </Layout>
  </div>
</template>

<script>
    import User from '@/components/User'
    import { LOGO_NAME } from  '@/config'
    export default {
        data () {
            return {
                isCollapsed: false,
                islogin: false,
                logo : LOGO_NAME,
                logo1 : LOGO_NAME,
                activeName: '',
                openNames: [],
                activeName1: '',
                openNames1: [],
                role:[
                    {
                        name:'首页',
                        type:'ios-home',
                        code:'1',
                        url:'/home',
                        child:[]
                    },
                    {
                        name:'户籍管理',
                        type:'ios-people',
                        code:'2',
                        url:'/resident',
                        child:[]
                    },
                    {
                        name:'客户管理',
                        type:'md-people',
                        code:'3',
                        url:'/customer',
                        child:[]
                    },
                    {
                        name:'集中授信',
                        type:'ios-card',
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
                        name:'网格管理',
                        type:'ios-globe-outline',
                        code:'4',
                        url:'/grid',
                        child:[]
                    },
                    {
                        name:'系统管理',
                        type:'md-settings',
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
                    },
                    {
                        name:'配置管理',
                        type:'logo-buffer',
                        code:'5',
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
                ],
                role1:[
                    {
                        name:'户籍管理',
                        type:'ios-people',
                        code:'2',
                        url:'/resident',
                        child:[]
                    },
                    {
                        name:'客户管理',
                        type:'md-people',
                        code:'3',
                        url:'/customer',
                        child:[]
                    },
                    {
                        name:'集中授信',
                        type:'ios-card',
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
                        name:'网格管理',
                        type:'ios-globe-outline',
                        code:'4',
                        url:'/grid',
                        child:[]
                    },
                ],
                role2:[
                    {
                        name:'贷款审批',
                        type:'ios-card',
                        code:'6',
                        url:'/credit/loanApproval'
                    },
                ],
                role3:[
                    {
                        name:'首页',
                        type:'ios-home',
                        code:'1',
                        url:'/home',
                        child:[]
                    },
                ],
                role4:[
                    {
                        name:'首页',
                        type:'ios-home',
                        code:'1',
                        url:'/home',
                        child:[]
                    },
                ],
                role5:[
                    {
                        name:'首页',
                        type:'ios-home',
                        code:'1',
                        url:'/home',
                        child:[]
                    },
                ],
                role6:[
                    {
                        name:'户籍管理',
                        type:'ios-people',
                        code:'2',
                        url:'/resident',
                        child:[]
                    },
                ],
                role7:[
                    {
                        name:'网格管理',
                        type:'ios-globe-outline',
                        code:'4',
                        url:'/grid',
                        child:[]
                    },
                    {
                        name:'系统管理',
                        type:'md-settings',
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
                    },
                    {
                        name:'配置管理',
                        type:'logo-buffer',
                        code:'5',
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
                ]
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                if(this.isCollapsed) {
                    let sub = document.getElementsByClassName('ivu-menu-submenu')
                    for (let i = 0; i < sub.length; i++) {
                        sub[i].getElementsByClassName('ivu-menu-submenu-title-icon')[0].style = 'display:none'
                        sub[i].style.height='50px'
                        sub[i].onmouseover = function () {
                            sub[i].getElementsByTagName('ul')[0].setAttribute('style',
                                'margin-top:-50px;z-index:1000;position: relative;width:200px;margin-left:78px;background: #001529;');
                        }
                        sub[i].onmouseout = function () {
                            sub[i].getElementsByTagName('ul')[0].setAttribute('style', 'display:none')
                        }
                    }
                }else {
                    let sub=document.getElementsByClassName('ivu-menu-submenu')
                    for(let i =0;i<sub.length;i++){
                        sub[i].getElementsByClassName('ivu-menu-submenu-title-icon')[0].style = ''
                        sub[i].style.height = 'auto'
                        sub[i].onmouseover = function(){

                        }
                        sub[i].onmouseout = function(){

                        }
                    }
                }
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        mounted() {
            let path = window.location.href;
            if(path.indexOf('?host=')>0){
                let parms = path.split("&")
                let hosturl = 'http://'+parms[0].substring(parms[0].indexOf("=") + 1)+':8080'
                let grid = parms[1].substring(parms[1].indexOf("=") + 1)
                if(grid == 1) {
                    hosturl = hosturl + "/grid"
                }
                sessionStorage.setItem('hosturl',hosturl)
            }
            let islogin = sessionStorage.getItem('islogin')
            if (!islogin) {
                this.islogin = false
                this.$router.push('/')
            } else {
                this.islogin = true

                let usr=JSON.parse(sessionStorage.getItem('userObj'))
                let roleId = usr.roles[0].roleId
                if(! sessionStorage.getItem('islogincount')){
                    this.$Message.success('登录成功')
                    sessionStorage.setItem('islogincount',1)
                    if(roleId==3||roleId==4||roleId==5){
                        this.$router.push('/home')
                        this.activeName = '1'
                    }else if(roleId==1||roleId==6){
                        this.activeName = '3'
                        this.$router.push('/customer')
                    }else if(roleId==2){
                        this.activeName = '6-3'
                        this.openNames = ['6']
                        this.$router.push('/credit/loanApproval')
                    }else if(roleId==7){
                        this.activeName = '7-1'
                        this.openNames = ['7']
                        this.$router.push('/user')
                    }
                    if(roleId==1){
                        // this.role=this.role1
                    }else if(roleId==2){
                        // this.role=this.role2
                    }else if(roleId==3){
                        // this.role=this.role3
                    }else if(roleId==4){
                        // this.role=this.role4
                        this.currentPage=1
                    }else if(roleId==5){
                        // this.role=this.role5
                    }else if(roleId==6){
                        // this.role=this.role6
                    }else if(roleId==7){
                        // this.role=this.role7
                    }
                }else{
                    let url=window.location.href
                    if(url.indexOf("#/home")>0){
                        this.activeName = '1'
                    }else if(url.indexOf("#/resident")>0){
                        this.activeName = '2'
                    }else if(url.indexOf("#/customer")>0){
                        this.activeName = '3'
                    }else if(url.indexOf("#/grid")>0){
                        this.activeName = '4'
                    }else if(url.indexOf("#/configuration")>0){
                        this.openNames = ['5']
                        if ( url.indexOf("#/configuration/dictionaries")>0 ){
                            this.activeName = '5-5'
                        }else if ( url.indexOf("#/configuration/mechanism")>0 ){
                            this.activeName = '5-4'
                        }else if ( url.indexOf("#/configuration/region")>0 ){
                            this.activeName = '5-3'
                        }else if ( url.indexOf("#/configuration/product")>0 ){
                            this.activeName = '5-2'
                        }else {
                            this.activeName = '5-1'
                        }
                    }else if(url.indexOf("#/credit")>0){
                        this.openNames = ['6']
                        if ( url.indexOf("#/credit/loanApproval")>0 ){
                            this.activeName = '6-3'
                        }else if ( url.indexOf("#/credit/result")>0 ){
                            this.activeName = '6-2'
                        }else {
                            this.activeName = '6-1'
                        }
                    }else if(url.indexOf("#/user")>0){
                        this.openNames = ['7']
                        if ( url.indexOf("#/user/authority")>0 ){
                            this.activeName = '7-3'
                        }else if ( url.indexOf("#/user/role")>0 ){
                            this.activeName = '7-2'
                        }else {
                            this.activeName = '7-1'
                        }
                    }
                }

                this.$nextTick(() => {
                    this.$refs.menu.updateOpened()
                    this.$refs.menu.updateActiveName()
                })

                let sub=document.getElementsByClassName('ivu-menu-submenu-title')
                for(let i =0;i<sub.length;i++){
                    sub[i].setAttribute("style","background:#002140 !important;")
                    sub[i].onmouseover = function () {
                        sub[i].setAttribute("style","background:#1890FF !important;")
                    }
                    sub[i].onmouseout = function () {
                        sub[i].setAttribute("style","background:#002140 !important;")
                    }
                }
            }
        },
        methods: {
            collapsedSider () {
                if ( this.logo1 == '' ) {
                    this.logo1 = this.logo
                    if(this.activeName == '' ){
                        this.activeName = this.activeName1
                    }
                    if(this.openNames.length==0){
                        this.openNames = this.openNames1
                    }
                } else {
                    this.logo1 = ''
                    this.activeName1 = this.activeName
                    this.openNames1 = this.openNames
                    this.activeName = ''
                    this.openNames = []
                }
                this.$refs.side1.toggleCollapse();
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened()
                    this.$refs.menu.updateActiveName()
                })
            },
            currentPageChange (name) {
                if(name.indexOf("-")==-1){
                    for(let i in this.role){
                        if(this.role[i].code === name){
                            this.$router.push(this.role[i].url)
                        }
                    }
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


        width: 100%;
        min-width:1200px;
        min-height: 100%;
        .ivu-layout-sider{
            min-height: 100vh;
            box-shadow:2px 0px 6px 0px rgba(0,21,41,0.35);
            color: #FFFFFF;
            background: #002140;
            .header_left{
                width:100%;
                color: #FFFFFF;
                background: #002140;
                padding: 0px 20px !important;
                line-height: 60px;
                img {
                   margin-top: 12px;
                   width: 32px;
                   float: left;
                   height: 32px;
                }
                div {
                   margin-left: 8px;
                   float: left;
                   font-size: 20px;
                   line-height: 60px;
                   font-weight: bold;
                }
            }
            .ivu-menu-item:hover {
                background: #1890FF;
            }
            a.ivu-menu-item:hover {
                background: #1890FF !important;
            }
            .ivu-menu-item-active{
                background: #1890FF;
                color: #fff;
            }
            .ivu-menu-opened {
                background: #001529;
            }
            .menu-item {
                background: #002140;
                span{
                    display: inline-block;
                    overflow: hidden;
                    width: 69px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align: bottom;
                    transition: width .2s ease .2s;
                    color: #ffffff;
                }
                i{
                    transform: translateX(0px);
                    transition: font-size .2s ease, transform .2s ease;
                    vertical-align: middle;
                    font-size: 16px;
                }
            }
            .collapsed-menu{
                background: #002140;
                span{
                    width: 0px;
                    transition: width .2s ease;
                }
                i{
                    transform: translateX(5px);
                    transition: font-size .2s ease .2s, transform .2s ease .2s;
                    vertical-align: middle;
                    font-size: 22px;
                }
            }
        }
        .layout-header-bar{
            background: #fff;
            box-shadow: 0 1px 1px rgba(0,0,0,.1);
            padding-left: 0px;
            .menu-icon{
                transition: all .3s;
            }
            .rotate-icon{
                transform: rotate(-90deg);
            }
        }
        .ivu-layout-content {
            background-color: #F0F2F5;
        }
    }
</style>
