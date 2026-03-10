<script setup lang="ts">
import { ref, type Component, type ComponentPublicInstance } from 'vue'
import Archive from './Compo_Archive.vue'
import Home from './Compo_Home.vue'
import Posts from './Compo_Posts.vue'

interface ComponentWithCounter {
  incrementCounter: () => void
}

const currentTab = ref('Home')

const tabs = {
  Home,
  Posts,
  Archive,
} as Record<string, Component>

const tabsCount = ref<Record<string, number>>(
  Object.keys(tabs).reduce(
    (acc, key) => {
      acc[key] = 0
      return acc
    },
    {} as Record<string, number>,
  ),
)

const currentComponentRef = ref<(ComponentPublicInstance & ComponentWithCounter) | null>(null)

function callChildMethod() {
  if (currentComponentRef.value) {
    currentComponentRef.value.incrementCounter() // 调用子组件方法
    if (tabsCount.value[currentTab.value] !== undefined) {
      tabsCount.value[currentTab.value]!++ // 更新父组件计数
    }
  }
}
</script>

<template>
  <div class="demo">
    <button
      v-for="(_, tab) in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab }]"
      @click="{currentTab = tab; callChildMethod()}"
    >
      {{ tab }}
    </button>
    <component :is="tabs[currentTab]" ref="currentComponentRef" class="tab"></component>

    <!-- 计数表 -->
    <table class="count-table">
      <thead>
        <tr>
          <th>Tab</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(count, tab) in tabsCount" :key="tab">
          <td>{{ tab }}</td>
          <td>{{ count }}</td>
        </tr>
      </tbody>
    </table>
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

.count-table {
  margin-top: 20px;
  border-collapse: collapse;
  width: 100%;
}

.count-table th,
.count-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.count-table th {
  background-color: #f2f2f2;
}
</style>
