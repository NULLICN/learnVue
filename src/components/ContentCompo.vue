<script setup lang="ts">
import { watchEffect } from 'vue'

// 抽离出并定义类型
interface propsType {
  msg: string,
  count: number
}

const props = defineProps<propsType>()

const emits = defineEmits<{
  // (e: 'enlarge-text', v: (string | number | boolean)[]): void,
  // (e: 'enlarge-text2', v: (string | number | boolean)[]): void
  // 使用更简洁的语法
  enlargeText: [v: (string|number|boolean)[]]
  enlargeText2: [v: (string|number|boolean)[]]
}>()

watchEffect(() => {
  console.log('count changed to:', props.count)
})
</script>

<template>
  <div class="m-2 p-2 text-green-600 border">
    this sentence is from ContentCompo.vue with props: {{ props.msg }} and count: <span class=" text-amber-400">{{ props.count }}</span>
  </div>
  <slot></slot>
  <button @click="emits('enlargeText', ['字符串', 1.1, true, false])">Enlarge Text</button>
</template>
