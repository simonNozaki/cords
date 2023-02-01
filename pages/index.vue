<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="2">
        <CardList />
      </v-col>
      <v-col>
        <CreateCardForm />
      </v-col>
    </v-row>
  </v-container>
</template>
