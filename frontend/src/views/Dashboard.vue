<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-container style="height:100vh">
    <el-aside width="200px" class="aside">
      <el-menu :default-active="active" @select="onSelect" router>
        <el-menu-item index="/dashboard">首页</el-menu-item>
        <el-menu-item index="/attendance">出勤管理</el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>欢迎，{{ username }}</div>
        <el-button type="text" @click="logout">退出</el-button>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const active = ref('/dashboard')
const username = localStorage.getItem('username')

const onSelect = (index) => {
  active.value = index
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.aside {
  border-right: 1px solid #eee;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
}
</style>
