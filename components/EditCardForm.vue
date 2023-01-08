<template>
  <v-form class="ml-2">
    <v-container fluid>
      <v-row no-gutters>
        <v-col>
          <v-text-field v-model="title" label="要約" outlined dense> </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <AddTagDialog class="ma-1" />
        <DeleteTagDialog :tags="tags" class="ma-1" />
        <v-col>
          <v-select v-model="tag" :items="tags" label="タグ" outlined dense> </v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-row no-gutters>
      <TextEditor />
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
    const _notes = this.$store.state.notes.list
    const id = this.$route.params.id
    const _note = _notes.find((note) => note.id.toString() === id)
    return {
      snackbar: false,
      snackbarText: '',
      title: _note.title,
      tag: _note.tag,
      body: _note.body,
    }
  },
  computed: {
    tags() {
      return this.$store.state.tags.list.map(t => t.name)
    },
  },
  methods: {
    updateNote() {
      const note = {
        id: this.$route.params.id,
        title: this.title,
        tag: this.tag,
        body: this.body,
        updatedAt: new Date(),
      }
      this.$store.dispatch('notes/set', note)

      this.snackbar = true
      this.snackbarText = 'カードを更新しました'
    },
    close() {
      this.snackbar = false
    }
  },
}
</script>
