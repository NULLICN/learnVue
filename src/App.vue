<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  provide,
  reactive,
  ref,
  useTemplateRef,
  watch,
  watchEffect,
  watchPostEffect,
  shallowRef,
  type Component,
} from 'vue'

// 组件引入
import CompoAsyncError from './components/Compo_Async_Error.vue'
import CompoAsyncLoading from './components/Compo_Async_Loading.vue'
import Compo_Attr from './components/Compo_Attr.vue'
import CompoDependantInject from './components/Compo_DependantInject.vue'
import Compo_Slot from './components/Compo_Slot.vue'
import Compo_Tabs from './components/Compo_Tabs.vue'
import Compo_Vmode from './components/Compo_Vmode.vue'
import ContentCompo from './components/ContentCompo.vue'
import PropsFromObj from './components/PropsFromObj.vue'
import CompoTransition from './components/Compo_Transition.vue'
import CompoKeepAlive from './components/Compo_KeepAlive.vue'
import CompoNoKeepAlive from './components/Compo_NoKeepAlive.vue'
import CompoTeleport from './components/Compo_Teleport.vue'

// 组合式函数引入
import { usePublicVariation } from './composables/usePublicVariation.ts'
import { vHighlight } from './directives/useVHighlight.ts'


const dynamicVariation = ref('dynamicVariation')
const publicVariation = usePublicVariation(dynamicVariation)
console.log(publicVariation.variation.value)

const str = ref('hello world')
const s: string = str.value
const ob = { c: ref(0), d: ref(1), sr: ref(s) }
const { c, d, sr } = ob
const user = reactive({
  name: 'n',
  email: 'example@example.com',
  device: 'computer',
  num: 0,
})
const computed_num = computed(() => {
  return user.num + 2
})

function c_add() {
  ob.c.value++
}
function d_add() {
  ob.d.value++
}
function sr_add() {
  sr.value += ' helloworld'
}
function changeName() {
  user.name += ' n'
}
function num_add() {
  user.num++
}
const isActive = ref(false)
const classBorder = ref('border')
function toggleActive() {
  isActive.value ? (isActive.value = false) : (isActive.value = true)
}

const fontSize = ref(14)
function fontSize_add() {
  fontSize.value++
}
function fontSize_sub() {
  fontSize.value--
}

const isSHOW = ref(false)
function SHOW() {
  isSHOW.value ? (isSHOW.value = false) : (isSHOW.value = true)
}

const items = ref(['item1', 'item2', 'item3'])
const o_items = reactive({
  i: 'i1',
  j: 'j1',
  k: 'k1',
})

const body = document.querySelector('body') as HTMLBodyElement
const color = ref('')
/**
 * watchEffect会在组件挂载时立即执行一次，并且在color.value发生变化时再次执行。每次执行时，它会将color.value转换为字符串，设置为body的背景颜色，并将其保存到localStorage中。
 */
watchEffect(() => {
  // 防止页面初次载入加载了空颜色
  if (!color.value) {
    const getColor = (localStorage.getItem('color') as string) || '#ffffff'
    color.value = getColor
    body.style.backgroundColor = getColor
    return
  }
  // 颜色改变时触发存储和改变背景色
  const colorString = color.value.toString()
  body.style.backgroundColor = colorString
  localStorage.setItem('color', colorString)
  console.log('color changed to by watchEffect:', colorString)
})
// function setColor() {
//   const colorString = color.value.toString()
//   body.style.backgroundColor = colorString
//   localStorage.setItem('color', colorString)
// }

// onMounted(() => {
//   const getColor = (localStorage.getItem('color') as string) || '#ffffff'
//   color.value = getColor
//   body.style.backgroundColor = getColor
//   document.getElementById('color')?.setAttribute('value', getColor)
// })

const obj = reactive({
  a: 1,
  b: 1,
})

watch(
  () => obj.a,
  (newVal, oldVal) => {
    console.log('obj.a changed from', oldVal, 'to', newVal)
  },
  { immediate: true },
)

const watchPostDiv = useTemplateRef('watchPostDiv')
const watchPostDivWidth = ref(0)
const content = ref('text')
watchEffect(() => {
  // const text = content.value
  const width = watchPostDivWidth.value
  console.log('watchEffect(pre): watchPostDiv width is', watchPostDiv.value?.offsetWidth, width)
})
watchPostEffect(() => {
  // const text = content.value
  const width = watchPostDivWidth.value
  console.log(
    'watchPostEffect(post): watchPostDiv width is',
    watchPostDiv.value?.offsetWidth,
    width,
  )
})
function updateWatchPostDivWidth() {
  // 每次更新步长100px的值
  const currentWidth = watchPostDiv.value?.offsetWidth as number
  watchPostDivWidth.value = currentWidth + 100
  // watchPostDiv.value?.style.setProperty('width', watchPostDivWidth.value + 'px')

  // content.value = '这是一段很长很长的文本，会让 div 宽度变大'
}
const enlargeText = ref(14)
const contentCompoCount = ref(1)

const propsObj = reactive({
  a: 'a',
  b: 1,
  c: true,
  obj: {
    d: 'd',
    e: 2,
  },
})

const vModel = ref(0)
const vModel2 = ref('')
const aC = ref()
const slotPropsFromParent = reactive({
  msg: 'parent-message',
  count: 1,
})

provide('injectedValue', '这是通过provide/inject传递的值')

const isAsyncComponentLoaded = ref(false)
const CompoAsync = defineAsyncComponent({
  loader: async () => {
    // 封装延迟函数（可控制成功/失败）
    const delay = (ms: number, isFail = true) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          isFail
            ? reject(new Error('模拟加载失败'))
            : resolve(import('./components/Compo_Async.vue'))
        }, ms)
      })
    }

    // try {
    // 延迟2000ms后模拟失败
    const result = (await delay(2000, false)) as Component
    // 如果上面没失败，才加载组件
    return result
    //   } catch (err) {
    //     console.error('[捕获]异步加载组件失败，原因：', err)
    //     // 重新抛出错误，让Vue渲染errorComponent
    //     throw err
    //   }
  },
  loadingComponent: CompoAsyncLoading,
  errorComponent: CompoAsyncError,
  delay: 0,
  // timeout: 6000,
  onError: (err, retry, fail, attempts) => {
    console.error(`[onError]异步加载组件失败，原因：${err}，尝试次数：${attempts}`)
    if (attempts <= 0) {
      // 重试加载
      retry()
    } else {
      // 超过重试次数，显示错误组件
      fail()
    }
  },
})

// 1. 用 ref 包裹初始组件，使其成为响应式
const keepAliveComponent = shallowRef(CompoKeepAlive)

function toggleKeepAliveComponent() {
  // 2. 通过 .value 赋值更新
  keepAliveComponent.value = keepAliveComponent.value === CompoKeepAlive
    ? CompoNoKeepAlive : CompoKeepAlive
}
</script>

<template>
  <div>
    <input type="color" name="" id="color" v-model="color" class="border-2 border-green-400" />
    <p>（适用于基本类型，获取或修改需要通过.value）测试ref响应式属性： {{ sr }},{{ c }}, {{ d }}</p>
    <button @click="c_add">c_add</button>
    <button @click="d_add">d_add</button>
    <button @click="sr_add">sr_add</button>
    <p>
      （适用于对象/数组，获取或修改直接通过对应属性名）测试reactive响应式属性：user:
      {{ user.name }},{{ user.num }},计算属性随响应式自动变更, {{ computed_num }}
    </p>
    <button @click="changeName">name</button>
    <button @click="num_add">num</button>
    <p>类与样式绑定：</p>
    <div
      :class="{ 'text-orange-400': isActive /* isActive为true时启用 */ }"
      class="mx-2 p-4 select-none bg-gray-500"
      @click="toggleActive"
    >
      active:{{ isActive }} 点击更改文字颜色
    </div>
    <div
      :style="{ 'font-size': fontSize + 'px' }"
      class="mx-2 p-4 my-2 select-none bg-gray-500"
      :class="[classBorder]"
    >
      fontSize:{{ fontSize }} 点击按钮更改文字大小
    </div>
    <button @click="fontSize_add">fontSize++</button>
    <button @click="fontSize_sub">fontSize--</button>
  </div>

  <div>
    <button @click="SHOW">SHOW 条件渲染</button>
    <template v-if="isSHOW">
      <!-- 控制次模板显示 -->
      <div class="m-2 border p-2" id="SHOW">
        <h1>SHOW</h1>
        <p>SHOW</p>
      </div>
    </template>
  </div>

  <div>
    <p>列表渲染</p>
    <ul>
      <li>items of array</li>
      <li v-for="item in items" :key="item" ref="listOfUl">
        {{ item }}
      </li>
    </ul>
    <ul>
      <li>items of object</li>
      <li v-for="i in o_items" :key="i">
        <!-- 安全编程建议每次都指明key，key唯一 -->
        {{ i }}
      </li>
    </ul>
  </div>

  <div>
    <ul>
      <!-- 固定第一个参数为value，第二个为key -->
      <li v-for="(value, key) in obj" :key="key">{{ key }}: {{ value }}</li>
    </ul>
    <button @click="obj.a++">obj.a</button>
    <button @click="obj.b++">obj.b</button>
  </div>

  <div>
    <p>
      watchPostEffect后置侦听器（用于获取Vue更新后的组件DOM，必须通过Vue进行更改的DOM，例如绑定了动态属性值的内联样式或标签内文本）
    </p>
    <div
      ref="watchPostDiv"
      @click="updateWatchPostDivWidth"
      class="m-2 p-2 bg-green-300 inline-block"
      :style="{ width: watchPostDivWidth + 'px' }"
    >
      {{ content }}
    </div>
  </div>

  <div :style="{ fontSize: enlargeText + 'px' }" nullicn="321">
    <ContentCompo
      msg="message"
      :count="contentCompoCount"
      @enlarge-text="
        (v) => {
          enlargeText += 1
          console.log('子组件传给父组件的值为：' + v)
        }
      "
    >
      <p>这是ContentCompo组件的slot内容</p>
    </ContentCompo>
    <button @click="contentCompoCount++">increase count</button>
  </div>

  <Compo_Tabs />

  <PropsFromObj v-bind="propsObj" />
  <button @click="propsObj.obj.e++">change propsObj</button>
  <p>父组件：propsObj</p>
  <ul>
    <li v-for="(value, key) in propsObj" :key="key">{{ key }}: {{ value }}</li>
  </ul>

  <p class="text-2xl text-green-700 my-4">V-Model：{{ vModel }}, {{ vModel2 }}, aC {{ aC }}</p>
  <Compo_Vmode v-model:v="vModel" v-model:v2.lazy="vModel2" v-model.addChacter="aC" />

  <Compo_Attr class="text-sky-400" />

  <p>插槽slot</p>
  <Compo_Slot>
    <template #section1>
      <p>这是插槽section1的内容</p>
    </template>

    <template #section2>
      <p>这是插槽section2的内容</p>
    </template>
    <h1 class="text-xl font-bold">这是默认插槽的内容</h1>
    <p>这是默认插槽的内容</p>
  </Compo_Slot>

  <p>默认作用域插槽</p>
  <Compo_Slot v-slot="{ msg, count }">
    {{ msg + ' ' + slotPropsFromParent.msg }}, {{ count }}
  </Compo_Slot>

  <p>具名作用域插槽与默认作用域插槽</p>
  <Compo_Slot>
    <template #section1="{ msg, count }">
      <p>这是具名插槽section1的内容，来自组件内的：{{ msg }}, {{ count }}</p>
    </template>

    <template v-slot="{ msg }">
      <p>这是默认插槽的内容，来自组件内的：{{ msg }}</p>
    </template>
  </Compo_Slot>

  <p>依赖注入</p>
  <CompoDependantInject />

  <div>
    <button @click="isAsyncComponentLoaded = !isAsyncComponentLoaded">异步加载一个组件</button>
    <div class="h-8 border">
      <CompoAsync v-if="isAsyncComponentLoaded" />
    </div>
  </div>

  <p>
    组合式函数
    <button @click="dynamicVariation += ' str'">dynamic</button>
  </p>

  <p v-highlight>自定义指令</p>

  <CompoTransition />

  <p>组件保活</p>
  <button @click="toggleKeepAliveComponent">切换组件</button>
  <KeepAlive include="Compo_KeepAlive">
    <component :is="keepAliveComponent" />
  </KeepAlive>

  <p>Teleport</p>
  <CompoTeleport />
  <!-- 贴个瓷砖 耶✌🙄-->
</template>

<style scoped>

</style>
