<template>
  <div>
    <v-data-iterator
      :items="foods"
      :items-per-page.sync="foodsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
      no-data-text="Nenhum alimento cadastrado na plataforma"
      no-results-text="Nenhum alimento encontrado"
      v-if="foods"
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="orange darken-4"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Pesquisar"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Ordenar por"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="orange darken-3"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="orange darken-3"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-expansion-panels>
             <v-expansion-panel>
                <v-expansion-panel-header v-slot="{ open }">
                    <v-row no-gutters>
                    <v-col
                        cols="8"
                        class="text--secondary"
                    >
                        <v-fade-transition leave-absolute>
                        <span
                            v-if="open"
                            key="0"
                        >
                            Informações nutricionais
                        </span>
                        <span
                            v-else
                            key="1"
                        >
                            {{ item.name }}
                        </span>
                        </v-fade-transition>
                    </v-col>
                    </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row no-gutters>
                        <v-col cols="5">
                            <div class="d-block align-center">
                                <v-chip
                                    class="ma-2"
                                    color="green"
                                    text-color="white"
                                    small
                                >
                                    <v-avatar
                                        left
                                        class="green darken-4"
                                    >
                                        {{ item.kcal }}
                                    </v-avatar>
                                    Calorias
                                </v-chip>
                                <v-chip
                                    class="ma-2"
                                    color="green"
                                    text-color="white"
                                    small
                                >
                                    <v-avatar
                                        left
                                        class="green darken-4"
                                    >
                                        {{ item.carbs }}
                                    </v-avatar>
                                    Carbohidratos
                                </v-chip>
                                <v-chip
                                    class="ma-2"
                                    color="green"
                                    text-color="white"
                                    small
                                >
                                    <v-avatar
                                        left
                                        class="green darken-4"
                                    >
                                        {{ item.protein }}
                                    </v-avatar>
                                    Proteínas
                                </v-chip>
                                <v-chip
                                    class="ma-2"
                                    color="green"
                                    text-color="white"
                                    small
                                >
                                    <v-avatar
                                        left
                                        class="green darken-4"
                                    >
                                        {{ item.fats }}
                                    </v-avatar>
                                    Gorduras
                                </v-chip>
                            </div>
                        </v-col>

                        <v-col cols="7" style="height: 200px;">
                            <FoodChart></FoodChart>
                            <small class="text--secondary py-2">Percentual dos macro-nutrientes</small>
                        </v-col>
                    </v-row>

                    <v-card-actions>
                    
                    <v-text-field v-model="qtd" placeholder="Quantidade(g)">

                    </v-text-field>

                    <v-spacer></v-spacer>

                    <v-btn
                        text
                        color="secondary"
                        icon
                    >
                        <v-icon>mdi-flag</v-icon>
                    </v-btn>
                    </v-card-actions>
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
          class="my-2"
          align="center"
          justify="center"
        >

          <span
            class="mr-4
            grey--text"
          >
            Página {{ page }} de {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="orange darken-4"
            class="mr-1"
            @click="formerPage"
            :small="$vuetify.breakpoint.mobile"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="orange darken-4"
            class="ml-1"
            @click="nextPage"
            :small="$vuetify.breakpoint.mobile"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FoodChart from "../Charts/FoodChart.vue";

export default {
    components: {
        FoodChart
    },
    
    created(){
      this.$store.dispatch('fetchFood')
    },

    mounted () {
        this.datacollection = {
            labels: ['teste', 'resultado'],
            datasets: [
            {
                label: 'Data One',
                backgroundColor: '#f87979',
                data: [60, 30]
            }, {
                label: 'Data Two',
                backgroundColor: '#f87979',
                data: [20, 23]
            }
            ]
        }
    },

    data () {
      return {
        qtd: 100,
        datacollection: null,
        itemsPerPageArray: [8, 16],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        foodsPerPage: 8,
        sortBy: 'name',
        keys: [
          'Name',
          'Kcal',
          'Fats',
          'Carbs',
          'Proteins'
        ]
      }
    },

    computed: {
      ...mapGetters([
        'foods'
      ]),

      numberOfPages () {
        return Math.ceil(this.foods.length / this.foodsPerPage)
      },
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
    },
    methods: {
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      formerPage () {
        if (this.page - 1 >= 1) this.page -= 1
      }
    },
}
</script>

<style>

</style>