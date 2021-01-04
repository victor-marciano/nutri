<template>
  <v-dialog
    v-model="dialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="green" light dark x-small v-on="on" v-bind="attrs" class="mx-1">
        <v-icon>mdi-clipboard-plus-outlined</v-icon>
    </v-btn>
    </template>

    <v-card>
      <v-card-title
        >Você gostaria de adicionar <b>{{ training.name }}</b> para sua lista de Plano de treinos?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cancelar</v-btn>
        <v-btn @click="addTrainingToUser">Adicionar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "../../../firebase";

export default {
  name: "TrainingActive",
  props: {
    training: Object
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    async addTrainingToUser() {
      try {
        await Promise.all([
          db
            .collection("trainings")
            .doc(this.activeTraining.uid)
            .update({ active: false })
        ]);

        this.$store.dispatch("fetchTrainings");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
