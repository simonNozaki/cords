<template>
  <v-app-bar app dense color="grey-lighten-4" flat>
    <v-app-bar-title> Cords </v-app-bar-title>
    <v-container v-if="isAuthenticated" class="justify-right">
      <v-row>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn
              text
              color="primary"
              class="text-button"
              v-bind="props"
            >
              <v-icon class="mr-1"> mdi-account-outline </v-icon> {{ name }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <ButtonLink :click="signout">
                サインアウト <v-icon> mdi-logout-variant </v-icon>
              </ButtonLink>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-container>
    <Snackbar :open="snackbar" :close="close">
      {{ snackbarText }}
    </Snackbar>
  </v-app-bar>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { defineComponent } from 'vue'
import { useUserStore } from '@/store/user.store'
import ButtonLink from '@/components/atoms/BunttonLink'
import Snackbar from '@/components/atoms/Snackbar'

export default defineComponent({
  components: {
    ButtonLink,
    Snackbar,
  },
  data() {
    return {
      snackbar: false,
      snackbarText: '',
    }
  },
  computed: {
    isAuthenticated() {
      return useUserStore().isAuthenticated
    },
    name() {
      return useUserStore().getCurrent.name
    },
  },
  methods: {
    signout() {
      const { $fire } = useNuxtApp()
      const { reset } = useUserStore()
      const { push } = useRouter()
      signOut(getAuth($fire))
        .then((_) => {
          sessionStorage.removeItem('uid')
          sessionStorage.removeItem('name')
          reset()
          push('/signin')
        })
        .catch((e) => {
          this.snackbarText = `サインアウトできませんでした... ${e}`
          this.snackbar = true
        })
    },
    close() {
      this.snackbar = false
    },
  },
})
</script>

<style scoped>
.text-button {
  text-transform: none !important;
}
</style>
