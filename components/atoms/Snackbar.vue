<template>
  <div class="text-center">
    <v-snackbar :model-value="open">
      <slot></slot>
      <template #actions>
        <v-btn color="primary" variant="text" @click="close"> 完了 </v-btn>
      </template>
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
      },
    },
    close: {
      type: Function,
      default() {
        return () => {}
      },
    },
  },
}
</script>
