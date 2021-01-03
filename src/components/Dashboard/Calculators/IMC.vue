<template>
  <div>
    <v-card height="96vh" flat color="transparent">
      <v-card-title class="d-flex justify-space-between">
        IMC
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

          <ImcInfo></ImcInfo>
        </v-dialog>
      </v-card-title>

      <v-card-text>
        <v-text-field placeholder="Peso(kg)" v-model="weight"></v-text-field>
        <v-text-field
          placeholder="Altura(em metros)"
          v-model="height"
        ></v-text-field>

        <v-btn width="100%" dark class="green lighten-3 my-5" @click="exec">
          Calcular
        </v-btn>
      </v-card-text>

      <v-card-text v-if="result">
        Seu IMC é: <b>{{ getIMC }}</b>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const ImcInfo = () => import("@/components/Dashboard/Calculators/ImcInfo.vue");

export default {
  components: {
    ImcInfo
  },

  data: () => ({
    dialog: false,
    height: null,
    weight: null,
    result: null
  }),

  methods: {
    exec() {
      this.result = (this.weight / this.height ** 2).toFixed(1);
    }
  },

  computed: {
    getIMC() {
      return this.result;
    }
  }
};
</script>

<style></style>
