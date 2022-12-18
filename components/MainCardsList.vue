<template>
  <v-list
    dense
    nav
  >
    <v-list-item
      v-for="note in notes"
      :key="note.id"
      link
    >
      <v-list-item-content>
        <v-card
          class="pa-1"
        >
          <v-list-item-title
            class="text-subtitle-1"
          >
            <nuxt-link to="{ id: { note.id } }"> {{ note.title }} </nuxt-link>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip
              class="ma-1 text-caption"
              label
            >
              {{ note.label }}
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
  computed: {
    notes() {
      return this.$store.state.notes.list;
    }
  }
}
</script>
