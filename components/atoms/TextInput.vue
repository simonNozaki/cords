<script setup lang="ts">
export interface Props {
  value: string,
  label: string,
  type: string,
  rules: string[]
}
const props = withDefaults(defineProps<Props>(), {
  value: '',
  label: '',
  type: '',
  rules: () => []
})
interface Emits {
  (e: 'input', text: string): () => void
}
const emits = defineEmits<Emits>()
const inputText = computed({
  get () {
    return props.value
  },
  set (text: string) {
    emits('input', text)
  }
})
</script>

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
