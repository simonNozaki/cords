<template>
  <v-list>
    <v-list-item
      v-for="note in notes"
      :key="note.id"
    >
      <v-card>
        <v-card-title> {{ note.title }} </v-card-title>
        <v-chip class="ma-2"> {{ note.label }} </v-chip>  
      </v-card>
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
