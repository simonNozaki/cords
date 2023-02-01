<script lang="ts" setup>
import { useUserStore } from '@/store/user.store'
import { useNoteStore } from '@/store/note.store'
import { useTagStore } from '@/store/tag.store'
import { useDisplay } from 'vuetify'

const { fetchAll: fetchAllNotes, findAll: findAllNotes, delete: remove } = useNoteStore()
const { fetchAll: fetchAllTags, findAll: findAllTags } = useTagStore()
const { getCurrent } = useUserStore()
const router = useRouter()
const route = useRoute()

let listNotes = []
const currentId = getCurrent.id
fetchAllNotes(currentId).then((n) => listNotes = n)
fetchAllTags(currentId)

let cardDeleteDialog = false
let snackbar = false
let snackbarText = ''

const notes = computed({
  get: () => findAllNotes,
  set: (note) => {
    listNotes = note
  }
})
listNotes = findAllNotes
console.log(listNotes)

const tags = computed(() => findAllTags)

const listHeight = computed(() => {
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
})

const deleteNote = (id: string): void => {
  remove(id)
  notes.value = listNotes.filter((note) => note.id !== id)
  snackbar = true
  snackbarText = 'カードを削除しました'
  // 削除時に削除するカード上にいたらリダイレクトする
  if (id === route.params.id) {
    router.push('/')
  }
}

const findByTags = (event: string[]): void => {
  // eventが配列形式になっているのでそのまま渡してOK
  // 存在判定だけなので集合に変えて要素の存在判定のみ(tagsのstate自体集合にしていいかも)
  const filteringTags = new Set(event)
  // フィルタしない場合は全部持ってくる
  if (filteringTags.size === 0) {
    notes.value = findAllNotes
  } else {
    const filteredNotes = findAllNotes.filter(
      (note) => filteringTags.has(note.tag)
    )
    notes.value = filteredNotes
  }
}

const close = () => {
  snackbar = false
}

</script>

<template>
  <v-card flat class="grey lighten-5">
    <v-btn variant="outlined" color="amber-darken-4" to="/">
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
        <div>
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
                @card-delete="deleteNote(note.id)"
              />
            </v-list-item-subtitle>
          </v-card>
        </div>
      </v-list-item>
    </v-list>
    <Snackbar :open="snackbar" :close="close">
      {{ snackbarText }}
    </Snackbar>
  </v-card>
</template>
