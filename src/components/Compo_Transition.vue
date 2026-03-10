<script setup lang="ts">
import { ref } from 'vue'

const transitionShow = ref(false)

const transitionItems = ref(['Item 1', 'Item 2', 'Item 3'])
let transitionCounter = 3
function removeItemRandomly() {
  if (transitionItems.value.length === 0) return
  const randomIndex = Math.floor(Math.random() * transitionItems.value.length)
  transitionItems.value.splice(randomIndex, 1)
}
function addItemRandomly() {
  transitionCounter++
  const newItem = `Item ${transitionCounter}`
  const randomIndex = Math.floor(Math.random() * (transitionItems.value.length + 1))
  transitionItems.value.splice(randomIndex, 0, newItem)
}
</script>
<template>
  <div>
    <p>Transition组件</p>
    <button @click="transitionShow = !transitionShow">Toggle</button>
    <div class="h-8 border-2 m-2 overflow-hidden">
      <Transition name="slide-fade">
        <p v-if="transitionShow">hello</p>
      </Transition>
    </div>

    <p>Transition组件</p>
    <button @click="removeItemRandomly">Remove Item</button>
    <button @click="addItemRandomly">Add Item</button>
    <div class=" overflow-x-hidden border-2 m-2 p-2">
        <TransitionGroup name="list" tag="ul">
            <li v-for="item in transitionItems" :key="item">
                {{ item }}
            </li>
        </TransitionGroup>
    </div>
  </div>
</template>
<style scoped>
@import '@/assets/transition-animation.css';
</style>
