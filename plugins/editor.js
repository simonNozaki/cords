const EditorJS = require('@editorjs/editorjs');

export default ({ $axios }, inject) => {
  inject('editor', {
    EditorJS: ({ holder, placeholder, data }) => {
      return new EditorJS({
        holder,
        placeholder,
        data,
      })
    },
  })
};
