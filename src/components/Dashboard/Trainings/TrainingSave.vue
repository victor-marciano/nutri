<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="green"
        light
        dark
        x-small
        v-on="on"
        v-bind="attrs"
        class="mx-1"
      >
        <v-icon>mdi-clipboard-plus-outlined</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title
        >Você gostaria de adicionar <b>{{ training.name }}</b> para sua lista de
        Plano de treinos?</v-card-title
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
import { db, auth } from "../../../firebase";
import moment from "../../../date";

export default {
  name: "TrainingSave",
  props: {
    training: Object
  },

  data: () => ({
    dialog: false,
    newTraining: {}
  }),

  created(){
    this.newTraining = {
      name: this.training.name,
      objective: this.training.objective,
      start: moment().format('DD/MM/YYYY'),
      finish: moment().add(1, 'month').format('DD/MM/YYYY'),
      trainings: this.training.trainings,
      userId: auth.currentUser.uid
    }
  },

  methods: {
    async addTrainingToUser() {
      try {
        await db.collection("trainings").add(this.newTraining)

        this.$emit("complete", {
          show: true,
          color: "success",
          icon: "mdi-check-circle",
          text: `${this.newTraining.name} adicionado com sucesso`
        });

        this.dialog = false;

        this.$store.dispatch("fetchTrainings");
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
