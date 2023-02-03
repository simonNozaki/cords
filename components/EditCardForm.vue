<template>
  <v-form class="ma-2">
    <v-container fluid>
      <v-row no-gutters>
        <v-col>
          <v-text-field v-model="note.title" label="要約" variant="flat" density="compact" />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <AddTagDialog class="ma-1" />
        <DeleteTagDialog :tags="tags" class="ma-1" />
        <v-col>
          <v-select
            v-model="note.tag"
            :items="tags"
            label="タグ"
            solo
            variant="flat"
            density="compact"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-card flat outlined class="ml-2 mr-2 pa-1">
          <v-chip label>
            <v-icon start> mdi-clock </v-icon> 作成
          </v-chip>
          {{ note.createdAt }}
        </v-card>
        <v-card flat outlined class="ml-2 mr-2 pa-1">
          <v-chip label>
            <v-icon start> mdi-clock </v-icon>
            更新
          </v-chip>
          {{ note.updatedAt }}
        </v-card>
      </v-row>
    </v-container>
    <v-row no-gutters>
      <v-col>
        <!-- v-ifでcreated初期化を待つ -->
        <!-- https://stackoverflow.com/questions/60928796/render-a-child-component-only-after-async-method-is-completed-in-parents-mounte -->
        <RichEditor
          v-if="note.body"
          :value="note.body"
          @update:value="(latest) => (newNote.body = latest)"
        />
      </v-col>
    </v-row>
    <v-row>
      <FormButton :click="updateNote"> 保存する </FormButton>
    </v-row>
    <Snackbar :open="snackbar" :close="close">
      {{ snackbarText }}
    </Snackbar>
  </v-form>
</template>

<script>
import {
  collection,
  getFirestore,
  getDocs
} from 'firebase/firestore'
import { useTagStore } from '@/store/tag.store'
import FormButton from '@/components/atoms/FormButton'
import Snackbar from '@/components/atoms/Snackbar'
import RichEditor from '@/components/atoms/editors/RichEditor'
const nuxtApp = useNuxtApp()
const route = useRoute()
const tagStore = useTagStore()

export default {
  components: {
    FormButton,
    Snackbar,
    RichEditor,
  },
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      note: {
        title: '',
        tag: '',
        body: null,
      },
      newNote: {
        title: '',
        tag: '',
        body: '',
      },
    }
  },
  computed: {
    tags() {
      return tagStore.findAll.map((t) => t.name)
    },
  },
  async created() {
    const _notes = []
    const snapshots = await getDocs(collection(getFirestore(nuxtApp.$fire), 'notes'))
    snapshots.forEach((doc) => {
      const note = doc.data()
      note.id = doc.id
      _notes.push(note)
    })
    this.note = snapshots.docs.map((doc) => {
      const note = doc.data()
      return {
        id: doc.id,
        title: note.title,
        tag: note.tag,
        body: note.body,
        userId: note.userId,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        ...note
      }
    })
    .find((note) => note.id.toString() === route.params.id)
    this.newNote = this.note
  },
  methods: {
    async updateNote() {
      this.newNote.updatedAt = new Date()
      try {
        await this.$store.dispatch('notes/set', this.newNote)
        this.snackbar = true
        this.snackbarText = 'カードを更新しました'
      } catch (e) {
        this.snackbar = true
        this.snackbarText = `カードを更新できませんでした... ${e}`
      }
    },
    close() {
      this.snackbar = false
    },
  },
}
</script>
