<template>
  <c-stack
    mx="auto"
    px="1rem"
    spacing="1rem"
    max-width="1200px"
    :w="['100%', '80%']"
    :margin-top="['4rem', '4rem']"
  >
    <!-- Main Heading -->
    <c-flex align="center" justify="space-between">
      <c-heading as="h1" :font-size="['2xl', '3xl']">Репозитории</c-heading>
      <app-button as="nuxt-link" to="/repositories/new">
        <c-box
          :display="['flex', 'none']"
          mx="auto"
          color="white"
          as="svg"
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21 7H3V3H21V7M13 19C13 19.7 13.13 20.37 13.35 21H4V8H20V13.09C19.67 13.04 19.34 13 19 13C15.69 13 13 15.69 13 19M15 13V11.5C15 11.22 14.78 11 14.5 11H9.5C9.22 11 9 11.22 9 11.5V13H15M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z"
          />
        </c-box>
        <c-text :display="['none', 'flex']">Создать репозиторий</c-text>
      </app-button>
    </c-flex>
    <hr />
    <!-- Loader and checker for repos -->
    <c-spinner v-if="loading" size="lg" color="blue.500" mx="auto"></c-spinner>
    <c-box
      v-if="repos.length === 0 && !loading"
      as="nuxt-link"
      to="/repositories/new"
    >
      <c-heading
        as="h3"
        :font-size="['1rem', '1.75rem']"
        align="center"
        py="1rem"
      >
        Сейчас у вас нет репозиториев, начните с создания нового.
      </c-heading>
      <c-box
        mx="auto"
        color="black"
        as="svg"
        style="width: 70px; height: 70px"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M21 7H3V3H21V7M13 19C13 19.7 13.13 20.37 13.35 21H4V8H20V13.09C19.67 13.04 19.34 13 19 13C15.69 13 13 15.69 13 19M15 13V11.5C15 11.22 14.78 11 14.5 11H9.5C9.22 11 9 11.22 9 11.5V13H15M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z"
        />
      </c-box>
    </c-box>
    <!-- Repo list -->
    <c-stack v-else spacing="1rem">
      <repo-item
        v-for="repo in repos"
        :key="repo.id"
        :name="repo.name"
        :username="repo.owner"
        :is-private="repo.is_private"
        :href="`/${repo.owner}/${repo.name}`"
        :created_at="repo.created_at"
      ></repo-item>
    </c-stack>
  </c-stack>
</template>

<script>
export default {
  name: 'DashBoard',
  data() {
    return {
      repos: [],
      loading: true,
    }
  },
  mounted() {
    this.fetchDashboard()
  },
  methods: {
    async fetchDashboard() {
      try {
        this.loading = true
        const data = await this.$axios.$get('/v1/dashboard')
        this.repos = data
      } catch {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
a.nuxt-link-exact-active {
  font-weight: bold;
  border-bottom: 1px solid blue;
}
</style>
