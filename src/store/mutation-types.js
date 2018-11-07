const mutations = {}

const mutationList = [
  'STATISTICS_CHART','HOME_INFORMATION','RANKING','OVER_VIEW',//首页
  'GRID_LOGIN',//用户登录
    'GRID_HOME',//首页获取网格坐标
  'RESIDENT_LIST', 'RESIDENT_PERSON','RESIDENTBYIDNUMBER_PERSON',//户籍
  'CUSTOMER_LIST', 'CUSTOMER_PERSON',//客户
  'CUSTOMERS_PERSON',//客户编辑状态
  'CUSTOMERS_PERSON',//根据身份证号获取详情
  'BATCH_PERSON',//客户批签审核
      'DISHONEST_PERSON',
      'PROPERTY_LIST', 'PROPERTY_PERSON', //客户财产
      'BUSINESS_LIST', 'BUSINESS_PERSON', //客户业务
      'FAMILY_LIST',//客户家庭
      'FAMILYS_PERSON',//客户家庭详情
      'MEMBER_LIST','MEMBER_PERSON',//客户家庭成员
      'TAGALL_LIST','MYTAG_LIST','MYTAG_PERSON',//客户标签
      'CREDIT_PERSON',//客户信誉
      'IMAGE_LIST','IMAGE_PERSON',//客户影像资料
    'GRID_PERSON', 'GRID_LIST', 'GRID_MAP', 'GRIDNAME_LIST',// 网格管理

  'PRODUCT_LIST', 'PRODUCT_PERSON',//配置管理---银行产品
  'TAG_LIST', 'TAG_PERSON',//配置管理---标签管理
  'REGION_LIST','REGION_PERSON',//配置管理---行政区域管理
  'MECHANISM_LIST','MECHANISM_PERSON', //配置管理---行政机构管理
    'DICTIONARIES_LIST','DICTIONARIES_SHOW',//配置管理---字典管理

  'WHITE_LIST', 'WHITE_PERSON',//白名单
  'WHITEGREY_PERSON',//白名单，灰名单互转
  'BLACK_LIST', 'BLACK_PERSON',//黑名单
  'GREY_LIST', 'GREY_PERSON',//灰名单
  'ADVISORY_LIST', 'ADVISORY_PERSON',//金融顾问咨询意见
  'RESULT_LIST', 'RESULT_PERSON',//授信结果
    'APPROVAL_RECORD',//获取某个客户所有的审批记录
    'APPROVAL_LIST',//贷款审批列表
    'CREDIT_LIST',//获取某个客户得所有信息-信贷报表信息
    'file_TEST_LIST',//信贷系统查询结果测试

    'RESIDENT_USER',  'USER_PERSON', //后台修改用户密码
    'USER_STATUS',//用户修改冻结状态
    'USER_SET',//编辑用户信息
    'ROLE_LIST', 'ROLE_PERSON','RESIDENT_USER_ROLEID',//角色管理
    'AUTHORITY_LIST', 'AUTHORITY_PERSON',//权限管理
]
mutationList.forEach(key => {
  mutations[key] = `UPDATE_${key.toUpperCase()}`
})

export default mutations
