<template>
  <div>
      <v-card flat color="transparent">
          <v-card-title class="d-flex justify-space-between">
              IMC
              <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.mobile"> 
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-on="on" v-bind="attrs" small icon class="justify-space-between">
                        <v-icon class="text-right">mdi-help-circle</v-icon>
                    </v-btn>
                  </template>

                    <v-card>
                        <v-card-title class="d-flex justify-space-between">
                            O que é o IMC?
                            <v-btn icon @click="dialog = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>

                        <v-card-text class="text--secondary">
                             <p>
                                O índice de massa corporal(IMC) é um índice que avalia se um indivíduo está dentro da faixa de peso ideal para a sua altura.
                                O cálculo se dá pela seguinte forma <b>IMC = Peso/Altura²</b>.
                            </p> 
                            <p>
                            Há controvérsias sobre a eficácia do IMC, pois ele não leva em consideração a composição corporal. Então para indivíduos muito musculosos, o resultado pode apresentar distorções. 

                            </p>
                        </v-card-text>
                        
                        <v-card-text>
                            <ImcTable></ImcTable>
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
              <v-text-field placeholder="Altura(em metros)" v-model="height"></v-text-field>

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
const ImcTable = () => import('@/components/Dashboard/Tables/ImcTable.vue')

export default {
    components: {
        ImcTable
    },

    data: () => ({
        dialog: false,
        height: null,
        weight: null,
        result: null
    }),

    methods: {
        exec() {
            this.result = (this.weight / (this.height**2)).toFixed(1)
        }
    },

    computed: {
        getIMC() {
            return this.result
        }
    }
}
</script>

<style>

</style>