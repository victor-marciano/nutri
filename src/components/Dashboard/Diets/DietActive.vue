<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.mobile"
    width="500px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-on="on"
        v-bind="attrs"
        dark
        x-small
        color="success"
        class="mx-1"
        :disabled="diet.active"
      >
        <v-icon small>
          mdi-check-circle
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title
        >Você gostaria de trocar para {{ diet.name }}</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Não</v-btn>
        <v-btn @click="setActiveDiet">Sim</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
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
    async setActiveDiet() {
      try {
        await Promise.all([
          db
            .collection("diets")
            .doc(this.activediet.uid)
            .update({ active: false }),
          db
            .collection("diets")
            .doc(this.diet.uid)
            .update({ active: true })
        ]);

        this.$store.dispatch("fetchDiets");
      } catch (error) {
        console.log(error);
      }
    }
  },

  computed: {
    ...mapGetters(["activeDiet"])
  }
};
</script>