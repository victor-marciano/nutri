<template>
  <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.mobile">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-on="on" v-bind="attrs">
        <v-icon>mdi-information-variant</v-icon>
      </v-btn>
    </template>

    <v-card color="white">
      <v-card-title>{{ diet.name }}</v-card-title>

      <v-card-text>
        <div v-for="(meal, index) in diet.meals" :key="index">
          <h5>{{ meal.name }} - {{ meal.time }}</h5>

          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Alimento
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
                <tr v-for="food in meal.foods" :key="food.name">
                  <td>{{ food.name }}</td>
                  <td>{{ food.kcal }}</td>
                  <td>{{ food.carbs }}</td>
                  <td>{{ food.protein }}</td>
                  <td>{{ food.fats }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <v-btn dark v-if="system" width="100%" color="green lighten-4">
          Adicionar esta dieta
        </v-btn>
        <v-btn
          dark
          v-else
          width="100%"
          color="green lighten-4"
          @click="dialog = false"
        >
          Voltar
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
    console.log(this.diet)
  }
};
</script>

<style></style>
