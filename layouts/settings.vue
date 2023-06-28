<template>
  <c-theme-provider>
    <c-reset />
    <navbar />
    <c-stack p="1rem" spacing="1rem" max-width="1200px" mx="auto" mt="3rem">
      <c-heading :pb="['0', '1rem']" as="h1" :font-size="['2xl', '3xl']"
        >Настройки</c-heading
      >
      <c-box :display="['block', 'flex']">
        <c-stack spacing="0.1rem" as="aside" :pr="['0', '1rem']">
          <c-box
            v-for="link in links"
            :key="link.href"
            rounded="md"
            px="0.5rem"
            py="0.25rem"
            font-size="md"
            as="n-link"
            :bg="$nuxt.$route.path === link.href ? 'gray.200' : ''"
            :to="link.href"
            >{{ link.name }}</c-box
          >
        </c-stack>
        <hr v-chakra my="1rem" />
        <c-box flex="1" as="main">
          <nuxt />
        </c-box>
      </c-box>
    </c-stack>
  </c-theme-provider>
</template>

<script>
import { mapState } from 'vuex'
import { CThemeProvider, CStack, CBox } from '@chakra-ui/vue'

export default {
  name: 'SettingsLayout',
  components: {
    CThemeProvider,
    CBox,
    CStack,
  },
  middleware: 'auth',
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    links() {
      return [
        { name: 'Профиль', href: '/settings/profile' },
        { name: 'SSH Ключи', href: '/settings/pubkeys' },
      ]
    },
  },
  watch: {
    user(newValue) {
      if (!newValue) {
        this.$router.replace('/')
      }
    },
  },
}
</script>
