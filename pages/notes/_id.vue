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
          <MainEditForm />
        </v-col>
        <v-col cols="auto">
          <MainTagDialog />
        </v-col>
      </v-row>
    </v-container>
</template>
