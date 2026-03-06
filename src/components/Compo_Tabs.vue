<script setup lang="ts">
import Home from './Compo_Home.vue'
import Posts from './Compo_Posts.vue'
import Archive from './Compo_Archive.vue'
import { ref, type Component } from 'vue'
 
const currentTab = ref('Home')

const tabs = {
  Home,
  Posts,
  Archive
} as Record<string, Component>

const tabRefs = {}

// 调用子组件方法
const callChildMethod = () => {
  // childRef.value 就是子组件实例
  if (tabRefs[currentTab]?.value) {
    tabRefs[currentTab].value.incrementCounter() // 调用暴露的方法
  }
}
</script>

<template>
  <div class="demo">
    <button
       v-for="(_, tab) in tabs"
       :key="tab"
       :class="['tab-button', { active: currentTab === tab }]"
       @click="{currentTab = tab; callChildMethod}"
       :ref="(el) => {tabRefs[tab] = el}"
     >
      {{ tab }}
    </button>
	  <component :is="tabs[currentTab]" class="tab"></component>
  </div>
</template>

<style>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>