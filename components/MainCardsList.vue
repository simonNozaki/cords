<template>
  <v-card flat>
    <v-list dense height="536" class="grey lighten-5 force-size">
      <v-btn text small outlined color="amber darken-4" to="/">
        <v-icon> mdi-plus </v-icon> 新しいカード
      </v-btn>
      <v-list-item v-for="note in notes" :key="note.id">
        <v-list-item-content>
          <v-card class="pa-1 ma-0" outlined>
            <v-list-item-title>
              <nuxt-link
                :to="`/notes/${note.id}`"
                class="ma-2 text-md-body-1 text-decoration-none"
              >
                {{ note.title }}
              </nuxt-link>
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-chip class="ma-1 text-caption" label>
                {{ note.tag }}
              </v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-chip class="ma-1 text-caption" label>
                {{ note.updatedAt }}
              </v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
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
                        @click="deleteNote(note.id)"
                      >
                        削除する
                      </v-btn>                        
                    </v-row>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-list-item-subtitle>
          </v-card>
        </v-list-item-content>
      </v-list-item>
      <v-snackbar v-model="snackbar">
        {{ snackbarText }}
        <v-btn text color="primary" right @click="snackbar = false">
          DONE
        </v-btn>
      </v-snackbar>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      cardDeleteDialog: false,
      snackbar: false,
      snackbarText: '',
    }
  },
  computed: {
    notes() {
      return this.$store.state.notes.list
    },
  },
  created() {
    this.$store.dispatch('tags/fetchAll')
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

<style scoped>
.force-size {
  overflow-y: auto;
}
</style>
