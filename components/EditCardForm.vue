<template>
  <v-form class="ml-2">
    <v-container fluid>
      <v-row no-gutters>
        <v-col>
          <v-text-field v-model="note.title" label="要約" outlined dense> </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <AddTagDialog class="ma-1" />
        <DeleteTagDialog :tags="tags" class="ma-1" />
        <v-col>
          <v-select v-model="note.tag" :items="tags" label="タグ" outlined dense> </v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-row no-gutters>
      <TextEditor v-model="note.body" />
    </v-row>
    <v-row>
      <FormButton :click="updateNote">
        保存する
      </FormButton>
    </v-row>
    <Snackbar :open="snackbar" :close="close">
      {{ snackbarText }}
    </Snackbar>
  </v-form>
</template>

<script>
import TextEditor from '@/components/atoms/TextEditor'
import FormButton from '@/components/atoms/FormButton'
import Snackbar from '@/components/atoms/Snackbar'

export default {
  components: {
    TextEditor,
    FormButton,
    Snackbar,
  },
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      note: {
        title: '',
        tag: '',
        body: '',
      },
    }
  },
  computed: {
    tags() {
      return this.$store.getters['tags/findAll'].map(t => t.name)
    },
  },
  async created() {
    await this.$fire.firestore.collection('notes').get()
    .then((querySnapshot) => {
        const _notes = []
        querySnapshot.forEach((doc) => {
          const note = doc.data()
          note.id = doc.id
          _notes.push(note)
        })
        const id = this.$route.params.id
        this.note = _notes.find((note) => note.id.toString() === id)
      })
  },
  methods: {
    updateNote() {
      this.note.updatedAt = new Date()
      this.$store.dispatch('notes/set', this.note)

      this.snackbar = true
      this.snackbarText = 'カードを更新しました'
    },
    close() {
      this.snackbar = false
    }
  },
}
</script>
