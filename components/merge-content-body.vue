<template>
  <c-stack bg="gray.100" w="100%" px="2rem" py="1.5rem">
    <c-stack v-if="state === 'open' && mergeState === 'ready'" spacing="1.5rem">
      <c-checkbox
        :is-checked="isDelete"
        variant-color="gray"
        @change="$emit('change')"
      >
        Удалить исходную ветку, когда слияние закончится
      </c-checkbox>
      <c-box>
        <app-button
          :disabled="!(role === 'owner' || role === 'maintainer')"
          size="sm"
          @click="$emit('merge')"
        >
          {{
            role === 'owner' || role === 'maintainer'
              ? 'Слить'
              : 'Доступно для слияния'
          }}
        </app-button>
      </c-box>
    </c-stack>
  </c-stack>
</template>

<script>
import { CBox, CButton, CCheckbox, CStack } from '@chakra-ui/vue'

export default {
  name: 'MergeContentBody',
  component: [CStack, CButton, CBox, CCheckbox],
  props: {
    id: { type: Number, required: true },
    state: { type: String, required: true },
    mergeState: { type: String, default: '' },
    isDelete: { type: Boolean, default: true },
    role: { type: String, required: true },
  },
  emits: ['merge', 'change'],

  computed: {
    username() {
      return this.$nuxt.$route.params.username
    },
    repository() {
      return this.$nuxt.$route.params.repository
    },
  },
}
</script>
