import { ValidationError } from '~/plugins/axios'

export const state = () => ({
  user: undefined,
  repositories: [],
  errors: {},
  loading: false,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },

  setRepositories(state, repositories) {
    state.repositories = repositories
  },

  setErrors(state, errors) {
    state.errors = errors
  },

  setLoading(state, loading) {
    state.loading = loading
  },
}

export const actions = {
  async fetch({ commit }, username) {
    try {
      commit('setLoading', true)
      commit('setErrors', {})

      const user = await this.$axios.$get(`/v1/users/${username}`)
      const repositories = await this.$axios.$get(
        `/v1/users/${username}/repositories`
      )

      commit('setUser', user)
      commit('setRepositories', repositories)
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setErrors', err)
      } else {
        commit('setErrors', { error: err.message })
      }
    } finally {
      commit('setLoading', false)
    }
  },

  async update({ commit, state }, updatedUser) {
    try {
      commit('setLoading', true)
      commit('setErrors', {})

      const user = await this.$axios.$put(
        `/v1/users/${state.user.username}/name`,
        updatedUser
      )

      commit('auth/setUser', user, { root: true })
      commit('setUser', user)
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setErrors', err)
      } else {
        commit('setErrors', { error: err.message })
      }
    } finally {
      commit('setLoading', false)
    }
  },
}
