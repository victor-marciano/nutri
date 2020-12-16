<template>
  <div>
      <v-card flat color="transparent">
          <v-card-title class="d-flex justify-space-between">
              TMB(Taxa metabólica basal)
              <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.mobile"> 
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-on="on" v-bind="attrs" small icon class="justify-space-between">
                        <v-icon class="text-right">mdi-help-circle</v-icon>
                    </v-btn>
                  </template>

                    <v-card>
                        <v-card-title class="d-flex justify-space-between">
                            O que é o TMB?
                            <v-btn icon @click="dialog = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>

                        <v-card-text class="text--secondary">
                            <p>
                                Taxa metabólica basal(TMB) é um meio/forma matemático, não exato, de calcular a quantidade calórica que o corpo necessita, em vinte e quatro horas, para manter-se nutrido durante o decorrer das atividades diárias, e/ou fazendo um jejum de pelo menos doze horas em repouso, sem prejudicar o funcionamento dos principais órgãos.
                            </p>
                            <p>
                                O cálculo da TMB através da fórmula de Harris-Benedict é realizado em duas fórmulas distintas para homens e mulheres:
                            </p>
                            <p class="font-weight-bold">
                                Fórmula feminina:<br> TMB = 655 + (9,6 * P) + (1,8 * A) – (4,7 * I) <br><br>
                                Fórmula masculina:<br> TMB = 66 + (13,7 * P) + (5 * A) – (6,8 * I)
                            </p>
                        </v-card-text>

                        <v-card-actions class="d-flex justify-center"> 
                            <v-btn width="90%" dark class="green lighten-3 my-3" @click="dialog = false">
                                Entendi!
                            </v-btn>
                        </v-card-actions>
                    </v-card>
              </v-dialog>
          </v-card-title>

          <v-card-text>
              <v-text-field placeholder="Peso(kg)" v-model="weight"></v-text-field>
              <v-text-field placeholder="Altura(cm)" v-model="height"></v-text-field>
              <v-text-field placeholder="Idade" v-model="age"></v-text-field>
                <v-radio-group v-model="gender">
                    <v-radio label="Masculino" value="male"></v-radio>
                    <v-radio label="Feminino" value="female"></v-radio>
                </v-radio-group>
                <v-select
                    :items="activityItems"
                    v-model="activity"
                    label="Nível de atividade"
                    item-text="name"
                    item-value="value"
                ></v-select>
              <v-btn width="100%" dark class="green lighten-3 my-5" @click="exec">
                  Calcular
              </v-btn>
          </v-card-text>

          <v-card-text v-if="result">
              Sua taxa metabólica basal é: <b>{{ getTMB }}</b>
          </v-card-text>
      </v-card>
  </div>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        result: null,
        gender: 'male',
        age: null,
        height: null,
        weight: null,
        activity: null,
        activityItems: [
            { name: 'sedentário', value: 1 },
            { name: 'pouco ativo', value: 1.2 },
            { name: 'moderado', value: 1.4 },
            { name: 'ativo', value: 1.6 },
            { name: 'muito ativo', value: 1.8 },
        ]
    }),

    methods: {
        exec() {
            this.result = (this.gender === 'male') ? this.calcMen() : this.calcWoman();
        },

        calcMen() {
            return (66 + (13.7 * this.weight) + (5 * this.height) - (6.8 * this.age)) * this.activity
        },

        calcWoman() {
            return (655 + (9.6 * this.weight) + (1.8 * this.height) - (4.7 * this.age)) * this.activity
        }
    },

    computed: {
        getTMB() {
            return this.result
        }
    }
}
</script>

<style>

</style>