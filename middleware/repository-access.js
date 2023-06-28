export default async function ({ store, params, error }) {
  try {
    await store.dispatch('repositories/fetchOne', params)
  } catch {
    return error({ statusCode: 404 })
  }
}
