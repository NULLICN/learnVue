<script setup lang="ts">
import { useAttrs } from 'vue';
const attrs = useAttrs()
console.log('attrs:', attrs)

</script>

<template>
    <div>
        <p v-bind="$attrs"> div 1</p>
        <p>$attrs：{{ $attrs }}</p>
    </div>
    <div>
        <p :class="$attrs.class">div 2</p>
    </div>
</template>