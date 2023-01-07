<template>
  <v-form class="ml-2">
    <v-container fluid>
      <v-row no-gutters>
        <!-- <v-col cols="2"> 見出し </v-col> -->
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
      <TextEditor :value="body" />
    </v-row>
    <v-row>
      <FormButton :click="addNote">
        保存する
      </FormButton>
    </v-row>
    <v-snackbar v-model="saveResultSnackBar">
      {{ snackBarText }}
      <v-btn color="primary" text right @click="saveResultSnackBar = false">
        DONE
      </v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
import TextEditor from '@/components/atoms/TextEditor'
import FormButton from '@/components/atoms/FormButton'

export default {
  components: {
    TextEditor,
    FormButton,
  },
  data() {
    return {
      saveResultSnackBar: false,
      snackBarText: '',
      title: '',
      body: '',
      tag: '',
    }
  },
  computed: {
    notes() {
      return this.$store.state.notes.list
    },
    tags() {
      return this.$store.state.tags.list.map(t => t.name)
    },
  },
  created() {
    this.$store.dispatch('notes/fetchAll')
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
      this.saveResultSnackBar = true
      this.snackBarText = 'カードが保存されました'
      this.title = ''
      this.tag = ''
      this.body = ''
    },
  },
}
</script>

<style scoped>
.text-editor {
  height: 400;
}
</style>
