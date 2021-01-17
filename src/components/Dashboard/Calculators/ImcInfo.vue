<template>
  <v-card flat :color="$vuetify.breakpoint.mdAndUp ? 'transparent' : ''">
    <v-card-title class="d-flex justify-space-between">
      O que é o IMC?
      <v-btn icon @click="closeDialog" v-show="$vuetify.breakpoint.mobile">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="text--secondary">
      <p>
        O índice de massa corporal(IMC) é um índice que avalia se um indivíduo
        está dentro da faixa de peso ideal para a sua altura. O cálculo se dá
        pela seguinte forma <b>IMC = Peso/Altura²</b>.
      </p>
      <p>
        Há controvérsias sobre a eficácia do IMC, pois ele não leva em
        consideração a composição corporal. Então para indivíduos muito
        musculosos, o resultado pode apresentar distorções.
      </p>
    </v-card-text>

    <v-card-text>
      <ImcTable></ImcTable>
    </v-card-text>

    <v-card-actions class="d-flex justify-center">
      <v-btn
        width="90%"
        dark
        class="green lighten-3 my-3"
        @click="closeDialog"
      >
        Entendi!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const ImcTable = () => import("@/components/Dashboard/Tables/ImcTable.vue");

export default {
  name: "ImcInfo",
  components: {
    ImcTable
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    closeDialog () {
      this.$emit('close')
    }
  }
};
</script>

<style></style>
