<template>
  <div class="user-avator-dropdown">
    <!-- <Badge class="notification" :count="4" :offset="[3, 0]">
      <Icon class="icon" type="ios-notifications-outline" size="36"></Icon>
    </Badge>-->
    <Dropdown @on-click="handleClick" placement="bottom-end">
      <Avatar icon="ios-person" :src="userAvator"/>
      <span>{{ username }}</span>
      <Icon class="arrow" :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    this.username = sessionStorage.getItem('username')
  },
  methods: {
    ...mapActions(['handleLogOut']),
    handleClick (name) {
      switch (name) {
        case 'logout':
          sessionStorage.clear()
          window.location.href = '/'
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-avator-dropdown {
  color: #000;
  font-size: 14px;
  cursor: pointer;
  vertical-align: middle;
  float: right;
  margin-right: 10px;
  .notification {
    width: 28px;
    height: 28px;
    top: 12px;
    margin-right: 30px;
    .icon {
      vertical-align: initial;
    }
  }
  span {
    margin-right: 5px;
  }
}
</style>
