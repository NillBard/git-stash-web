<template>
  <c-box>
    <c-stack spacing="4rem" px="1rem">
      <c-stack>
        <c-heading as="h3" size="lg">Общие</c-heading>
        <hr />
        <c-stack as="form" spacing="0.7rem" mt="0.5rem">
          <c-text font-size="md" font-weight="800">
            Удаление репозитория
          </c-text>
          <c-stack
            px="0.5rem"
            py="1rem"
            bg="red.50"
            border-left="4px"
            border-color="red.500"
          >
            <c-text>
              После удаления доступ к репозиторию будет потерян навсегда.
              Пожалуйста, примите взвешенное решение.
            </c-text>
            <c-stack is-inline>
              <app-button
                variant-color="red"
                variant="outline"
                px="3rem"
                @click="open"
              >
                Удалить репозиторий
              </app-button>
            </c-stack>
          </c-stack>
        </c-stack>
      </c-stack>
    </c-stack>

    <c-modal :is-open="isOpen" :on-close="close" is-centered>
      <c-modal-content ref="content">
        <c-modal-header align="center">Вы точно уверены?</c-modal-header>
        <c-modal-close-button />
        <c-modal-body>
          <c-stack sapcing="1.5rem">
            <c-text>
              Удаление репозитория необратимо. Это действие навсегда удалит
              репозиторий:
              <c-text as="span" font-weight="bold">
                {{ `${params.username}/${params.repository}` }}
              </c-text>
              , а также все его данные, в том числе для всех участников проекта.
            </c-text>
            <c-text>
              Введите
              <c-text as="span" font-weight="bold">
                {{ `${params.username}/${params.repository}` }}
              </c-text>
              для подтверждения.
            </c-text>
          </c-stack>
          <c-input v-model.trim="nameConfirmation" mt="3" />
        </c-modal-body>
        <c-modal-footer>
          <app-button
            type="submit"
            variant-color="red"
            w="100%"
            :disabled="!isConfirmationValid"
            :is-loading="loading"
            @click="deleteR(params)"
          >
            Удалить
          </app-button>
        </c-modal-footer>
      </c-modal-content>
      <c-modal-overlay />
    </c-modal>
  </c-box>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'RepositoryGeneralSettings',

  data() {
    return {
      name: '',
      isOpen: false,
      nameConfirmation: '',
    }
  },

  computed: {
    ...mapState({
      repository: (state) => state.repositories.repository,
      loading: (state) => state.repositories.loading,
      errors: (state) => state.repositories.errors,
    }),

    params() {
      return this.$route.params
    },

    isConfirmationValid() {
      return (
        this.nameConfirmation ===
        `${this.params.username}/${this.params.repository}`
      )
    },
  },

  mounted() {
    this.name = this.params.repository
  },

  methods: {
    ...mapActions({ deleteRepository: 'repositories/delete' }),

    open() {
      this.isOpen = true
    },

    close() {
      this.isOpen = false
      this.nameConfirmation = ''
    },
    async deleteR(p) {
      await this.deleteRepository(p)
      if (!this.errors) {
        this.$router.push('/')
      }
    },
  },
}
</script>
