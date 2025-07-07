<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="form-wrapper">
    <el-card class="box-card">
      <h2 class="title">注册</h2>
      <el-form :model="form" @submit.prevent="onSubmit" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="密码" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" placeholder="选择角色">
            <el-option label="员工" value="employee" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="loading" style="width:100%">注册</el-button>
        </el-form-item>
        <el-alert v-if="error" type="error" :closable="false" :title="error" show-icon />
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '../api'

const form = reactive({
  username: '',
  password: '',
  role: 'employee'
})
const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await api.post('/register', form)
    alert('注册成功，请登录')
  } catch (e) {
    error.value = (e.response && e.response.data && e.response.data.error) || '注册失败'
  }
  loading.value = false
}
</script>

<style scoped>
.form-wrapper {
  max-width: 420px;
  margin: 100px auto;
}
.title {
  text-align: center;
  margin-bottom: 24px;
}
</style>
