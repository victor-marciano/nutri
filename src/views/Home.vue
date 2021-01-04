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

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
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
        </v-col>
        <v-col cols="12" md="6">
          <v-card rounded="xl">
            <v-card-title class="headline">
              Seu treino atual
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
              <v-card-text>
                <p v-text="activeTraining.name"></p>
                <p></p>
                <p></p>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-icon>
                  mdi-clock
                </v-icon>
                <small class="text--secondary mx-2"
                  >Plano de treino se encerra
                  {{ activeTraining.remaining }}</small
                >
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="py-3"></v-divider>

      <p class="headline">Dietas populares</p>

      <v-row>
        <v-col cols="12" md="4" v-for="(diet, index) in diets" :key="index">
          <v-card rounded="xl" outlined>
            <v-card-title class="text-center">{{ diet.name }}</v-card-title>

            <v-card-text>
              <div class="d-flex justify-space-around">
                <p class="text--secondary">Objetivo</p>
                <span class="text--secondary"><b>Objetivo</b></span>
              </div>
              <div class="d-flex justify-space-around">
                <p class="text--secondary">Calorias</p>
                <span class="text--secondary"><b>Calorias</b></span>
              </div>
              <div class="d-flex justify-space-around">
                <p class="text--secondary">Peso recomendado</p>
                <span class="text--secondary"><b>Peso recomendado</b></span>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <DietInfo :diet="diet" system></DietInfo>
              <DietSave :diet="diet"></DietSave>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="py-3"></v-divider>

      <p class="headline">Treinos populares</p>

      <v-row>
        <v-col
          cols="12"
          md="4"
          v-for="(training, index) in systemTrainings"
          :key="index"
        >
          <v-card rounded="xl">
            <v-card-title>{{ training.name }}</v-card-title>

            <v-card-text>
              <v-chip class="ma-2" ripple>
                <v-avatar left color="black">{{
                  training.trainings.length
                }}</v-avatar>
                Treinos por semana
              </v-chip>
              <v-chip ripple class="ma-2">
                Treino {{ training.gender || "Unissex" }}
              </v-chip>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <TrainingInfo :training="training" system></TrainingInfo>
              <TrainingSave
                :training="training"
                @complete="showNotification"
              ></TrainingSave>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const DietInfo = () => import("@/components/Dashboard/Diets/DietInfo.vue");
const DietSave = () => import("@/components/Dashboard/Diets/DietSave.vue");
const TrainingInfo = () =>
  import("@/components/Dashboard/Trainings/TrainingInfo.vue");
const TrainingSave = () =>
  import("@/components/Dashboard/Trainings/TrainingSave.vue");

export default {
  name: "Home",
  components: {
    DietInfo,
    DietSave,
    TrainingInfo,
    TrainingSave
  },

  data: () => ({
    notification: {
      text: "",
      show: false,
      icon: "",
      color: ""
    }
  }),

  methods: {
    showNotification(v) {
      this.notification = v;
    }
  },

  computed: {
    ...mapGetters(["user", "diets", "systemTrainings", "activeTraining"])
  }
};
</script>
