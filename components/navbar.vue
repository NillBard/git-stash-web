<template>
  <c-box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    right="0"
    :height="['3rem']"
    px="1rem"
    display="flex"
    align-items="center"
    justify-content="space-between"
    bg="white"
    z-index="20"
    box-shadow="md"
  >
    <c-box as="n-link" to="/" :display="['flex', 'none']">
      <app-logo />
    </c-box>

    <c-box as="n-link" to="/" :display="['none', 'flex']">
      <app-text-logo />
    </c-box>
    <!-- No auth -->
    <div v-if="!user">
      <c-stack direction="row" spacing="1rem">
        <c-button
          as="n-link"
          to="/login"
          size="sm"
          color="black"
          font-weight="bold"
          variant-color="white"
          background-color="white"
          text-transform="uppercase"
          :_hover="{ opacity: '0.8' }"
          :display="{ base: 'none', sm: 'flex' }"
        >
          Войти
        </c-button>

        <c-button
          as="n-link"
          size="sm"
          font-weight="bold"
          to="/sign-up"
          variant-color="white"
          color="black"
          text-transform="uppercase"
          variant="outline"
          :_hover="{ opacity: '0.8' }"
        >
          Создать аккаунт
        </c-button>
      </c-stack>
    </div>
    <!-- Auth-ed account info -->

    <c-stack v-else direction="row">
      <c-menu>
        <c-menu-button
          px="0"
          right-icon="chevron-down"
          bg="transparent"
          color="black"
          outline="none"
          :_hover="{ background: 'transparent' }"
          :_focus="{ outline: 'none' }"
        >
          <app-avatar :name="user.name" rounded="20px" size="35px" />
          <c-text px="0.5rem" font-size="1rem" :display="['none', 'flex']">{{
            user.name
          }}</c-text>
        </c-menu-button>
        <c-menu-list spacing="1rem">
          <c-menu-item as="n-link" :to="`/${user.username}`"
            >Профиль</c-menu-item
          >
          <c-menu-item as="n-link" to="/settings/profile">
            Настройки
          </c-menu-item>
          <c-menu-divider />
          <c-menu-item @click="logOut"> Выйти </c-menu-item>
        </c-menu-list>
      </c-menu>
    </c-stack>
  </c-box>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'NavigationBar',

  computed: mapState({ user: (state) => state.auth.user }),

  methods: {
    ...mapActions({ logout: 'auth/logOut' }),
    async logOut() {
      await this.logout()
      this.$nuxt.$router.push(`/login`)
    },
  },
}
</script>
