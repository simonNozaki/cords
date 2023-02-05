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

<script>
import FormButton from '@/components/atoms/FormButton'
import Snackbar from '@/components/atoms/Snackbar'
import { useTagStore } from '@/store/tag.store'
import { useUserStore } from '@/store/user.store'
const tagStore = useTagStore()
const userStore = useUserStore()

export default {
  components: {
    FormButton,
    Snackbar
  },
  data () {
    return {
      tagDialog: false,
      newTag: '',
      snackbar: false,
      snackbarText: '',
      rules: {
        tag: [val => (val || '').length > 0 || 'タグを入力してください。']
      }
    }
  },
  computed: {
    tags () {
      return tagStore.findAll
    },
    isSubmittable () {
      return this.newTag || this.newTag !== ''
    }
  },
  methods: {
    async addTag () {
      if (this.tags.includes(this.newTag)) {
        this.snackbar = true
        this.snackbarText = `タグ ${this.newTag} はすでに登録されています`
        return
      }
      const now = new Date()
      await tagStore.add({
        userId: userStore.getCurrent.id,
        name: this.newTag,
        createdAt: now,
        updatedAt: now
      })
      this.newTag = ''
      this.tagDialog = false
      this.snackbar = true
      this.snackbarText = `タグ ${this.newTag} を追加しました`
    },
    close () {
      this.snackbar = false
    }
  }
}
</script>
