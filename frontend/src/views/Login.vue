<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div style="max-width:360px;margin:100px auto;padding:24px;border-radius:8px;box-shadow:0 2px 16px #eee;">
    <h2 style="text-align:center;margin-bottom:24px;">登录</h2>
    <el-form :model="form" @submit.prevent="onSubmit">
      <el-form-item>
        <el-input v-model="form.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="onSubmit" :loading="loading">登录</el-button>
      </el-form-item>
      <el-alert v-if="error" type="error" :closable="false" :title="error" show-icon style="margin-top:8px;" />
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

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
    const res = await axios.post('http://localhost:3000/login', form)
    localStorage.setItem('token', res.data.token)
    // 可以根据角色跳转页面，这里简单alert
    alert('登录成功')
    // 例如：window.location.href = '/dashboard'
  } catch (e) {
    error.value = (e.response && e.response.data && e.response.data.error) || '登录失败'
  }
  loading.value = false
}
</script>
