<template>
  <div>
    <v-card
      class="user-form ma-10 pa-10 mx-auto"
    >
      <v-card-title class="justify-center"> Cordsにサインイン </v-card-title>
      <v-card-text class="text-center">
        まだアカウントを作っていない？
        <v-btn text color="primary" to="/signup">
          サインアップ
        </v-btn>
      </v-card-text>
      <v-form v-model="valid" class="text-center">
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
        <FormButton :disabled="!isSubmittable" :click="signin">
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
        v => this.$isEmailFormat(v) || 'メールアドレスの形式ではありません。 <アカウント>@<ドメイン>(.jpなど) の形式になっていることをご確認ください'
      ],
      passwordRules: [
        v => !!v || 'パスワードは必須です',
        v => this.$isPasswordLength(v) || '6桁以上の英数字を使って、パスワードを入力してください',
      ],
    }
  },
  computed: {
    isSubmittable() {
      return this.valid
    },
  },
  methods: {
    signin() {
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(_ => {
          this.$store.commit('users/set', this.email)
          this.$router.push('/')
        })
        .catch((e) => {
          switch(e.code) {
            case 'auth/user-not-found':
              this.snackbarText = 'アカウントがありません'
              break
            case 'auth/wrong-password':
              this.snackbarText = 'メールアドレスまたはパスワードが間違えています'
              break
            default:
              this.snackbarText = `サインインできませんでした... ${e}`
          }
          this.snackbar = true
        })
    },
    close() {
      this.snackbar = false
    },
  },
}
</script>
