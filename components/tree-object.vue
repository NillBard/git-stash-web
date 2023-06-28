<template>
  <c-stack
    px="1rem"
    py="0.5rem"
    direction="row"
    spacing="0.5rem"
    border-bottom-width="1px"
    border-color="black"
    mb="-1px"
  >
    <c-box
      color="black"
      as="svg"
      style="width: 24px; height: 24px"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"
      />
    </c-box>
    <c-box as="n-link" :to="link" :_hover="{ textDecoration: 'underline' }">{{
      name
    }}</c-box>
  </c-stack>
</template>

<script>
import { CBox, CStack } from '@chakra-ui/vue'

export default {
  name: 'TreeObject',
  components: { CBox, CStack },
  props: {
    link: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
