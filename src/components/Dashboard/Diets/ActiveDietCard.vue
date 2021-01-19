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

      <v-card-text> </v-card-text>

      <v-card-actions>
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

export default {
  name: "ActiveDietCard",

  computed: {
    ...mapGetters(["activeDiet"]),

    nextMeal() {
      return this.activeDiet.meals.find(meal =>
        moment(meal.time, "h:mm").isAfter()
      );
    },

    nextMealRemaining() {
      return moment(this.nextMeal.time, "h:mm").fromNow();
    }
  }
};
</script>

<style></style>
