<template>
  <v-card rounded="xl" elevation="4" class="text-center">
    <v-card-title class="headline">
      Seu treino atual
      <v-spacer></v-spacer>
      <span class="text--secondary body-2" v-if="activeTraining">{{ activeTraining.name }}</span>
    </v-card-title>

    <div v-if="!activeTraining">
      <v-card-text>
        Você não possui nenhuma plano de treino ativo, crie ja o seu!
      </v-card-text>

      <v-card-actions>
        <v-btn text to="/dashboard/treinos">
          Criar Plano de treino
        </v-btn>
      </v-card-actions>
    </div>

    <div v-else>

      <v-card-text v-if="todayTraining">
        <p class="text-center"> Treino de hoje - {{ todayTraining.weekDay }}</p>

        <v-list-item
          v-for="exercise in todayTraining.exercises"
          :key="exercise.name"
          dense
        >
          <v-list-item-icon>
            <v-icon>mdi-dumbbell</v-icon>
          </v-list-item-icon>

          <v-list-item-title>{{ exercise.name }}</v-list-item-title>

          <v-list-item-subtitle class="text-right">
            {{ exercise.series }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-card-text>

      <v-card-text v-else>
        <v-img contain :aspect-ratio="7/3" class="mb-5" :src="require('@/assets/001-bedroom.svg')"></v-img>
        <p class="text--secondary">Hoje você não treina. Dia de descansar!</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-icon>
          mdi-clock
        </v-icon>
        <small class="text--secondary mx-2"
          >Plano de treino se encerra {{ activeTraining.remaining }}</small
        >
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ActiveTrainingCard",

  data: () => ({
    weekDay: [
      "Domingo",
      "Segunda Feira",
      "Terça Feira",
      "Quarta Feira",
      "Quinta Feira",
      "Sexta Feira",
      "Sábado"
    ]
  }),

  computed: {
    ...mapGetters(["activeTraining"]),

    todayTraining() {
      return this.activeTraining.trainings.find(
        training => training.weekDay === this.weekDay[new Date().getDay()]
      );
    }
  }
};
</script>

<style></style>
