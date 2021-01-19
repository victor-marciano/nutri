<template>
  <v-dialog v-model="dialog" :width="$vuetify.breakpoint.mobile ? '' : '500px'">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" icon>
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Exclusão de Dieta</v-card-title>
      <v-card-text>
        <p class="body-1">
          Deseja excluir completamente a dieta
          <b>{{ diet.name }}</b>
        </p>
        <small class="text--secondart">*Essa ação é irreversível.</small>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="dialog = false">Cancelar</v-btn>
        <v-btn @click="deleteDiet">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { db } from "../../../firebase";

export default {
  name: "DietDelete",
  props: {
    diet: Object
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    async deleteDiet() {
      try {
        await db
          .collection("diets")
          .doc(this.diet.uid)
          .delete();

        this.$emit("complete", {
          show: true,
          color: "success",
          icon: "mdi-check-circle",
          text: `${this.diet.name} removido com sucesso`
        });

        this.dialog = false;
        this.$store.dispatch("fetchDiets");
      } catch (error) {
        this.$emit("complete", {
          show: true,
          color: "error",
          icon: "mdi-close",
          text: `Falha ao remover Dieta`
        });
      }
    }
  }
};
</script>

<style></style>
