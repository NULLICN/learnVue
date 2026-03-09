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
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
