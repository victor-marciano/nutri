<template>
  <v-card shaped elevation="4">
    <v-card-title class="text-center">{{ diet.name }}</v-card-title>

    <v-card-subtitle>
      <div class="d-flex justify-start">
        <v-rating
          color="orange darken-3"
          background-color="orange darken-3"
          readonly
          small
          dense
          :value="diet.rate"
        ></v-rating>
        <span v-if="diet.rate">({{ diet.rate }}) - {{ diet.votes }} votos</span>
        <span v-else class="ml-2">Sem avaliações</span>
      </div>
    </v-card-subtitle>

    <v-card-subtitle
      >Descrição da dieta Descrição da dieta Descrição da dieta Descrição da
      dieta Descrição da dieta Descrição da dieta Descrição da dieta Descrição
      da dieta Descrição da dieta
    </v-card-subtitle>

    <v-card-text>
      <v-divider></v-divider>
      <p class="body-1 my-2">Total de Macros</p>
      <div class="d-flex justify-space-around my-4 text-center">
        <div>
          <p>Calorias</p>
          <v-chip color="green lighten-1" dark> {{ maxKcal }}kcal </v-chip>
        </div>
        <div>
          <p>Carbohidrato</p>
          <v-chip color="green lighten-1" dark>
            {{ maxCarbs }}g
          </v-chip>
        </div>
        <div>
          <p>Proteínas</p>
          <v-chip color="green lighten-1" dark>
            {{ maxProtein }}g
          </v-chip>
        </div>
        <div>
          <p>Gorduras</p>
          <v-chip color="green lighten-1" dark>
            {{ maxFats }}g
          </v-chip>
        </div>
      </div>

      <v-divider></v-divider>
    </v-card-text>

    <v-card-actions>
      <DietRate :diet="diet"></DietRate>
      <v-spacer></v-spacer>

      <DietInfo :diet="diet" system></DietInfo>
      <DietSave :diet="diet"></DietSave>
    </v-card-actions>
  </v-card>
</template>

<script>
const DietInfo = () => import("@/components/Dashboard/Diets/DietInfo.vue");
const DietSave = () => import("@/components/Dashboard/Diets/DietSave.vue");
const DietRate = () => import("@/components/Dashboard/Diets/DietRate.vue");

export default {
  name: "DietCard",
  components: {
    DietInfo,
    DietSave,
    DietRate
  },

  props: {
    diet: Object
  },

  computed: {
    maxKcal() {
        let maxKcal = 0
        
        this.diet.meals.forEach(meal => {
            meal.foods.forEach(food => {                
                maxKcal += parseInt((food.data.kcal * (food.qtd / 100)).toFixed(0))
            })
        });
      return maxKcal
    },
    maxCarbs() {
      let maxCarbs = 0
        
        this.diet.meals.forEach(meal => {
            meal.foods.forEach(food => {                
                maxCarbs += parseInt((food.data.carbs * (food.qtd / 100)).toFixed(0))
            })
        });
      return maxCarbs
    },
    maxProtein() {
      let maxProtein = 0
        
        this.diet.meals.forEach(meal => {
            meal.foods.forEach(food => {                
                maxProtein += parseInt((food.data.protein * (food.qtd / 100)).toFixed(0))
            })
        });
      return maxProtein
    },
    maxFats() {
      let maxFats = 0
        
        this.diet.meals.forEach(meal => {
            meal.foods.forEach(food => {                
                maxFats += parseInt((food.data.fats * (food.qtd / 100)).toFixed(0))
            })
        });
      return maxFats
    }
  }
};
</script>

<style></style>
