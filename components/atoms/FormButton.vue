<template>
  <v-btn
    color="amber-darken-4"
    class="white--text"
    :disabled="disabled"
    @click="click"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  props: {
    click: {
      type: Function,
      default () {
        return () => {}
      }
    },
    disabled: {
      type: Boolean,
      default () {
        return false
      }
    }
  }
}
</script>
