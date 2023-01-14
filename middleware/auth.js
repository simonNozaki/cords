const PATH_EXCLUDING = new Set(["/signin", "/signup"])

export default function (context) {
  const isAuthenticated = context.store.getters['users/isAuthenticated']

  // // TODO: リロードするとアカウント情報が揮発するのでどこかに永続化
  if (!isAuthenticated && !PATH_EXCLUDING.has(context.route.path)) {
    return context.redirect('/signin')
  }
}
