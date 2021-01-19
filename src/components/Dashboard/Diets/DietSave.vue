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
        >Você gostaria de adicionar a {{ diet.name }} para sua lista de
        dietas?</v-card-title
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
import { db, auth } from "../../../firebase";
import moment from "../../../date";

export default {
  name: "dietActive",
  props: {
    diet: Object
  },

  data: () => ({
    dialog: false,
    newDiet: {}
  }),

  created() {
    this.newDiet = {
      name: this.diet.name,
      objective: this.diet.objective,
      start: moment().format("DD/MM/YYYY"),
      finish: moment()
        .add(1, "month")
        .format("DD/MM/YYYY"),
      meals: this.diet.meals,
      userId: auth.currentUser.uid
    };
  },

  methods: {
    async addDietToUser() {
      try {
        await db.collection("diets").add(this.newDiet);

        this.$emit("complete", {
          show: true,
          color: "success",
          icon: "mdi-check-circle",
          text: `${this.newDiet.name} adicionado com sucesso`
        });

        this.dialog = false;

        this.$store.dispatch("fetchDiets");
      } catch (error) {
        this.$emit("complete", {
          show: true,
          color: "error",
          icon: "mdi-close",
          text: `Falha ao adicionar Dieta`
        });
      }
    }    
  }
};
</script>
