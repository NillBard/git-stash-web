export default async function ({ store, $axios, redirect, res }) {
  if (process.server) {
    try {
      const response = await $axios.post('/v1/refresh_session', undefined, {
        withCredentials: true,
      })

      res.setHeader('set-cookie', response.headers['set-cookie'])

      return redirect('/')
    } catch {}
  } else if (store.state.auth.user) {
    return redirect('/')
  }
}
