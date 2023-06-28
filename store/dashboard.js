export const state = () => ({ repos: [], loading: false })

export const mutations = {
  setRepos(state, repos) {
    state.repos = repos
  },
  setLoading(state, value) {
    state.loading = value
  },
}

export const actions = {
  async fetchDashboard({ commit }) {
    try {
      commit('setLoading', true)
      const data = await this.$axios.$get('/v1/dashboard')
      commit('setRepos', data)
    } catch {
    } finally {
      commit('setLoading', false)
    }
  },
}
