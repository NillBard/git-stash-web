<template>
  <c-stack>
    <c-menu>
      <c-menu-button border="1px" bg="white" color="gray.300">
        <c-stack
          w="100%"
          direction="row"
          align="center"
          justify="space-between"
        >
          <c-text justify="left" color="black" font-weight="100">
            {{ text }}
          </c-text>
          <c-icon name="chevron-down" size="2rem" color="gray.300" />
        </c-stack>
      </c-menu-button>
      <c-menu-list>
        <c-menu-item
          v-for="branch in branches"
          :key="branch.name"
          @click="$emit('change-value', branch.name)"
        >
          {{ branch.name }}
        </c-menu-item>
      </c-menu-list>
    </c-menu>
  </c-stack>
</template>

<script>
export default {
  name: 'BranchSelect',
  props: {
    text: { type: String, required: true },
    branches: { type: Array, required: true },
  },
  emits: ['change-value'],
}
</script>
