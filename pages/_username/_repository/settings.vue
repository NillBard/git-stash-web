<template>
  <c-stack>
    <c-box direction="row" spacing="1rem" :display="['block', 'flex']">
      <c-stack spacing="0.1rem" as="aside" :mb="['1rem', '0']">
        <c-box
          v-for="link in links"
          :key="link.href"
          rounded="md"
          px="0.5rem"
          py="0.25rem"
          font-size="1rem"
          as="n-link"
          :bg="$route.path === link.href ? 'gray.300' : ''"
          :to="link.href"
        >
          {{ link.name }}
        </c-box>
      </c-stack>
      <c-box flex="1" as="main">
        <nuxt-child />
      </c-box>
    </c-box>
  </c-stack>
</template>

<script>
import { mapState } from 'vuex'
import { CStack, CBox } from '@chakra-ui/vue'

export default {
  name: 'RepositorySettings',

  components: {
    CBox,
    CStack,
  },

  middleware: 'is-owner',

  computed: {
    ...mapState({
      user(state) {
        return state.auth.user
      },
    }),

    params() {
      return this.$route.params
    },

    links() {
      const basePath = `/${this.params.username}/${this.params.repository}/settings`
      return [
        {
          name: 'Общие',
          href: basePath,
        },
        {
          name: 'Участники',
          href: `${basePath}/participants`,
        },
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
