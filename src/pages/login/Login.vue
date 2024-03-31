<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

const info = reactive({
    name:'admin',
    passward:'123'
})

const router = useRouter()

interface RuleForm {
  name: number
  passward:number
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  passward:''
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },

  ],
  passward: [
    { required: true, message: '请输入密码', trigger: 'blur' },

  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        if(ruleForm.name===info.name&&ruleForm.passward===info.passward){
            console.log('成功')
            localStorage.setItem('token','成功')
            router.push('/admin')
        }
        else{
            alert('用户名密码错误')
        }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
    <h1>登录</h1>
    <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="密码" prop="passward">
      <el-input v-model="ruleForm.passward" />
    </el-form-item>
  
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        登录
      </el-button>
    </el-form-item>
  </el-form>

</template>

<style lang='scss' scoped>




</style>
