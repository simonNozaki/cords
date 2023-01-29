import { initializeApp } from "firebase/app";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const fire = initializeApp({
    apiKey: runtimeConfig.public.apiKey,
    authDomain: runtimeConfig.public.authDomain,
    projectId: runtimeConfig.public.projectId,
    storageBucket: runtimeConfig.public.storageBucket,
    messagingSenderId: runtimeConfig.public.messagingSenderId,
    appId: runtimeConfig.public.appId,
  })
  return {
    provide: { fire }
  }
})
