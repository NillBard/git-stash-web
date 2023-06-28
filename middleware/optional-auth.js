export default async function ({ app, store, res }) {
  if (process.server) {
    try {
      const response = await app.$axios.post('/v1/refresh_session', undefined, {
        withCredentials: true,
      })

      store.commit('auth/setAuth', {
        user: response.data.user,
        access_token: response.data.access_token,
      })
      res.setHeader('set-cookie', response.headers['set-cookie'])
    } catch (error) {
      console.log(error)
    }
  }
}
