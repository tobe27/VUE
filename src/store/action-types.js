const actions = {}
const actionList = {
  get: [
    'USER_INFO',
    'PREVIEWS_PERSON', // 申请表
    'DISHONEST_LIST',
    'DISHONEST_PERSON', // 失信人查询
    'STATISTICS_CHART',
    'HOME_INFORMATION',
    'RANKING',
    'OVER_VIEW', // 首页
    'GRID_HOME', // 首页获取网格坐标
    'RESIDENT_LIST',
    'RESIDENT_PERSON',
    'RESIDENTBYIDNUMBER_PERSON', // 户籍
    'CUSTOMER_LIST',
    'CUSTOMER_PERSON', // 客户
    'TEMPORARY_LIST',
    'TEMPORARY_PERSON', // 客户暂存
    'CUSTOMERS_PERSON', // 根据身份证号获取详情
    'PROPERTY_LIST',
    'PROPERTY_PERSON', // 客户财产
    'BUSINESS_LIST',
    'BUSINESS_PERSON', // 客户业务
    'FAMILY_LIST', // 客户家庭
    'FAMILYS_PERSON', // 客户家庭
    'MEMBER_LIST',
    'MEMBER_PERSON', // 客户家庭成员
    'MYTAG_LIST',
    'TAGALL_LIST',
    'CUSTOMER_POORINFO', // 客户标签
    'CREDIT_PERSON', // 客户信誉
    'IMAGE_LIST', // 客户影像资料
    'GRID_LIST',
    'GRID_PERSON',
    'GRID_MAP',
    'GRIDNAME_LIST', // 网格管理

    'PRODUCT_LIST',
    'PRODUCT_PERSON', // 配置管理---银行产品
    'TAG_LIST',
    'TAG_PERSON', // 配置管理---标签管理
    'REGION_LIST',
    'REGION_PERSON', // 配置管理---行政区域管理
    'MECHANISM_LIST',
    'MECHANISM_PERSON', // 配置管理---行政机构管理
    'DICTIONARIES_LIST',
    'DICTIONARIES_SHOW', // 配置管理---字典管理

    'WHITE_LIST',
    'WHITE_PERSON', // 白名单
    'BLACK_LIST',
    'BLACK_PERSON', // 黑名单
    'GREY_LIST',
    'GREY_PERSON', // 灰名单
    'ADVISORY_LIST',
    'ADVISORY_PERSON', // 金融顾问咨询意见
    'RESULT_LIST',
    'RESULT_PERSON', // 授信结果
    'CUSTOMER_INFOFORM', // 查询面签信息
    'PREVIEW_PERSON', // 打印面签表
    'APPROVAL_RECORD', // 获取某个客户所有的审批记录
    'APPROVAL_LIST', // 贷款审批获取列表
    'CREDIT_LIST', // 获取某个客户得所有信息-信贷报表信息
    'file_TEST_LIST', // 信贷系统查询结果测试

    'RESIDENT_USER',
    'USER_PERSON',
    'RESIDENT_USER_ROLEID', // 用户管理
    'ROLE_LIST',
    'ROLE_PERSON', // 角色管理
    'AUTHORITY_LIST',
    'AUTHORITY_PERSON', // 权限管理

    'WORKBENCH_LIST', // 工作台
    'CREDIT_USER', // 征信查询账户
    'CREDIT_USER_DETAILS' // 查看征信账号详情
  ],
  post: [
    'USER_INFO',
    'USER_LOGIN', // 用户登录信息
    'GRID_LOGIN', // 用户登录
    'RESIDENT_PERSON', // 户籍
    'CUSTOMER_PERSON', // 客户
    'TEMPORARY_PERSON', // 客户暂存
    'DISHONEST_PERSON', // 失信人详情
    'FAMILYS_PERSON', // 客户家庭
    'MEMBER_PERSON', // 客户家庭成员
    'PROPERTY_PERSON', // 客户财产
    'MYTAG_PERSON', // 客户标签
    'IMAGE_PERSON', // 客户影像资料
    'GRID_PERSON', // 网格管理

    'PRODUCT_PERSON', // 配置管理---银行产品
    'TAG_PERSON', // 配置管理---标签管理
    'REGION_PERSON', // 配置管理---行政区域管理
    'MECHANISM_PERSON', // 配置管理---行政机构管理
    'DICTIONARIES_LIST', // 配置管理---字典管理

    'WHITE_PERSON', // 白名单
    'WHITEGREY_PERSON', // 白名单，灰名单互转
    'BLACK_PERSON', // 黑名单
    'GREY_PERSON', // 灰名单
    'ADVISORY_PERSON', // 金融顾问咨询意见
    'RESULT_PERSON', // 授信结果
    'APPROVAL_RECORD', // 批量审批

    'USER_PERSON', // 用户添加
    'ROLE_PERSON', // 角色管理
    'AUTHORITY_PERSON', // 权限管理

    'CREDIT_USER' // 征信查询账户
  ],
  put: [
    'USER_INFO',
    'RESIDENT_PERSON', // 户籍
    'CUSTOMER_PERSON', // 客户
    'TEMPORARY_PERSON', // 客户暂存
    'CUSTOMERS_PERSON', // 客户编辑状态
    'BATCH_PERSON', // 客户批签审核
    'FAMILYS_PERSON', // 客户家庭
    'MEMBER_PERSON', // 客户家庭成员
    'PROPERTY_PERSON', // 客户财产
    'GRID_PERSON', // 网格管理

    'PRODUCT_PERSON', // 配置管理---银行产品
    'TAG_PERSON', // 配置管理---标签管理
    'REGION_PERSON', // 配置管理---行政区域管理
    'DICTIONARIES_LIST', // 配置管理---字典管理
    'MECHANISM_PERSON', // 配置管理---行政机构管理

    'WHITE_PERSON', // 白名单
    'WHITEGREY_PERSON', // 白名单，灰名单互转
    'BLACK_PERSON', // 黑名单
    'GREY_PERSON', // 灰名单
    'ADVISORY_PERSON', // 金融顾问咨询意见
    'RESULT_PERSON', // 授信结果

    'USER_PERSON', // 后台修改用户密码
    'USER_STATUS', // 用户修改冻结状态
    'USER_SET', // 编辑用户信息
    'ROLE_PERSON', // 角色管理
    'AUTHORITY_PERSON', // 权限管理

    'CREDIT_USER' // 征信查询账户
  ],
  delete: [
    'USER_INFO',
    'RESIDENT_PERSON', // 户籍
    'CUSTOMER_PERSON', // 客户
    'TEMPORARY_PERSON', // 客户暂存
    'MYTAG_PERSON', // 客户标签
    'MEMBER_PERSON', // 客户家庭成员
    'IMAGE_PERSON', // 客户影像资料
    'GRID_PERSON', // 网格管理

    'PRODUCT_PERSON', // 配置管理---银行产品
    'TAG_PERSON', // 配置管理---标签管理
    'REGION_PERSON', // 配置管理---行政区域管理
    'MECHANISM_PERSON', // 配置管理---行政机构管理
    'DICTIONARIES_LIST', // 配置管理---字典管理

    'WHITE_PERSON', // 白名单
    'BLACK_PERSON', // 黑名单
    'GREY_PERSON', // 灰名单
    'ADVISORY_PERSON', // 金融顾问咨询意见
    'RESULT_PERSON', // 授信结果

    'ROLE_PERSON', // 角色管理
    'AUTHORITY_PERSON', // 权限管理

    'CREDIT_USER' // 征信查询账户
  ]
}

Object.keys(actionList).forEach(method => {
  actionList[method].forEach(key => {
    if (!(method in actions)) {
      actions[method] = {}
    }
    actions[method][key] = `${method.toUpperCase()}_${key.toUpperCase()}`
  })
})

export default actions
