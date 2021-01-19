<template>
  <v-dialog v-model="dialog" :width="$vuetify.breakpoint.mobile ? '' : '500px'">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" icon :disabled="diet.active">
        <v-icon>
          mdi-check-circle
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Você gostaria de trocar para {{ diet.name }}</v-card-title>
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

  mounted() {
    console.log(this.activeDiet);
  },

  methods: {
    async setActiveDiet() {
      try {
        await Promise.all([
          db
            .collection("diets")
            .doc(this.activeDiet.uid)
            .update({ active: false }),
          db
            .collection("diets")
            .doc(this.diet.uid)
            .update({ active: true })
        ]);

        this.dialog = false;

        this.$emit("complete", {
          show: true,
          color: "success",
          icon: "mdi-check-circle",
          text: `${this.diet.name} agora é a sua dieta ativa`
        });

        this.$store.dispatch("fetchDiets");
      } catch (error) {
        this.$emit("complete", {
          show: true,
          color: "error",
          icon: "mdi-close",
          text: `Falha ao trocar Dieta`
        });
      }
    }
  },

  computed: {
    ...mapGetters(["activeDiet"])
  }
};
</script>
