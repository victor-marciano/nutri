<template>
  <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.mobile">
    <template v-slot:activator="{ on, attrs }">
      <v-btn x-small color="info" v-on="on" v-bind="attrs" class="mr-1">
        <v-icon>mdi-information-variant</v-icon>
      </v-btn>
    </template>

    <v-card color="white">
      <v-card-title>
        {{ training.name }}

        <v-spacer></v-spacer>

        <v-icon @click="dialog = false">mdi-close</v-icon>
      </v-card-title>

      <v-card-text>
        <p>Objetivo: {{ training.objective }}</p>
        <div v-for="(series, index) in training.trainings" :key="index">
          <h5>{{ series.weekDay }}</h5>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Exercício
                  </th>
                  <th class="text-left">
                    Repetições
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="exercise in series.exercises" :key="exercise.name">
                  <td>{{ exercise.name }}</td>
                  <td>{{ exercise.series }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <v-btn dark v-if="system" width="100%" color="green lighten-4">
          Adicionar este treino
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
  name: "TrainingInfo",
  props: {
    training: Object,
    system: Boolean
  },

  data: () => ({
    dialog: false
  })
};
</script>

<style></style>
