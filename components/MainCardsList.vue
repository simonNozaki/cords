<template>
  <v-list
    dense
    nav
    min-height="536"
    rounded
  >
    <v-list-item
      v-for="note in notes"
      :key="note.id"
      link
    >
      <v-list-item-content>
        <v-card
          class="pa-1"
          outlined
        >
          <v-list-item-title
            class="text-subtitle-1 ma-1"
          >
            <nuxt-link :to="`/notes/${note.id}`"> {{ note.title }} </nuxt-link>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip
              class="ma-1 text-caption"
              label
            >
              {{ note.label ? note.label : 'なし' }}
            </v-chip>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-chip
              class="ma-1 text-caption"
              label
            >
              <v-icon left> mdi-clock-time-eight-outline </v-icon>
              {{ note.updatedAt }}
            </v-chip>
          </v-list-item-subtitle>
        </v-card>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      notes: this.$store.state.notes.list,
    }
  },
}
</script>
