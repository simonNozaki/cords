<template>
  <v-textarea
    :value="body"
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
  data() {
    return {
      body: '',
    }
  },
  methods: {
    completeToken(event) {
      const lastInputed = event[event.length - 1]
      if (lastInputed === '(') {
        this.body += ')'
      }
      if (lastInputed === '{') {
        this.body += '}'
      }
      if (lastInputed === '[') {
        this.body += ']'
      }
    },
    appendToken(event) {
      if (event.key === 'Tab') {
        event.preventDefault()
        this.body += WHITE_SPACE_TWICE
      }
    },
  }
}
</script>
