<template>
  <v-data-table
    :headers="headers"
    :items="trainings"
    class="elevation-0"
    :dense="$vuetify.breakpoint.mobile"
    disable-sort
    no-data-text="Você ainda não possui nenhum treino cadastrado"
    no-results-text="Nenhum resultado para sua busca"
    locale="pt-BR"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Meus Treinos</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-spacer></v-spacer>

        <v-btn color="orange darken-4" dark class="mb-2" icon>
          <v-icon>
            mdi-refresh
          </v-icon>
        </v-btn>
        <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.mobile">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="orange darken-4"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              icon
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              Novo Plano de treino
            </v-card-title>

            <v-stepper v-model="e6" vertical>
              <v-stepper-step
                color="orange darken-4"
                :complete="e6 > 1"
                step="1"
              >
                Dados primários
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      placeholder="Nome do Plano de Treino"
                      v-model="newTraining.name"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      :items="objectives"
                      label="Objetivo"
                      v-model="newTraining.objective"
                    ></v-select>
                  </v-col>

                  <v-col cols="6">
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateFormatted"
                          label="Início"
                          hint="MM/DD/YYYY"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          @blur="newTraining.start = parseDate(dateFormatted)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="newTraining.start"
                        no-title
                        @input="menu1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="6">
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateFormatted"
                          label="Término"
                          hint="MM/DD/YYYY"
                          persistent-hint
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          @blur="newTraining.finish = parseDate(dateFormatted)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="newTraining.finish"
                        no-title
                        @input="menu1 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-btn dark color="orange darken-4" @click="e6 = 2">
                  Continuar
                </v-btn>
                <v-btn text @click="dialog = false">
                  Cancelar
                </v-btn>
              </v-stepper-content>

              <v-stepper-step
                color="orange darken-4"
                :complete="e6 > 2"
                step="2"
              >
                Definição dos treinos, séries e exercicios
              </v-stepper-step>

              <v-stepper-content step="2">
                <div class="d-flex justify-space-between">
                  <p class="title">Treino</p>
                  <v-btn icon @click="addTraining">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>

                <v-expand-transition
                  v-for="(training, index) in newTraining.trainings"
                  :key="index"
                >
                  <v-container>
                    <v-row>
                      <small class="text-center"
                        >Preencha as informações deste treino</small
                      >
                      <v-col cols="12">
                        <v-select
                          label="Dia da semana"
                          :items="weekDays"
                          v-model="training.weekDay"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <div class="d-flex justify-space-between">
                          <p class="subtitle">Exercícios</p>
                          <v-btn icon x-small @click="addExercise(index)">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </div>
                        <div
                          v-for="(exercise, index) in training.exercises"
                          :key="index"
                        >
                          <v-row>
                            <v-col cols="8">
                              <v-select
                                label="Exercício"
                                :items="exercises"
                                item-text="name"
                                item-value="name"
                              ></v-select>
                            </v-col>
                            <v-col cols="4">
                              <v-select
                                label="Série/Repetições"
                                :items="series"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-expand-transition>

                <v-btn dark color="orange darken-4" @click="e6 = 3">
                  Continuar
                </v-btn>
                <v-btn text @click="e6--">
                  Voltar
                </v-btn>
              </v-stepper-content>

              <v-stepper-step
                color="orange darken-4"
                :complete="e6 > 3"
                step="3"
              >
                Prévia e finalização
              </v-stepper-step>

              <v-stepper-content step="3">
                <small
                  >Confira se está tudo certo com seu plano de treino.</small
                >
                <v-row>
                  <v-col cols="12">
                    <v-expansion-panels multiple>
                      <v-expansion-panel
                        v-for="(training, index) in newTraining.trainings"
                        :key="index"
                      >
                        <v-expansion-panel-header>{{
                          training.weekDay
                        }}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                          Some content
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                </v-row>
                <v-btn dark color="orange darken-4" @click="insertTraining">
                  Finalizar
                </v-btn>
                <v-btn text @click="e6--">
                  Voltar
                </v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <TrainingInfo :training="item"></TrainingInfo>

      <v-btn dark x-small @click="deleteTraining(item)" color="red">
        <v-icon small>
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "../../../firebase";
const TrainingInfo = () => import('@/components/Dashboard/TrainingInfo.vue')

export default {
  components: {
    TrainingInfo
  },

  data: () => ({
    dialog: false,
    dialogDelete: false,
    newTraining: {
      name: "",
      objective: "",
      start: null,
      finish: null,
      trainings: [{ weekDay: "", exercises: [] }]
    },
    objectives: [
      "Hipertrofia",
      "Emagrecimento",
      "Condicionamento",
      "Resistência"
    ],
    weekDays: [
      "Segunda Feira",
      "Terça Feira",
      "Quarta Feira",
      "Quinta Feira",
      "Sexta Feira",
      "Sábado",
      "Domingo"
    ],
    e6: 1,
    headers: [
      { text: "Nome", value: "name" },
      { text: "Objetivo", value: "objective" },
      { text: "Início", value: "start" },
      { text: "Término", value: "finish" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    desserts: [],
    series: [
      "3x10",
      "4x10",
      "Até a falha",
      "3x15",
      "5x5",
      "4x8",
      "3x8",
      "drop-set",
      "piramide"
    ],
    menu1: false,
    menu2: false
  }),

  created() {
    this.$store.dispatch("fetchExercises");
    this.$store.dispatch("fetchTrainings");
  },

  methods: {
    addTraining() {
      this.newTraining.trainings.push({ weekDay: "", exercises: [] });
    },

    addExercise(index) {
      this.newTraining.trainings[index].exercises.push({});
    },

    async insertTraining() {
      let formattedTraining = Object.assign(this.newTraining, {
        userId: this.user.uid
      });
      try {
        await db.collection("trainings").add(formattedTraining);
        this.$store.dispatch("fetchTrainings");
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTraining(item) {
      try {
        await db
          .collection("trainings")
          .doc(item.uid)
          .delete();
        this.$store.dispatch("fetchTrainings");
      } catch (error) {
        console.log(error);
      }
    }
  },

  computed: {
    ...mapGetters(["user", "trainings", "exercises"])
  }
};
</script>

<style lang="scss"></style>
