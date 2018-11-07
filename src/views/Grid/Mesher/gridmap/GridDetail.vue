<template>
  <div class="ranking">
    <Divider orientation="left">网格详情</Divider>
    <div class="detail">
      <canvas id="canvas" height="120" width="120"></canvas>
      <p>{{gridperson.description}}</p>
    </div>
    <Divider />
    <table class="tab">
      <tr>
        <td>
          <div class="tb">客户总数</div>
          <div class="tbs">888</div>
        </td>
        <td>
          <div class="tb">存款总额(万)</div>
          <div class="tbs">888</div>
        </td>
        <td>
          <div class="tb">贷款总额(万)</div>
          <div class="tbs">888</div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="tb">白名单户数</div>
          <div class="tbs">888</div>
        </td>
        <td>
          <div class="tb">黑名单户数</div>
          <div class="tbs">888</div>
        </td>
        <td>
          <div class="tb">灰名单户数</div>
          <div class="tbs">888</div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="tb">授信户数</div>
          <div class="tbs">888</div>
        </td>
        <td>
          <div class="tb">用信户数</div>
          <div class="tbs">888</div>
        </td>
        <td>
          <div class="tb">提升户数</div>
          <div class="tbs">888</div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="tb">三星客户数</div>
          <div class="tbs">888</div>
        </td>
        <td>
          <div class="tb">四星客户数</div>
          <div class="tbs">888</div>
        </td>
        <td>
          <div class="tb">五行客户数</div>
          <div class="tbs">888</div>
        </td>
      </tr>
    </table>
    <Divider  orientation="left">评议小组</Divider>
    <table class="tabs">
      <tr class="tbs" v-if="length==0">暂无评议成员</tr>
      <tr v-for="review,index in gridperson.listReview" v-if="index%2==0">
        <td>
          <div class="tb">姓名:{{ review.gridReviewName }}</div>
          <div class="tbs">职务:{{ review.duties }}</div>
          <div class="tbs">正式/备选: ({{ review.type=='1'?'正式':'备选' }})</div>
        </td>
        <td v-if="gridperson.listReview.length>index+1">
          <div class="tb">姓名:{{ gridperson.listReview[index+1].gridReviewName }}</div>
          <div class="tbs">职务:{{ gridperson.listReview[index+1].duties }}</div>
          <div class="tbs">正式/备选: ({{ gridperson.listReview[index+1].type=='1'?'正式':'备选' }})</div>
        </td>
        <td v-if="gridperson.listReview.length==index+1">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import { mapState } from 'vuex'
import actions from '@/store/action-types'
import { UPLOAD_API_URL } from '@/config'

export default {
    data () {
        return {
            id : '',
            gridInfo : { },
            length : 0
        }
    },
    computed: {
        ...mapState({
            gridperson: state => state.grid.gridperson
        })
    },
    mounted : function () {
        this.id = this.$route.query.id
        var vue = this
        this.$store.dispatch(actions.get.GRID_PERSON, this.id).then(rep => {
            vue.gridInfo={...rep.data}
            vue.length=vue.gridInfo.listReview.length
        })
        setTimeout(() => {
            vue.qrcode()
        },1000)
    },
    methods: {
        qrcode () {
            this.QueryDetail=this.gridInfo.qrcode+'#/guard'+"?unique_code="+this.QueryDetail;
            var canvas = document.getElementById('canvas')
            QRCode.toCanvas(canvas, this.QueryDetail, function (error) {
            })
        }
    }
}
</script>

<style lang="scss">
.ranking {
  .detail {
    width:100%;
    height: 120px;
    #canvas {
      width: 32%!important;
      height: auto!important;
      margin: 0 15px;
      float:left;
    }
    p {
      width: calc(68% - 30px);
      float:left;
      text-indent:2em;
    }
  }
  .tab {
    width:100%;
    text-align: center;
    .tb {
      color: #a19696;
    }
    .tbs {
      font-size: 14px;
      font-weight: bold;
    }
  }
  .tabs {
    margin-left: 10px;
    width:400px;
    height:150px;
    .tb {
      font-size: 14px;
    }
  }

}
</style>
