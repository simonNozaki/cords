<template>
  <v-app-bar app>    
    <v-app-bar-title> Cords </v-app-bar-title>

    <v-spacer></v-spacer>

    <template #extension>
      <v-tabs align-with-title>
        <v-tab to="/">
          <v-icon left> mdi-plus </v-icon> カードを追加する
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>
