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
            <v-card-title
              class="text-lg-h2"
            >
              {{ note.title }}
            </v-card-title>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon> mdi-tag-outline </v-icon> tag: 
                    <v-chip
                      label
                      class="ma-1"
                    >
                      {{ note.tag }}
                    </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon> mdi-clock-outline </v-icon> updated at:
                    <v-chip
                      label
                      class="ma-1"
                    >
                      {{ note.updatedAt }}
                    </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-card
              outlined
              flat
              min-height="300"
            >
              <p
                style="white-space: pre-wrap;"
                class="note-body-font"
              >
                {{ note.body }}
              </p>
            </v-card>
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
    this.$store.state.notes.list.forEach(l => console.log(l.body));
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

<style scoped>
.note-body-font {
  font-family: Consolas, monaco, monospace;
}
</style>
