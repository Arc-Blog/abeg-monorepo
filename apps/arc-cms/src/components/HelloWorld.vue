<script setup lang="ts">
import { ref } from 'vue'
import variables from "@/styles/variables.module.scss";
console.log(variables.bgColor) 
defineProps<{ msg: string }>()

const count = ref<number>(0)
</script>

<template>
  <h1>{{ msg }} {{ count }}</h1>
  <el-button type="success" @click="() => { count++ }"><i-ep-SuccessFilled />Success</el-button>
  <el-button type="info"><i-ep-InfoFilled />Info</el-button>
  <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
  <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>
  <el-button type="info"><SvgIcon icon-class="javascript" />js svg本地图表</el-button>
  <div class="box">box</div>
  <div style="width:100px;height:100px" 
    :style="{'background-color': variables.bgColor}">
    ts中引入scss中变量
  </div>
</template>

<style lang="scss" scoped>

.box {
  width: 100px;
  height: 100px;
  background-color: $bg-color;
}
</style>
