<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{
  a: string
  b: number
  c: boolean
  obj: {
    d: string
    e: number
  }
}>()

const objE = ref(props.obj.e)
const objEComputed = computed(() => props.obj.e + 1)
</script>

<template>
  <div class="m-4">
    <p>子组件：Props from object:</p>
    <button @click="objE++">increase obj.e {{ objE }}</button>
    <p>computed {{ objEComputed }}</p>
    <p v-for="(value, key) in props" :key="key">{{ key }}: {{ value }}</p>
  </div>
</template>
