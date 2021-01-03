<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-title class="headline">
              Sua dieta atual
            </v-card-title>

            <v-card-subtitle
              >Você não possui nenhuma dieta ativa, crie ja a
              sua!</v-card-subtitle
            >

            <v-card-actions>
              <v-btn text>
                Criar dieta
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-title class="headline">
              Seu treino atual
            </v-card-title>

            <div v-if="!activeTraining">
              <v-card-subtitle>
                Você não possui nenhuma dieta ativa, crie ja a sua!
              </v-card-subtitle>

              <v-card-actions>
                <v-btn text>
                  Criar dieta
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
        <v-col cols="6" md="3" v-for="(diet, index) in diets" :key="index">
          <v-card>
            <v-img
              :src="'https://cdn.vuetifyjs.com/images/cards/road.jpg'"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="150px"
            >
              <v-card-title>{{ diet.name }}</v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <DietInfo :diet="diet" system></DietInfo>

              <v-btn icon>
                <v-icon>mdi-book-plus-multiple-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="py-3"></v-divider>

      <p class="headline">Treinos populares</p>

      <v-row>
        <v-col
          cols="6"
          md="3"
          v-for="(training, index) in trainings"
          :key="index"
        >
          <v-card>
            <v-img
              :src="'https://cdn.vuetifyjs.com/images/cards/road.jpg'"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="150px"
            >
              <v-card-title>{{ training.name }}</v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <TrainingInfo :training="training" system></TrainingInfo>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const DietInfo = () => import("@/components/Dashboard/DietInfo.vue");
const TrainingInfo = () => import("@/components/Dashboard/TrainingInfo.vue");

export default {
  name: "Home",
  components: {
    DietInfo,
    TrainingInfo
  },

  computed: {
    ...mapGetters(["user", "diets", "trainings", "activeTraining"])
  }
};
</script>
