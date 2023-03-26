<script lang="ts" setup>
import { Ref } from 'vue'
import FormButton from '@/components/atoms/FormButton.vue'
import Snackbar from '@/components/atoms/Snackbar.vue'
import { useTag } from '@/composables/useTag'
const tagComposable = await useTag()

interface Props {
  tags: string[]
}

withDefaults(defineProps<Props>(), {})

const tagDeleteDialog = ref(false)
const deletingTags: Ref<string[]> = ref([])
const snackbar = ref(false)
const snackbarText = ref('')

const isDeletable = computed(() => deletingTags.value.length > 0)

const deleteTag = async () => {
  await tagComposable.delete(deletingTags.value)
  snackbar.value = true
  const deletedTags = deletingTags.value.reduce((l: string, r: string) => `${l}, ${r}`)
  snackbarText.value = `タグ ${deletedTags} を削除しました`
  deletingTags.value = []
}

const close = () => {
  snackbar.value = false
  snackbarText.value = ''
}
</script>

<template>
  <div>
    <v-dialog
      v-model="tagDeleteDialog"
      max-width="500"
      transition="fade-transition"
    >
      <template #activator="{ props }">
        <v-btn icon variant="plain" color="amber-darken-4" v-bind="props">
          <v-icon center dense>
            mdi-minus
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-btn
          class="ma-6"
          icon
          variant="plain"
          @click="tagDeleteDialog = !tagDeleteDialog"
        >
          <v-icon> mdi-window-close </v-icon>
        </v-btn>
        <v-card-title class="d-flex justify-center">
          削除したいタグを選択してください
        </v-card-title>
        <v-container>
          <v-row justify="center" class="text-center">
            <v-col>
              <v-select
                v-model="deletingTags"
                :items="tags"
                multiple
                chips
                variant="outlined"
                label="削除したいタグを一つ以上選択"
              />
              <FormButton :disabled="!isDeletable" :click="deleteTag">
                削除する
              </FormButton>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <Snackbar :open="snackbar" :close="close">
      {{ snackbarText }}
    </Snackbar>
  </div>
</template>
