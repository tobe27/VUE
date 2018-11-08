<template>
  <div>
    <div class="customerBreadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/customer">客户管理</BreadcrumbItem>
        <BreadcrumbItem v-if="this.flag">编辑</BreadcrumbItem>
        <BreadcrumbItem v-if="!this.flag">新建</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="tabsModel">
    <Tabs v-model="add.tab">
        <Tab-pane label="基本信息" :disabled="add.is">
          <div class="tabsForm">
            <Form ref="form" :model="form" :rules="ruleValidate" :label-width="130">
              <div class="divpage">
                <Row>
                  <Col span="8">
                    <FormItem label="客户编号" prop="customerId">
                      <Input v-model="form.customerId" disabled></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="信贷客户号" prop="creditId">
                      <Input v-model="form.creditId" placeholder="请输入信贷客户号"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="姓名" prop="customerName">
                      <Input v-model="form.customerName" placeholder="请输入姓名"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="证件类型" prop="idType">
                      <Select v-model="form.idType" placeholder="请选择证件类型">
                        <Option value="中国居民身份证">中国居民身份证</Option>
                        <Option value="外国人永久居留身份证">外国人永久居留身份证</Option>
                        <Option value="港澳台居民居住证">港澳台居民居住证</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="证件号码" prop="idNumber">
                      <Input v-model="form.idNumber" placeholder="请输入18位有效证件号码" @on-blur="selectResidentByIdNumber(form.idNumber)"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="性别" prop="sex">
                      <RadioGroup v-model="form.sex">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="出生日期" prop="birthday">
                      <DatePicker type="date" placeholder="请选择出生日期" v-model="form.birthday"></DatePicker>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="手机号码" prop="phoneNumber">
                      <Input v-model="form.phoneNumber" placeholder="请输入11有效手机号码"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="身体状况" prop="physicalCondition">
                      <Select v-model="form.physicalCondition" placeholder="请选择身体状况">
                        <Option value="健康">健康</Option>
                        <Option value="亚健康">亚健康</Option>
                        <Option value="疾病">疾病</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="最高学历" prop="educationLevel">
                      <Select v-model="form.educationLevel" placeholder="请选择文化水平">
                        <Option value=初中及以下/(中专/技校)>初中及以下/(中专/技校)</Option>
                        <Option value="高中">高中</Option>
                        <Option value="大专">大专</Option>
                        <Option value="本科">本科</Option>
                        <Option value="硕士">硕士</Option>
                        <Option value="研究生">研究生</Option>
                        <Option value="博士及以上">博士及以上</Option>
                        <Option value="未知">未知</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="国籍" prop="nationality">
                      <Select v-model="form.nationality" placeholder="请选择政治面貌">
                        <Option value="中华人民共和国">中华人民共和国</Option>
                        <Option value="其它">其它</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="民族" prop="nation">
                      <Input v-model="form.nation" placeholder="请输入民族"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="政治面貌" prop="politicsStatus">
                      <Select v-model="form.politicsStatus" placeholder="请选择政治面貌">
                        <Option value="群众">群众</Option>
                        <Option value="团员">团员</Option>
                        <Option value="党员">党员</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="婚姻状况" prop="maritalStatus">
                      <Select v-model="form.maritalStatus" placeholder="请选择婚姻状况">
                        <Option value="未婚">未婚</Option>
                        <Option value="已婚">已婚</Option>
                        <Option value="离异">离异</Option>
                        <Option value="丧偶">丧偶</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div class="divpage">
                <Row>
                  <Col span="8">
                    <FormItem label="职业" prop="career">
                      <Select v-model="form.career" placeholder="请选择职业">
                        <Option value="国家机关、党群组织、企业、事业单位负责人">国家机关、党群组织、企业、事业单位负责人</Option>
                        <Option value="专业技术人员">专业技术人员</Option>
                        <Option value="办事人员和有关人员">办事人员和有关人员</Option>
                        <Option value="商业、服务业人员">商业、服务业人员</Option>
                        <Option value="农、林、牧、渔、水利业生产人员">农、林、牧、渔、水利业生产人员</Option>
                        <Option value="生产、运输设备操作人员及有关人员">生产、运输设备操作人员及有关人员</Option>
                        <Option value="军人">军人</Option>
                        <Option value="不便分类的其他从业人员">不便分类的其他从业人员</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="单位名称" prop="companyName">
                      <Input v-model="form.companyName" placeholder="请输入单位名称"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="工作年限" prop="workYear">
                      <Input v-model="form.workYear" placeholder="请输入工作年限"></Input>
                    </FormItem>
                  </Col>
                  <Col span="16">
                    <FormItem label="工作地址" prop="companyAddress">
                      <Input v-model="form.companyAddress" placeholder="请输入工作地址"></Input>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div class="divpage">
                <Row>
                  <Col span="8">
                    <FormItem label="是否农户" prop="borrowerNature">
                      <Select v-model="form.borrowerNature" placeholder="请选择是否农户" @on-change="changeBorrowerNature">
                        <Option value="农户">农户</Option>
                        <Option value="非农户">非农户</Option>
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span="8" v-show="isBuyHouseCol">
                    <FormItem label="有无县城购房" prop="isBuyHouse">
                      <Select v-model="form.isBuyHouse" placeholder="有无县城购房" @on-change="changeIsBuyHouse">
                        <Option value="是">是</Option>
                        <Option value="否">否</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8" v-show="cellNameCol">
                    <FormItem label="小区名称" prop="cellName">
                      <Input v-model="form.cellName" placeholder="请输入小区名称"></Input>
                    </FormItem>
                  </Col>
                  <Col span="16"v-show="cellAddressCol">
                    <FormItem label="小区地址" prop="cellAddress">
                      <Input v-model="form.cellAddress" placeholder="请输入小区地址"></Input>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div class="divpage">
                <Row>
                  <Col span="8">
                    <FormItem label="户号" prop="householdId">
                      <Input v-model="form.householdId" placeholder="请输入户号"></Input>
                    </FormItem>
                  </Col>
                  <Col span="16">
                    <FormItem label="户籍地址" prop="nativeAddress">
                      <Input v-model="form.nativeAddress" placeholder="请输入户籍地址"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="居住状况" prop="livingSituation">
                      <Select v-model="form.livingSituation" placeholder="请选择居住状况">
                          <Option value="贷款购房">贷款购房</Option>
                          <Option value="贷款建房">贷款建房</Option>
                          <Option value="租房">租房</Option>
                        </Select>
                    </FormItem>
                  </Col>
                  <Col span="16">
                    <FormItem label="居住地址" prop="residenceAddress">
                      <Input v-model="form.residenceAddress" placeholder="请输入居住地址"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="居住地邮编" prop="postcode">
                      <Input v-model="form.postcode" placeholder="请输入居住地邮编"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <!-- <Col span="8">
                    <FormItem label="是否企业主" prop="isOwner">
                      <Select v-model="form.isOwner" placeholder="是否企业主">
                        <Option value="是">是</Option>
                        <Option value="否">否</Option>
                      </Select>
                    </FormItem>
                  </Col> -->
                  <Col span="8">
                    <FormItem label="是否企业主" prop="isOwner">
                      <RadioGroup v-model="form.isOwner">
                        <Radio label="是">是</Radio>
                        <Radio label="否">否</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="是否本行员工" prop="isStaff">
                      <RadioGroup v-model="form.isStaff">
                        <Radio label="是">是</Radio>
                        <Radio label="否">否</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="是否本行股东" prop="isStockholder">
                      <RadioGroup v-model="form.isStockholder">
                        <Radio label="是">是</Radio>
                        <Radio label="否">否</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div class="divpage">
                <Row>
                  <Col span="8">
                    <FormItem label="网格号" prop="gridCode">
                      <Input v-model="form.gridCode" disabled></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="网格名称" prop="gridCode">
                      <Input v-model="form.gridCode" disabled></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="调查人(A角)" prop="investigator1">
                      <Input v-model="form.investigator1" placeholder="请输入A角名字"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="调查人(B角)" prop="investigator2">
                      <Input v-model="form.investigator2" placeholder="请输入B角名字"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="登记人" prop="registrant">
                      <Input v-model="form.registrant" disabled></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="登记机构" prop="registerOrg">
                      <Input v-model="form.registerOrg" disabled></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                   <Col span="8">
                    <FormItem label="登记日期" prop="createdAt">
                      <Input v-model="form.createdAt" disabled></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="更新日期" prop="updatedAt">
                      <Input v-model="form.updatedAt" disabled></Input>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div class="buttonpage">
                <FormItem>
                  <Button type="success" @click="temporarySubmit('form')">暂存</Button>
                  <Button type="primary" style="margin-left: 8px" @click="handleSubmit('form')">保存</Button>
                  <Button to="/customer" style="margin-left: 8px">返回</Button>
                </FormItem>
              </div>
            </Form>
          </div>
        </Tab-pane>

        <Tab-pane label="家庭信息" :disabled="add.is">
          <div class="tabsForm">
            <Form ref="FLform" :model="FLform" :rules="FLruleValidate" :label-width="160">
              <div class="divpage">
                <Row>
                  <Col span="8">
                    <FormItem label="户号" prop="householdId">
                      <Input v-model="FLform.householdId" placeholder="请输入户号"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="家庭人口" prop="population">
                      <Input v-model="FLform.population" placeholder="请输入家庭人口"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="家庭是否和睦" prop="isHarmony">
                      <RadioGroup v-model="FLform.isHarmony">
                        <Radio label="是">是</Radio>
                        <Radio label="否">否</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="邮编" prop="postcode">
                      <Input v-model="FLform.postcode" placeholder="请输入邮编"></Input>
                    </FormItem>
                  </Col>
                  <Col span="16">
                    <FormItem label="家庭详细地址" prop="address">
                      <Input v-model="FLform.address" placeholder="请输入家庭详细地址"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="主营业务是否自办实体" prop="isSelfEntity">
                      <RadioGroup v-model="FLform.isSelfEntity">
                        <Radio label="是">是</Radio>
                        <Radio label="否">否</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="是否欠缴税费(除个税)" prop="isOweTax">
                      <RadioGroup v-model="FLform.isOweTax">
                        <Radio label="是">是</Radio>
                        <Radio label="否">否</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="生产经营能力" prop="produceCapacity">
                      <Input v-model="FLform.produceCapacity" placeholder="请输入生产经营能力"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="生产经营场景" prop="produceScene">
                      <Input v-model="FLform.produceScene" placeholder="请输入生产经营场景"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="参与保险情况" prop="insuranceType">
                      <RadioGroup v-model="FLform.insuranceType">
                        <Radio label="医疗保险">医疗保险</Radio>
                        <Radio label="财产保险">财产保险</Radio>
                        <Radio label="人寿保险">人寿保险</Radio>
                        <Radio label="农业保险">农业保险</Radio>
                        <Radio label="其他">其他</Radio>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="16">
                    <FormItem label="社会评价(村委会)" prop="socialEvaluation">
                      <Input v-model="FLform.socialEvaluation" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入社会评价(村委会评价)"></Input>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div class="divpage">
                <div style="margin-bottom:30px;">
                  <Button style="margin-top:10px;margin-left:10px;" type="primary" :to="'/customer/addDetail?householdId='+householdId+'&customerId='+form.customerId" icon="ios-add">新建</Button>
                </div>
                <div class="table">
                  <Table :columns="familyColumns" :data="Memberlist"></Table>
                </div>
                <!-- 添加家庭成员信息 -->
                <Modal v-model="deleteFamilyModel.show" footer-hide width="320">
                  <div style="padding: 0 0 10px 0;font-size: 16px;">
                    <Icon type="ios-information-circle" style="color:#f60;line-height:24px;"></Icon>
                    <span>{{ deleteFamilyModel.title }}</span>
                  </div>
                  <div style="font-size: 14px;padding-left: 20px;padding-bottom: 20px">
                    <p>{{ deleteFamilyModel.content }}</p>
                  </div>
                  <div style="text-align: right">
                    <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
                    <Button type="primary" size="large" :loading="deleteFamilyModel.loading" @click="deleteFMUser">确定</Button>
                  </div>
                </Modal>
              </div>
              <div class="buttonpage">
                <FormItem>
                  <Button type="primary" @click="FLhandleSubmit('FLform')">提交</Button>
                  <Button to="/customer" style="margin-left: 8px">取消</Button>
                </FormItem>
              </div>
            </Form>
          </div>
        </Tab-pane>

        <Tab-pane label="资产信息" :disabled="add.is">
          <div class="tabsForm">
            <Form ref="FDform" :model="FDform" :rules="FDruleValidate"  :label-width="130">
              <div class="divpage">
                <Row>
                  <Col span="8">
                    <FormItem label="客户职业" prop="career">
                      <Input v-model="FDform.career" placeholder="请输入职业"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="房屋数量" prop="houseNumber">
                      <Input v-model="FDform.houseNumber" placeholder="请输入房屋数量"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="车辆数量" prop="carNumber">
                      <Input v-model="FDform.carNumber" placeholder="请输入车辆数量"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="年收入" prop="yearSalary">
                      <Input v-model="FDform.yearSalary" placeholder="请输入年收入"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="房屋总价值" prop="housePrice">
                      <Input v-model="FDform.housePrice" placeholder="请输入房屋总价值"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="车辆总价值" prop="carPrice">
                      <Input v-model="FDform.carPrice" placeholder="请输入车辆总价值"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="年结余" prop="yearSurplus">
                      <Input v-model="FDform.yearSurplus" placeholder="请输入年结余"></Input>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div class="divpage" v-show="FDdivis">
                <Row>
                  <Col span="8">
                    <FormItem label="是否有农业收入" prop="isFarmIncome">
                      <Select v-model="FDform.isFarmIncome" placeholder="是否有农业收入" @on-change="changeisFarmIncome">
                        <Option value="是">是</Option>
                        <Option value="否">否</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row v-show="isFarmIncomeRow">
                  <Col span="8">
                    <FormItem label="土地面积" prop="landAcreage">
                      <Input v-model="FDform.landAcreage" placeholder="请输入土地面积"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="大棚数量" prop="greenhouseNumber">
                      <Input v-model="FDform.greenhouseNumber" placeholder="请输入大棚数量"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row v-show="isFarmIncomeRow">
                  <Col span="8">
                    <FormItem label="种养殖品种" prop="breedType">
                      <Input v-model="FDform.breedType" placeholder="请输入种养殖品种"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="种养殖数量" prop="breedNumber">
                      <Input v-model="FDform.breedNumber" placeholder="请输入种养殖数量"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="单位收益" prop="companyEarnings">
                      <Input v-model="FDform.companyEarnings" placeholder="请输入单位收益"></Input>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div class="divpage" v-show="FDdivno">
                <Row>
                  <Col span="8">
                    <FormItem label="是否有经营性收入" prop="isBusinessIncome">
                      <Select v-model="FDform.isBusinessIncome" placeholder="是否有经营性收入" @on-change="changeisBusinessIncome">
                        <Option value="是">是</Option>
                        <Option value="否">否</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row v-show="isBusinessIncomeRow">
                  <Col span="8">
                    <FormItem label="商铺数量" prop="shopNumber">
                      <Input v-model="FDform.shopNumber" placeholder="请输入商铺数量"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="商铺价值" prop="shopPrice">
                      <Input v-model="FDform.shopPrice" placeholder="请输入商铺价值"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8">
                    <FormItem label="设备数量" prop="equipmentNumber">
                    <Input v-model="FDform.equipmentNumber" placeholder="请输入设备数量"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem label="设备价值" prop="equipmentPrice">
                      <Input v-model="FDform.equipmentPrice" placeholder="请输入设备价值"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="16">
                    <FormItem label="工商营业执照" prop="businessLicense">
                      <Input v-model="FDform.businessLicense" placeholder="请输入工商营业执照"></Input>
                    </FormItem>
                  </Col>
                </Row>
              </div>
              <div class="buttonpage">
                <FormItem>
                  <Button type="primary" @click="FDhandleSubmit('FDform')">提交</Button>
                  <Button to="/customer" style="margin-left: 8px">返回</Button>
                </FormItem>
              </div>
            </Form>
          </div>
        </Tab-pane>

        <Tab-pane label="标签信息" :disabled="add.is">
          <div class="tabsForm">
            <div class="divpage">
              <div style="font-size:18px">选择标签:</div>
              <RadioGroup v-model="tag">
                  <div style="margin-left:60px">
                    <Radio v-for="(item,index) in tagList" :key="index" :label="item.tagId+';'+item.tagName" >{{ item.tagName }}</Radio>
                  </div>
              </RadioGroup>
              <div style="margin-bottom: 20px">
                <Button style="float: right;margin-right:20px" type="info" @click="submitTag()">保存</Button>
              </div>
            </div>
            <div class="divpage">
              <div class="table">
                <Table :columns="tagColumns" :data="myTagList"></Table>
              </div>
            </div>
          </div>
            

          <Modal v-model="deleteTagModel.show" footer-hide width="320">
            <div style="padding: 0 0 10px 0;font-size: 16px;">
              <Icon type="ios-information-circle" style="color:#f60;line-height:24px;"></Icon>
              <span>你确定要删除该标签吗？</span>
            </div>
            <div style="text-align: right">
              <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
              <Button type="primary" size="large" :loading="deleteTagModel.loading" @click="tagdelete()">确定</Button>
            </div>
          </Modal>
        </Tab-pane>

        <Tab-pane label="影像资料" :disabled="add.is">
          <div class="tabsForm">
            <Tabs type="card" v-model="imageType.index">
              <TabPane :label="h.title" v-for="(h,index) in images">
                <div class="demo-upload-list" v-for="(image,imgIndex) in h.list">
                  <img :src="image.baseCode">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(imgIndex,index)" size="50"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(image)" size="50"></Icon>
                  </div>
                </div>
                <div class="demo-upload-list" @click="addImage(index)" style="cursor:pointer;">
                  <Icon type="ios-camera" size="50"></Icon>
                  <div class="demo-upload-list-cover">
                  <Icon type="ios-camera" size="50"></Icon>
                  </div>
                </div>
              </TabPane>
            </Tabs>
            <Modal title="预览" v-model="visible.show" footer-hide width="640px">
              <div>
                <div style="position:relative;z-index:9999;top:200px;">
                  <Icon type="ios-arrow-back"
                          size="50" style="float: left;cursor:pointer;"
                          v-if="visible.imgIndex!=0"
                          @click="handleView(visible.imgIndex-1,visible.index)"
                  />
                  <Icon type="ios-arrow-forward" size="50" style="float: right;cursor:pointer;" v-if="visible.imgIndex!=(visible.len-1)" @click="handleView(visible.imgIndex+1,visible.index)" />
                </div>
                <img :src="baseCode" style="width: 100%;position:relative;z-index:1000;top:-25px;">
              </div>
            </Modal>
            <Modal v-model="addImageModal" title="附件上传" width="400px" :footer-hide="true">
              <span>{{  imageType.typeName }}</span>
              <div style="margin-bottom: 15px;margin-top: 15px;">
                <Select v-model="imageType.upload.type" placeholder="请选择影像类型" v-show="imageType.show">
                  <Option v-for="h in imageType.types" :value="h.type">{{ h.name }}</Option>
                </Select>
              </div>
              <Upload ref="upload" multiple type="drag" :data="imageType.upload"
                      :format="['jpg','jpeg','png']"
                      :headers="headers"
                      :action="uploadUrl+'/customer/image'"
                      :max-size="2048"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :before-upload="beforeImage"
                      :on-success="uploadImage">
                <div style="padding: 20px 0">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击或将文件拖拽到这里上传</p>
                </div>
              </Upload>
            </Modal>
            <Modal v-model="deleteImageModel.show" footer-hide width="320" :closable="false">
              <div style="padding: 0 0 10px 0;font-size: 16px;">
                <Icon type="ios-information-circle" style="color:#f60;line-height:24px;"></Icon>
                <span>你确定要删除这张图片么？</span>
              </div>
              <img :src="baseCode" style="width: 100%">
              <!--<div style="font-size: 14px;padding-left: 20px;padding-bottom: 20px">
                <p>{{ deleteImageModel.title }}</p>
              </div>-->
              <div style="text-align: right">
                <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
                <Button type="primary" size="large" :loading="deleteImageModel.loading" @click="deleteImageUser">确定</Button>
              </div>
            </Modal>
          </div>
        </Tab-pane>
    </Tabs>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import actions from '@/store/action-types'
import { UPLOAD_API_URL } from '@/config'
import Operation from "iview/src/components/transfer/operation"

const user=JSON.parse(sessionStorage.getItem('userObj'));

export default {
    user,
    name: 'InDetail',
    components: {Operation},
    data () {
    return {
      //资产信息隐藏显示
      FDdivis:false,
      FDdivno:false,
      isBuyHouseCol:true,
      cellNameCol:true,
      cellAddressCol:true,
      isFarmIncomeRow:true,
      isBusinessIncomeRow:true,
      baseCode : '',
      visible : {
          show : false,
          imgIndex : 0,
          index : 0 ,
          len : 0
      } ,
      flag : false,
      uploadUrl : UPLOAD_API_URL,
      headers : {
          'Authorization':sessionStorage.getItem('token')
      },
      add : {
          is: false,
          tab: 0
      },

      form: {
          isBuyHouse:'否',
          idType:'中国居民身份证',
          nationality:'中华人民共和国'
      },
      ruleValidate : {
        customerName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { type: 'string', min: 2,max: 20, message: '姓名长度为2-20位', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'change' }
        ],
        idNumber: [
          { required: true, message: '身份证号不能为空', trigger: 'blur' },
          { type: 'string', min: 18,max: 18, message: '身份证号长度为18位', trigger: 'blur' }
        ],
        maritalStatus: [
          { required: true, message: '婚姻状况不能为空', trigger: 'change' }
        ],
        educationLevel: [
          { required: true, message: '最高学历不能为空', trigger: 'change' }
        ],
        nation: [
          { required: true, message: '民族不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 5, message: '民族长度为1-5位', trigger: 'blur' }
        ],
        birthday: [
          { required: true,type:'date', message: '生日不能为空', trigger: 'change' }
        ],
        nativePlace: [
          { required: true, message: '籍贯不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '籍贯最大长度为20位', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { type: 'string', min: 11,max: 11,pattern:'^1[34578]\\d{9}', message: '手机号码必须是1开头11位手机号', trigger: 'blur' }
        ],
        career: [
          { required: true, message: '职业不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '职业最大长度为20位', trigger: 'blur' }
        ],
        custodian: [
          { required: true, message: '管护人不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '管护人最大长度为20位', trigger: 'blur' }
        ],
        gridCode: [
          { required: true, message: '网格号不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 100, message: '网格号最大长度为100位', trigger: 'blur' }
        ],
        householdId: [
          { required: true, message: '户号不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '户号最大长度为20位', trigger: 'blur' }
        ],
        nativeAddress: [
          { required: true, message: '户籍地址不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 100, message: '户籍地址最大长度为100位', trigger: 'blur' }
        ],
        residenceAddress: [
          { required: true, message: '居住地址不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 100, message: '居住地址最大长度为100位', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态码不能为空', trigger: 'blur' }
        ],
        politicsStatus: [
          { required: true, message: '政治面貌不能为空', trigger: 'blur' }
        ],
        livingSituation: [
          { required: true, message: '居住状况不能为空', trigger: 'blur' }
        ],
        physicalCondition: [
          { required: true, message: '身体状况不能为空', trigger: 'blur' }
        ],
        academicDegree: [
          { required: true, message: '最高学位不能为空', trigger: 'blur' }
        ],
        yearSalary: [
          { required: true, message: '年收入不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 18, message: '年收入最大长度为18位', trigger: 'blur' }
        ],
        nationality: [
          { required: true, message: '国籍不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '国籍最大长度为20位', trigger: 'blur' }
        ],
        borrowerNature: [
          { required: true, message: '借款人性质不能为空', trigger: 'blur' }
        ],
        postcode: [
          { required: true, message: '居住地邮编不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 6, message: '居住地邮编最大长度为6位', trigger: 'blur' }
        ],
        isStockholder: [
          { required: true, message: '是否本行股东不能为空', trigger: 'blur' }
        ],
        isStaff: [
          { required: true, message: '是否本行员工不能为空', trigger: 'blur' }
        ],
        isOwner: [
          { required: true, message: '是否企业主不能为空', trigger: 'blur' }
        ],
        isBuyHouse: [
          { required: true, message: '有无县城购房不能为空', trigger: 'blur' }
        ],
        cellName: [
          { required: false, message: '小区名称不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '小区名称最大长度为20位', trigger: 'blur' }
        ],
        cellAddress: [
          { required: false, message: '小区地址不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 100, message: '小区地址最大长度为100位', trigger: 'blur' }
        ]
      },

      householdId : '',
      Memberlists : [],
      userList : [],
      familyShow : false,
      deleteFamilyModel : {
          show: false,
          title: '你确定要删除这行内容么？',
          memberId: null,
          content: '',
          loading: false
      },
      familyColumns : [
          {
              title: '与客户关系',
              align: 'center',
              key: 'relationship'
          },
          {
              title: '姓名',
              align: 'center',
              key: 'memberName'
          },
          {
              title: '手机号码',
              align: 'center',
              key: 'contact'
          },
          {
              title: '身份证号',
              align: 'center',
              key: 'idNumber'
          },
          {
              title: '操作',
              key: 'action',
              align: 'center',
              width: 200,
              render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'text',
                              size: 'small'
                          },
                          on: {
                              click: () => {
                                  this.editFM(params.row)
                              }
                          }
                      }, '编辑'),
                      h('Button', {
                          props: {
                              type: 'text',
                              size: 'small'
                          },
                          on: {
                              click: () => {
                                  this.deleteFM(params.row)
                              }
                          }
                      }, '删除')
                  ])
              }
          }
      ],

      FLform : {},
      FLformShow : false,
      FLruleValidate : {
        householdId: [
          { required: true, message: '户号不能为空', trigger: 'blur' },
          { type: 'string', min: 2,max: 20, message: '户号长度为2-20位', trigger: 'blur' }
        ],
        population: [
          { required: true, message: '家庭人口不能为空', trigger: 'blur' },
          { type: 'string',pattern:'^[0-9]{1,10}$', message: '请以数字填写人口数', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '家庭详细地址不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 100, message: '家庭详细地址长度为100位', trigger: 'blur' }
        ],
        postcode: [
          { required: true, message: '邮编不能为空', trigger: 'blur' },
          { type: 'string',pattern:'^[0-9]{6}$', message: '邮编为6位数字', trigger: 'blur' }
        ],
        localCredit: [
          { required: true, message: '当地信用环境不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 10, message: '当地信用环境最大长度为10位', trigger: 'blur' }
        ],
        isHarmony: [
          { required: true, message: '家庭是否和睦不能为空', trigger: 'change' }
        ],
        socialEvaluation: [
          { required: true, message: '社会评价(村委会评价)不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '社会评价(村委会评价)最大长度为20位', trigger: 'blur' }
        ],
        isSelfEntity: [
          //{ required: true, message: '主营业务是否自办实体不能为空', trigger: 'change' }
        ],
        isOweTax: [
          //{ required: true, message: '是否欠缴税费（除个税）不能为空', trigger: 'change' }
        ],
        produceCapacity: [
          { required: true, message: '生产经营能力不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 10, message: '生产经营能力最大长度为10位', trigger: 'blur' }
        ],
        produceScene: [
          { required: true, message: '生产经营场景不能为空', trigger: 'blur' },
          { type: 'string', min: 1,max: 20, message: '生产经营场景最大长度为20位', trigger: 'blur' }
        ],
        accountId: [
          { required: true, message: '维护客户经理不能为空', trigger: 'blur' },
          { type: 'string',pattern:'^[0-9]{0,20}$', message: '维护客户经理为最大20位的数字', trigger: 'blur' }
        ],
        insuranceType: [
          //{ required: true, message: '参与保险情况不能为空', trigger: 'change' }
        ]
      },
      FDform : {},
      FDformShow : false,
      FDruleValidate : {
        idNumber: [
          { required: true, message: '请填写18位有效证件号码', trigger: 'blur' },
          { type: 'string', min: 18,max: 18, message: '证件号码长度为18位', trigger: 'blur' }
        ],
        industry: [
          { required: true, message: '请填写所属行业', trigger: 'change' }
        ],
        career: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', min: 0,max: 20, message: '职业最大长度为20位', trigger: 'blur' }
        ],
        companyName: [
          { required: false, message: '', trigger: 'change' },
          { type: 'string', min: 0,max: 50, message: '单位名称最大长度为50位', trigger: 'blur' }
        ],
        companyAddress: [
          { required: false, message: '', trigger: 'change' },
          { type: 'string', min: 0,max: 100, message: '单位地址最大长度为100位', trigger: 'blur' }
        ],
        workYear: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string',pattern:'(^[1-9]([0-9]{0,1})$)|(^0$)', message: '工作年限为两位整数', trigger: 'blur' }
        ],
        housePrice: [
          { required: false, message: '', trigger: 'change' },
          { type: 'string', pattern:'(^[1-9]([0-9]{0,15})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)', message: '房屋价值最长为保留两位小数且整数部分最长16位的数字', trigger: 'blur' }
        ],
        carNumber: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string',pattern:'(^[1-9]([0-9]{0,3})$)|(^0$)', message: '车子数量为四位整数', trigger: 'blur' }
        ],
        carPrice: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', pattern:'(^[1-9]([0-9]{0,15})?(\\.\\d{1,2})?$)|(^0$)|(^\\d\\.\\d{1,2}$)', message: '车子价值最长为保留两位小数且整数部分最长16位的数字,', trigger: 'blur' }
        ],
        yearSalary: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', pattern:'(^[1-9]([0-9]{0,15})?(\\.\\d{1,2})?$)|(^0$)|(^\\d\\.\\d{1,2}$)', message: '年收入最长为保留两位小数且整数部分最长16位的数字,', trigger: 'blur' }
        ],
        shopNumber: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string',pattern:'(^[1-9]([0-9]{0,3})$)|(^0$)', message: '店铺数量为四位整数', trigger: 'blur' }
        ],
        shopPrice: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', pattern:'(^[1-9]([0-9]{0,15})?(\\.\\d{1,2})?$)|(^0$)|(^\\d\\.\\d{1,2}$)', message: '店铺价值为保留两位小数且整数部分最长16位的数字,', trigger: 'blur' }
        ],
        equipmentNumber: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string',pattern:'(^[1-9]([0-9]{0,9})$)|(^0$)', message: '设备数量为十位整数', trigger: 'blur' }
        ],
        equipmentPrice: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', pattern:'(^[1-9]([0-9]{0,15})?(\\.\\d{1,2})?$)|(^0$)|(^\\d\\.\\d{1,2}$)', message: '设备价值为保留两位小数且整数部分最长16位的数字,', trigger: 'blur' }
        ],
        yearSurplus: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', pattern:'(^[1-9]([0-9]{0,15})?(\\.\\d{1,2})?$)|(^0$)|(^\\d\\.\\d{1,2}$)', message: '年结余为保留两位小数且整数部分最长16位的数字,', trigger: 'blur' }
        ],
        landAcreage: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', pattern:'(^[1-9]([0-9]{0,15})?(\\.\\d{1,2})?$)|(^0$)|(^\\d\\.\\d{1,2}$)', message: '土地面积为保留两位小数且整数部分最长16位的数字,', trigger: 'blur' }
        ],
        greenhouseNumber: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string',pattern:'(^[1-9]([0-9]{0,9})$)|(^0$)', message: '大棚数量为十位整数', trigger: 'blur' }
        ],
        breedType: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', min: 0,max: 50, message: '种植品种最大长度为50位', trigger: 'blur' }
        ],
        breedNumber: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string',pattern:'(^[1-9]([0-9]{0,9})$)|(^0$)', message: '养殖数量为十位整数', trigger: 'blur' }
        ],
        companyEarnings: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', pattern:'(^[1-9]([0-9]{0,15})?(\\.\\d{1,2})?$)|(^0$)|(^\\d\\.\\d{1,2}$)', message: '单位收益为保留两位小数且整数部分最长16位的数字,', trigger: 'blur' }
        ],
        businessLicense: [
          { required: false, message: '', trigger: 'blur' }
        ],
        other: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', min: 0,max: 50, message: '其他最大长度为50位', trigger: 'blur' }
        ]
      },

      tagList : [],
      tag : '',
      myTagList : [],
      myTagShow : false,
      deleteTagModel : {
          show: false,
          loading: false,
          row:{}
      },
      addTagModel : {
        show: false
      },
      tagColumns : [
          {
              title: '标签名',
              align: 'center',
              key: 'tagName'
          },
          {
              title: '操作',
              key: 'action',
              align: 'center',
              width: 200,
              render: (h, params) => {
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'text',
                              size: 'small'
                          },
                          on: {
                              click: () => {
                                  this.deletetag(params.row)
                              }
                          }
                      }, '删除')
                  ])
              }
          }
      ],

      addImageModal : false,
      deleteImageModel : {
          show: false,
          title: '你确定要删除这行影像资料吗？',
          id: null,
          loading: false
      },
      imageType : {
        show:false,
        index:0,
        types:[],
        upload:{
            type:'',
            customerName:'',
            idNumber:'',
            gridCode:'',
            uploadAccountId:0
        },
        typeName:'',
      },
      images : [
          {
              title: '基本信息',
              type: '1',
              types:[
                  {
                      type:'1.1',
                      name:'身份证正面'
                  },
                  {
                      type:'1.2',
                      name:'身份证反面'
                  }
              ],
              list: null
          },
          {
              title: '资产信息',
              type: '2',
              list: null
          },
          {
              title: '经营信息',
              type: '3',
              list: null
          },
          {
              title: '贷款流程信息',
              type: '4',
              types:[
                  {
                      type:'4.1',
                      name:'合同'
                  },
                  {
                      type:'4.2',
                      name:'面签表'
                  }
              ],
              list: null
          },
          {
              title: '押品信息',
              type: '5',
              list: null
          },
          {
              title: '其他信息',
              type: '6',
              list: null
          }
      ]
    }
  },
  computed: {
    ...mapState({
      Memberlist: state => state.customer.Memberlist,
    })
  },
  watch:{
      'add.tab':function (newVal,oldVal) {
          if(!this.FLformShow && newVal==1){
              this.FLformShow=true
              this.getFMupdate(this.form.customerId)
              this.getFLupdate(this.FLform.householdId)
          }else if(!this.familyShow && newVal==1){
              this.familyShow=true
              this.getFMupdate(this.form.customerId)
          }else if(!this.FDformShow && newVal==2){
              if(this.form.borrowerNature=="农户"){
                this.FDdivis=true
                if(this.FDform.isFarmIncome!="是"){
                  this.isFarmIncomeRow=false
                }else{
                  this.isFarmIncomeRow=true
                }
              }else if(this.form.borrowerNature=="非农户"){
                this.FDdivno=true
                if(this.FDform.isBusinessIncome!="是"){
                  this.isBusinessIncomeRow=false
                }else{
                  this.isBusinessIncomeRow=true
                }
              }
              this.FDformShow=true
              this.getFDupdate(this.FDform.idNumber)
          }else if(!this.myTagShow && newVal==3){
              this.getMyTag(this.form.idNumber)
              this.myTagShow=true
          }else if(newVal==4){
              if(this.images[0].list==null) {
                  this.getImageList(0)
              }
          }
      },
      'imageType.index':function (newVal,oldVal) {
          if(this.images[this.imageType.index].list==null) {
              this.getImageList(this.imageType.index)
          }
      }
  },
  mounted () {
    this.form = { 
      investigator1:user.realName,
      registrant : user.realName,
      registerOrg : user.orgName 
    }
    if ('customerId' in this.$route.query) {
      this.flag=true
      this.add.is=false
      var vue=this
      this.getDetail(this.$route.query.customerId)
    }else if('currentGridCode' in this.$route.query){
      this.form.gridCode =this.$route.query.currentGridCode
    }
    this.addTag()
  },
  methods: {
    nextStep (tab) {
      this.add.tab = tab
    },
    uploadCard1 (data) {
      if (data.code === 200) {
        this.$Message.success('成功获取身份证信息')
        this.form = data.data
        this.form.customerName = data.data.name
        if (data.data.sex === '男') {
          this.form.sex = '1'
        } else {
          this.form.sex = '2'
        }
        this.form.nativePlace = data.data.address
        this.form.nativeAddress = data.data.address
        this.form.residenceAddress = data.data.address
      } else {
        this.$Message.error(data.message)
          if(data.code === 300){
              sessionStorage.clear()
              window.location.href="/"
          }
      }
    },
    uploadCard2 (data) {
        if (data.code === 200) {
            this.$Message.success('上传身份证反面信息成功')
        } else {
            this.$Message.error(data.message)
            if(data.code === 300){
                sessionStorage.clear()
                window.location.href="/"
            }
        }
    },

    getDetail (id) {
      var vue = this
      return this.$store.dispatch(actions.get.CUSTOMER_PERSON, id).then(rep => {
          if(rep.code == 200) {
            vue.form = { ...rep.data }
            for (var k in vue.form) {
              if (typeof (vue.form[k]) === 'number') {
                vue.form[k] = vue.form[k] + ''
              }
            }
            if(vue.form.birthday){
              vue.form.birthday=vue.form.birthday.substring(0,4)+"-"+vue.form.birthday.substring(4,6)+"-"+vue.form.birthday.substring(6)
            }
            
            
            if(vue.form.isBuyHouse!='是'){
                vue.form.isBuyHouse='否'
            }
            if(vue.form.borrowerNature!='农户'){
              this.isBuyHouseCol=false
              this.cellNameCol=false
              this.cellAddressCol=false
            }else{
              if(vue.form.isBuyHouse!='是'){
                this.cellNameCol=false
                this.cellAddressCol=false
              }
            }

            vue.FLform.householdId = vue.form.householdId
            vue.FLform.postcode = vue.form.postcode

            vue.householdId = vue.form.householdId
            vue.FDform.idNumber=vue.form.idNumber

            vue.imageType.upload.customerName=vue.form.customerName
            vue.imageType.upload.idNumber=vue.form.idNumber
            vue.imageType.upload.gridCode=vue.form.gridCode

            if(sessionStorage.getItem('fromCustomerToResident')){
                sessionStorage.removeItem('fromCustomerToResident')
                this.add.tab=2
            }
          }else if(rep.code != 204) {
            vue.$Message.error(rep.message)
          }
      })
    },
    handleSubmit (name) {
        var vue = this
        this.$refs[name].validate((valid) => {
            if (valid) {
                const payload = { ...this[name] }
                const date = new Date(payload.birthday)
                const month = date.getMonth() + 1
                const day = date.getDate()
                payload.birthday = `${date.getFullYear()}${month >= 10 ? month : '0' + month}${day >= 10 ? day : '0' + day}`

                if ('customerId' in payload) {
                    delete payload.tags
                    this.$store.dispatch(actions.put.CUSTOMER_PERSON, payload).then(rep => {
                        if(rep.data.code==200) {
                            vue.$Message.success('基本信息已经修改成功!')
                            vue.FLform.postcode=vue.form.postcode
                        }else{
                            vue.$Message.error(rep.data.message)
                        }
                    })
                } else {
                    this.$store.dispatch(actions.post.CUSTOMER_PERSON, payload).then(rep => {
                        if(rep.data.code==200){
                            vue.$Message.success('基本信息已经提交成功!')
                            vue.add.is=false
                            vue.nextStep(1)
                            vue.FLform.householdId=vue.form.householdId
                            vue.getFLupdate(vue.form.householdId)
                            vue.householdId = payload.householdId
                            vue.FDform.idNumber=vue.form.idNumber
                            vue.FLform.postcode=vue.form.postcode

                            vue.imageType.upload.customerName=vue.form.customerName
                            vue.imageType.upload.idNumber=vue.form.idNumber
                            vue.imageType.upload.gridCode=vue.form.gridCode
                            vue.$store.dispatch(actions.get.CUSTOMERS_PERSON, payload.idNumber).then(rep => {
                               if(rep.code==200){
                                  vue.form= rep.data[0]
                                   for (var k in vue.form) {
                                      if (typeof (vue.form[k]) === 'number') {
                                        vue.form[k] = vue.form[k] + ''
                                      }
                                    }
                                    vue.form.birthday=vue.form.birthday.substring(0,4)+"-"+vue.form.birthday.substring(4,6)+"-"+vue.form.birthday.substring(6)
                                    if(vue.form.isBuyHouse!='是'){
                                        vue.form.isBuyHouse='否'
                                    }
                               }else if(rep.code!=204){
                                  vue.$Message.error(rep.message)
                               }
                            })
                        }else{
                            vue.$Message.error(rep.data.message)
                        }
                    })
                }
            } else {
                this.$Message.error('表单验证错误!')
            }
        })
    },
    //暂存
    temporarySubmit (name) {
      var vue = this
      const payload = { ...this[name] }
      const date = new Date(payload.birthday)
      const month = date.getMonth() + 1
      const day = date.getDate()
      if(date.length>0){
        payload.birthday = `${date.getFullYear()}${month >= 10 ? month : '0' + month}${day >= 10 ? day : '0' + day}`
      }
      if ('customerId' in payload) {
          delete payload.tags
          this.$store.dispatch(actions.put.TEMPORARY_PERSON, payload).then(rep => {
              if(rep.data.code==200) {
                  vue.$Message.success('基本信息已经修改成功!')
                  vue.FLform.postcode=vue.form.postcode
              }else{
                  vue.$Message.error(rep.data.message)
              }
          })
      } else {
          this.$store.dispatch(actions.post.TEMPORARY_PERSON, payload).then(rep => {
              if(rep.data.code==200){
                  vue.$Message.success('基本信息已暂存!')
              }else{
                  vue.$Message.error(rep.data.message)
              }
          })
      }
    },
    getFLupdate (householdId) {
        var vue=this
        this.$store.dispatch(actions.get.RESIDENT_USER_ROLEID, {roleId:1}).then(rep => {
            if( rep.code==200 ) {
                vue.userList = [ ...rep.data ]
            }else if(rep.code!=204){
                vue.$Message.error(rep.message)
            }
        })
        this.$store.dispatch(actions.get.FAMILYS_PERSON, householdId).then(rep => {
            if (rep.code==200) {
                if(rep.data){
                    vue.FLform = { ...rep.data }
                }else{
                    vue.FLform = {}
                }
                if (typeof (vue.FLform.householdId) === 'undefined') {
                    vue.FLform.householdId = vue.form.householdId
                }
                for (var k in this.FLform) {
                    if (typeof (vue.FLform[k]) === 'number') {
                        vue.FLform[k] = this.FLform[k] + ''
                    }
                }
            }else if(rep.code!=204){
                vue.$Message.error(rep.message)
            }
        })
    },
    FLhandleSubmit (name) {
        var vue=this
        this.$refs[name].validate((valid) => {
            if (valid) {
                const payload = { ...this[name] }
                if ('familyId' in payload) {
                    vue.$store.dispatch(actions.put.FAMILYS_PERSON, payload).then(rep => {
                        if (rep.data.code==200){
                            vue.$Message.success('家庭信息已经更改成功!')
                        }else{
                            vue.$Message.error(rep.data.message)
                        }

                        if(!('customerId' in this.$route.query)){
                            vue.nextStep(2)
                        }
                    })
                } else {
                    vue.$store.dispatch(actions.post.FAMILYS_PERSON, payload).then(rep => {
                        if (rep.data.code==200){
                            if('customerId' in this.$route.query){
                                vue.getFLupdate(payload.householdId)
                                vue.$Message.success('家庭信息已经更改成功!')
                            }else{
                                vue.$Message.success('家庭信息已经提交成功!')
                                vue.getFMupdate(payload.customerId)
                                vue.nextStep(2)
                            }
                        }else{
                            vue.$Message.error(rep.data.message)
                        }
                    })
                }
            } else {
                vue.$Message.error('表单验证错误!')
            }
        })
    },

    getFMupdate (customerId) {
      var vue=this
      return this.$store.dispatch(actions.get.MEMBER_LIST, customerId).then(rep => {
          if (rep.code==200) {
              vue.Memberlists = [ ...rep.data ]
          }else if(rep.code!=204) {
              vue.$Message.error(rep.message)
          }
      })
    },
    editFM (row) {
      this.$router.push('/customer/addDetail?customerId='+row.customerId+'&memberId=' + row.memberId)
    },
    deleteFM (row) {
      this.deleteFamilyModel.data = row
      this.deleteFamilyModel.content = row.residentName
      this.deleteFamilyModel.show = true
      this.deleteFamilyModel.memberId=row.memberId
    },
    deleteFMUser () {
      this.deleteFamilyModel.loading = true
      var vue=this
      this.$store.dispatch(actions.delete.MEMBER_PERSON, this.deleteFamilyModel.memberId).then(rep => {
          if (rep.data.code==200) {
              vue.$Message.success('删除成功')
              vue.getFMupdate(this.form.customerId).then(rep1 => {
                  vue.deleteFamilyModel.loading = false
                  vue.deleteFamilyModel.show = false
                  if (rep1.data.code == 200) {
                      vue.Memberlists = [...rep1.data.data]
                  }
              })
          }else{
              vue.$Message.error(rep.data.message)
          }
      })
    },

    getFDupdate (idNumber) {
        var vue=this
        this.$store.dispatch(actions.get.PROPERTY_PERSON, idNumber).then(rep => {
            if (rep.code==200) {
                vue.FDform = {...rep.data}
                if (typeof (vue.FDform.idNumber) === 'undefined') {
                    vue.FDform.idNumber = vue.form.idNumber
                }
                for (var k in vue.FDform) {
                    if (typeof (vue.FDform[k]) === 'number') {
                        vue.FDform[k] = vue.FDform[k] + ''
                    }
                }
                if(vue.FDform.isFarmIncome!='是'){
                  this.isFarmIncomeRow=false
                }else{
                  this.isFarmIncomeRow=true
                }
                if(vue.FDform.isBusinessIncome!='是'){
                  this.isBusinessIncomeRow=false
                }else{
                  this.isBusinessIncomeRow=true
                }
            }else if(rep.code!=204){
                vue.$Message.error(rep.message)
            }
        })
    },
    FDhandleSubmit (name) {
      var vue=this
      this.$refs[name].validate((valid) => {
        if (valid) {
          const payload = { ...this[name] }
          if ('financeId' in payload) {
              vue.$store.dispatch(actions.put.PROPERTY_PERSON, payload).then(rep => {
                if (rep.data.code==200){
                    vue.$Message.success('资产信息已经更改成功!')
                }else{
                    vue.$Message.error(rep.data.message)
                }
                if(!('customerId' in this.$route.query)){
                    vue.nextStep(4)
                }
            })
          } else {
            vue.$store.dispatch(actions.post.PROPERTY_PERSON, payload).then(rep => {
              if (rep.data.code==200){
                  if('customerId' in vue.$route.query){
                      vue.getFDupdate(payload.idNumber)
                      vue.$Message.success('资产信息已经更改成功!')

                  }else{
                      vue.$Message.success('资产信息已经提交成功!')
                      vue.nextStep(4)
                  }
              }else{
                  vue.$Message.error(rep.data.message)
              }
            })
          }
        } else {
            vue.$Message.error('表单验证错误!')
        }
      })
    },

    getMyTag (idNumber) {
        var vue=this
        return this.$store.dispatch(actions.get.MYTAG_LIST, idNumber).then(rep => {
            if (rep.code==200) {
                vue.myTagList = [ ...rep.data ]
            }else if(rep.code!=204){
                vue.$Message.error(rep.message)
            }
        })
    },
    //添加标签
    addTag () {
      var vue = this
      if (this.tagList.length === 0) {
        this.$store.dispatch(actions.get.TAGALL_LIST).then(rep => {
            if (rep.code==200) {
                vue.tagList = [ ...rep.data ]
            }else if(rep.code!=204){
                vue.$Message.error(rep.message)
            }
        })
      }
    },
    submitTag () {
      this.addTagModel.show = false
      var tags = this.tag.split(';')
      var flag = true
      for (var i in this.myTagList) {
        if (tags[1] === this.myTagList[i].tagName) {
          flag = false
        }
      }
      if (flag) {
        var vue = this
        this.$store.dispatch(actions.post.MYTAG_PERSON, {
          idNumber: this.form.idNumber,
          tagId: tags[0],
          tagName: tags[1]
        }).then(rep => {
            if (rep.data.code==200){
                vue.$Message.success('标签已经添加成功!')
                vue.getMyTag(vue.form.idNumber)
            }else{
                vue.$Message.error(rep.data.message)
            }
        })
      } else { this.$Message.error('已有该标签!') }
    },
    deletetag (row) {
        this.deleteTagModel.row=row
        this.deleteTagModel.show = true
    },
    tagdelete () {
        let vue=this
        vue.deleteTagModel.show = true
        vue.$store.dispatch(actions.delete.MYTAG_PERSON, {
          tagId:vue.deleteTagModel.row.tagId,
          idNumber:vue.form.idNumber
        }).then(rep => {
            if ( rep.data.code==200 ) {
                vue.deleteTagModel.loading = false
                vue.deleteTagModel.show = false
                vue.$Message.success('删除成功')
                vue.getMyTag(vue.form.idNumber)
            }else{
                vue.deleteTagModel.loading = false
                vue.deleteTagModel.show = false
                vue.$Message.error(rep.data.message)
            }
        })
        /*vue.$store.dispatch(actions.delete.MYTAG_PERSON, vue.form.idNumber).then(rep => {
            if ( rep.data.code==200 ) {
                vue.deleteTagModel.loading = false
                vue.deleteTagModel.show = false
                vue.$Message.success('删除成功')
                vue.getMyTag(this.form.idNumber)
            }else{
                vue.deleteTagModel.loading = true
                vue.$Message.error(rep.data.message)
            }
        })*/

    },
    changeisFarmIncome () {
      if (this.FDform.isFarmIncome=='是') {
        this.isFarmIncomeRow=true
      }else{
        this.isFarmIncomeRow=false
      }
    }, 
    changeisBusinessIncome () {
      if (this.FDform.isBusinessIncome=='是') {
        this.isBusinessIncomeRow=true
      }else{
        this.isBusinessIncomeRow=false
      }
    },
    changeBorrowerNature(){
      if(this.form.borrowerNature=='农户'){
        this.isBuyHouseCol=true
      }else{
        this.isBuyHouseCol=false
      }
    },
    changeIsBuyHouse(){
        if(this.form.isBuyHouse=='是'){
              this.cellNameCol=true
              this.cellAddressCol=true
              this.ruleValidate.cellName[0].required=true
              this.ruleValidate.cellAddress[0].required=true
        }else{
            this.cellNameCol=false
            this.cellAddressCol=false
            let obj={ ...this.form }
            this.$refs['form'].resetFields()
            this.ruleValidate.cellName[0].required=false
            this.ruleValidate.cellAddress[0].required=false
            this.form=obj

        }
    },
    getImageList (index){
        var vue = this
        this.$store.dispatch(actions.get.IMAGE_LIST, {
            idNumber: vue.form.idNumber,
            type: vue.images[index].type
        }).then(rep => {
            if(rep.data.code==200){
                let data = { ...rep.data }
                vue.images[index].list = data.data
                /*vue.showImg(data.data,index)*/
            }else if(rep.data.code!=204){
                vue.$Message.error(rep.data.message)
            }
        })
    },
    showImg (list,index) {
        /*let html = ""
        for (let i in list) {
            html = html + "<img id='pop" + list[i].id + "' style='width:31%;float:left;margin: 0 1%' src='" + list[i].baseCode + "'/>"
        }
        document.getElementById('img' + index).innerHTML = html
        let eles=document.getElementById('img' + index).childNodes
        if(eles.length>0){
            var vue=this
            for(let j in eles){
                eles.item(j).addEventListener('click', function () {
                    if(vue.images[index].count==1){
                        vue.images[index].count=2
                    }else{
                        vue.images[index].count=1
                    }
                    let id=this.id.substring(3)
                    setTimeout(function () {
                        if (vue.images[index].count === 2) {
                            vue.deleteImageModel.show=true
                            vue.deleteImageModel.loading = false
                            vue.deleteImageModel.id=id
                        }
                        vue.images[index].count = 0
                    }, 300)
                }, false)
            }
        }*/
    },
    addImage (index){
        this.addImageModal=true
        if(this.images[index].types){
            this.imageType.show=true
            this.imageType.types=this.images[index].types
            this.imageType.typeName=this.images[index].title
            this.imageType.upload.type=''
        }else{
            this.imageType.show=false
            this.imageType.upload.type=this.images[index].type
            this.imageType.typeName=this.images[index].title
        }
        this.$refs.upload.clearFiles()
    },
    beforeImage (){
        if(this.imageType.upload.type==''){
            this.$Message.error('请选择影像类型')
            return false
        }else{
            return true
        }
    },
    uploadImage (data){
        if (data.code === 200) {
            this.addImageModal=false
            this.getImageList (this.imageType.index)
            this.$Message.success('上传成功')
        } else {
            this.$Message.error(data.message)
            if(data.code === 300){
                sessionStorage.clear()
                window.location.href="/"
            }
        }
    },
    deleteImageUser () {
        this.deleteImageModel.loading = true
        var vue=this
        this.$store.dispatch(actions.delete.IMAGE_PERSON, this.deleteImageModel.id).then(rep => {
            vue.deleteImageModel.loading = false
            vue.deleteImageModel.show=false
            if(rep.data.code==200){
                vue.getImageList(vue.imageType.index)
                vue.$Message.success('删除成功')
            }else{
                vue.$Message.error(rep.data.message)
            }
        })
    },
    selectResidentByIdNumber(idNumber){
        var vue = this
        if (!('customerId' in this.$route.query)) {//新建客户信息时调用
            this.$store.dispatch(actions.get.RESIDENTBYIDNUMBER_PERSON, idNumber).then(rep => {
                if(rep.code==200){
                    let data = { ...rep.data }
                    vue.form = {
                        nativeAddress : data.address,
                        householdId : data.householdId + '',
                        sex : (data.sex=='男'?'1':'2'),
                        nation : data.nation,
                        phoneNumber : data.contact,
                        ...vue.form
                    }
                }else if(rep.code!=204){
                    vue.$Message.error(rep.message)
                }
            })
        }
    },
    goBack(){
        this.deleteImageModel.show=false
        this.deleteTagModel.show=false
        this.deleteFamilyModel.show=false
    },

      handleView (imgIndex,index) {
          this.baseCode = this.images[index].list[imgIndex].baseCode;
          this.visible.show = true;
          this.visible.index = index;
          this.visible.imgIndex = imgIndex;
          this.visible.len =  this.images[index].list.length
      },
      handleRemove (file) {
          var vue = this
          vue.deleteImageModel.show = true
          vue.deleteImageModel.loading = false
          vue.deleteImageModel.id = file.id
          vue.baseCode = file.baseCode
      },
      handleFormatError (file) {
          this.$Notice.warning({
              title: '文件格式不正确',
              /*desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'*/
          });
      },
      handleMaxSize (file) {
          this.$Notice.warning({
              title: '超过文件大小限制,请不要超过2M',
              /*desc: 'File  ' + file.name + ' is too large, no more than 2M.'*/
          });
      },

  }
}
</script>

<style lang="scss">
  .customerBreadcrumb {
    height: 54px;
    background-color: #fff;
    font-size: 14px;
    font-family:PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
    border-radius: 4px;
    border: 1px solid #eee;
  }
  .tabsModel{
    .ivu-tabs-nav .ivu-tabs-tab {
      padding: 14px 16px;
    }
    .ivu-tabs-nav-scroll {
      background: #fff;
      height:50px
    }
    margin: 16px 24px;
    .tabsForm {
      .divpage {
        width: 100%;
        background-color:#fff;
        padding-bottom: 20px;
        margin-bottom: 20px;
        .ivu-radio-group{
          width: 800px
        }
        .ivu-form-item{
          margin: auto;
          margin-right: 20px;
          margin-top: 20px
        }
      }
      .buttonpage {
        width: 100%;
        background-color:#fff;
        padding-top: 4px;
        padding-bottom: 20px;
        .ivu-form-item{
          margin: auto;
          margin-right: 20px;
          margin-top: 16px
        }
      }
      .ivu-form-item-label {
        font-size: 14px;
      }
      .ivu-radio-group-item {
        font-size: 14px;
      }
    }
  }


  .demo-upload-list{
    display: inline-block;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 120px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 35px;
    cursor: pointer;
    margin: 35px 2px;
  }
</style>
