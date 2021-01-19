<template>
  <v-menu
    top
    :offset-y="true"
    :open-on-hover="!$vuetify.breakpoint.mobile"
    v-model="menu"
    z-index="9999"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="green lighten-2" v-bind="attrs" v-on="on" text>
        Avalie
      </v-btn>
    </template>

    <v-rating
      dense
      half-increments
      v-model="rating"
      large
      background-color="orange darken-3"
      color="orange darken-3"
      :value="diet.rate"
      @input="rateDiet"
    >
    </v-rating>
  </v-menu>
</template>

<script>
import { db } from '../../../firebase'
import firebase from "firebase/app"

export default {
  name: "DietRate",

props: {
    diet: Object
},

  data: () => ({
    menu: false,
    rating: 0
  }),

  methods: {
      async rateDiet() {
          try {
              const increment = firebase.firestore.FieldValue.increment(1);
              await db.collection("diets").doc(this.diet.uid).update({
                  rate: this.rating,
                  votes: increment
              })

              this.$store.dispatch('fetchDiets')
          } catch (error) {
              console.log(error)
          }
      }
  }
};
</script>

<style></style>
