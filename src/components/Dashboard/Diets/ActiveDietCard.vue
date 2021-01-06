<template>
  <v-card rounded="xl">
    <v-card-title class="headline">
      Sua dieta atual
    </v-card-title>

    <v-card-text
      >Você não possui nenhuma dieta ativa, crie ja a sua!</v-card-text
    >

    <v-card-actions>
      <v-btn text to="/dashboard/dietas">
        Criar dieta
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ActiveDietCard",

  computed: {
    ...mapGetters(["activeDiet"])
  }
};
</script>

<style></style>
