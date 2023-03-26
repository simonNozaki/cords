<script setup lang="ts">
export interface Props {
  open: boolean
  close: () => void
}
withDefaults(defineProps<Props>(), {
  open: false,
  close: () => {}
})
</script>

<template>
  <div class="text-center">
    <v-snackbar :model-value="open">
      <slot />
      <template #actions>
        <v-btn color="primary" variant="text" @click="close">
          完了
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
