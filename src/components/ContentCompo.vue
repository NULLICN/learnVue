<script setup lang="ts">
import { watchEffect } from 'vue'
const props = defineProps<{
  msg?: string,
  count?: number,
}>()
const emits = defineEmits<{
  (e: 'enlarge-text', v: (string | number | boolean)[]): void,
  (e: 'enlarge-text2', v: (string | number | boolean)[]): void
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
  <button @click="emits('enlarge-text', ['字符串', 1.1, true, false])">Enlarge Text</button>
</template>
