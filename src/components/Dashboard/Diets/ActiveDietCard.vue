<template>
  <v-card rounded="xl" elevation="4" class="text-center">
    <v-card-title class="headline">
      Sua dieta atual
      <v-spacer></v-spacer>
      <span class="text--secondary body-2" v-if="activeDiet">{{
        activeDiet.name
      }}</span>
    </v-card-title>

    <div v-if="!activeDiet">
      <v-card-text class="d-flex justify-center">
        <div>
          <v-img
            contain
            :aspect-ratio="7 / 3"
            class="mb-5"
            :src="require('@/assets/002-browsers.png')"
          ></v-img>
          <p class="text--secondary">
            Você não possui nenhuma dieta ativa, crie ja a sua!
          </p>
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
      <v-card-text v-if="nextMeal">
        <span class="body-2">Proxima refeição</span>
        <p class="text--secondary">
          {{ nextMealRemaining }} você deverá consumir os seguintes alimentos:
        </p>

        <v-simple-table height="100px" dense>
          <template v-slot:default>
            <tbody>
              <tr v-for="food in nextMeal.foods" :key="food.name">
                <td>{{ food.qtd }}g de {{ food.data.name }}</td>
                <td>
                  {{ (food.data.kcal * (food.qtd / 100)).toFixed(0) }}kcal
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>

      <v-divider inset class="mx-auto"></v-divider>

      <v-card-text> 
        <p>Desempenho diário</p>
        <p class="text--secondary">Registre todos os alimentos que consumir, é uma forma de garantir que você está ingerindo os nutrientes necessários para seus objetivos.</p>
        <div class="d-flex justify-space-around">
          <div>
            <p class="text--secondary">{{ progressPercent[0] ? progressPercent[0].total : 0 }}/{{ maxNutrients[0] }}kcal</p>
            <v-progress-circular
              :rotate="360"
              :size="75"
              :width="10"
              :value="progressPercent[0].percent"
              color="orange darken-3"
            >
              <b>{{ progressPercent[0].percent }}%</b>
            </v-progress-circular>
          </div>
          <div>
            <p class="text--secondary">{{ progressPercent[1] ? progressPercent[1].total : 0 }}/{{ maxNutrients[1] }}g</p>
            <v-progress-circular
              :rotate="360"
              :size="75"
              :width="10"
              color="orange darken-3"
              :value="progressPercent[1].percent"
            >
              <b>{{ progressPercent[1].percent }}%</b>
            </v-progress-circular>
          </div>
          <div>
            <p class="text--secondary">{{ progressPercent[2] ? progressPercent[2].total : 0 }}/{{ maxNutrients[2] }}g</p>
            <v-progress-circular
              :rotate="360"
              :size="75"
              :width="10"
              color="orange darken-3"
              :value="progressPercent[2].percent"
            >
              <b>{{ progressPercent[2].percent }}%</b>
            </v-progress-circular>
          </div>
          <div>
            <p class="text--secondary">{{ progressPercent[3] ? progressPercent[3].total : 0 }}/{{ maxNutrients[3] }}g</p>
            <v-progress-circular
              :rotate="360"
              :size="75"
              :width="10"
              color="orange darken-3"
              :value="progressPercent[3].percent"
            >
              <b>{{ progressPercent[3].percent }}%</b>
            </v-progress-circular>
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
         <FoodRegister :diet="activeDiet"></FoodRegister>
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
import moment from "../../../date";
const FoodRegister = () => import('@/components/Dashboard/Diets/FoodRegister.vue')

export default {
  name: "ActiveDietCard",
  components: {
    FoodRegister
  },

  computed: {
    ...mapGetters(["activeDiet"]),

    nextMeal() {
      return this.activeDiet.meals.find(meal =>
        moment(meal.time, "h:mm").isAfter()
      );
    },

    nextMealRemaining() {
      return moment(this.nextMeal.time, "h:mm").fromNow();
    },

    dietProgress() {
      return this.activeDiet.progress
    },

    maxNutrients() {
        let maxKcal = 0, maxCarbs = 0, maxProtein = 0, maxFats = 0
        
        this.activeDiet.meals.forEach(meal => {
            meal.foods.forEach(food => {                
                maxKcal += parseInt((food.data.kcal * (food.qtd / 100)).toFixed(0))
                maxCarbs += parseInt((food.data.carbs * (food.qtd / 100)).toFixed(0))
                maxProtein += parseInt((food.data.protein * (food.qtd / 100)).toFixed(0))
                maxFats += parseInt((food.data.fats * (food.qtd / 100)).toFixed(0))
            })
        });

      return [ maxKcal, maxCarbs, maxProtein, maxFats ];
    },

    progressPercent() {
      let progress = [0, 0, 0, 0]
      let totalKcal = 0, totalCarbs = 0, totalProtein = 0, totalFats = 0
      
      if (this.dietProgress) {
        this.dietProgress.forEach(progress => {                         
            totalKcal += parseInt((progress.food.kcal * (progress.qtd / 100)).toFixed(0))
            totalCarbs += parseInt((progress.food.carbs * (progress.qtd / 100)).toFixed(0))
            totalProtein += parseInt((progress.food.protein * (progress.qtd / 100)).toFixed(0))
            totalFats += parseInt((progress.food.fats * (progress.qtd / 100)).toFixed(0))   
        });

        progress = [
          { total: totalKcal, percent: ((totalKcal / this.maxNutrients[0]) * 100).toFixed(1) },
          { total: totalCarbs, percent: ((totalCarbs / this.maxNutrients[1]) * 100).toFixed(1) },
          { total: totalProtein, percent: ((totalProtein / this.maxNutrients[2]) * 100).toFixed(1) },
          { total: totalFats, percent: ((totalFats / this.maxNutrients[3]) * 100).toFixed(1) }
        ]    
        
      }

      return progress
    }
  }
};
</script>

<style></style>
