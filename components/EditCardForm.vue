<template>
  <v-form class="ml-2">
    <v-container fluid>
      <v-row no-gutters>
        <v-col>
          <v-text-field v-model="note.title" label="要約" solo flat>
          </v-text-field>
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
            solo
            flat
            dense
          >
          </v-select>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-card
          flat
          outlined
          class="ml-2 mr-2 pa-1" >
          <v-chip>
            <v-icon> mdi-clock-outline </v-icon>
            作成
          </v-chip>
          {{ note.createdAt }}
        </v-card>
        <v-card
          flat
          outlined
          class="ml-2 mr-2 pa-1" >
          <v-chip>
            <v-icon> mdi-clock-outline </v-icon>
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
          @update:value="(latest) => body = latest" />
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

<script>
import FormButton from '@/components/atoms/FormButton'
import Snackbar from '@/components/atoms/Snackbar'
import RichEditor from '@/components/atoms/editors/RichEditor'

export default {
  components: {
    FormButton,
    Snackbar,
    RichEditor,
  },
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      note: {
        title: '',
        tag: '',
        body: null,
      },
    }
  },
  computed: {
    tags() {
      return this.$store.getters['tags/findAll'].map((t) => t.name)
    },
  },
  async created() {
    await this.$fire.firestore
      .collection('notes')
      .get()
      .then((querySnapshot) => {
        const _notes = []
        querySnapshot.forEach((doc) => {
          const note = doc.data()
          note.id = doc.id
          _notes.push(note)
        })
        this.note = _notes.find((note) => note.id.toString() === this.$route.params.id)
      })
  },
  methods: {
    async updateNote() {
      this.note.updatedAt = new Date()
      try {
        await this.$store.dispatch('notes/set', this.note)
        this.snackbar = true
        this.snackbarText = 'カードを更新しました'
      } catch (e) {
        this.snackbar = true
        this.snackbarText = `カードを更新できませんでした... ${e}`
      }
    },
    close() {
      this.snackbar = false
    },
  },
}
</script>
