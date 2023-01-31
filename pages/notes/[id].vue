<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="2">
        <MainCardsList />
      </v-col>
      <v-col>
        <EditCardForm />
      </v-col>
    </v-row>
  </v-container>
</template>
