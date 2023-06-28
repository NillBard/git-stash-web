<template>
  <c-form-control h="6rem">
    <c-form-label :for="id">{{ label }}</c-form-label>
    <c-input
      :id="id"
      :value="value"
      :type="type"
      :is-required="required"
      border-color="gray.400"
      border-width="1px"
      rounded="md"
      px="1rem"
      py="0.5rem"
      transition="0.3s"
      outline="none"
      :_hover="{ borderColor: 'black' }"
      @input="onInput"
      @change="onChange"
    />
    <c-box v-if="error" color="red">
      {{ error }}
    </c-box>
  </c-form-control>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },

    id: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: 'text',
    },

    label: {
      type: String,
      required: true,
    },

    error: {
      type: String,
      required: false,
      default: '',
    },

    required: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onInput(event) {
      this.$emit('input', event)
    },

    onChange(event) {
      this.$emit('change', event)
    },
  },
}
</script>
