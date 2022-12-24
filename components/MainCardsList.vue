<template>
  <v-list
    dense
    nav
    height="536"
    class="force-size"
  >
    <v-list-item
      v-for="note in notes"
      :key="note.id"
    >
      <v-list-item-content>
        <v-card
          class="pa-1"
          outlined
        >
          <v-list-item-title>
            <nuxt-link
              :to="`/notes/${note.id}`"
              class="ma-2 text-md-body-1 text-decoration-none"
            >
              {{ note.title }}
            </nuxt-link>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip
              class="ma-1 text-caption"
              label 
            >
              {{ note.tag }}
            </v-chip>
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-chip
              class="ma-1 text-caption"
              label
            >
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

<style scoped>
.force-size {
  overflow-y: auto;
}
</style>
