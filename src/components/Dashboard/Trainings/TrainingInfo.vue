<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.mobile"
    width="500px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-tooltip open-on-hover top activator=".trainingInfo">
        <span>Detalhes</span>
      </v-tooltip>

      <v-btn
        x-small
        color="info"
        v-on="on"
        v-bind="attrs"
        class="trainingInfo mr-1"
      >
        <v-icon>mdi-information-variant</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        {{ training.name }}

        <v-spacer></v-spacer>

        <v-icon @click="dialog = false">mdi-close</v-icon>
      </v-card-title>

      <v-card-text>
        <p>Objetivo: {{ training.objective }}</p>
        <div v-for="(series, index) in training.trainings" :key="index">
          <h4 class="my-2">{{ series.weekDay }}</h4>

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
      </v-card-text>

      <v-card-actions class="text-center">
        <v-spacer></v-spacer>
        <v-btn
          dark
          v-if="system"
          :width="$vuetify.breakpoint.mobile ? '100%' : '50%'"
          color="green lighten-4"
        >
          Adicionar este treino
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "TrainingInfo",
  props: {
    training: Object,
    system: Boolean,
    id: String
  },

  data: () => ({
    dialog: false
  })
};
</script>

<style></style>
