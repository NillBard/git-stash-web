<template>
  <c-stack spacing="1rem" :w="['100%', '80%']" max-width="1200px" mx="auto">
    <c-stack
      mx="auto"
      as="form"
      spacing="1rem"
      :w="['100%', '50%']"
      @submit.prevent="submit"
    >
      <c-heading as="h1" :font-size="['2xl', '3xl']"
        >Создание репозитория</c-heading
      >
      <app-input
        id="name"
        v-model.trim="name"
        label="Название"
        :error="validation_errors.name"
        required
      />

      <c-radio-group v-model="is_private" variant-color="gray">
        <c-text>Уровень видимости</c-text>
        <c-radio value="0" mb="0.5rem">
          <c-flex :font-size="['md', 'lg']" align-items="center"
            >Публичный
            <c-box
              ml="0.5rem"
              as="svg"
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
              /> </c-box
          ></c-flex>

          <c-text :font-size="['xs', 'md']"
            >Проект видем всем пользователям</c-text
          >
        </c-radio>
        <c-radio value="1" mb="0.5rem">
          <c-flex align-items="center" :font-size="['md', 'lg']"
            >Приватный
            <c-box
              ml="0.5rem"
              as="svg"
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
              /> </c-box
          ></c-flex>

          <c-text :font-size="['xs', 'md']"
            >Проект доступен только вам и вашей команде</c-text
          >
        </c-radio>
      </c-radio-group>

      <app-button mx="auto" type="submit" w="50%">Создать</app-button>
    </c-stack>
  </c-stack>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'NewRepoPage',
  data() {
    return {
      name: '',
      is_private: '0',
    }
  },
  computed: mapState({
    error: (state) => state.repositories.error,
    validation_errors: (state) => state.repositories.validation_errors,
  }),
  watch: {
    error() {
      if (this.error) {
        this.showToast()
      }
    },
  },
  methods: {
    ...mapActions({
      createRepo: 'repositories/createRepository',
    }),
    async submit() {
      await this.createRepo({
        name: this.name,
        is_private: !!parseInt(this.is_private),
      })

      if (!this.error && !Object.keys(this.validation_errors).length) {
        this.$router.push('/')
      }
    },
    showToast() {
      this.$toast({
        title: 'Ошибка',
        description: this.error,
        status: 'error',
        duration: 3000,
        position: 'bottom-right',
      })
    },
  },
}
</script>
