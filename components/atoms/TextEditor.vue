<template>
  <v-textarea
    v-model="editorBody"
    autofocus
    auto-grow
    no-resize
    full-width
    solo
    flat
    :rows="row"
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
    },
  },
  computed: {
    editorBody: {
      get: function () {
        return this.value
      },
      set: function (v) {
        this.$emit('input', v)
      },
    },
    row() {
      switch (this.$vuetify.breakpoint.name) {
        case 'sm':
          return 12
        case 'md':
          return 15
        case 'lg':
          return 15
        case 'xl':
          return 20
        default:
          return 10
      }
    },
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
  },
}
</script>
