<script lang="ts" setup>
import { useDisplay } from 'vuetify'
import { useNote } from '@/composables/useNote'
import { useTag } from '@/composables/useTag'
import { useUser } from '@/composables/useUser'
import FormButton from '@/components/atoms/FormButton.vue'
import Snackbar from '@/components/atoms/Snackbar.vue'
import RichEditor from '@/components/atoms/editors/RichEditor.vue'
const noteComposable = await useNote()
const tagComposable = await useTag()
const userComposable = useUser()

const initialBody = computed(() => {
  const { name } = useDisplay()
  switch (name.value) {
    case 'sm':
      // 5行
      return '<p></p><p></p><p></p><p></p><p></p>'
    case 'md':
      // 9行
      return '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>'
    case 'lg':
      // 11行
      return '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>'
    case 'xl':
      return '<p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>'
    default:
      // 7行
      return '<p></p><p></p><p></p><p></p><p></p><p></p><p></p>'
  }
})

const snackbar = ref(false)
const snackbarText = ref('')
const title = ref('')
const body = ref('')
const tag = ref('')

const tags = computed(() => tagComposable.findAll().map(t => t.name))

const addNote = (): void => {
  const titleOrUntitled = title.value ? title.value : '無題'

  const now = new Date()
  noteComposable.add({
    title: titleOrUntitled,
    tag: tag.value,
    body: body.value,
    createdAt: now,
    updatedAt: now,
    userId: userComposable.current.id
  })
  snackbar.value = true
  snackbarText.value = `カード ${titleOrUntitled} を保存しました`
  title.value = ''
  tag.value = ''
  body.value = ''
}

const close = (): void => {
  snackbar.value = false
}
</script>

<template>
  <v-form class="ml-2">
    <v-container fluid>
      <v-row no-gutters>
        <v-col>
          <v-text-field
            v-model="title"
            label="要約"
            solo
            variant="outlined"
            density="compact"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <AddTagDialog class="ma-1" />
        <DeleteTagDialog :tags="tags" class="ma-1" />
        <v-col>
          <v-select
            v-model="tag"
            :items="tags"
            label="タグ"
            solo
            variant="outlined"
            density="compact"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-row no-gutters>
      <v-col>
        <RichEditor
          v-model="initialBody"
          @update:value="(latest) => (body = latest)"
        />
      </v-col>
    </v-row>
    <v-row>
      <FormButton :click="addNote">
        保存する
      </FormButton>
    </v-row>
    <Snackbar :open="snackbar" :close="close">
      {{ snackbarText }}
    </Snackbar>
  </v-form>
</template>
