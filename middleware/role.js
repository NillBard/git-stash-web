export default async function ({ store, params }) {
  try {
    await store.dispatch('repositories/fetchParticipants', params)

    const role = store.state.repositories.participants.find(
      (item) => item.username === store.state.auth.user.username
    )?.role

    if (
      store.state.auth.user?.username ===
      store.state.repositories.repository.owner
    ) {
      store.commit('repositories/setRole', 'owner')
    } else if (role !== 'guest' && role) {
      store.commit('repositories/setRole', role)
    } else {
      store.commit('repositories/setRole', 'guest')
    }
  } catch {}
}
