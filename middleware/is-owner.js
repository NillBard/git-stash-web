export default function ({ store, params, redirect }) {
  if (store.state.auth.user?.username !== params.username) {
    return redirect('/404')
  }
}
