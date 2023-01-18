<template>
  <div>
    <v-dialog
      v-model="tagDialog"
      max-width="500"
      transition="fade-transition"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          small
          icon
          color="amber darken-4"
          class="justify-center"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon center dense> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-btn class="ma-6" text @click="tagDialog = !tagDialog">
          <v-icon> mdi-window-close </v-icon>
        </v-btn>
        <v-card-title class="justify-center"> タグを登録します </v-card-title>
        <v-container>
          <v-row>
            <v-col>
              <v-form class="text-center">
                <v-text-field
                  v-model="newTag"
                  :rules="rules.tag"
                  outlined
                  required
                  dense
                >
                </v-text-field>
                <FormButton
                  :disabled="!isSubmittable"
                  :click="addTag"
                >
                  保存する
                </FormButton>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <Snackbar :open="snackbar" :close="close">
      {{ snackbarText }}
    </Snackbar>
  </div>
</template>

<script>
import FormButton from '@/components/atoms/FormButton'
import Snackbar from '@/components/atoms/Snackbar'

export default {
  components: {
    FormButton,
    Snackbar,
  },
  data() {
    return {
      tagDialog: false,
      newTag: '',
      snackbar: false,
      snackbarText: '',
      rules: {
        tag: [(val) => (val || '').length > 0 || 'タグを入力してください。'],
      },
    }
  },
  computed: {
    tags() {
      return this.$store.getters['tags/findAll']
    },
    isSubmittable() {
      return this.newTag || this.newTag !== ''
    },
  },
  methods: {
    addTag() {
      if (this.tags.includes(this.newTag)) {
        this.snackbar = true
        this.snackbarText = `タグ ${this.newTag} はすでに登録されています`
        return
      }
      const currentUser = this.$store.getters['users/getCurrent']
      const now = new Date()
      const tag = {
        userId: currentUser.id,
        tagName: this.newTag,
        createdAt: now,
        updatedAt: now,
      }
      this.$store.dispatch('tags/add', tag)
      this.newTag = ''
      this.tagDialog = false
      this.snackbar = true
      this.snackbarText = `タグ ${this.newTag} を追加しました`
    },
    close() {
      this.snackbar = false
    },
  },
}
</script>
