<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-card>
            <MainCardsList />
          </v-card>
        </v-col>
        <v-col>
          <v-card
          flat
        >
          <v-card-title>
            {{ note.title }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            {{ note.body }}
          </v-card-text>
        </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import MainCardsList from '~/components/MainCardsList.vue';
export default {
  components: { MainCardsList },
  data() {
    return {
      id: this.$route.params.id,
      notes: this.$store.state.notes.list,
      snackBar: false,
      snackBarText: '',
    }
  },
  computed: {
    // 参照 -> 更新とできるように、算出プロパティ化しておく
    note() {
      const n = this.notes.find((note) => (note.id).toString() === this.id);
      if (!n) {
        throw new Error('Note not found.');
      }
      return n;
    }
  }
}
</script>
