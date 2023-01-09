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
      <TextEditor v-model="body" />
    </v-row>
    <v-row>
      <FormButton :click="addNote">
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
      title: '',
      body: '',
      tag: '',
    }
  },
  computed: {
    tags() {
      return this.$store.getters['tags/findAll'].map(t => t.name)
    },
  },
  methods: {
    addNote() {
      const titleOrUntitled = this.title ? this.title : '無題'

      const note = {
        title: titleOrUntitled,
        tag: this.tag,
        body: this.body,
        updatedAt: new Date(),
      }

      this.$store.dispatch('notes/add', note)
      this.snackbar = true
      this.snackbarText = 'カードが保存されました'
      this.title = ''
      this.tag = ''
      this.body = ''
    },
    close() {
      this.snackbar = false
    }
  },
}
</script>

<style scoped>
.text-editor {
  height: 400;
}
</style>
