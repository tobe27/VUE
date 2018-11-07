<template>
  <div class="overview">
    <ul>
      <li>
        <img src="../../../static/images/home/group1.png" />
        <div>
          <p>总户数</p>
          <p class="num">{{ data.familyNum?data.familyNum:0 }}</p>
        </div>
      </li>
      <li>
        <img src="../../../static/images/home/group2.png" />
        <div>
          <p>总人口数</p>
          <p class="num">{{ data.peopleNum?data.peopleNum:0 }}</p>
        </div>
      </li>
      <li>
        <img src="../../../static/images/home/group3.png" />
        <div>
          <p>预授信覆盖率</p>
          <p class="num">{{ data.creditRatio?data.creditRatio:0 }}%</p>
        </div>
      </Col>
      <li>
      <img src="../../../static/images/home/group4.png" />
        <div>
          <p>用信覆盖率</p>
          <p class="num">{{ data.useRatio?data.useRatio:0 }}%</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import actions from '@/store/action-types'

export default {
  name: 'OverView',
  data () {
      return {
          data:{}
      }
  },
  mounted(){
      let role=0
      var vue = this
      this.$store.dispatch(actions.get.OVER_VIEW, {role:role} ).then(rep => {
          if (rep.code == 200) {
              vue.data = { ...rep.data }
          }else if (rep.code != 204) {
              vue.$Message.error(rep.message)
          }
      })
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.overview {
  margin-top: 10px;
  ul {
    display: flex;
    width: 100%;
    text-align: center;
    background-color: #F0F2F5;
  }
  li {
    flex: 1;
    margin-left: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    background-color: #fff;
    list-style: none;
    &:first-child {
      margin-left: 0;
    }
    img {
      float:left;
      margin-left: 15%;
      width:70px;
      height:70px;
    }
    div {
      float:right;
      margin-right: 10%;
      width:calc(55%- 60px);
      text-align: right;

      p {
        font-size: 16px;
      }
      .num {
        font-size: 24px;
        font-weight: 500;
      }
    }
  }
}
</style>
