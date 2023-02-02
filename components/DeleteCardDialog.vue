<template>
  <div>
    <v-dialog
      v-model="cardDeleteDialog"
      max-width="500"
      transition="fade-transition"
    >
      <template #activator="{ props }">
        <v-btn
          icon
          variant="plain"
          color="amber-darken-4"
          v-bind="props"
        >
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-container>
          <v-card-title class="justify-center">
            カード "{{ noteTitle }}" を削除します
          </v-card-title>
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
            <v-btn text color="error" class="mb-3" @click="deleteNote()">
              削除する
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
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
    deleteNote() {
      this.cardDeleteDialog = false
      // カード削除イベントをパブリッシュ（親側で監視して処理を行う）
      this.$emit('cardDelete')
    },
  },
}
</script>
