<template>
  <v-textarea
    v-model="editorBody"
    autofocus
    no-resize
    full-width
    outlined
    rows="12"
    class="textarea-editor-font"
    @input="completeToken"
    @keydown="appendToken"
  >
  </v-textarea>
</template>

<script>
const WHITE_SPACE_TWICE = '  '

export default {
  props: {
    value: {
      type: String,
      default: '',
    }
  },
  computed: {
    editorBody: {
      get: function() {
        return this.value
      },
      set: function (v) {
        this.$emit('input', v)
      },
    }
  },
  methods: {
    completeToken(event) {
      const lastInputed = event[event.length - 1]
      if (lastInputed === '(') {
        this.editorBody += '()'
      }
      if (lastInputed === '{') {
        this.editorBody += '{}'
      }
      if (lastInputed === '[') {
        this.editorBody += '[]'
      }
    },
    appendToken(event) {
      if (event.key === 'Tab') {
        event.preventDefault()
        this.editorBody += WHITE_SPACE_TWICE
      }
    },
  }
}
</script>
