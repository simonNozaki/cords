<template>
  <div>
    <!-- TODO トップページと編集ページでドロアーも共通化  -->
    <v-navigation-drawer
      app
    >
      <main-cards-list></main-cards-list>
    </v-navigation-drawer>
    <v-main>
      <div
        class="ma-2"
      >
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
      </div>
    </v-main>
  </div>
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
