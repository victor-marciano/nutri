<template>
  <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.mobile" width="500px">
      <template v-slot:activator="{ on, attrs}">
          <v-btn v-on="on" v-bind="attrs" icon color="orange darken-4" class="mb-2">
              <v-icon>
                  mdi-lightbulb-on
              </v-icon>
          </v-btn>
      </template>

            <v-card :loading="loading"> 
                <template v-slot:progress>
                    <v-overlay absolute :value="loading" :opacity="0.9">
                        <div>
                            <v-progress-circular size="75" color="green lighten-2" indeterminate>
                                <span>Gerando</span>
                            </v-progress-circular>
                        </div>
                    </v-overlay>
                </template>
                <v-card-title>Gerador de treinos</v-card-title>
                <v-card-subtitle>
                    Responda algumas perguntas e geraremos uma recomendação de treino para você em alguns segundos!
                </v-card-subtitle>

                <v-fab-transition>

                    <v-card-text v-if="page == 1">
                        <v-row>
                            <v-col cols="12">

                                <p>Quantas vezes você pode treinar na semana?</p>
                                <v-slider
                                    v-model="dayTraining"
                                    :max="6"
                                    :tick-labels="[1,2,3,4,5,6,7]"
                                    class="mx-5"
                                    thumb-color="green lighten-2"
                                    color="green lighten-2"
                                    track-color="green lighten-2"
                                    dense
                                    
                                    ></v-slider>
                                    <v-radio-group :row="!$vuetify.breakpoint.mobile" v-model="gender" label="Qual seu gênero de nascença?" mandatory dense>
                                        <v-radio  label="Masculino" value="Masculino"></v-radio>
                                        <v-radio label="Feminino" value="Feminino"></v-radio>
                                    </v-radio-group>
                                <v-select v-model="objective" :items="['Hipertrofia', 'Emagrecimento', 'Condicionamento', 'Resistência']" label="Qual seu objetivo?"></v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-fab-transition>

                    <v-fade-transition>
                        <v-card-text v-if="page == 2">
                            <TrainingCard :training="recommendedTraining"></TrainingCard>
                        </v-card-text>
                    </v-fade-transition>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <div v-if="page == 1">
                        <v-btn text @click="dialog = false">Cancelar</v-btn>
                        <v-btn text @click="generateTraining">Gerar treino</v-btn>
                    </div>
                    <div v-else>
                        
                        <v-btn text @click="page = 1">Refazer</v-btn>
                        <v-btn text @click="generateTraining">Adicionar</v-btn>
                    </div>
                </v-card-actions>
            </v-card>
  </v-dialog>
</template>

<script>
import { db } from "../../../firebase";
const TrainingCard = () => import("@/components/Dashboard/Trainings/TrainingCard.vue")

export default {
    name: 'TrainingGenerator',
    components: {
        TrainingCard
    },

    data: () => ({
        loading: false,
        dialog: false,
        page: 1,
        gender: null,
        objective: '',
        dayTraining: 0,
        newTraining: {},
        recommendedTraining: {}
    }),

    methods: {
        async generateTraining() {
            try {
                const trainingRef = db.collection("trainings")
                trainingRef.where("gender", "in", [this.gender])
                trainingRef.where("objective", "==", this.objective)
                const result = await trainingRef.get()
                
                let trainings = []
                result.forEach(training => {
                    trainings.push(training.data())
                })
                
                this.recommendedTraining = trainings[trainings.length * Math.random() | 0]
                this.loading = true
                
                setTimeout(() => {
                    this.page++
                }, 2000)

                setTimeout(() => {
                    this.loading = false
                }, 3000)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>

</style>