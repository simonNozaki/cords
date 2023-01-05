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
          outlined
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
                <v-btn
                  :disabled="!isSubmittable"
                  elevation="2"
                  color="amber darken-4"
                  class="white--text justify-center mx-auto ma-5"
                  @click="addTag"
                >
                  保存する
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <v-btn color="primary" text right @click="snackbar = false"> DONE </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
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
      return this.$store.state.tags.list
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
      this.$store.dispatch('tags/add', this.newTag)
      this.newTag = ''
      this.tagDialog = false
      this.snackbar = true
      this.snackbarText = `タグ ${this.newTag} を追加しました`
    },
  },
}
</script>
