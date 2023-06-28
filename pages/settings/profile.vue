<template>
  <c-stack>
    <c-heading as="h1" :font-size="['2xl', '3xl']">Профиль</c-heading>
    <c-text font-size="sm">Здесь вы можете изменить свои данные</c-text>
    <hr />
    <c-stack
      as="form"
      spacing="0.7rem"
      :w="['100%', '50%']"
      mt="1rem"
      @submit.prevent="submit"
    >
      <app-input
        id="name"
        v-model.trim="name"
        label="Ваше имя"
        :error="errors.name"
        required
      />
      <!-- <app-input
        id="email"
        v-model.trim="email"
        label="Ваш email"
        :error="errors.email"
        required
        type="email"
      /> -->
      <c-flex>
        <app-button :is-loading="loading" type="submit"> Сохранить </app-button>
      </c-flex>
    </c-stack>
  </c-stack>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { showToast } from '~/modules/showToast'

export default {
  name: 'ProfileSettingsPage',

  layout: 'settings',

  data() {
    return {
      name: '',
    }
  },

  computed: mapState({
    user(state) {
      return state.auth.user
    },

    errors(state) {
      return state.profile.errors
    },

    loading(state) {
      return state.profile.loading
    },
  }),

  created() {
    this.fetch(this.user.username)
    this.name = this.user.name
  },

  destroyed() {
    this.setErrors({})
  },

  methods: {
    ...mapActions({
      update: 'profile/update',
      fetch: 'profile/fetch',
    }),

    ...mapMutations({ setErrors: 'profile/setErrors' }),

    async submit() {
      await this.update({
        name: this.name,
      })
      if (!Object.keys(this.errors).length)
        showToast(this.$toast, 'success', 'Успешно', 'Данные обновлены')
    },
  },
}
</script>
