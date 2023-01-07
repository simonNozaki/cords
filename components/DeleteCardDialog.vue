<template>
  <div>
      <v-dialog
        v-model="cardDeleteDialog"
        max-width="500"
        transition="fade-transition"
      >
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon> mdi-delete-outline </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-container>
          <v-card-title class="justify-center">カードを削除します</v-card-title>
          <v-row>
            <v-card-text class="text-center">
              <v-icon class="ma-2"> mdi-alert-circle-outline </v-icon>
              この操作は取り戻せません
            </v-card-text>
          </v-row>
          <v-row justify="center">
            <v-btn
              text
              class="mb-3"
              @click="cardDeleteDialog = !cardDeleteDialog"
            >
              閉じる
            </v-btn>
            <v-btn
              text
              color="error"
              class="mb-3"
              @click="deleteNote(noteId)"
            >
              削除する
            </v-btn>                        
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <v-btn text color="primary" right @click="snackbar = false">
        完了
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    noteId: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      cardDeleteDialog: false,
      snackbar: false,
      snackbarText: '',
    }
  },
  methods: {
    deleteNote(id) {
      this.$store.dispatch('notes/delete', id)

      this.cardDeleteDialog = false
      this.snackbar = true
      this.snackbarText = 'カードを削除しました'
    },
  },
}
</script>

