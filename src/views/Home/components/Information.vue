<template>
  <div class="information">
    <div class="title"><p>{{ title }}</p></div>
    <div class="btn">
      <Button :class="type==1?'active':''" @click="onType(1)">存款</Button>
      <Button :class="type==2?'active':''" @click="onType(2)">贷款</Button>
    </div>
    <ul>
      <li v-for="item in list">
        <p class="redPoit"></p><p>{{ item.message }}<span class="time">{{ item.time }}</span></p>
      </li>
    </ul>
  </div>
</template>

<script>
import actions from '@/store/action-types'
export default {
  name: 'Information',
    data () {
        return {
            title: '全行存款重点客户异动提示',
            type: 1,
            list: []
        }
    },
    mounted(){
        this.onType(1)
    },
    methods : {
        onType (type){
            this.type=type
            var vue = this
            this.$store.dispatch(actions.get.HOME_INFORMATION, {
                amountType:type
            } ).then(rep => {
                if (rep.code == 200) {
                    vue.list = [ ...rep.data ]
                }else if (rep.code != 204) {
                    vue.$Message.error(rep.message)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.information {
  height:260px;
  .title {
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #ddd;
  }
  .btn{
    margin-top: 5px;
    padding-left: 25px;
    button{
      width:70px;
      margin-right: 20px;
      height:28px;
      border-radius: 15px;
      color:#000;
    }
    .active {
      background-color: #4CA1FE;
      color:#fff;
    }
  }
  ul {
    padding: 10px 20px;

    li {
      font-size: 14px;
      line-height: 32px;
      height:32px;
      list-style: none;

      .redPoit {
        margin-top: 12px;
        width:8px;
        height:8px;
        background:rgba(253,77,85,1);
        float: left;
        border-radius: 50%;
      }
      p {
        width: calc(100% - 18px);
        margin-left: 5px;
        float: left;
        .time {
          float: right;
        }
      }
    }
  }

}
</style>
