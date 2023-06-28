<template>
  <c-theme-provider>
    <c-reset />
    <c-flex justify="center" as="main">
      <c-box max-w="370px" p="1rem" w="100%">
        <nuxt />
      </c-box>
    </c-flex>
  </c-theme-provider>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AuthLayout',

  middleware: 'redirect-from-auth',

  computed: mapState({ user: (state) => state.auth.user }),

  watch: {
    user(newValue) {
      if (newValue) {
        this.$router.replace('/')
      }
    },
  },
}
</script>
