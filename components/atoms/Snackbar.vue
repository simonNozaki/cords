<template>
  <div class="text-center">
    <v-snackbar :value="open">
      <slot></slot>
      <v-btn color="primary" text @click="close">
        完了
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default() {
        return false
      }
    },
    close: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },
}
</script>
