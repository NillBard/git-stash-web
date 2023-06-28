<template>
  <c-stack spacing="1.5rem" align="center">
    <n-link v-chakra display="block" to="/">
      <app-logo :width="['80px', '100px']" />
    </n-link>
    <c-heading
      text-align="center"
      :font-size="['1.5rem', '2rem']"
      font-weight="300"
      as="h1"
    >
      Вход в GitStash
    </c-heading>
    <c-stack
      spacing="1rem"
      w="100%"
      as="form"
      border-width="1px"
      p="1.5rem"
      rounded="md"
      @submit.prevent="submit"
    >
      <app-input
        id="email_or_username"
        v-model.trim="email_or_username"
        label="Имя пользователя или email"
        :error="validation_error.email_or_username"
        required
      >
      </app-input>
      <app-input
        id="password"
        v-model.trim="password"
        label="Пароль"
        :error="validation_error.password"
        required
        type="password"
      />
      <app-button type="submit"> Войти </app-button>
    </c-stack>
    <p>
      Нет аккаунта?
      <n-link v-chakra text-decoration="underline" to="/sign-up">
        Создайте новый
      </n-link>
    </p>
  </c-stack>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'LoginPage',

  layout: 'auth',

  data() {
    return {
      email_or_username: '',
      password: '',
    }
  },

  computed: {
    ...mapState({
      error(state) {
        return state.auth.error
      },

      validation_error(state) {
        return state.auth.validation_error
      },
    }),
  },

  watch: {
    error(value) {
      if (value) {
        this.$toast({
          status: 'error',
          title: 'Ошибка',
          description: value,
          duration: 3000,
          position: 'bottom-right',
        })
      }
    },
  },

  destroyed() {
    this.resetErrors()
  },

  methods: {
    ...mapActions({ login: 'auth/login' }),

    ...mapMutations({ resetErrors: 'auth/resetErrors' }),

    submit() {
      this.login(this.$data)
    },
  },
}
</script>
