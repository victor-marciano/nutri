<template>
  <div class="calculators">
    <v-tabs v-model="tab" show-arrows grow centered color="green lighten-3">
      <v-tab>IMC</v-tab>
      <v-tab>TMB</v-tab>
      <v-tab>Gasto calórico</v-tab>
      <v-tab>Peso ideal</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="pa-3">
      <v-tab-item><IMC></IMC></v-tab-item>
      <v-tab-item><TMB></TMB></v-tab-item>
      <v-tab-item>4</v-tab-item>
      <v-tab-item><PesoIdeal></PesoIdeal></v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
const IMC = () => import("@/components/Dashboard/Calculators/IMC.vue");
const TMB = () => import("@/components/Dashboard/Calculators/TMB.vue");
const PesoIdeal = () =>
  import("@/components/Dashboard/Calculators/PesoIdeal.vue");

export default {
  name: "Calculadoras",
  components: {
    IMC,
    TMB,
    PesoIdeal
  },

  data: () => ({
    tab: 0
  })
};
</script>

<style lang="scss" scoped>
.calculators {
  background: whitesmoke;
}
</style>
