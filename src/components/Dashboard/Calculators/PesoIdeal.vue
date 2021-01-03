<template>
  <div>
    <v-card height="96vh" flat color="transparent">
      <v-card-title class="d-flex justify-space-between">
        Peso Ideal(Lemmens)
        <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.mobile">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              small
              icon
              class="justify-space-between"
            >
              <v-icon class="text-right">mdi-help-circle</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="d-flex justify-space-between">
              O que é a Fórmula de Lemmens?
              <v-btn icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-card-text class="text--secondary">
              Ideal Body Weight (kg) = 22 x height^2 (meter)
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn
                width="90%"
                dark
                class="green lighten-3 my-3"
                @click="dialog = false"
              >
                Entendi!
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>

      <v-card-text>
        <v-text-field
          placeholder="Altura(em metros)"
          v-model="height"
        ></v-text-field>

        <v-btn width="100%" dark class="green lighten-3 my-5" @click="exec">
          Calcular
        </v-btn>
      </v-card-text>

      <v-card-text v-if="result">
        Seu peso ideal é: <b>{{ getResult }}Kg</b>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    height: null,
    result: null
  }),

  methods: {
    exec() {
      this.result = (22 * this.height ** 2).toFixed(1);
    }
  },

  computed: {
    getResult() {
      return this.result;
    }
  }
};
</script>

<style></style>
