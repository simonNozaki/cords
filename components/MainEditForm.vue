<template>
  <v-form class="ma-3">
    <v-text-field
      v-model="title"
      outlined
      dense
    >
    </v-text-field>
    <v-select
      v-model="tag"
      :items="tags"
      outlined
      dense
    >
    </v-select>
    <v-textarea
      v-model="body"
      autofocus
      flat
      no-resize
      full-width
      outlined
      solo
      rows="12"
      class="textarea-editor-font"
    ></v-textarea>
    <v-row>
      <v-btn
        elevation="2"
        color="primary"
        class="white--text justify-center mx-auto"
        @click="updateNote"
      >
        保存する
        <v-icon right> mdi-pencil </v-icon>
      </v-btn>
    </v-row>
    <v-snackbar
      v-model="snackbar"
    >
        {{ snackbarText }}
      <v-btn
        color="primary"
        text
        right
        @click="snackbar = false"
      >
        DONE
      </v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
export default {
  data() {
    const _notes = this.$store.state.notes.list;
    const id = this.$route.params.id;
    const _note = _notes.find((note) => (note.id).toString() === id);
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
      return this.$store.state.tags.list;
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
      };
      this.$store.commit('notes/update', note)

      this.snackbar = true;
      this.snackbarText = "カードを更新しました";
    },
  }
}
</script>

<style scoped>
  .textarea-editor-font {
    font-family: Consolas, 'Courier New', Courier, Monaco, monospace;
  }
</style>

