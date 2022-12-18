<template>
  <div>
    <v-navigation-drawer app>
      <main-cards-list />
    </v-navigation-drawer>
    <v-main>
      <main-text-form />
    </v-main>
  </div>
</template>

<script>
import MainCardsList from '~/components/MainCardsList.vue'
import MainTextForm from '~/components/MainTextForm.vue'
export default {
  name: 'IndexPage',
  components: { MainCardsList, MainTextForm },
}
</script>
