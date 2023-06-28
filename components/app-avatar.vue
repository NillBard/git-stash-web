<template>
  <c-flex
    :w="size"
    :h="size"
    :border-radius="rounded"
    background="black"
    justify="center"
    align="center"
  >
    <c-box font-weight="bold" font-size="lg" color="white">{{ letters }}</c-box>
  </c-flex>
</template>
<script>
export default {
  name: 'AppAvatar',
  computed: {
    letters() {
      return this.name[0].toUpperCase()
    },
  },
  props: {
    size: {
      type: String,
      default: '50px',
    },
    rounded: {
      type: String,
      default: '5px',
    },
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
