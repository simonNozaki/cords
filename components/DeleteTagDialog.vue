<template>
  <div>
    <v-dialog
      v-model="tagDeleteDialog"
      max-width="500"
      transition="fade-transition"
    >
      <template #activator="{ props }">
        <v-btn
          icon
          variant="plain"
          color="amber-darken-4"
          v-bind="props" >
          <v-icon center dense> mdi-minus </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-btn class="ma-6" text @click="tagDeleteDialog = !tagDeleteDialog">
          <v-icon> mdi-window-close </v-icon>
        </v-btn>
        <v-card-title class="justify-center">
          削除したいタグを選択してください
        </v-card-title>
        <v-container>
          <v-row justify="center" class="text-center">
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
              <FormButton :disabled="!isDeletable" :click="deleteTag">
                削除する
              </FormButton>
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
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tagDeleteDialog: false,
      deletingTags: [],
      snackbar: false,
      snackbarText: '',
    }
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
      const deletedTags = this.deletingTags.reduce((l, r) => `${l}, ${r}`)
      this.snackbarText = `タグ ${deletedTags} を削除しました`
      this.deletingTags = []
    },
    close() {
      this.snackbar = false
      this.snackbarText = ''
    },
  },
}
</script>
