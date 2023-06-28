<template>
  <c-theme-provider>
    <c-reset />
    <navbar />
    <c-box font-family="body" as="main" mt="3rem">
      <nuxt />
    </c-box>
  </c-theme-provider>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: 'optional-auth',
}
</script>
