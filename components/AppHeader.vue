<template>
  <v-app-bar
    app
    class="teal lighten-4"
    flat
  >
    <v-app-bar-title> Cords </v-app-bar-title>

    <v-spacer></v-spacer>

    <template #extension>
      <v-tabs align-with-title>
        <v-tab to="/">
          カード <v-icon right> mdi-plus </v-icon>
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>
