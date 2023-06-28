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
      Создание аккаунта
    </c-heading>
    <c-stack
      w="100%"
      as="form"
      border-width="1px"
      p="1.5rem"
      rounded="md"
      @submit.prevent="submit"
    >
      <app-input
        id="name"
        v-model.trim="name"
        v-chakra
        label="Ваше имя"
        :error="validation_error.name"
        required
      />
      <app-input
        id="username"
        v-model.trim="username"
        v-chakra
        label="Имя пользователя"
        :error="validation_error.username"
        required
      >
      </app-input>
      <app-input
        id="email"
        v-model.trim="email"
        v-chakra
        label="Email"
        :error="validation_error.email"
        required
        type="email"
      />
      <app-input
        id="password"
        v-model.trim="password"
        v-chakra
        label="Пароль"
        :error="validation_error.password"
        required
        type="password"
      />
      <app-button type="submit"> Создать аккаунт </app-button>
    </c-stack>
    <p>
      Уже есть аккаунт?
      <n-link v-chakra text-decoration="underline" to="/login">Войти</n-link>
    </p>
  </c-stack>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'SignUpPage',

  layout: 'auth',

  data() {
    return {
      email: '',
      name: '',
      password: '',
      username: '',
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
    ...mapActions({ signUp: 'auth/signUp' }),

    ...mapMutations({ resetErrors: 'auth/resetErrors' }),

    submit() {
      this.signUp(this.$data)
    },
  },
}
</script>
