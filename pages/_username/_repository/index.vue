<template>
  <c-stack spacing="1rem">
    <c-box>
      <repo-controls
        v-if="object"
        :current-branch="repository.default_branch"
        :username="params.username"
        :repo-name="params.repository"
        :ssh-url="repository.ssh_url"
        :branches="branches"
      />
    </c-box>
    <c-box v-show="!$fetchState.pending">
      <c-box v-if="object">
        <c-box
          v-if="object.content.length > 0"
          border-width="1px"
          border-color="black"
          rounded="md"
          spacing="0"
        >
          <c-box
            border-bottom-width="1px"
            border-color="black"
            bg="black"
            color="white"
            px="1rem"
            py="0.5rem"
            font-weight="bold"
          >
            Имя
          </c-box>
          <c-box v-for="object in object.content" :key="object.name">
            <blob-object
              v-if="object.object_type == 'blob'"
              :link="`${baseObjectLink}/blob/${object.name}`"
              :name="object.name"
              :_last="{ borderBottom: 'none' }"
            />
            <tree-object
              v-else
              :link="`${baseObjectLink}/tree/${object.name}`"
              :name="object.name"
              :_last="{ borderBottom: 'none' }"
            />
          </c-box>
        </c-box>
      </c-box>
      <repo-placeholder
        v-else
        :name="params.repository"
        :ssh-url="repository.ssh_url"
      />
    </c-box>
  </c-stack>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'RepositoryRootPage',

  async fetch() {
    try {
      await this.fetchTree({
        ...this.params,
        branch: this.repository.default_branch,
      })
    } catch {
      this.setObject(undefined)
    }
  },

  computed: {
    ...mapState({
      repository(state) {
        return state.repositories.repository
      },

      branches(state) {
        return state.repositories.branches.map((branch) => {
          const link = `/${this.params.username}/${this.params.repository}/${branch.name}/tree/`
          return {
            ...branch,
            link,
          }
        })
      },

      object(state) {
        return state.repositories.object
      },
    }),

    params() {
      return this.$route.params
    },

    baseObjectLink() {
      return `/${this.params.username}/${this.params.repository}/${this.repository.default_branch}`
    },
  },

  watch: {
    '$route.params': '$fetch',
  },

  destroyed() {
    this.setObject(undefined)
  },

  methods: {
    ...mapActions({ fetchTree: 'repositories/fetchTree' }),

    ...mapMutations({ setObject: 'repositories/setObject' }),
  },
}
</script>
