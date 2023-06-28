import { ValidationError } from '~/plugins/axios'

export const state = () => ({
  request: undefined,
  error: undefined,
  validation_errors: {},
})

export const mutations = {
  setReq(state, req) {
    state.request = req
  },
  setValidationErr(state, err) {
    state.validation_errors = err
  },
  setError(state, err) {
    state.error = err
  },
}

export const actions = {
  clearErrors({ commit }) {
    commit('setValidationErr', {})
  },

  async fetchAllReq({ commit }, { username, repository }) {
    try {
      commit('setValidationErr', {})
      commit('setError', undefined)
      const req = await this.$axios.$get(
        `/v1/users/${username}/repositories/${repository}/merge_requests`
      )

      commit('setReq', req)
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setValidationErr', err)
      } else {
        commit('setError', err.message)
      }
    }
  },

  async addNewReq({ commit }, { username, repository, credentials }) {
    try {
      const req = await this.$axios.$post(
        `/v1/users/${username}/repositories/${repository}/merge_requests`,
        credentials
      )
      commit('setReq', req)
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setValidationErr', err)
      } else {
        commit('setError', err.message)
      }
    }
  },

  async fetchOneReq({ commit }, { username, repository, id }) {
    try {
      const req = await this.$axios.$get(
        `/v1/users/${username}/repositories/${repository}/merge_requests/${id}`
      )

      commit('setReq', req)
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setValidationErr', err)
      } else {
        commit('setError', err.message)
      }
    }
  },

  async mergeReq(
    { commit },
    { username, repository, id, delete_source_branch }
  ) {
    try {
      const req = await this.$axios.$post(
        `/v1/users/${username}/repositories/${repository}/merge_requests/${id}/merge`,
        { delete_source_branch }
      )

      commit('setReq', req)
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setValidationErr', err)
      } else {
        commit('setError', err.message)
      }
    }
  },
  async closeReq({ commit }, { username, repository, id }) {
    try {
      const req = await this.$axios.$post(
        `/v1/users/${username}/repositories/${repository}/merge_requests/${id}/close`
      )

      commit('setReq', req)
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setValidationErr', err)
      } else {
        commit('setError', err.message)
      }
    }
  },
}
