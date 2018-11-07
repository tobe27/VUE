<template>
  <div class="ranking">
    <Tabs v-model="type">
      <TabPane label="支行业务排名" name="branch">
        <div class="subtabs">
          <Button :class="sortType1==1?'current':''" @click="afx(1)">存款排名</Button>
          <Button :class="sortType1==2?'current':''" @click="afx(2)">贷款排名</Button>
          <Button :class="sortType1==3?'current':''" @click="afx(3)">授信率排名</Button>
          <Button :class="sortType1==4?'current':''" @click="afx(4)">用信率排名</Button>
        </div>
        <div class="tabpane">
          <Table :columns="columns1" :data="data1"></Table>
        </div>
      </TabPane>
      <TabPane label="客户经理业务排名" name="salesperson">
        <div class="subtabs">
          <Button :class="sortType2==1?'current':''" @click="afx2(1)">存款排名</Button>
          <Button :class="sortType2==2?'current':''" @click="afx2(2)">贷款排名</Button>
          <Button :class="sortType2==3?'current':''" @click="afx2(3)">授信率排名</Button>
          <Button :class="sortType2==4?'current':''" @click="afx2(4)">用信率排名</Button>
        </div>
        <div class="tabpane">
          <Table :columns="columns2" :data="data2"></Table>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import actions from '@/store/action-types'

export default {
  data () {
    return {
      type:'branch',
      sortType1:'1',//排名类型
      sortType2:'1',
      columns1: [
        {
            title: '排名',
            align: 'center',
            render: (h, params) => {
                return h('span', {
                    props: {
                    },
                },'No' + (params.row._index+1))
            }
        },
        {
          title: '支行名称',
          key: 'orgName',
          align: 'center',
        },
        {
          title: '存款',
          key: 'deposit',
          align: 'center',
        },
        {
          title: '贷款',
          key: 'loan',
          align: 'center',
        }
      ],
      data1: [],
      columns2: [
          {
              title: '排名',
              align: 'center',
              render: (h, params) => {
                  return h('span', {
                      props: {
                      },
                  },'No' + (params.row._index+1))
              }
          },
          {
              title: '客户经理名称',
              key: 'accountName',
              align: 'center',
          },
          {
              title: '存款',
              key: 'deposit',
              align: 'center',
          },
          {
              title: '贷款',
              key: 'loan',
              align: 'center',
          }
      ],
      data2: []
    }
  },
  watch:{
      'type':function (newVal,oldVal) {
          if(newVal=='branch') {
              this.afx(1)
          }else{
              this.afx2(1)
          }
      }
  },
  mounted(){
      this.afx(1)
  },
  methods: {
      afx(sortType1){
          var vue = this
          this.sortType1=sortType1
          this.$store.dispatch(actions.get.RANKING, {
              sortType:sortType1,
              type:0
          } ).then(rep => {
              if (rep.code == 200) {
                  vue.data1 = [ ...rep.data ]
              }else if (rep.code != 204) {
                  vue.$Message.error(rep.message)
              }
          })
      },
      afx2(sortType2){
          this.sortType2=sortType2
          var vue = this
          this.$store.dispatch(actions.get.RANKING, {
              sortType:sortType2,
              type:1
          } ).then(rep => {
              if (rep.code == 200) {
                  vue.data2 = [ ...rep.data ]
              }else if (rep.code != 204) {
                  vue.$Message.error(rep.message)
              }
          })
      }
    }
}
</script>

<style lang="scss">
.ranking {
  height: 595px;
  .ivu-tabs-nav{
    margin-left: calc(50% - 128px);
  }
  .ivu-tabs-tab {
    margin-left: auto;
    height: 50px;
    line-height: 40px;
    font-size: 16px;
  }
  .subtabs {
    width:100%;
    height:40px;
    margin-left: calc(50% - 220px);
    &:first-child {
      margin-left: calc(50% - 220px);
    }
    button {
      width:90px;
      margin-right: 20px;
      height:28px;
      border-radius: 15px;
      color:#000;
      float:left;
      list-style:none;
    }
    .current {
      background-color: #4CA1FE;
      color:#fff;
    }
  }
  .tabpane{
    float: none;
    margin: 0 20px;
  }
}
</style>
