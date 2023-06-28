<template>
  <c-stack
    v-if="merge_request && !Array.isArray(merge_request)"
    spacing="1.5rem"
  >
    <c-box>
      <merge-header
        :author="merge_request.created_by"
        :state="merge_request.state"
        :name="merge_request.name"
        :source="merge_request.source"
        :destination="merge_request.destination"
      />
    </c-box>
    <hr />
    <c-stack
      v-if="merge_request.merge_state === 'uptodate'"
      direction="row"
      border="1px solid"
      justify="space-evenly"
      py="1rem"
      border-color="gray.200"
      rounded="md"
    >
      <c-stack spacing="1rem" w="50%">
        <c-text font-size="lg" font-weight="bold">
          В этом запросе на слияние нет изменений
        </c-text>
        <c-text font-size="md"
          >Используйте запросы на слияние, чтобы предлагать изменения в вашем
          проекте и обсуждать их с вашей командой. Чтобы внести изменения,
          отправьте коммит или отредактируйте этот мердж-реквест, чтобы
          использовать другую ветку.
        </c-text>
        <c-box>
          <app-button as="n-link" :to="`${baseLink}/new`" size="sm">
            Новый запрос на слияние
          </app-button>
        </c-box>
      </c-stack>
      <c-box ml="5rem">
        <c-image
          size="200px"
          :src="require('@/static/assets/img/empty.png')"
        ></c-image>
      </c-box>
    </c-stack>
    <c-box v-else border="1px" border-color="gray.200" rounded="md">
      <merge-content-header
        :author="merge_request.created_by"
        :role="role"
        :date="merge_request.created_at"
        :state="merge_request.state"
        :merge-state="merge_request.merge_state"
      />
      <merge-content-body
        :id="merge_request.id"
        :role="role"
        :state="merge_request.state"
        :merge-state="merge_request.merge_state"
        :is-delete="isDelete"
        @change="() => (isDelete = !isDelete)"
        @merge="
          () =>
            merge({
              username,
              repository,
              id: merge_request.id,
              delete_source_branch: isDelete,
            })
        "
      />
    </c-box>
    <c-stack
      v-if="role !== 'guest' && merge_request.state !== 'merged'"
      direction="row"
    >
      <app-button
        variant="outline"
        @click.prevent="
          () => close({ username, repository, id: merge_request.id })
        "
      >
        Отменить слияние
      </app-button>
    </c-stack>
  </c-stack>
</template>

<script>
import { CBox, CButton, CStack } from '@chakra-ui/vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'MergeRequest',
  component: [CStack, CButton, CBox],
  async asyncData({ params, store, req }) {
    await store.dispatch('merge_request/fetchOneReq', params)

    if (process.server) {
      return { hostname: req.headers.host.split(':')[0], ...params }
    } else {
      return { hostname: location.hostname, ...params }
    }
  },

  data() {
    return {
      isDelete: true,
    }
  },

  computed: {
    ...mapState({
      merge_request: (state) => state.merge_request.request,
      role: (state) => state.repositories.role,
    }),
  },
  methods: {
    ...mapActions({
      merge: 'merge_request/mergeReq',
      close: 'merge_request/closeReq',
    }),
  },
}
</script>
