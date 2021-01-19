<template>
  <v-card flat>
    <v-card-title class="d-flex justify-space-between">
      O que é o TMB?
      <v-btn icon @click="closeDialog" v-show="$vuetify.breakpoint.mobile">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="text--secondary">
      <p>
        Taxa metabólica basal(TMB) é um meio/formulá matemática, não exato, de
        calcular a quantidade calórica que o corpo necessita, em vinte e quatro
        horas, para manter-se nutrido durante o decorrer das atividades diárias,
        e/ou fazendo um jejum de pelo menos doze horas em repouso, sem
        prejudicar o funcionamento dos principais órgãos.
      </p>
      <p>
        O cálculo da TMB através da fórmula de Harris-Benedict é realizado em
        duas fórmulas distintas para homens e mulheres:
      </p>
      <p class="font-weight-bold">
        Fórmula feminina:<br />
        TMB = 655 + (9,6 * P) + (1,8 * A) – (4,7 * I) <br /><br />
        Fórmula masculina:<br />
        TMB = 66 + (13,7 * P) + (5 * A) – (6,8 * I)
      </p>
    </v-card-text>

    <v-card-actions class="d-flex justify-center">
      <v-btn
        width="90%"
        dark
        class="green lighten-3 my-3"
        @click="closeDialog"
        v-show="$vuetify.breakpoint.mobile"
      >
        Entendi!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TmbInfo",
  data: () => ({
    dialog: false
  }),

  methods: {
    closeDialog() {
      this.$emit("close");
    }
  }
};
</script>

<style></style>
