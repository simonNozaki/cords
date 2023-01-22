<template>
  <v-form class="ml-2">
    <v-container fluid>
      <v-row no-gutters>
        <v-col>
          <v-text-field v-model="title" label="要約" solo flat> </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <AddTagDialog class="ma-1" />
        <DeleteTagDialog :tags="tags" class="ma-1" />
        <v-col>
          <v-select v-model="tag" :items="tags" label="タグ" solo flat dense>
          </v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-row no-gutters>
      <v-col>
        <RichEditor
          v-model="initialBody"
          @update:value="(latest) => (body = latest)"
        />
      </v-col>
    </v-row>
    <v-row>
      <FormButton :click="addNote"> 保存する </FormButton>
    </v-row>
    <Snackbar :open="snackbar" :close="close">
      {{ snackbarText }}
    </Snackbar>
  </v-form>
</template>

<script>
import FormButton from '@/components/atoms/FormButton'
import Snackbar from '@/components/atoms/Snackbar'
import RichEditor from '@/components/atoms/editors/RichEditor'

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
      title: '',
      body: '',
      tag: '',
    }
  },
  computed: {
    tags() {
      return this.$store.getters['tags/findAll'].map((t) => t.name)
    },
    initialBody() {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
          // 5行
          return '<p></p><p></p><p></p><p></p><p></p>'
        case 'md':
          // 9行
          return '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>'
        case 'lg':
          // 11行
          return '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>'
        case 'xl':
          return '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>'
        default:
          // 7行
          return '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>'
      }
    },
  },
  methods: {
    addNote() {
      const titleOrUntitled = this.title ? this.title : '無題'

      const now = new Date()
      const note = {
        title: titleOrUntitled,
        tag: this.tag,
        body: this.body,
        createdAt: now,
        updatedAt: now,
      }

      this.$store.dispatch('notes/add', note)
      this.snackbar = true
      this.snackbarText = `カード ${titleOrUntitled} を保存しました`
      this.title = ''
      this.tag = ''
      this.body = ''
    },
    close() {
      this.snackbar = false
    },
  },
}
</script>
