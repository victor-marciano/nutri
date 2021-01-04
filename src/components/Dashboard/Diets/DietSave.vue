<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.mobile"
    width="500px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-on="on" v-bind="attrs">
    <v-icon>mdi-book-plus-multiple-outline</v-icon>
    </v-btn>
    </template>

    <v-card>
      <v-card-title
        >Você gostaria de adicionar a {{ diet.name }} para sua lista de dietas?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cancelar</v-btn>
        <v-btn @click="addDietToUser">Adicionar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "../../../firebase";

export default {
  name: "dietActive",
  props: {
    diet: Object
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    async addDietToUser() {
      try {
        await Promise.all([
          db
            .collection("diets")
            .doc(this.activediet.uid)
            .update({ active: false })
        ]);

        this.$store.dispatch("fetchDiets");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>