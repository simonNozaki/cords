const PATH_EXCLUDING = new Set(["/signin", "/signup"])

export default function (context) {
  const accountName = context.store.getters['users/findCurrentUser']

  // TODO: リロードするとアカウント情報が揮発するのでどこかに永続化
  if (accountName === '' && !PATH_EXCLUDING.has(context.route.path)) {
    return context.redirect('/signin')
  }
}
