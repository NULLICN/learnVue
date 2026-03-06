<script setup lang="ts">
import { inject } from 'vue'
const injectedValue = inject('injectedValue')
</script>
<template>
    <div>
        {{ injectedValue }}
    </div>
</template>