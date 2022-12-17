<template>
  <form v-on:submit.prevent="addNote">
    <v-text-field
      v-model="title"
      label="タイトルを挿入..."
    >
    </v-text-field>
    <v-textarea
      v-model="body"
      auto-grow
    >
    </v-textarea>
    <v-btn
      type="submit"
      elevation="2"
      color="blue-grey"
    >
      更新する
    </v-btn>
  </form>
</template>

<script>
export default {
  methods: {
    addNote(e) {
      console.log(e);
      this.$store.commit('notes/add', e.target.value);
      e.target.value = '';
    }
  }
}
</script>
