<template>
  <v-app-bar app dense class="grey lighten-5" flat>
    <v-app-bar-title> Cords </v-app-bar-title>
    <v-container
      v-if="isAuthenticated"
      class="justify-right"
    >
      <v-row>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              text
              color="primary"
              class="text-button"
              v-bind="attrs"
              v-on="on"
            >
              {{ name }}
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
import ButtonLink from '@/components/atoms/BunttonLink'
import Snackbar from '@/components/atoms/Snackbar'

export default {
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
      return this.$store.getters['users/isAuthenticated']
    },
    name() {
      return this.$store.getters['users/getCurrent'].name
        ? this.$store.getters['users/getCurrent'].name
        : ''
    },
  },
  methods: {
    signout() {
      this.$fire.auth.signOut()
        .then(_ => {
          sessionStorage.removeItem('uid')
          sessionStorage.removeItem('name')
          this.$store.commit('users/reset')
          this.$router.push('/signin')
        })
        .catch((e) => {
          this.snackbarText = `サインアウトできませんでした... ${e}`
          this.snackbar = true
        })
    },
    close() {
      this.snackbar = false
    }
  }
}
</script>

<style scoped>
.text-button {
  text-transform: none !important;
}
</style>
