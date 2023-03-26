<script lang="ts" setup>
export interface Props {
  click: () => void
  disabled: boolean
}
withDefaults(defineProps<Props>(), {
  click: () => {},
  disabled: false
})
</script>

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
