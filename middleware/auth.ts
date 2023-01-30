import { useUserStore } from '@/store/user.store'

export default defineNuxtRouteMiddleware((_, from) => {
  const { isAuthenticated } = useUserStore()
  if (!isAuthenticated && !(new Set(['/signin', '/signup']).has(from.path))) {
    return navigateTo('/signin')
  }
})
