<template>
  <v-main>
    <v-container>
      <v-row
        no-gutters
      >
        <v-col cols="3">
          <v-card>
            <MainCardsList />
          </v-card>
        </v-col>
        <v-col>
          <main-text-form />
        </v-col>
        <v-col cols="auto">
          <MainTagDialog />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import MainTextForm from '~/components/MainTextForm.vue'
export default {
  name: 'IndexPage',
  components: { MainTextForm },
}
</script>
