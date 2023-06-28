<template>
  <c-theme-provider>
    <c-reset />
    <navbar />
    <c-box font-family="body" as="main" mt="3rem" p="1rem">
      <nuxt />
    </c-box>
  </c-theme-provider>
</template>

<script>
import { CThemeProvider, CReset, CBox } from '@chakra-ui/vue'

export default {
  name: 'DefaultLayout',
  components: {
    CThemeProvider,
    CReset,
    CBox,
  },
  middleware: 'optional-auth',
}
</script>
