<template>
  <v-text-field
    v-model="inputText"
    variant="outlined"
    density="compact"
    autocomplete="on"
    :label="label"
    :type="type"
    :rules="rules"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  emits: ['input'],
  computed: {
    inputText: {
      get: function () {
        return this.value
      },
      set: function (v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>
