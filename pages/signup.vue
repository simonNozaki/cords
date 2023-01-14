<template>
  <div>
    <v-card
      class="user-form ma-10 pa-10 mx-auto"
    >
      <v-card-title class="justify-center"> Cordsにサインアップ </v-card-title>
      <v-card-text class="text-center">
        アカウントを作成すると、メモを残せるようになります。
      </v-card-text>
      <v-card-text class="text-center ma-0">        
        もうアカウントを持ってる？
        <v-btn text color="primary" to="/signin">
          サインイン
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
        <FormButton :disabled="!isSubmittable" :click="signup">
          アカウントを作成
        </FormButton>
      </v-form>
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
    signup() {
      this.$fire.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(_ => {
          this.$store.dispatch('users/set', this.email)
          this.$router.push('/')
        })
        .catch((e) => {
          this.snackbarText = (e.code === 'auth/email-already-in-use')
            ? `${this.email} はすでに使われています`
            : `アカウントが作成できませんでした... ${e}`
          this.snackbar = true
        })
    },
    close() {
      this.snackbar = false
    },
  },
}
</script>
