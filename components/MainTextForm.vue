<template>
  <v-form class="ma-3">
    <v-text-field
      v-model="title"
      label="タイトルを挿入..."
    >
    </v-text-field>
    <div id="main-editor"></div>
    <v-row>
      <v-btn
        elevation="2"
        color="primary"
        class="white--text justify-center textarea-editor-font mx-auto"
        @click="addNote"
      >
        保存する
      </v-btn>
    </v-row>
    <v-snackbar
      v-model="saveResultSnackBar"
    >
        {{ snackBarText }}
      <v-btn
        color="primary"
        text
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
    }
  },
    computed: {    
      notes() {
        return this.$store.state.notes.list
      },
    },
  mounted() {
    this.editor = this.$editor.EditorJS({
      holder: 'main-editor',  // エディタをマウントするブロックのID
      placeholder: 'No content',
      data: {},
    });
  },
  methods: {
    addNote() {
      let noteBody = null;
      const maxId = this.notes.reduce((lhs, rhs) => lhs.id > rhs.id ? lhs.id : rhs.id);
      this.editor.save()
        .then((text) => {
          // EditorJS#saveで流れてくる中身: https://editorjs.io/saving-data
          noteBody = text.blocks[0] ? text.blocks[0].data.text : '';
          const titleOrUntitled = this.title ? this.title : '無題';

          const note = {
            id: maxId + 1,
            title: titleOrUntitled,
            body: noteBody,
            updatedAt: new Date(),
          };
    
          this.$store.commit('notes/add', note);
          this.saveResultSnackBar = true;
          this.snackBarText = 'メモが保存されました';
        })
        .catch((e) => {
          this.saveResultSnackBar = true;
          this.snackBarText = 'メモの保存に失敗しました ...' + e;
        });
    }
  }
}
</script>

<style scoped>
  .textarea-editor-font {
    font-family: Consolas, 'Courier New', Courier, Monaco, monospace;
  }
</style>
