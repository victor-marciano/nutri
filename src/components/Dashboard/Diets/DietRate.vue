<template>
  <v-menu
      top
      :offset-y="1"
      :open-on-hover="!$vuetify.breakpoint.mobile"
      v-model="menu"
      z-index="9999"
      :close-on-content-click="false"
      
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="green lighten-2"
          v-bind="attrs"
          v-on="on"
          text
        >
          Avalie 
        </v-btn>
      </template>
      
      <v-rating dense half-increments v-model="rating" large background-color="orange darken-3" color="orange darken-3">

      </v-rating>
  </v-menu>
</template>

<script>
export default {
    name: 'DietRate',

    data: () => ({
        menu: false
    })
}
</script>

<style>

</style>