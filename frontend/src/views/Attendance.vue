<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-card>
      <el-form :model="form" label-width="70px" class="attendance-form" @submit.prevent>
        <el-form-item label="日期">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.note" placeholder="备注" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addRecord">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table :data="records" style="margin-top:20px">
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="note" label="备注" />
    </el-table>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  date: '',
  note: ''
})
const records = ref([])

const addRecord = () => {
  records.value.push({ date: form.date, note: form.note })
  form.date = ''
  form.note = ''
}
</script>

<style scoped>
.attendance-form {
  max-width: 400px;
}
</style>
