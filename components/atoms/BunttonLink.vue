<template>
  <v-btn text color="primary" class="text-button" @click="click">
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
  },
}
</script>

<style scoped>
.text-button {
  text-transform: none !important;
}
</style>
