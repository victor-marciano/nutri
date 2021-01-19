<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.mobile"
    :width="$vuetify.breakpoint.mobile ? '' : '600px'"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-on="on" v-bind="attrs">
        <v-icon>mdi-information-variant</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        {{ diet.name }}
        <v-spacer></v-spacer>
        <v-icon @click="dialog = false">mdi-close</v-icon>
      </v-card-title>

      <v-card-text>
        <div v-for="(meal, index) in diet.meals" :key="index" class="my-5">
          <h5>{{ meal.name }} - {{ meal.time }}</h5>

          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Alimento
                  </th>
                  <th class="text-left">
                    Qtd(g)
                  </th>
                  <th class="text-left">
                    Calorias
                  </th>
                  <th class="text-left">
                    Carbohidratos
                  </th>
                  <th class="text-left">
                    Proteínas
                  </th>
                  <th class="text-left">
                    Gorduras
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="food in meal.foods" :key="food.data.name" class="text-center">
                  <td>{{ food.data.name }}</td>
                  <td class="font-weight-bold">{{ food.qtd }}g</td>
                  <td class="font-weight-bold">{{ (food.data.kcal * (food.qtd / 100)).toFixed(0) }}kcal</td>
                  <td class="font-weight-bold">{{ (food.data.carbs * (food.qtd / 100)).toFixed(0) }}g</td>
                  <td class="font-weight-bold">{{ (food.data.protein * (food.qtd / 100)).toFixed(0) }}g</td>
                  <td class="font-weight-bold">{{ (food.data.fats * (food.qtd / 100)).toFixed(0) }}g</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>

        <v-btn dark v-if="system" width="100%" color="green lighten-4">
          Adicionar esta dieta
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DietInfo",
  props: {
    diet: Object,
    system: Boolean
  },

  data: () => ({
    dialog: false
  }),

  created() {
    console.log(this.diet);
  }
};
</script>

<style></style>
