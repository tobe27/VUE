<template>
  <div class="navigation">
    <div class="title"><span>营销活动管理</span></div>
    <ul>
      <li>
        <div class="icon">
          <img src="../../../static/images/home/icon1.png">
        </div>
        <p>任务分配</p>
      </li>
      <li>
        <div class="icon">
            <img src="../../../static/images/home/icon2.png">
        </div>
        <p>活动进展</p>
      </li>
      <li>
        <div class="icon">
            <img src="../../../static/images/home/icon3.png">
        </div>
        <p>活动排名</p>
      </li>
      <li>
        <div class="icon">
            <img src="../../../static/images/home/icon4.png">
        </div>
        <p>精准营销</p>
      </li>
      <!--<li>-->
        <!--<div class="icon">-->
          <!--<Icon type="ios-chatbubbles" size="32" />-->
        <!--</div>-->
        <!--<p>营销经验</p>-->
      <!--</li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="scss" scoped>
.navigation {
  .title {
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #ddd;
  }
  ul {
    display: table;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    li {
      display: table-cell;
      text-align: center;
      &:hover {
        cursor: pointer;
        .icon {
          background-color: #eee;
        }
      }
      .icon {
        margin: auto;
        width:72px;
        height:72px;
        background:rgba(247,249,253,1);
        border-radius: 50%;
        img {
          margin: 14px auto;
          width:33px;
          height:34px;
        }
      }
    }
  }
}
</style>
