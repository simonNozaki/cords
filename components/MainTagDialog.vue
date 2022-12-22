<template>
  <div>
    <v-dialog
      v-model="tagDialog"
      max-width="500"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          elevation="2"
          color="secondary"
          class="white--text justify-centermx-auto ma-3"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left> mdi-tag-outline </v-icon> タグを登録
        </v-btn>
      </template>
      <v-card>
        <v-btn
          class="ma-6"
          text
          @click="tagDialog = !tagDialog"
        >
          <v-icon> mdi-window-close </v-icon>
        </v-btn>
        <v-card-text
          class="text-center"
        >
          タグを登録します
        </v-card-text>

        <v-container>
          <v-row>
            <v-col>
              <v-form
                class="text-center"
              >
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
                  color="primary"
                  class="white--text justify-center mx-auto ma-5"
                  @click="addTag"
                >
                  保存する
                  <v-icon right> mdi-pencil </v-icon>
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn
        color="primary"
        text
        right
        @click="snackbar = false"
      >
        DONE
      </v-btn>
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
        tag: [val => (val || '').length > 0 || 'タグを入力してください。']
      },
    };
  },
  computed: {
    notes() {
      return this.$store.state.tags.list;
    },
    isSubmittable() {
      return (this.newTag || this.newTag !== '');
    },
  },
  methods: {
    addTag(event) {
      this.$store.commit('tags/add', this.newTag);
      this.tagDialog = false;
      this.snackbar = true;
      this.snackbarText = `タグ ${this.newTag} を追加しました`;
    }
  }
}
</script>
