import { ValidationError } from '~/plugins/axios'

export const state = () => ({
  repository: undefined,
  branches: [],
  participants: [],
  object: undefined,
  error: undefined,
  role: undefined,
  validation_errors: {},
  loading: false,
})

export const mutations = {
  setRepository(state, { repository, branches }) {
    state.repository = repository
    state.branches = branches
  },

  setRole(state, role) {
    state.role = role
  },

  setParticipants(state, participants) {
    state.participants = participants
  },

  setObject(state, object) {
    state.object = object
  },

  setError(state, error) {
    state.error = error
  },

  setValidationErrors(state, errors) {
    state.validation_errors = errors
  },
  setLoading(state, loading) {
    state.loading = loading
  },
}

export const actions = {
  async createRepository({ commit }, repository) {
    try {
      commit('setValidationErrors', {})
      commit('setError', undefined)

      await this.$axios.$post('/v1/repositories', repository)
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setValidationErrors', err)
      } else {
        commit('setError', err.message)
      }
    }
  },

  async delete({ commit }, params) {
    try {
      commit('setLoading', true)

      await this.$axios.$delete(
        `/v1/users/${params.username}/repositories/${params.repository}`
      )

      commit('setRepository', undefined)
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setValidationErrors', err)
      } else {
        commit('setError', err.message)
      }
    } finally {
      commit('setLoading', false)
    }
  },

  async fetchOne({ commit }, params) {
    try {
      const baseURL = `/v1/users/${params.username}/repositories/${params.repository}`
      const repository = await this.$axios.$get(baseURL)
      const branches = await this.$axios.$get(`${baseURL}/branches`)

      commit('setRepository', { repository, branches })
    } catch {}
  },

  async fetchParticipants({ commit }, params) {
    try {
      const baseURL = `/v1/users/${params.username}/repositories/${params.repository}`
      const participants = await this.$axios.$get(`${baseURL}/participants`)

      commit('setParticipants', participants)
    } catch {}
  },

  async fetchTree({ commit }, params) {
    try {
      const tree = await this.$axios.$get(
        `/v1/users/${params.username}/repositories/${params.repository}/tree/${
          params.branch
        }/${params.pathMatch || ''}`
      )

      commit('setObject', tree)
    } catch (e) {
      commit('setError', e)
    }
  },

  async fetchBlob({ commit }, params) {
    try {
      const blob = await this.$axios.$get(
        `/v1/users/${params.username}/repositories/${params.repository}/blob/${
          params.branch
        }/${params.pathMatch || ''}`
      )
      commit('setObject', blob)
    } catch (e) {
      commit('setError', e)
    }
  },

  async addParticipants({ commit }, { username, repoName, user }) {
    try {
      commit('setLoading', true)

      await this.$axios.$post(
        `/v1/users/${username}/repositories/${repoName}/participants`,
        user
      )
    } catch (e) {
      commit('setError', e)
    } finally {
      commit('setLoading', false)
    }
  },
  async deleteParticipants({ commit }, { username, repoName, user }) {
    try {
      commit('setLoading', true)
      await this.$axios.$delete(
        `/v1/users/${username}/repositories/${repoName}/participants/${user}`
      )
    } catch (e) {
      commit('setError', e)
    } finally {
      commit('setLoading', false)
    }
  },
}
