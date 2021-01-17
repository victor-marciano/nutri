<template>
  <v-card rounded="xl" elevation="4" class="text-center">
      <v-card-title class="headline">
        Sua dieta atual
      </v-card-title>

      <div v-if="!activeDiet">
        <v-card-text class="d-flex justify-center">
          <div>
            <v-img contain :aspect-ratio="7/3" class="mb-5" :src="require('@/assets/002-browsers.png')"></v-img>
            <p class="text--secondary">Você não possui nenhuma dieta ativa, crie ja a sua!</p>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text to="/dashboard/dietas">
            Criar dieta
          </v-btn>
        </v-card-actions>
      </div>

      <div v-else>
        <v-card-text>
          <h5>Próxima refeição</h5>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-icon>
            mdi-clock
          </v-icon>
          <small class="text--secondary mx-2"
            >Esta dieta se encerra {{ activeDiet.remaining }}</small
          >
        </v-card-actions>
      </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ActiveDietCard",

  computed: {
    ...mapGetters(["activeDiet"]),

    nextMeal() {
      return 1;
    }
  }
};
</script>

<style></style>
