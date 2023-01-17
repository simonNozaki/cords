<template>
  <v-card flat class="grey lighten-5">
    <v-btn text small outlined color="amber darken-4" to="/">
      <v-icon> mdi-plus </v-icon> 新しいカード
    </v-btn>
    <v-select
      :items="tags.map(t => t.name)"
      item-color="amber darken-4"
      multiple
      small
      chips
      flat
      dense
      label="フィルタ"
      @change="findByTags"
    >
    </v-select>
    <v-list dense :height="listHeight" class="grey lighten-5 force-size">
      <v-list-item v-for="note in listNotes" :key="note.id">
        <v-list-item-content>
          <v-card class="pa-1 ma-0" outlined>
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-list-item-title
                  v-bind="attrs"
                  v-on="on"
                >
                  <nuxt-link
                    :to="`/notes/${note.id}`"
                    class="ma-2 text-md-body-1 text-decoration-none"
                  >
                    {{ note.title }}
                  </nuxt-link>
                </v-list-item-title>
              </template>
              <span> {{ note.title }} </span>
            </v-tooltip>
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
                :retain-focus="false"
              >
                <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" @click="setCurrentNote(note)">
                    <v-icon> mdi-delete-outline </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-container>
                    <v-card-title class="justify-center">カード "{{ currentNote.title ?? '' }}" を削除します</v-card-title>
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
                        @click="deleteNote(currentNote.id)"
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
    </v-list>
    <Snackbar :open="snackbar" :close="close">
      {{ snackbarText }}
    </Snackbar>
  </v-card>
</template>

<script>
import Snackbar from '@/components/atoms/Snackbar'

export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      // state(notes.list)のディープコピー、コンポーネント表示にのみ用いる
      listNotes: [],
      cardDeleteDialog: false,
      currentNote: {
        id: '',
        title: '',
      },
      dialog: false,
      snackbar: false,
      snackbarText: '',
    }
  },
  computed: {
    notes: {
      get: function() {
        return this.$store.getters['notes/findAll']
      },
      set: function(notes) {
        this.listNotes = notes
      }
    },
    tags() {
      return this.$store.getters['tags/findAll']
    },
    listHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm': return 500
        case 'md': return 536
        case 'lg': return 586
        case 'xl': return 650
        default : return 400
      }
    },
  },
  async created() {
    const currentUser = this.$store.getters['users/getCurrent']
    await this.$store.dispatch('tags/fetchAll', currentUser.id)
    await this.$store.dispatch('notes/fetchAll', currentUser.id)
    this.listNotes = this.$store.getters['notes/findAll']
  },
  methods: {
    deleteNote(id) {
      this.$store.dispatch('notes/delete', id)

      this.cardDeleteDialog = false
      this.snackbar = true
      this.snackbarText = 'カードを削除しました'
      this.notes = this.listNotes.filter((note) => note.id !== id)
      // 削除時に削除するカード上にいたらリダイレクトする
      if (id === this.$route.params.id) {
        this.$router.push('/')
      }
    },
    findByTags(event) {
      // eventが配列形式になっているのでそのまま渡してOK
      // 存在判定だけなので集合に変えて要素の存在判定のみ(tagsのstate自体集合にしていいかも)
      const filteringTags = new Set(event)
      // フィルタしない場合は全部持ってくる
      if (filteringTags.size === 0) {
        this.notes = this.$store.getters['notes/findAll']
      } else {
        const filteredNotes = this.$store.getters['notes/findAll'].filter((note) => filteringTags.has(note.tag))
        this.notes = filteredNotes
      }
    },
    close() {
      this.snackbar = false
    },
    setCurrentNote(note) {
      this.currentNote = note
    }
  },
}
</script>

<style scoped>
.force-size {
  overflow-y: auto;
}
</style>
