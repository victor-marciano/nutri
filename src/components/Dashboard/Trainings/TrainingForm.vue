<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.mobile"
    :width="$vuetify.breakpoint.mobile ? '100%' : '500px'"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-tooltip open-on-hover activator="#btnPlusTraining">
        <span>Novo treino</span>
      </v-tooltip>
      <v-btn
        color="orange darken-4"
        dark
        class="mb-2"
        v-bind="attrs"
        v-on="on"
        icon
        id="btnPlusTraining"
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
        <v-stepper-step color="orange darken-4" :complete="e6 > 1" step="1">
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
                    :value="formatedStartDate"
                    label="Início"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="newTraining.start"
                  no-title
                  @change="menu1 = false"
                  locale="pt-br"
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
                    :value="formatedFinishDate"
                    label="Término"
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="newTraining.finish"
                  no-title
                  @change="menu2 = false"
                  locale="pt-br"
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

        <v-stepper-step color="orange darken-4" :complete="e6 > 2" step="2">
          Definição dos treinos, séries e exercicios
        </v-stepper-step>

        <v-stepper-content step="2">

          <v-expand-transition
            v-for="(training, index) in newTraining.trainings"
            :key="index"
          >
            <v-container>
              <v-row>
                <div class="d-flex justify-space-between">
                  <p class="mr-5">Preencha as informações deste treino</p>

                  <div>
                    <v-btn icon @click="addTraining">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                    <v-btn icon @click="removeTraining(index)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                </div>
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
                  </div>
                  <div
                    v-for="(exercise, exerciseIndex) in training.exercises"
                    :key="exerciseIndex"
                  >
                    <v-row>
                      <v-col cols="6">
                        <v-select
                          v-model="exercise.name"
                          label="Exercício"
                          :items="exercises"
                          item-text="name"
                          item-value="name"
                        ></v-select>
                      </v-col>
                      <v-col cols="4">
                        <v-select
                          v-model="exercise.series"
                          label="Série/Repetições"
                          :items="series"
                        ></v-select>
                      </v-col>
                      <v-col cols="1" class="d-inline-flex my-auto">
                          <v-btn icon x-small @click="addExercise(index)">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                          <v-btn icon x-small @click="removeExercise(index, exerciseIndex)">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
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

        <v-stepper-step color="orange darken-4" :complete="e6 > 3" step="3">
          Prévia e finalização
        </v-stepper-step>

        <v-stepper-content step="3">
          <small>Confira se está tudo certo com seu plano de treino.</small>
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
</template>

<script>
import { mapGetters } from "vuex";
import moment from "../../../date";
import { db, auth } from "../../../firebase";

export default {
  name: "TrainingForm",
  data: () => ({
    dialog: false,
    startDate: null,
    finishDate: null,
    newTraining: {
      name: "",
      objective: "",
      start: null,
      finish: null,
      trainings: [{ weekDay: "", exercises: [{ name: "", series: "" }] }]
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

  methods: {
    addTraining() {
      this.newTraining.trainings.push({ weekDay: "", exercises: [] });
    },

    addExercise(index) {
      this.newTraining.trainings[index].exercises.push({});
    },
    
    removeTraining(index) {
      this.newTraining.trainings.splice(index, 1);
    },

    removeExercise(index, exerciseIndex) {
      this.newTraining.trainings[index].exercises.splice(exerciseIndex, 1);
    },

    async insertTraining() {
      let formattedTraining = Object.assign(this.newTraining, {
        userId: auth.currentUser.uid
      });
      try {
        const createdTraining = await db
          .collection("trainings")
          .add(formattedTraining);

        if (this.userTrainings.length === 0) {
          db.collection("trainings")
            .doc(createdTraining.id)
            .update({ active: true });
        }

        this.$emit("submited", {
          show: true,
          color: "success",
          icon: "mdi-check-circle",
          text: `${this.newTraining.name} criado com sucesso`
        });

        this.dialog = false;

        this.$store.dispatch("fetchTrainings");
      } catch (error) {
        this.$emit("submited", {
          show: true,
          color: "error",
          icon: "mdi-close",
          text: `Erro ao criar treino`
        });
      }
    }
  },

  computed: {
    ...mapGetters(["exercises", "userTrainings"]),

    formatedStartDate() {
      return this.newTraining.start
        ? moment(this.newTraining.start).format("DD/MM/YYYY")
        : null;
    },

    formatedFinishDate() {
      return this.newTraining.finish
        ? moment(this.newTraining.finish).format("DD/MM/YYYY")
        : null;
    }
  }
};
</script>

<style></style>
