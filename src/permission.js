import router from './router'
import store from './store'
import iView from 'iview'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css'// progress bar style
// import { getToken } from '@/utils/auth' // getToken from cookie

// NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
// function hasPermission (roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
//   if (!permissionRoles) return true
//   return roles.some(role => permissionnkRoles.indexOf(role) >= 0)
// }

const whiteList = ['/login', '/', '/index']// no redirect whitelist
const token = sessionStorage.getItem('token')
const user = JSON.parse(sessionStorage.getItem('userObj'))
// store.dispatch('USER_INFO', user)
router.beforeEach((to, from, next) => {
  // NProgress.start() // start progress bar
  iView.LoadingBar.start()
  if (token) { // determine if there has token
    /* has token */
    if (to.path === '/') {
      next({ path: '/' })
      // NProgress.done()
      iView.LoadingBar.finish()
    } else {
      console.log(store)
      let first = store.state.first
      if (first) { // 判断当前用户是否已拉取完user_info信息  这里有问题
        store.dispatch('ChangeFirst', false)
        let roleId
        var timer = setTimeout(() => {
          roleId = user.roles[0].id
          store.dispatch('GenerateRoutes', roleId)
          router.addRoutes(store.state.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true })
        }, 10)
      } else {
        clearTimeout(timer)
        next()
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
      // NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
      iView.LoadingBar.finish()
    }
  }
})

router.afterEach(() => {
  // NProgress.done() // finish progress bar
  iView.LoadingBar.finish()
})
