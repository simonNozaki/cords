<template>
  <div>
    <v-card
      class="user-form ma-10 pa-10 mx-auto"
    >
      <v-card-title class="justify-center"> Cordsにサインイン </v-card-title>
      <v-card-text class="justify-center">
        すでにアカウントをお持ちですか？
        <v-btn text color="primary" to="/signup">
          サインアップ
        </v-btn>
      </v-card-text>
      <v-form v-model="valid">
        <TextInput
          v-model="email"
          label="メールアドレス"
          :rules="emailRules"
        />
        <TextInput
          v-model="password"
          label="パスワード"
          type="password"
          :rules="passwordRules"
        />
        <FormButton :disabled="!isSubmittable" :click="signup">
          サインイン
        </FormButton>
      </v-form>
      {{ message }}
    </v-card>
    <Snackbar :open="snackbar" :close="close">
      {{ snackbarText }}
    </Snackbar>
  </div>
</template>

<script>
import TextInput from '@/components/atoms/TextInput'
import FormButton from '@/components/atoms/FormButton'
import Snackbar from '~/components/atoms/Snackbar'

export default {
  components: {
    TextInput,
    FormButton,
    Snackbar,
  },
  data() {
    return {
      email: '',
      password: '',
      snackbar: false,
      snackbarText: '',
      valid: true,
      message: '',
      emailRules: [
        v => !!v || 'メールアドレスは必須です',
      ],
      passwordRules: [
        v => !!v || 'パスワードは必須です',
        v => (v && v.length >= 6) || '6桁以上の英数字を使って、パスワードを入力してください',
      ],
    }
  },
  computed: {
    isSubmittable() {
      return this.valid
    },
  },
  methods: {
    signup() {
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(_ => {
          this.$store.dispatch('users/set', this.email)
          this.$router.push('/')
        })
        .catch((e) => {
          this.snackbarText = `サインインできませんでした... ${e}`
          this.snackbar = true
        })
    },
    close() {
      this.snackbar = false
    },
  },
}
</script>
