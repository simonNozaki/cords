<template>
  <div>
    <v-dialog v-model="tagDeleteDialog" max-width="500">
      <template #activator="{ on, attrs }">
        <v-btn
          small
          outlined
          v-bind="attrs"
          v-on="on"
        >
          <v-icon center dense> mdi-minus </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-btn class="ma-6" text @click="tagDeleteDialog = !tagDeleteDialog">
          <v-icon> mdi-window-close </v-icon>
        </v-btn>
        <v-card-title> 削除したいタグを選択してください </v-card-title>
        <v-container>
          <v-row>
            <v-col>
              <v-select
                v-model="deletingTags"
                :items="tags"
                multiple
                chips
                solo
                label="削除したいタグを一つ以上選択"
              >
              </v-select>
              <v-btn
                :disabled="!isDeletable"
                elevation="2"
                color="amber darken-4"
                class="white--text justify-center mx-auto ma-5 text-center"
                @click="deleteTag"
              >
                削除する
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <v-btn color="primary" text right @click="snackbar = false"> 完了 </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => ([]),
    }
  },
  data() {
    return {
      tagDeleteDialog: false,
      deletingTags: [],
      snackbar: false,
      snackbarText: '',
    };
  },
  computed: {
    isDeletable() {
      return this.deletingTags.length > 0
    },
  },
  methods: {
    deleteTag() {
      this.$store.dispatch('tags/delete', this.deletingTags)
      this.snackbar = true
      this.snackbarText = `タグ ${this.deletingTags.reduce((l, r) => l + r)} を削除しました`
    }
  }
}
</script>