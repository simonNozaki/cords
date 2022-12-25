<template>
    <v-container fluid>
      <v-row
        no-gutters
      >
        <v-col cols="2">
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
</template>

<script>
import MainTextForm from '~/components/MainTextForm.vue'
export default {
  name: 'IndexPage',
  components: { MainTextForm },
}
</script>
