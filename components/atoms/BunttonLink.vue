<script lang="ts" setup>
export interface Props {
  click: () => void
}
defineProps<Props>()
</script>

<template>
  <v-btn variant="text" color="primary" class="text-button" @click="click">
    <slot />
  </v-btn>
</template>

<style scoped>
.text-button {
  text-transform: none !important;
}
</style>
