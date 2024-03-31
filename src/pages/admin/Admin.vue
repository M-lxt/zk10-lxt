<script setup lang="ts">

import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'
import { useRouter } from 'vue-router'



let content = ref(['资金组成','资金流向','资金来源','用户管理'])



const contentInd = ref(1)

const router = useRouter()
let tabIndex = 1
const editableTabsValue = ref('2')
const editableTabs = ref([
])

const handleTabsEdit = (
  targetName: TabPaneName | undefined,
  action: 'remove' | 'add'
) => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
      title: content.value[contentInd.value],
      name: newTabName,
      content: content.value[contentInd.value],
    })
    editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key)
  contentInd.value=key-1
  tabIndex = key
  handleTabsEdit('new','add')
}

const exit = ()=>{
    localStorage.removeItem('token')
    router.push('/login')
}

const change = (a,b) =>{
    console.log(a.index)
}

</script>

<template>
<el-tabs
    v-model="editableTabsValue"
    type="card"
    editable
    class="demo-tabs"
    @edit="handleTabsEdit"
    @tab-click = 'change'
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>

  <el-row class="tac">
    <el-col :span="6">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :router=true
      >
        <el-menu-item index="1" route="/admin/zucheng">
          <el-icon><setting /></el-icon>
          <span>资金组成</span>
        </el-menu-item>
        <el-menu-item index="2" route="/admin/liuxiang">
          <el-icon><setting /></el-icon>
          <span>资金流向</span>
        </el-menu-item>
        <el-menu-item index="3" route="/admin/laiyuan">
          <el-icon><setting /></el-icon>
          <span>资金来源</span>
        </el-menu-item>
        <el-menu-item index="4" route="/admin/guanli">
          <el-icon><setting /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
<div class="info">
    <div class="name">Admin</div>
    <button @click="exit">退出</button>
</div>

<RouterView></RouterView>
</template>

<style lang='scss' scoped>
.info{
    position: absolute;
    top: 0;
    right:20px
}


.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
