<template>
  <v-form class="ma-3">
    <v-text-field
      v-model="title"
      label="タイトルを挿入..."
    >
    </v-text-field>
    <div id="main-editor"></div>
    <v-btn
      elevation="2"
      color="primary"
      class="white--text justify-center textarea-editor-font"
      @click="addNote"
    >
      保存する
    </v-btn>
    <v-snackbar
      v-model="snackBarOnSuccess"
      class="text-center"
    >
      {{ snackBarText }}
      <v-btn
        color="primary"
        text
        @click="snackBarOnSuccess = false"
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
      snackBarOnSuccess: false,
      snackBarText: '',
      title: '',
      body: '',
    }
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
      this.editor.save()
        .then((text) => {
          // EditorJS#saveで流れてくる中身: https://editorjs.io/saving-data
          noteBody = text.blocks[0].data.text;
          const titleOrUntitled = this.title ? this.title : '無題';

          const note = {
            id: Math.random(),
            title: titleOrUntitled,
            body: noteBody,
            updatedAt: new Date(),
          };

          this.$store.commit('notes/add', note);
          this.snackBarOnSuccess = true;
          this.snackBarText = 'メモが保存されました';
        })
        .catch((e) => {});
    }
  }
}
</script>

<style scoped>
  .textarea-editor-font {
    font-family: Consolas, 'Courier New', Courier, Monaco, monospace;
  }
</style>
