<template>
  <v-card flat class="grey lighten-5">
    <v-btn text small outlined color="amber darken-4" to="/">
      <v-icon> mdi-plus </v-icon> 新しいカード
    </v-btn>
    <v-select
      v-model="filterTags"
      :items="tags.map(t => t.name)"
      item-color="amber darken-4"
      multiple
      small
      chips
      label="フィルタ"
      @change="filterByTags"
    >
    </v-select>
    <v-list dense height="536" class="grey lighten-5 force-size">
      <v-list-item v-for="note in notes" :key="note.id">
        <v-list-item-content>
          <v-card class="pa-1 ma-0" outlined>
            <v-tooltip top>
              <template #activator="{ on, attrs }">
                <v-list-item-title
                  v-bind="attrs"
                  v-on="on"
                >
                  <nuxt-link
                    :to="`/notes/${note.id}`"
                    class="ma-2 text-md-body-1 text-decoration-none"
                  >
                    {{ note.title }}
                  </nuxt-link>
                </v-list-item-title>
              </template>
              <span> {{ note.title }} </span>
            </v-tooltip>
            <v-list-item-subtitle>
              <v-chip class="ma-1 text-caption" label>
                {{ note.tag }}
              </v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-chip class="ma-1 text-caption" label>
                {{ note.updatedAt }}
              </v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <DeleteCardDialog :note-id="note.id" />
            </v-list-item-subtitle>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      filterTags: [],
      // 表示用に柔軟にフィルタしたりする
      notesDisplayed: []
    }
  },
  computed: {
    notes() {
      return this.$store.state.notes.list
    },
    tags() {
      return this.$store.state.tags.list
    }
  },
  created() {
    this.$store.dispatch('tags/fetchAll')
    this.$store.state.notes.list.forEach((note) => this.notesDisplayed.push(note))
  },
  methods: {
    deleteNote(id) {
      this.$store.dispatch('notes/delete', id)

      this.cardDeleteDialog = false
    },
    filterByTags(event) {
      console.log(event.length, event[0])
    }
  },
}
</script>

<style scoped>
.force-size {
  overflow-y: auto;
}
</style>
