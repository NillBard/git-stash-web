<template>
  <c-stack spacing="1rem">
    <c-box>
      <repo-controls
        :current-branch="params.branch"
        :username="params.username"
        :repo-name="params.repository"
        :clone-link="cloneLink"
        :branches="branches"
      />
    </c-box>

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
        <c-box v-if="backLink">
          <c-box
            as="n-link"
            :to="backLink"
            display="block"
            px="1.4rem"
            py="0.5rem"
            border-bottom-width="1px"
            border-color="gray.200"
            mb="-1px"
            font-size="md"
          >
            ..
          </c-box>
        </c-box>

        <c-box v-for="object in object.content" :key="object.name">
          <blob-object
            v-if="object.object_type == 'blob'"
            :link="`${baseObjectLink}/blob/${params.pathMatch}/${object.name}`"
            :name="object.name"
            :_last="{ borderBottom: 'none' }"
          />
          <tree-object
            v-else
            :link="`${baseObjectLink}/tree/${params.pathMatch}/${object.name}`"
            :name="object.name"
            :_last="{ borderBottom: 'none' }"
          />
        </c-box>
      </c-box>
    </c-box>
  </c-stack>
</template>

<script>
import { CStack, CBox } from '@chakra-ui/vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'RepositoryTreePage',

  components: {
    CStack,
    CBox,
  },

  async fetch() {
    try {
      await this.fetchTree(this.params)
    } catch {}
  },

  computed: {
    params() {
      return this.$route.params
    },

    ...mapState({
      repository(state) {
        return state.repositories.repository
      },

      branches(state) {
        return state.repositories.branches.map((branch) => {
          const link = `/${this.params.username}/${this.params.repository}/${branch.name}/tree/${this.params.pathMatch}`
          return {
            ...branch,
            link: link.replaceAll('//', '/'),
          }
        })
      },

      object(state) {
        return state.repositories.object
      },
    }),

    cloneLink() {
      return `git@${this.hostname}:${this.params.username}/${this.params.repository}.git`
    },

    baseObjectLink() {
      return `/${this.params.username}/${this.params.repository}/${this.params.branch}`
    },

    backLink() {
      if (this.params.pathMatch) {
        const pathMatch = this.params.pathMatch
          .split('/')
          .slice(0, -1)
          .join('/')
        return `/${this.params.username}/${this.params.repository}/${this.params.branch}/tree/${pathMatch}`
      }
      return ''
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
