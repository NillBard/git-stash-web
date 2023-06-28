export class ValidationError {
  constructor(errors) {
    for (const key in errors) {
      this[key] = errors[key]
    }
  }
}

export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    if (store.state.auth.access_token) {
      config.headers.common.Authorization = `Bearer ${store.state.auth.access_token}`
    }
  })

  $axios.onError(async (err) => {
    if (
      err.response?.status === 401 &&
      !err.config?.url.includes('refresh-tokens')
    ) {
      try {
        const data = await $axios.$post('/v1/refresh-tokens', undefined, {
          withCredentials: true,
        })

        store.commit('auth/setAuth', {
          user: data.user,
          access_token: data.access_token,
        })
        $axios.setToken(data.access_token, 'Bearer')

        return $axios(err.config)
      } catch {}
    }
    if (err.response?.data.validation_errors) {
      return Promise.reject(
        new ValidationError(err.response?.data.validation_errors)
      )
    }
    return Promise.reject(new Error(err.response?.data.error))
  })

  $axios.onResponse((res) => {
    res.data = res.data.data
    return Promise.resolve(res)
  })
}
