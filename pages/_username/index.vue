<template>
  <c-stack v-if="profile.user" max-width="1200px" mx="auto">
    <c-stack p="1rem" align="center" spacing="0px">
      <c-avatar :name="profile.user.name" size="2xl"> </c-avatar>
      <c-text font-size="3xl">{{ profile.user.name }}</c-text>
      <app-button as="n-link" to="settings/profile"
        ><c-text pr="0.5rem">Редактировать</c-text>
        <c-box as="svg" style="width: 15px; height: 15px" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
          /> </c-box
      ></app-button>
      <hr />
    </c-stack>

    <c-stack mx="auto" py="0.5rem" :w="['100%', '80%']">
      <c-box font-size="2xl" font-weight="800">Репозитории</c-box>
      <repo-item
        v-for="repo in profile.repositories"
        :key="repo.id"
        :name="repo.name"
        :username="profile.user.name"
        :is-private="repo.is_private"
        :href="`/${profile.user.name}/${repo.name}`"
        :created_at="repo.created_at"
      >
      </repo-item>
    </c-stack>
  </c-stack>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProfilePage',

  async fetch() {
    await this.fetchProfile(this.username)
  },

  computed: {
    ...mapState({ profile: (state) => state.profile }),
    username() {
      return this.$route.params.username
    },
  },
  methods: {
    ...mapActions({ fetchProfile: 'profile/fetch' }),
  },
}
</script>
