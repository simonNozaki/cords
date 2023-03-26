<script lang="ts" setup>
import FormButton from '@/components/atoms/FormButton.vue'
import Snackbar from '@/components/atoms/Snackbar.vue'
import { useTag } from '@/composables/useTag'
import { useUser } from '@/composables/useUser'
const tagComposable = await useTag()
const userComposable = useUser()

const tagDialog = ref(false)
const newTag = ref('')
const snackbar = ref(false)
const snackbarText = ref('')
const rules = ref({
  tag: [(val: string) => (val || '').length > 0 || 'タグを入力してください。']
})

const tags = computed(() => tagComposable.findAll())
const isSubmittable = computed(() => newTag.value || newTag.value !== '')

const addTag = async () => {
  if (tags.value.map(t => t.name).includes(newTag.value)) {
    snackbar.value = true
    snackbarText.value = `タグ ${newTag.value} はすでに登録されています`
    return
  }
  const now = new Date()
  await tagComposable.add({
    userId: userComposable.current.id,
    name: newTag.value,
    createdAt: now,
    updatedAt: now
  })
  newTag.value = ''
  tagDialog.value = false
  snackbar.value = true
  snackbarText.value = `タグ ${newTag.value} を追加しました`
}

const close = () => {
  snackbar.value = false
}
</script>

<template>
  <div>
    <v-dialog v-model="tagDialog" max-width="500" transition="fade-transition">
      <template #activator="{ props }">
        <v-btn
          icon
          variant="plain"
          color="amber-darken-4"
          class="justify-center"
          v-bind="props"
        >
          <v-icon> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-btn
          class="ma-6"
          icon
          variant="plain"
          @click="tagDialog = !tagDialog"
        >
          <v-icon> mdi-window-close </v-icon>
        </v-btn>
        <v-card-title class="d-flex justify-center">
          タグを登録します
        </v-card-title>
        <v-container>
          <v-row>
            <v-col>
              <v-form class="text-center">
                <v-text-field
                  v-model="newTag"
                  :rules="rules.tag"
                  variant="outlined"
                  required
                  density="compact"
                />
                <FormButton :disabled="!isSubmittable" :click="addTag">
                  保存する
                </FormButton>
              </v-form>
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
