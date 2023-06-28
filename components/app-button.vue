<template>
  <c-button
    v-bind="$attrs"
    :type="type"
    :bg="variant === 'outline' ? 'transparent' : 'black'"
    :color="variant === 'outline' ? 'black' : 'white'"
    border-color="black"
    :line-height="$attrs['font-size'] ? $attrs['font-size'] : '1rem'"
    border-width="1px"
    text-transform="uppercase"
    letter-spacing="1px"
    :_active="
      variant === 'outline'
        ? { background: 'gray.100' }
        : { background: 'gray.700', borderColor: 'gray.700' }
    "
    :_hover="
      variant === 'outline'
        ? { background: 'gray.50' }
        : { background: 'gray.800', borderColor: 'gray.800' }
    "
    @click="callback($event)"
  >
    <slot />
  </c-button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'solid',
    },

    type: {
      type: String,
      default: 'button',
    },
  },
  methods: {
    callback(e) {
      this.$emit('click', e)
    },
  },
}
</script>
