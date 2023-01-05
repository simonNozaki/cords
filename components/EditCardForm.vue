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
      <v-textarea
        v-model="body"
        autofocus
        no-resize
        full-width
        outlined
        rows="12"
        class="textarea-editor-font"
      ></v-textarea>
    </v-row>
    <v-row>
      <v-btn
        color="amber darken-4"
        class="white--text justify-center mx-auto"
        @click="updateNote"
      >
        保存する
      </v-btn>
    </v-row>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <v-btn color="primary" text right @click="snackbar = false"> DONE </v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
export default {
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
      this.$store.commit('notes/update', note)

      this.snackbar = true
      this.snackbarText = 'カードを更新しました'
    },
  },
}
</script>
