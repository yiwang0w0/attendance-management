<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="form-wrapper">
    <el-card>
      <h2 class="title">登录</h2>
      <el-form :model="form" @submit.prevent="onSubmit">
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="onSubmit" :loading="loading">登录</el-button>
        </el-form-item>
        <el-alert v-if="error" type="error" :closable="false" :title="error" show-icon />
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'

const router = useRouter()
const form = reactive({
  username: '',
  password: ''
})
const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    const res = await api.post('/login', form)
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('username', form.username)
    router.push('/dashboard')
  } catch (e) {
    error.value = (e.response && e.response.data && e.response.data.error) || '登录失败'
  }
  loading.value = false
}
</script>

<style scoped>
.form-wrapper {
  max-width: 360px;
  margin: 100px auto;
}
.title {
  text-align: center;
  margin-bottom: 24px;
}
</style>
