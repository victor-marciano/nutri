<template>
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
        <v-stepper-step color="orange darken-4" :complete="e6 > 1" step="1">
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
                  v-model="newDiet.finish"
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
          Definição das refeições e seus alimentos
        </v-stepper-step>

        <v-stepper-content step="2">

          <v-expand-transition
            v-for="(meal, index) in newDiet.meals"
            :key="index"
          >
            <v-container>
              <v-row>
                <small class="text-center"
                  >Preencha as informações desta refeição</small
                >
                <v-col cols="12">
                  <div class="d-flex justify-space-between">
                    <p class="subtitle">Refeição</p>
                    
                    <div>
                      <v-btn icon @click="addMeal">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                      <v-btn icon @click="removeMeal(index)" :disabled="index === 0">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <div>
                    <v-row>
                      <v-col cols="7">
                        <v-text-field
                          placeholder="Nome da refeição"
                          v-model="meal.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="5">
                        <v-menu
                          v-model="menu3[index]"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              label="Horário"
                              :value="meal.time"
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menu3[index]"
                            v-model="meal.time"
                            full-width
                            @change="menu3[index] = false"
                            format="24hr"
                            color="green lighten-2"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </div>
                  <div v-for="(food, foodIndex) in meal.foods" :key="foodIndex">
                    <v-row>
                      <v-col cols="7">
                        <v-autocomplete
                          v-model="food.data"
                          label="Alimento"
                          :items="foods"
                          item-text="name"
                          cache-items
                          return-object
                          no-data-text="Nenhum alimento cadastrado"
                          append-icon
                          single-line
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          placeholder="Qtd(g)"
                          v-model="food.qtd"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="1" class="d-inline-flex my-auto">
                          <v-btn icon x-small @click="addFoods(index)">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                          <v-btn icon x-small @click="removeFoods(index, foodIndex)" :disabled="foodIndex === 0">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-expand-transition>

          <v-btn id="finishDietButton" dark color="orange darken-4" @click="e6 = 3">
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
          <small>Confira se está tudo certo com sua dieta</small>

          <DietInfo :diet="newDiet"></DietInfo>

          <v-btn dark color="orange darken-4" @click="insertDiet">
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
import { db, auth } from "../../../firebase";
import moment from "../../../date";
import { mapGetters } from "vuex";
const DietInfo = () => import("@/components/Dashboard/Diets/DietInfo.vue");

export default {
  name: "DietForm",
  components: {
    DietInfo
  },
  data: () => ({
    dialog: false,
    menu1: false,
    menu2: false,
    menu3: [],
    e6: 1,
    objectives: [
      "Hipertrofia",
      "Emagrecimento",
      "Condicionamento",
      "Resistência"
    ],

    newDiet: {
      name: "",
      objective: "",
      start: null,
      finish: null,
      meals: [{ name: "", time: null, foods: [{ data: {}, qtd: 0 }] }]
    }
  }),

  methods: {
    addMeal() {
      this.newDiet.meals.push({
        name: "",
        time: null,
        foods: [{ data: {}, qtd: 0 }]
      });
    },

    addFoods(index) {
      this.newDiet.meals[index].foods.push({});
    },
    
    removeMeal(index) {
      this.newDiet.meals.splice(index, 1)
    },

    removeFoods(index, foodIndex) {
      this.newDiet.meals[index].foods.splice(foodIndex, 1);
    },

    async insertDiet() {
      let formattedDiet = Object.assign(this.newDiet, {
        userId: auth.currentUser.uid
      });

      console.log(this.newDiet);
      console.log(formattedDiet);
      try {
        await db.collection("diets").add(formattedDiet);
        this.dialog = false;

        this.$emit("complete", {
          show: true,
          color: "success",
          icon: "mdi-check-circle",
          text: `Dieta criada com sucesso`
        });

        this.$store.dispatch("fetchDiets");
      } catch (error) {
        this.$emit("complete", {
          show: true,
          color: "error",
          icon: "mdi-close",
          text: `Falha ao inserir Dieta`
        });
      }
    }
  },

  computed: {
    ...mapGetters(["foods"]),

    formatedStartDate() {
      return this.newDiet.start
        ? moment(this.newDiet.start).format("DD/MM/YYYY")
        : null;
    },

    formatedFinishDate() {
      return this.newDiet.finish
        ? moment(this.newDiet.finish).format("DD/MM/YYYY")
        : null;
    }
  }
};
</script>

<style></style>
