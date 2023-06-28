<template>
  <c-stack w="100%" spacing="1.5rem">
    <c-box>
      <c-heading as="h1" size="lg">Новый запрос на слияние</c-heading>
      <hr />
    </c-box>
    <c-stack
      :flex-direction="['column', 'row']"
      mt="1rem"
      justify="space-between"
    >
      <c-stack spacing="1rem" :w="['100%', '45%']">
        <c-heading as="h3" size="md">Исходная ветка</c-heading>
        <branch-select
          :text="source ? source : 'Выберите исходную ветку'"
          :branches="branches"
          @change-value="changeSource"
        ></branch-select>
      </c-stack>
      <c-stack spacing="1rem" :w="['100%', '45%']">
        <c-heading as="h3" size="md">Целевая ветка</c-heading>
        <branch-select
          :text="destination ? destination : 'Выберите исходную ветку'"
          :branches="branches"
          @change-value="changeDestination"
        ></branch-select>
      </c-stack>
    </c-stack>

    <c-stack v-if="source && destination" spacing="1.5rem">
      <app-input
        id="name"
        v-model.trim="name"
        label="Название запроса"
        required
      />
    </c-stack>
    <c-box>
      <app-button @click="click">Создать запрос</app-button>
      <app-button variant="outline" @click="cancel">Отмена</app-button>
    </c-box>
  </c-stack>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'NewMergeRequest',
  layout: 'repo',

  async asyncData({ params, store, req }) {
    await store.dispatch('repositories/fetchOne', params)

    if (process.server) {
      return { hostname: req.headers.host.split(':')[0], ...params }
    } else {
      return { hostname: location.hostname, ...params }
    }
  },
  data() {
    return {
      source: '',
      destination: '',
      name: '',
    }
  },

  computed: {
    ...mapState({
      branches: (state) => state.repositories.branches,
      merge_request: (state) => state.merge_request.request,
    }),
  },
  watch: {
    merge_request(value) {
      if (value && !Array.isArray(value)) {
        this.$nuxt.$router.push(
          `/${this.username}/${this.repository}/merge_request`
        )
      }
    },
  },
  methods: {
    ...mapActions({ postNewRequest: 'merge_request/addNewReq' }),
    click() {
      this.postNewRequest({
        username: this.username,
        repository: this.repository,
        credentials: {
          source: this.source,
          destination: this.destination,
          name: this.name,
        },
      })
    },

    changeDestination(value) {
      if (this.destination === value) {
        this.destination = ''
      } else this.destination = value
    },
    changeSource(value) {
      if (this.source === value) {
        this.source = ''
      } else this.source = value
    },

    cancel() {
      this.$nuxt.$router.push(
        `/${this.username}/${this.repository}/merge_request`
      )
    },
  },
}
</script>
