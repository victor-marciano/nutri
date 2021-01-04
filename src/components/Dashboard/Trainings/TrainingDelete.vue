<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" dark x-small color="red">
        <v-icon small>
          mdi-delete
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>Exclusão de Treino</v-card-title>
      <v-card-text>
        <p class="body-1">
          Deseja excluir completamente o plano de treino
          <b>{{ training.name }}</b>
        </p>
        <small class="text--secondart">*Essa ação é irreversível.</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Cancelar</v-btn>
        <v-btn @click="deleteTraining">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "../../../firebase";

export default {
  name: "TrainingDelete",
  props: {
    training: Object
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    async deleteTraining() {
      try {
        console.log(this.training.uid);
        await db
          .collection("trainings")
          .doc(this.training.uid)
          .delete();

        this.$emit("complete", {
          show: true,
          color: "success",
          icon: "mdi-check-circle",
          text: `${this.training.name} removido com sucesso`
        });

        this.dialog = false;
        this.$store.dispatch("fetchTrainings");
      } catch (error) {
        this.$emit("complete", {
          show: true,
          color: "error",
          icon: "mdi-close",
          text: `Falha ao remover plano de treino`
        });
      }
    }
  }
};
</script>

<style></style>
