<template>
  <v-text-field
    v-model="inputText"
    variant="outlined"
    density="compact"
    :label="label"
    :type="type"
    :rules="rules"
  ></v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    inputText: {
      get: function () {
        return this.value
      },
      set: function (v) {
        this.$emit('input', v)
      },
    },
  },
}
</script>
