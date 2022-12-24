<template>
  <v-form class="ma-3">
    <v-text-field
      v-model="title"
      outlined
      dense
      label="タイトルを挿入..."
    >
    </v-text-field>
    <v-select
      v-model="tag"
      :items="tags"
      outlined
      label="タグを追加..."
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
        @click="addNote"
      >
        保存する
        <v-icon right> mdi-pencil </v-icon>
      </v-btn>
    </v-row>
    <v-snackbar
      v-model="saveResultSnackBar"
    >
        {{ snackBarText }}
      <v-btn
        color="primary"
        text
        right
        @click="saveResultSnackBar = false"
      >
        DONE
      </v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      editor: null,
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
      return this.$store.state.tags.list;
    },
  },
  methods: {
    addNote() {
      const maxId = this.notes.length === 0
        ? 0
        : this.notes.reduce((lhs, rhs) => lhs.id > rhs.id ? lhs.id : rhs.id);
      const titleOrUntitled = this.title ? this.title : '無題';

      const note = {
        id: maxId + 1,
        title: titleOrUntitled,
        tag: this.tag,
        body: this.body,
        updatedAt: new Date(),
      };

      this.$store.commit('notes/add', note);
      this.saveResultSnackBar = true;
      this.snackBarText = 'メモが保存されました';
      this.body = '';
    }
  }
}
</script>

<style scoped>
  .textarea-editor-font {
    font-family: Consolas, 'Courier New', Courier, Monaco, monospace;
  }
</style>
