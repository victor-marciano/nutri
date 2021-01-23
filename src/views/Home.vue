<template>
  <div class="home">
    <v-snackbar
      app
      elevation="10"
      rounded="xl"
      :timeout="3000"
      top
      right
      v-model="notification.show"
      :color="notification.color"
    >
      <v-icon size="24" class="mx-3">{{ notification.icon }}</v-icon>
      {{ notification.text }}
    </v-snackbar>

    <v-container fluid>
        <v-banner
          single-line
          v-model="banner"
        >
          <v-icon
            slot="icon"
            color="green lighten-2"
            size="36"
          >
            mdi-virus
          </v-icon>
          Devido a pandemia, recomendamos os treinos em casa. Cuide da sua saúde e da saúde seus entes queridos!

          <template v-slot:actions>
            <v-btn
              color="orange darken-3"
              text
              @click="banner = false"
            >
              Fechar
            </v-btn>
          </template>
        </v-banner>
      <v-row>
        <v-col cols="12" md="7" class="mx-auto">
          <p class="headline">Dietas prontas</p>
          <v-row>
            <v-col
              cols="12"
              md="6"
              v-for="(diet, index) in systemDiets"
              :key="index"
            >
              <DietCard :diet="diet"></DietCard>
            </v-col>
          </v-row>

          <v-divider class="py-3"></v-divider>

          <p class="headline">Fichas de treino prontas</p>

          <v-row>
            <v-col
              cols="12"
              md="4"
              v-for="(training, index) in systemTrainings"
              :key="index"
            >
              <TrainingCard :training="training"></TrainingCard>
            </v-col>
          </v-row>
        </v-col>

        <v-divider class="px-2" vertical></v-divider>

        <v-col cols="12" md="4">
          <v-row>
            <v-col cols="12">
              <ActiveDietCard></ActiveDietCard>
            </v-col>
            <v-col cols="12">
              <ActiveTrainingCard></ActiveTrainingCard>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const ActiveTrainingCard = () =>
  import("@/components/Dashboard/Trainings/ActiveTrainingCard.vue");
const ActiveDietCard = () =>
  import("@/components/Dashboard/Diets/ActiveDietCard.vue");
const DietCard = () => import("@/components/Dashboard/Diets/DietCard.vue");
const TrainingCard = () =>
  import("@/components/Dashboard/Trainings/TrainingCard.vue");

export default {
  name: "Home",
  components: {
    DietCard,
    TrainingCard,
    ActiveTrainingCard,
    ActiveDietCard
  },

  data: () => ({
    notification: {
      text: "",
      show: false,
      icon: "",
      color: ""
    },
    banner: true
  }),

  methods: {
    showNotification(v) {
      this.notification = v;
    }
  },

  computed: {
    ...mapGetters(["user", "systemDiets", "systemTrainings", "activeTraining"])
  }
};
</script>
