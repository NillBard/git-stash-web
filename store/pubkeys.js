import { ValidationError } from '~/plugins/axios'

export const state = () => ({
  pubkeys: [],
  errors: {},
  validation_errors: {},
  loading: false,
})

export const mutations = {
  setPubkeys(state, pubkeys) {
    state.pubkeys = pubkeys
  },

  addPubkey(state, pubkey) {
    state.pubkeys.push(pubkey)
  },

  removePubkey(state, id) {
    state.pubkeys = state.pubkeys.filter((key) => key.id !== id)
  },

  setErrors(state, errors) {
    state.errors = errors
  },

  setValidationErrors(state, errors) {
    state.validation_errors = errors
  },

  setLoading(state, loading) {
    state.loading = loading
  },
}

export const actions = {
  async fetch({ commit }) {
    try {
      commit('setLoading', true)
      const pubkeys = await this.$axios.$get(`/v1/pubkeys`)
      commit('setPubkeys', pubkeys)
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setValidationErrors', err)
      } else {
        commit('setErrors', err.message)
      }
    } finally {
      commit('setLoading', false)
    }
  },

  async create({ commit }, newPubkey) {
    try {
      commit('setLoading', true)
      commit('setErrors', {})

      const pubkey = await this.$axios.$post(`/v1/pubkeys`, newPubkey)

      commit('addPubkey', pubkey)
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setValidationErrors', err)
      } else {
        commit('setErrors', err.message)
      }
    } finally {
      commit('setLoading', false)
    }
  },

  async delete({ commit }, id) {
    try {
      commit('setLoading', true)
      await this.$axios.$delete(`/v1/pubkeys/${id}`)
      commit('removePubkey', id)
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setValidationErrors', err)
      } else {
        commit('setErrors', err.message)
      }
    } finally {
      commit('setLoading', false)
    }
  },
}
