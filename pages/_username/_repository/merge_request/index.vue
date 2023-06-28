<template>
  <c-stack v-if="Array.isArray(merge_request) && !$fetchState.pending" w="100%">
    <merge-page-wrapper>
      <c-stack v-if="filterMergRequest(filter).length > 0" spacing="1.5rem">
        <c-box
          v-for="req in filterMergRequest(filter)"
          :key="req.id"
          as="n-link"
          :to="`/${params.username}/${params.repository}/merge_request/${req.id}`"
        >
          <merge-object
            :name="req.name"
            :id-req="req.id"
            :username="`${req.created_by}`"
            :state="req.state"
            :date="req.created_at"
          />
        </c-box>
      </c-stack>
      <empty-merge v-else :merge-state="$nuxt.$route.query.state || 'open'" />
    </merge-page-wrapper>
  </c-stack>
</template>

<script>
import { isEmpty } from 'lodash'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'MergePage',
  layout: 'repo',

  async fetch() {
    try {
      await this.fetchAllMergeRequest(this.params)
    } catch {}
  },

  computed: {
    ...mapState({
      merge_request: (state) => state.merge_request.request,
      role: (state) => state.repositories.role,
    }),

    baseLink() {
      const username = this.$route.params.username
      const repository = this.$route.params.repository
      return `/${username}/${repository}/merge_request`
    },

    params() {
      return this.$route.params
    },

    queryState() {
      return this.$route.query
    },

    filter() {
      if (isEmpty(this.queryState)) {
        return 'open'
      } else {
        return this.queryState.state
      }
    },
  },

  methods: {
    ...mapActions({ fetchAllMergeRequest: 'merge_request/fetchAllReq' }),
    filterMergRequest(filter) {
      if (filter === 'all') {
        return this.merge_request
      } else {
        return this.merge_request.filter((request) => request.state === filter)
      }
    },
  },
}
</script>
