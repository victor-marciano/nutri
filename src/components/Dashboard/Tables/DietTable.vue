<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-0"
    :dense="$vuetify.breakpoint.mobile"
    no-data-text="Você não possui nenhuma dieta cadastrada"
    no-results-text="Nenhum resultado para a sua busca"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Minhas dietas</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-spacer></v-spacer>

        <v-tooltip open-on-hover activator="#btnDietRefresh">
          <span>Atualizar</span>
        </v-tooltip>

        <v-btn
          id="btnDietRefresh"
          color="orange darken-4"
          dark
          class="mb-2"
          icon
        >
          <v-icon>
            mdi-refresh
          </v-icon>
        </v-btn>
        <v-dialog
          v-model="dialog"
          :width="$vuetify.breakpoint.mobile ? '100%' : '500px'"
          :fullscreen="$vuetify.breakpoint.mobile"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-tooltip open-on-hover activator="#btnNewDiet">
              <span>Nova dieta</span>
            </v-tooltip>

            <v-btn
              color="orange darken-4"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              icon
              id="btnNewDiet"
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              Nova Dieta
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
                      placeholder="Nome da Dieta"
                      v-model="newDiet.name"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      :items="objectives"
                      label="Objetivo"
                      v-model="newDiet.objective"
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
                        v-model="newDiet.start"
                        no-title
                        @change="menu1 = false"
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
                        v-model="newDiet.finish"
                        no-title
                        @change="menu2 = false"
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
                Definição das refeições e seus alimentos
              </v-stepper-step>

              <v-stepper-content step="2">
                <div class="d-flex justify-space-between">
                  <p class="title">Refeições</p>
                  <v-btn icon @click="addMeal">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>

                <v-expand-transition
                  v-for="(meal, index) in newDiet.meals"
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
                          v-model="meal.weekDay"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <div class="d-flex justify-space-between">
                          <p class="subtitle">Exercícios</p>
                          <v-btn icon x-small @click="addFood(index)">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </div>
                        <div v-for="(food, index) in meal.foods" :key="index">
                          <v-row>
                            <v-col cols="8">
                              <v-select
                                label="Exercício"
                                :items="foods"
                                item-text="name"
                              ></v-select>
                            </v-col>
                            <v-col cols="4">
                              <v-text-field placeholder="Qtd(g)"></v-text-field>
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
                <small>Confira se está tudo certo com sua dieta</small>
                <v-row>
                  <v-col cols="12">
                    <v-expansion-panels multiple>
                      <v-expansion-panel
                        v-for="(meal, index) in newDiet.meals"
                        :key="index"
                      >
                        <v-expansion-panel-header>{{
                          meal.weekDay
                        }}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                          Some content
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                </v-row>
                <v-btn dark color="orange darken-4" @click="e6 = 4">
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
      <DietInfo :diet="item"></DietInfo>

      <v-btn dark x-small @click="deleteTraining(item)" color="red">
        <v-icon small>
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { db } from "../../../firebase";
import { moment } from "moment";
const DietInfo = () => import("@/components/Dashboard/DietInfo.vue");

export default {
  components: {
    DietInfo
  },

  data: () => ({
    dialog: false,
    menu1: false,
    menu2: false,
    e6: 1,
    objectives: [
      "Hipertrofia",
      "Emagrecimento",
      "Condicionamento",
      "Resistência"
    ],

    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [],
    newDiet: [
      {
        meals: [{ name: "", time: null, foods: [] }]
      }
    ]
  }),

  created() {
    this.$store.dispatch("fetchDiets");
  },

  computed: {
    formatedStartDate() {
      return this.newDiet.start ? moment(this.newDiet.start).format('DD/MM/YYYY') : null
    },
    
    formatedFinishDate() {
      return this.newDiet.finish ? moment(this.newDiet.finish).format('DD/MM/YYYY') : null
    }
  },

  methods: {
    addMeals() {
      this.newDiet.meals.push({ name: "", time: null, foods: [] });
    },

    addFoods(index) {
      this.newDiet.meals[index].foods.push({});
    },

    async insertDiet() {
      let formattedDiet = Object.assign(this.newDiet, {
        userId: this.user.uid
      });
      try {
        await db.collection("diets").add(formattedDiet);
        this.$store.dispatch("fetchDiets");
      } catch (error) {
        console.log(error);
      }
    },

    async deleteDiet(item) {
      try {
        await db
          .collection("diets")
          .doc(item.uid)
          .delete();
        this.$store.dispatch("fetchDiets");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
