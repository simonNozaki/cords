<template>
  <div>
    <v-card class="user-form ma-10 pa-10 mx-auto">
      <v-card-title class="d-flex justify-center">
        Cordsにサインアップ
      </v-card-title>
      <v-card-text class="text-center">
        アカウントを作成すると、メモを残せるようになります。
      </v-card-text>
      <v-card-text class="text-center ma-0">
        もうアカウントを持ってる？
        <v-btn variant="text" color="secondary" to="/signin">
          サインイン
        </v-btn>
      </v-card-text>
      <v-form v-model="valid" class="text-center">
        <TextInput v-model="email" label="メールアドレス" :rules="emailRules" />
        <TextInput
          v-model="password"
          label="パスワード"
          type="password"
          :rules="passwordRules"
        />
        <TextInput
          v-model="passwordConfirmation"
          label="パスワードをもう一度確認"
          type="password"
          :rules="passwordConfirmationRules"
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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import TextInput from '@/components/atoms/TextInput'
import FormButton from '@/components/atoms/FormButton'
import Snackbar from '~/components/atoms/Snackbar'
import { useUserStore } from '~/store/user.store'
const router = useRouter()

export default {
  components: {
    TextInput,
    FormButton,
    Snackbar
  },
  data () {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      snackbar: false,
      snackbarText: '',
      valid: true,
      emailRules: [
        v => !!v || 'メールアドレスは必須です',
        v =>
          this.$isEmailFormat(v) ||
          'メールアドレスの形式ではありません。 <アカウント>@<ドメイン>(.jpなど) の形式になっていることをご確認ください'
      ],
      passwordRules: [
        v => !!v || 'パスワードは必須です',
        v =>
          this.$isPasswordLength(v) ||
          '6桁以上の英数字を使って、パスワードを入力してください'
      ],
      passwordConfirmationRules: [
        v => v === this.password || 'パスワードが一致しません'
      ]
    }
  },
  computed: {
    isSubmittable () {
      return this.valid
    }
  },
  methods: {
    signup () {
      createUserWithEmailAndPassword(
        getAuth(this.$fire),
        this.email,
        this.password
      )
        .then((userCredential) => {
          const uid = userCredential.user.uid
          sessionStorage.setItem('uid', uid)
          sessionStorage.setItem('name', this.email)
          this.$store.commit('users/set', { name: this.email, id: uid })
          useUserStore().set({ name: this.email, id: uid })
          router.push('/')
        })
        .catch((e) => {
          this.snackbarText =
            e.code === 'auth/email-already-in-use'
              ? `${this.email} はすでに使われています`
              : `アカウントが作成できませんでした... ${e}`
          this.snackbar = true
        })
    },
    close () {
      this.snackbar = false
    }
  }
}
</script>
