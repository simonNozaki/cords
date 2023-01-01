<template>
  <v-app-bar app class="brown lighten-5" flat>
    <v-app-bar-title> Cords </v-app-bar-title>

    <v-spacer></v-spacer>

    <template #extension>
      <v-tabs
        align-with-title
        slider-color="amber darken-4"
        color="amber darken-4"
      >
        <v-tab to="/"> <v-icon> mdi-plus </v-icon> 新しいカード </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>
