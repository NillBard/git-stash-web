<template>
  <c-stack
    direction="row"
    spacing="0.5rem"
    px="1rem"
    py="0.5rem"
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
        d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"
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
  name: 'BlobObject',
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
