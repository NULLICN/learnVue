<script setup lang="ts">
const v = defineModel('v', {
  type: Number,
  default: 0,
})
const v2 = defineModel('v2', {
  type: String,
  default: '',
})
const [ac, modifiers] = defineModel({
  set(value) {
    if (modifiers.addChacter) {
      return value + 'a'
    }
    return value
  }
})

function changeV() {
  v.value++
  v2.value += 'a'
}
</script>

<template>
    <div>
        <p>v: {{ v }}, {{ v2 }}</p>
        <input type="text" name="v2" id="v2" v-model="v2" class="block outline-black border">
        <input type="text" name="" id="" v-model="ac" class="block outline-black border" placeholder="addChacter">
        <button @click="changeV">Change v</button>
    </div>
</template>