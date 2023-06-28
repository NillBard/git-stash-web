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
    <c-box
      v-if="object"
      p="0"
      border-width="1px"
      spacing="0"
      border-color="gray.200"
      rounded="md"
    >
      <c-box
        border-bottom-width="1px"
        border-color="gray.200"
        bg="gray.100"
        px="1rem"
        py="0.5rem"
        font-weight="bold"
        spacing="0"
      >
        {{ object.name }}
      </c-box>
      <prism
        v-if="object.file_type && object.content"
        font-size="mg"
        :language="object.file_type"
        :code="object.content"
      />
    </c-box>
  </c-stack>
</template>

<script>
import '~/static/assets/prism.min.css'
import { CStack, CBox } from '@chakra-ui/vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import Prism from 'vue-prismjs'

export default {
  name: 'RepositoryBlobPage',

  components: {
    Prism,
    CStack,
    CBox,
  },

  async fetch() {
    await this.fetchBlob(this.params)
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

  destroyed() {
    this.setObject(undefined)
  },

  methods: {
    ...mapActions({ fetchBlob: 'repositories/fetchBlob' }),

    ...mapMutations({ setObject: 'repositories/setObject' }),
  },
}
</script>
