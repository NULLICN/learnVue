<script setup lang="ts">
import { ref } from 'vue'
const clickCounter = ref(0)
const incrementCounter = () => {
  clickCounter.value++
}

// 关键：暴露方法给父组件
defineExpose({
  incrementCounter // 把方法暴露出去
})
</script>

<template>
  <div class="tab">
    Archive component with click counter: {{ clickCounter }}
  </div>
</template>