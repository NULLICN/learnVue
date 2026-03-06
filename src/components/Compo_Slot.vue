<script setup lang="ts">
import { ref } from 'vue'
const slotMsg = ref('slot-message')
const slotCount = ref(0)
</script>

<template>
    <slot name="section1" :msg="slotMsg" :count="slotCount"></slot>
    <slot name="section2"></slot>
    <slot :msg="slotMsg" :count="slotCount"></slot>
    <!-- 通过slot标签内的属性为插槽提供数据 -->
</template>