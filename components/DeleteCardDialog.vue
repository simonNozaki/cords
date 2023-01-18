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
          <v-card-title class="justify-center"
            >カード "{{ noteTitle }}" を削除します</v-card-title
          >
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
            <v-btn text color="error" class="mb-3" @click="deleteNote(noteId)">
              削除する
            </v-btn>
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
import Snackbar from '@/components/atoms/Snackbar'

export default {
  components: {
    Snackbar,
  },
  props: {
    noteId: {
      type: String,
      default() {
        return ''
      },
    },
    noteTitle: {
      type: String,
      default() {
        return ''
      },
    },
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
    close() {
      this.snackbar = false
    },
  },
}
</script>
