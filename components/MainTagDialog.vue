<template>
  <v-dialog
    v-model="sheet"
    max-width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        elevation="2"
        color="secondary"
        class="white--text justify-centermx-auto ma-3"
        v-bind="attrs"
        v-on="on"
      >
        タグ
        <v-icon right> mdi-plus </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-btn
        class="ma-6"
        text
        @click="sheet = !sheet"
      >
        <v-icon> mdi-window-close </v-icon>
      </v-btn>
      <v-card-text
        class="text-center"
      >
        タグを追加します
      </v-card-text>

      <v-container>
        <v-row>
          <v-col>
            <v-form
              class="text-center"
            >
              <v-text-field
                v-model="newTag"
                outlined
                class=""
              >
              </v-text-field>
              <v-btn
                elevation="2"
                color="primary"
                class="white--text justify-center mx-auto ma-5"
                @click="addTag"
              >
                保存する
                <v-icon right> mdi-pencil </v-icon>
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      sheet: false,
      newTag: '',
    };
  },
  computed: {
    notes() {
      return this.$store.state.tags.list;
    }
  },
  methods: {
    addTag(event) {
      this.$store.commit('tags/add', this.newTag);
    }
  }
}
</script>
