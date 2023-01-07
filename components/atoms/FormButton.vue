<template>
  <v-btn
    color="amber darken-4"
    class="white--text justify-center mx-auto"
    :disabled="disabled"
    @click="click"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    click: {
      type: Function,
      default() {
        return () => {}
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      },
    }
  }
}
</script>
