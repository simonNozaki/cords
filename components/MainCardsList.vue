<template>
  <v-card flat class="grey lighten-5">
    <v-btn variant="text outlined" color="amber darken-4" to="/">
      <v-icon> mdi-plus </v-icon> 新しいカード
    </v-btn>
    <v-select
      :items="tags.map((t) => t.name)"
      item-color="amber darken-4"
      multiple
      chips
      density="compact"
      variant="solo"
      class="mt-2 mb-2"
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
                <v-list-item-title v-bind="attrs" v-on="on">
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
              <!-- ダイアログの動きを監視してリストを操作する関数をトリガーする -->
              <DeleteCardDialog
                :note-title="note.title"
                @cardDelete="deleteNote(note.id)"
              />
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
import { useUserStore } from '@/store/user.store'
import { useNoteStore } from '@/store/note.store'
import { useTagStore } from '@/store/tag.store'
import Snackbar from '@/components/atoms/Snackbar'
import DeleteCardDialog from '@/components/DeleteCardDialog'
const { fetchAll: fetchAllNotes, findAll: findAllNotes } = useNoteStore()
const { fetchAll: fetchAllTags, findAll: findAllTags } = useTagStore()
import { useDisplay } from 'vuetify'

export default {
  components: {
    Snackbar,
    DeleteCardDialog,
  },
  data() {
    return {
      // state(notes.list)のディープコピー、コンポーネント表示にのみ用いる
      listNotes: [],
      cardDeleteDialog: false,
      snackbar: false,
      snackbarText: '',
    }
  },
  computed: {
    notes: {
      get: function () {
        return findAllNotes
      },
      set: function (notes) {
        this.listNotes = notes
      },
    },
    tags() {
      return findAllTags
    },
    listHeight() {
      const { name } = useDisplay()
      switch (name.value) {
        case 'sm':
          return 500
        case 'md':
          return 536
        case 'lg':
          return 586
        case 'xl':
          return 650
        default:
          return 400
      }
    },
  },
  async created() {
    const currentId = useUserStore().getCurrent.id
    await fetchAllNotes(currentId)
    await fetchAllTags(currentId)
    this.listNotes = findAllNotes
  },
  methods: {
    deleteNote(id) {
      this.$store.dispatch('notes/delete', id)
      this.notes = this.listNotes.filter((note) => note.id !== id)
      this.snackbar = true
      this.snackbarText = 'カードを削除しました'
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
        const filteredNotes = this.$store.getters['notes/findAll'].filter(
          (note) => filteringTags.has(note.tag)
        )
        this.notes = filteredNotes
      }
    },
    close() {
      this.snackbar = false
    },
  },
}
</script>

<style scoped>
.force-size {
  overflow-y: auto;
}
</style>
