<template>
  <div>
    <div class="mechanismBreadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>配置管理</BreadcrumbItem>
        <BreadcrumbItem>机构信息</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="mechanism-split">
      <div class="mechanism-split-pane-left">
        <div>
          <span>组织机构</span>
          <Button type="text" @click="addRegion(row)">+ 新建机构</Button>
        </div>
        <Divider />
        <Tree ref="tree" :data="data" :load-data="loadData" :render="renderContent"/>
      </div>
      <div class="mechanism-split-pane-right">
        <div class="MButton">
          <!-- <Button class="addcreateBtn" type="primary" @click="addRegion(row)">新建</Button> -->
          <Button class="editcreateBtn" type="primary" @click="editRegion(row)">编辑</Button>
          <Button class="delcreateBtn" type="error" @click="delRegion(row)">删除</Button>
        </div>
        <h3 class="Mh">机构名称:{{row.orgName}}</h3>
        <table class="Mdetail-table">
          <tr>
            <td>机构代码</td>
            <td class="Mtd">{{ row.orgCode }}</td>
          </tr>
          <tr>
            <td>核心机构代码</td>
            <td class="Mtd">{{ row.coreOrgCode }}</td>
          </tr>
          <tr>
            <td>机构名称</td>
            <td class="Mtd">{{ row.orgName }}</td>
          </tr>
          <tr>
            <td>上级机构代码</td>
            <td class="Mtd">{{ row.parentOrgCode }}</td>
          </tr>
          <tr>
            <td>法人机构代码</td>
            <td class="Mtd">{{ row.corpOrgCode }}</td>
          </tr>
          <tr>
            <td>机构级别</td>
            <td class="Mtd">
              {{
              row.level==1?'一级机构':(row.level==2?'二级机构':(row.level==3?'三级机构':''))
              }}
            </td>
          </tr>
          <tr>
            <td>状态</td>
            <td class="Mtd">{{ row.status==0?'停用':(row.status==1?'正常':'') }}</td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="3" class="Mtd">{{ row.remark }}</td> 
          </tr>
        </table>
        <Modal width="50%" v-model="add.show" :footer-hide="true" title="行政机构管理">
          <div class="form">
            <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
              <Row v-show="false">
                <Col span="8">
                  <FormItem label="ID" prop="id">
                    <Input v-model="form.id" disabled></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="10">
                  <FormItem label="机构代码" prop="orgCode">
                    <Input
                      v-model="form.orgCode"
                      placeholder="与信贷系统保持一致"
                    ></Input>
                  </FormItem>
                </Col>
                <Col span="10">
                  <FormItem label="核心机构代码" prop="coreOrgCode">
                    <Input
                      v-model="form.coreOrgCode"
                      placeholder="与核心系统保持一致"
                    ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="10">
                  <FormItem label="机构名称" prop="orgName">
                    <Input v-model="form.orgName" placeholder="请输入机构名称:"></Input>
                  </FormItem>
                </Col>
                <Col span="10">
                  <FormItem label="机构级别" prop="level">
                    <Select v-model="form.level">
                      <Option value="1">一级机构</Option>
                      <Option value="2">二级机构</Option>
                      <Option value="3">三级机构</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="10">
                  <FormItem label="上级机构代码" prop="parentOrgCode">
                    <Input v-model="form.parentOrgCode" placeholder="请输入上级机构代码:"></Input>
                  </FormItem>
                </Col>
                <Col span="10">
                  <FormItem label="法人机构代码" prop="corpOrgCode">
                    <Input v-model="form.corpOrgCode" placeholder="请输入法人机构代码:"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="10">
                  <FormItem label="备注">
                    <Input v-model="form.remark" placeholder="请输入备注:"></Input>
                  </FormItem>
                </Col>
               <Col span="10">
                  <FormItem label="状态" prop="status">
                    <Select v-model="form.status">
                      <Option value="0">停用</Option>
                      <Option value="1">正常</Option>
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
        </Modal>
        <Modal
          v-model="model.show"
          footer-hide
          width="320"
          :styles="{top: '200px'}"
          :closable="false"
        >
          <p style="padding: 10px;font-size: 16px;">
            <Icon type="ios-information-circle" style="color:#f60;padding-right: 10px;" size="40px"></Icon>
            <span>你确定要删除当前机构信息？</span>
          </p>
          <div style="font-size: 14px;padding-left: 40px">
            <p>{{ row.orgName }}</p>
          </div>
          <div style="text-align: right">
            <Button size="large" @click="goBack" style="margin: 5px">取消</Button>
            <Button type="primary" size="large" :loading="model.loading" @click="onConfirm">确定</Button>
          </div>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import actions from '@/store/action-types'

export default {
  data () {
    return {
      data: [],
      id: '',
      buttonProps: {
        type: 'default',
        size: 'small'
      },
      split: 0.25,
      row: {},
      add: {
        show: false,
        ButtonType: 0
      },
      model: {
        show: false,
        title: '你确定要删除当行政区域么？',
        id: null,
        content: '',
        loading: false
      },
      form: {},
      ruleValidate: {
        orgCode: [
          { required: true, message: '机构代码不能为空', trigger: 'blur' },
          {
            type: 'string',
            pattern: '^[0-9]{0,20}$',
            message: '请输入最大20位的数字',
            trigger: 'blur'
          }
        ],
        orgName: [
          { required: true, message: '机构名称不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 1,
            max: 100,
            message: '机构名称最大长度为100位',
            trigger: 'blur'
          }
        ],
        corpOrgCode: [
          {
            type: 'string',
            min: 1,
            max: 20,
            message: '法人机构代码最大长度为20位',
            trigger: 'blur'
          }
        ],
        description: [
          {
            type: 'string',
            min: 1,
            max: 30,
            message: '描述最大长度为30位',
            trigger: 'blur'
          }
        ],
        level: [
          { required: true, message: '机构级别不能为空', trigger: 'blur' }
        ],
       
        status: [
          { required: true, message: '状态不能为空', trigger: 'change' }
        ],
        type: [
          { required: true, message: '机构类型不能为空', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    // 获取父节点id，返回直接后代列表
    this._loadData(this.id, array => {
      this.data = array
    })
    for (var k in this.form) {
      if (typeof this.form[k] === 'number') {
        this.form[k] = this.form[k] + ''
      }
    }
  },
  methods: {
    loadData (region, callback) {
      this._loadData(region, callback)
    },
    loop (item) {
      var list = []
      for (let i in item) {
        list.push({
          id: item[i].orgCode,
          title: item[i].orgName,
          children:
            item[i].childList.length > 0 ? this.loop(item[i].childList) : [],
          source: item[i]
        })
      }
      return list
    },
    _loadData (id, callback) {
      var vue = this
      this.$store.dispatch(actions.get.MECHANISM_PERSON, id).then(response => {
        if (response.code === 200) {
          const array = []
          if (response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
              let item = response.data[i]
              array.push(
                (item = {
                  id: item.orgCode,
                  title: item.orgName,
                  expand: item.orgId === 1,
                  children:
                    item.childList.length > 0 ? this.loop(item.childList) : [],
                  source: item,
                  render: (h, { root, node, data }) => {
                    return h(
                      'span',
                      {
                        style: {
                          display: 'inline-block',
                          width: '90%',
                          fontSize: '16px',
                          fontFamily: 'PingFangSC-Regular'
                        },
                        on: {
                          click: () => {
                            this.onclick(data)
                          }
                        }
                      },
                      [
                        h(
                          'span',
                          {
                            style: { fontSize: '16px', cursor: 'pointer' }
                          },
                          [
                            h('Icon', {
                              props: {
                                type:
                                  data.children.length === 0
                                    ? 'ios-paper-outline'
                                    : 'ios-folder-outline'
                              },
                              style: {
                                paddingRight: '5px',
                                paddingLeft: '7px'
                              }
                            }),
                            h('span', data.title)
                          ]
                        )
                      ]
                    )
                  }
                })
              )
            }
            callback(array)
            let obj = {}
            let item1 = response.data[0]
            obj.source = item1
            this.onclick(obj)
          } else {
            this.$Message.error('没有节点')
          }
        } else if (response.code !== 204) {
          vue.$Message.error(response.message)
        }
      })
    },
    renderContent (h, { root, node, data }) {
      return h(
        'span',
        {
          style: {
            display: 'inline-block',
            width: '90%',
            fontSize: '14px',
            fontFamily: 'PingFangSC-Regular'
          },
          on: {
            click: () => {
              this.onclick(data)
            }
          }
        },
        [
          h(
            'span',
            {
              style: { fontSize: '14px', cursor: 'pointer' }
            },
            [
              h('Icon', {
                props: {
                  type:
                    data.children.length === 0
                      ? 'ios-paper-outline'
                      : 'ios-folder-outline'
                },
                style: {
                  paddingRight: '5px',
                  paddingLeft: '7px'
                }
              }),
              h('span', data.title)
            ]
          )
        ]
      )
    },
    // 新建机构信息
    addRegion (row) {
      this.form = {}
      this.$refs['form'].resetFields()
      this.add.show = true
      this.ButtonType = 0
      this.form.parentOrgCode = row.orgCode ? row.orgCode : '0'
      this.form.status = '1'
      // this.form.virtualOrgFlag = '0'
    },
    // 编辑机构信息
    editRegion (row) {
      this.form = {}
      this.$refs['form'].resetFields()
      this.add.show = true
      this.ButtonType = 1
      this.form.orgCode = row.orgCode + ''
      this.form.orgName = row.orgName
      this.form.corpOrgCode = row.corpOrgCode
      this.form.parentOrgCode = row.parentOrgCode
      // this.form.relationType = row.relationType + ''
      this.form.status = row.status + ''
      // this.form.virtualOrgFlag = row.virtualOrgFlag + ''
      this.form.remark = row.remark
      // this.form.type = row.type + ''
      this.form.level = row.level + ''
      this.form.id = row.id
      this.form.coreOrgCode=row.coreOrgCode
    },
    // 删除机构信息
    delRegion (data) {
      this.model.show = true
    },
    onConfirm () {
      this.model.loading = true
      var vue = this
      this.$store
        .dispatch(actions.delete.MECHANISM_PERSON, vue.row.orgCode)
        .then(rep => {
          if (rep.data.code === 200) {
            setTimeout(() => {
              vue.model.loading = false
              vue.model.show = false
              if (rep.data.code !== 200) {
                vue.$Message.error(rep.data.message)
              } else {
                vue.$Message.success('删除成功')
              }
              vue._loadData('', array => {
                vue.data = array
              })
            }, 300)
          } else if (rep.data.code !== 204) {
            vue.model.loading = false
            vue.model.show = false
            vue.$Message.error(rep.data.message)
          }
        })
    },
    onclick (data) {
      this.row = data.source
    },
    handleSubmit (name) {
      var vue = this
      this.$refs[name].validate(valid => {
        if (valid) {
          const payload = { ...this[name] }
          if (this.ButtonType === 1) {
            console.log(payload)
            this.$store
              .dispatch(actions.put.MECHANISM_PERSON, payload)
              .then(rep => {
                if (rep.data.code !== 200) {
                  if (rep.data.code !== 204) {
                    vue.$Message.error(rep.data.message)
                  }
                } else {
                  vue.$Message.success('修改成功')
                  vue.add.show = false
                  vue._loadData('', array => {
                    vue.data = array
                  })
                }
              })
          } else {
            this.$store
              .dispatch(actions.post.MECHANISM_PERSON, payload)
              .then(rep => {
                if (rep.data.code !== 200) {
                  if (rep.data.code !== 204) {
                    vue.$Message.error(rep.data.message)
                  }
                } else {
                  vue.$Message.success('提交成功')
                  vue.add.show = false
                  vue._loadData('', array => {
                    vue.data = array
                  })
                }
              })
          }
        } else {
          this.$Message.error('表单验证错误')
        }
      })
    },
    goBack () {
      if (this.add.show) {
        this.add.show = false
      }
      if (this.model.show) {
        this.model.show = false
      }
    }
  }
}
</script>

<style lang="scss">
.mechanismBreadcrumb {
  height: 54px;
  background-color: #fff;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  line-height: 54px;
  padding-left: 20px;
  border-radius: 4px;
  border: 1px solid #eee;
}

.mechanism-split {
  margin: 24px;
  height: calc(79vh);
  background-color: #fff;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  border-radius: 4px;
  .mechanism-split-pane-left {
    margin: 10px;
    padding-left: 10px;
    width: 25%;
    float: left;
    height: calc(77vh);
    overflow-y: auto;
    overflow-x: auto;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  .mechanism-split-pane-right {
    margin: 10px;
    width: 70%;
    float: left;
    border-radius: 5px;
    .Mh {
      margin-left: 10%;
    }
    .MButton {
      margin-left: 10%;
      margin-bottom: 10px;
    }
    .addcreateBtn {
      font-size: 14px;
    }
    .editcreateBtn {
      margin-left: 10px;
      font-size: 14px;
    }
    .delcreateBtn {
      margin-left: 10px;
      font-size: 14px;
    }
    .regionButton {
      font-size: 14px;
      margin-left: 10%;
      margin-bottom: 20px;
    }
    .Mdetail-table {
      font-size: 14px;
      width: 80%;
      margin: auto;
      tr {
        td {
          line-height: 50px;
          margin: 1%;
          padding-left: 2%;
          background-color: gainsboro;
          // background: #eee;
          border-radius: 3px;
          &.Mtd{
            background: #eee
          }
        }
      }
    }
  }
}

/*
  .Mdemo-split-pane-right{
      padding: 10px;
      margin: 50px;
      min-height: 400px;
      width: calc(100vw - 50vw);
      background-color: white;
      border-radius:5px;
      .Mh{
          margin-left: 5%;
      }
      .MButton {
          margin-left: 5%;
          margin-bottom: 20px;
      }
      .editcreateBtn {
          margin-left: 10px;
      }
      .delcreateBtn {
          margin-left: 10px;
      }
      .Mdetail-table ,tr{
          font-size: 18px;
          width: 80%;
          margin: auto;
          tr{
              td{
                  line-height: 50px;
                  width: 24%;
                  margin: 1%;
                  padding-left: 2%;
                  background-color: gainsboro;
                  border-radius:3px;
              }
          }
      }
  }*/
</style>
