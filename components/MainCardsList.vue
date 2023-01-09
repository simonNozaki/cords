<template>
  <v-card flat class="grey lighten-5">
    <v-btn text small outlined color="amber darken-4" to="/">
      <v-icon> mdi-plus </v-icon> 新しいカード
    </v-btn>
    <v-select
      :items="tags.map(t => t.name)"
      item-color="amber darken-4"
      multiple
      small
      chips
      flat
      dense
      label="フィルタ"
      @change="findByTags"
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
      listNotes: this.$store.getters['notes/findAll'],
    }
  },
  computed: {
    notes: {
      get: function() {
        return this.$store.getters['notes/findAll']
      },
      set: function(notes) {
        this.listNotes = notes
      }
    },
    tags() {
      return this.$store.getters['tags/findAll']
    }
  },
  created() {
    this.$store.dispatch('tags/fetchAll')
    this.$store.dispatch('notes/fetchAll')
  },
  methods: {
    deleteNote(id) {
      this.$store.dispatch('notes/delete', id)

      this.cardDeleteDialog = false
    },
    findByTags(event) {
      // eventが配列形式になっているのでそのまま渡してOK
      // 存在判定だけなので集合に変えて要素の存在判定のみ(tagsのstate自体集合にしていいかも)
      const filteringTags = new Set(event)
      // フィルタしない場合は全部持ってくる
      if (filteringTags.size === 0) {
        this.notes = this.$store.getters['notes/findAll']
      } else {
        const filteredNotes = this.$store.getters['notes/findAll'].filter((note) => filteringTags.has(note.tag))
        this.notes = filteredNotes
      }
    }
  },
}
</script>

<style scoped>
.force-size {
  overflow-y: auto;
}
</style>
