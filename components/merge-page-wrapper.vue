<template>
  <c-stack>
    <c-stack spacing="1rem">
      <c-stack :flex-direction="['column', 'row']">
        <c-stack
          spacing="0.1rem"
          as="aside"
          :flex-direction="['column', 'row']"
          :w="['100%', '80%']"
        >
          <c-box
            v-for="link in links"
            :key="link.name"
            px="0.5rem"
            py="0.25rem"
            font-size="1rem"
            as="n-link"
            :to="link.href"
            :border-bottom="
              link.name === 'Открытые' && $nuxt.$route.fullPath === baseLink
                ? ' 2px solid rgb(16, 10, 40)'
                : ''
            "
            :font-weight="
              link.name === 'Открытые' && $nuxt.$route.fullPath === baseLink
                ? 'bold'
                : ''
            "
            :_hover="{ borderBottom: 'solid 2px gray' }"
            >{{ link.name }}
          </c-box>
        </c-stack>

        <app-button as="n-link" :to="`${baseLink}/new`" size="sm">
          Новый запрос на слияние
        </app-button>
      </c-stack>

      <c-box as="main">
        <slot />
      </c-box>
    </c-stack>
  </c-stack>
</template>

<script>
import { CStack, CBox, CButton } from '@chakra-ui/vue'
export default {
  name: 'MergePageWrapper',
  component: [CStack, CBox, CButton],
  middleware: 'auth',
  computed: {
    baseLink() {
      const username = this.$route.params.username
      const repository = this.$route.params.repository
      return `/${username}/${repository}/merge_request`
    },
    links() {
      return [
        {
          name: 'Открытые',
          href: {
            path: `${this.baseLink}`,
            query: { scope: 'all', state: 'open' },
          },
        },
        {
          name: 'Все',
          href: {
            path: `${this.baseLink}`,
            query: { scope: 'all', state: 'all' },
          },
        },

        {
          name: 'Закрытые',
          href: {
            path: `${this.baseLink}`,
            query: { scope: 'all', state: 'closed' },
          },
        },
        {
          name: 'Слитые',
          href: {
            path: `${this.baseLink}`,
            query: { scope: 'all', state: 'merged' },
          },
        },
      ]
    },
  },
}
</script>
<style scoped>
.nuxt-link-exact-active {
  font-weight: bold;
  border-bottom: 2px solid rgb(16, 10, 40);
}
</style>
