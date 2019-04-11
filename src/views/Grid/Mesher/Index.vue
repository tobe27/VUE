<template>
  <div>
    <div class="gridMapBreadcrumb">
      <Breadcrumb>
        <BreadcrumbItem to="/grid">网格管理</BreadcrumbItem>
        <BreadcrumbItem>查看</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="layout">
      <Row :gutter="16">
        <Col span="12">
          <Card :bordered="false" :padding="0">
            <div class="title">
              <p>运城市</p>
            </div>
            <div class="inner">
              <img class="map" src="@/static/images/grid/demo-area.jpg" alt="地图">
            </div>
          </Card>
        </Col>
        <Col span="12">
          <Card class="card1" :bordered="false" :padding="0">
            <div class="title">
              <p>网格介绍</p>
            </div>
            <div class="inner">
              <p>网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍。网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍。网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍。网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍网格介绍。</p>
            </div>
          </Card>
          <Card class="card2" :bordered="false" :padding="0">
            <div class="title">
              <p>网格数据</p>
            </div>
            <div class="inner">
              <Row>
                <Col span="6">
                  <div class="t">在籍户数</div>
                  <div class="n">5,000</div>
                </Col>
                <Col span="6">
                  <div class="t">建档户数</div>
                  <div class="n">4,000</div>
                </Col>
                <Col span="6">
                  <div class="t">授信户数</div>
                  <div class="n">3,400</div>
                </Col>
                <Col span="6">
                  <div class="t">用户数</div>
                  <div class="n">3,200</div>
                </Col>
              </Row>
              <Row style="margin-top: 15px">
                <Col span="6">
                  <div class="t">白名单</div>
                  <div class="n">2,000</div>
                </Col>
                <Col span="6">
                  <div class="t">灰名单</div>
                  <div class="n">2,500</div>
                </Col>
                <Col span="6">
                  <div class="t">黑名单</div>
                  <div class="n">500</div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      <Row class="group">
        <Col span="24">
          <Card :bordered="false" :padding="0">
            <div class="title">
              <p>评议小组</p>
            </div>
            <div class="inner">
              <ul>
                <li>
                  <div class="name">张 娜
                    <span>/ 村支书</span>
                  </div>
                  <div class="phone">联系方式：18698744576</div>
                </li>
                <li>
                  <div class="name">徐 志
                    <span>/ 村支书</span>
                  </div>
                  <div class="phone">联系方式：18698744576</div>
                </li>
                <li>
                  <div class="name">谭明明
                    <span>/ 村支书</span>
                  </div>
                  <div class="phone">联系方式：18698744576</div>
                </li>
              </ul>
            </div>
          </Card>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12">
          <Card class="card4" :bordered="false" :padding="0">
            <div class="title">
              <p>进度跟踪</p>
            </div>
            <div class="inner">
              <Row>
                <Col span="8">
                  <img class="circle" src="@/static/images/grid/circle1.png" alt="覆盖率">
                </Col>
                <Col span="8">
                  <img class="circle" src="@/static/images/grid/circle2.png" alt="授信率">
                </Col>
                <Col span="8">
                  <img class="circle" src="@/static/images/grid/circle3.png" alt="用信率">
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col span="12">
          <Card class="card5" :bordered="false" :padding="0">
            <div class="title">
              <p>客户粘度</p>
            </div>
            <div class="inner">
              <img class="pie" src="@/static/images/grid/pie.png" alt="客户粘度">
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mesher',
  data () {
    return {
      gridCode: ''
    }
  },
  mounted () {
    this.gridCode = this.$route.query.gridCode
  }
}
</script>

<style lang="scss" scoped>
.gridMapBreadcrumb {
  height: 54px;
  background-color: #fff;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  line-height: 54px;
  padding-left: 24px;
  border-radius: 4px;
  border: 1px solid #eee;
}
.layout {
  padding: 24px;
  .title {
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
  }
  .inner {
    padding: 15px;
    img.map {
      display: block;
      width: 100%;
    }
  }
  .card2 {
    margin-top: 15px;
    .inner {
      text-align: center;
      .t {
        font-size: 12px;
        color: #949494;
      }
      .n {
        font-size: 24px;
        color: #595959;
      }
      .ivu-col {
        border-right: 1px solid #e9e9e9;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  .group {
    margin-top: 15px;
    .inner {
      padding: 20px;
    }
    ul {
      margin: 0;
      padding: 0;
      height: 50px;
      list-style: none;
    }
    li {
      float: left;
      width: 25%;
      .name {
        font-size: 16px;
        color: #232222;
        line-height: 1.5em;
        span {
          color: #8c8c8c;
          font-size: 14px;
        }
      }
      .phone {
        margin-top: 8px;
        font-size: 14px;
        color: #393939;
      }
    }
  }
  .card4 {
    margin-top: 15px;
    .inner {
      padding: 30px;
      text-align: center;
    }
    img.circle {
      width: 128px;
      height: 128px;
    }
  }
  .card5 {
    margin-top: 15px;
    img.pie {
      height: 158px;
      margin-left: 120px;
    }
  }
}
</style>
