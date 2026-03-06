import { ref, toValue, watchEffect, type Ref } from 'vue';

export function usePublicVariation(str: Ref) {
    const variation = ref('variation');
    const variation2 = ref('variation2');
    const f = () => {
        console.log('组合式函数值变动watchEffect监听：'+toValue(str))
    }
    watchEffect(()=>{
        f()
    })

    return {
        variation,
        variation2
    };
} 