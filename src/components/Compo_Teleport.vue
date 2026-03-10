<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
function toggleOpen() {
    open.value = !open.value
    setTimeout(() => {
        open.value = false
    }, 2000)
}
</script>

<template>
  <div>
    <button @click="toggleOpen">传送DOM至body</button>
    <Teleport to="body">
      <Transition name="slide-fade">
        <div v-if="open" class="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded">
          这是一个通过Teleport传送到body的元素
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@import '@/assets/transition-animation.css';
</style>
