import { ref } from 'vue'
import { expect, test } from 'vitest'
import { usePublicVariation } from '../composables/usePublicVariation.ts'

test('variation', () => {
    const result = usePublicVariation(ref(0))
    expect(result.variation.value).toBe('variation')
})
