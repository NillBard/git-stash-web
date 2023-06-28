import { ValidationError } from '~/plugins/axios'

export const state = () => ({
  user: undefined,
  access_token: undefined,
  validation_error: {},
  error: undefined,
})

export const mutations = {
  setAuth(state, { user, access_token }) {
    state.user = user
    state.access_token = access_token
  },

  setError(state, err) {
    state.error = err
  },

  setValidationError(state, err) {
    state.validation_error = err
  },

  resetErrors(state) {
    state.validation_error = {}
    state.error = undefined
  },

  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async login({ commit }, credentials) {
    try {
      commit('resetErrors')

      const data = await this.$axios.$post('/v1/login', credentials, {
        withCredentials: true,
      })

      commit('setAuth', {
        user: data.user,
        access_token: data.access_token,
      })
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setValidationError', err)
      } else {
        commit('setError', err.message)
      }
    }
  },

  async signUp({ commit }, credentials) {
    try {
      commit('resetErrors')

      const data = await this.$axios.$post('/v1/sign_up', credentials, {
        withCredentials: true,
      })

      commit('setAuth', {
        user: data.user,
        access_token: data.access_token,
      })
    } catch (err) {
      if (err instanceof ValidationError) {
        commit('setValidationError', err)
      } else {
        commit('setError', err.message)
      }
    }
  },

  async logOut({ commit }) {
    await this.$axios.post('/v1/logout')
    commit('setAuth', {})
    commit('resetErrors')
  },
}
