<script lang="ts" setup>
import FormButton from '@/components/atoms/FormButton.vue'
import Snackbar from '@/components/atoms/Snackbar.vue'
import RichEditor from '@/components/atoms/editors/RichEditor.vue'
import { useTagStore } from '@/store/tag.store'
import { useUserStore } from '@/store/user.store'
import { useNoteStore } from '@/store/note.store'
const route = useRoute()
const tagStore = useTagStore()
const userStore = useUserStore()
const noteStore = useNoteStore()

const tags = computed(() => tagStore.findAll.map((t) => t.name))
const snackbar = ref(false)

const snackbarText = ref('')

const note = (await noteStore.fetchAll(userStore.getCurrent.id)).find((n) => n.id === route.params.id)
if (!note) {
  throw new Error('')
}
let newNote = note

const updateNote = async (): Promise<void> => {
  newNote.updatedAt = new Date().toString()
  try {
    await noteStore.set(newNote)
    snackbar.value = true
    snackbarText.value = 'カードを更新しました'
  } catch (e) {
    snackbar.value = true
    snackbarText.value = `カードを更新できませんでした... ${e}`
  }
}

const close = (): void => {
  snackbar.value = false
}
</script>

<template>
  <v-form class="ma-2">
    <v-container fluid>
      <v-row no-gutters>
        <v-col>
          <v-text-field v-model="note.title" label="要約" variant="plain" density="compact" />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <AddTagDialog class="ma-1" />
        <DeleteTagDialog :tags="tags" class="ma-1" />
        <v-col>
          <v-select
            v-model="note.tag"
            :items="tags"
            label="タグ"
            variant="plain"
            density="compact"
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-card flat outlined class="ml-2 mr-2 pa-1">
          <v-chip label>
            <v-icon start> mdi-clock </v-icon> 作成
          </v-chip>
          {{ note.createdAt }}
        </v-card>
        <v-card flat outlined class="ml-2 mr-2 pa-1">
          <v-chip label>
            <v-icon start> mdi-clock </v-icon>
            更新
          </v-chip>
          {{ note.updatedAt }}
        </v-card>
      </v-row>
    </v-container>
    <v-row no-gutters>
      <v-col>
        <!-- v-ifでcreated初期化を待つ -->
        <!-- https://stackoverflow.com/questions/60928796/render-a-child-component-only-after-async-method-is-completed-in-parents-mounte -->
        <RichEditor
          v-if="note.body"
          :value="note.body"
          @update:value="(latest) => (newNote.body = latest)"
        />
      </v-col>
    </v-row>
    <v-row>
      <FormButton :click="updateNote"> 保存する </FormButton>
    </v-row>
    <Snackbar :open="snackbar" :close="close">
      {{ snackbarText }}
    </Snackbar>
  </v-form>
</template>