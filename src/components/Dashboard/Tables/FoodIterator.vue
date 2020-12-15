<template>
  <div>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
      no-data-text="Nenhum alimento cadastrado na plataforma"
      no-results-text="Nenhum alimento encontrado"
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
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                       <p class="body-2">Calorias: <b>300</b></p>
                       <p class="body-2">Carbohidratos: <b>70</b></p>
                       <p class="body-2">Proteínas: <b>30</b></p>
                       <p class="body-2">Gorduras: <b>10</b></p>
                    </v-col>

                    <v-divider
                        vertical
                        class="mx-5"
                    ></v-divider>

                    <v-col cols="4">
                        <FoodChart :chart-data="datacollection" :options="{responsive: true}"></FoodChart>
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
import FoodChart from "../Charts/FoodChart.vue";

export default {
    components: {
        FoodChart
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
        datacollection: null,
        itemsPerPageArray: [8, 16],
        search: '',
        filter: {},
        sortDesc: false,
        page: 1,
        itemsPerPage: 8,
        sortBy: 'name',
        keys: [
          'Name',
          'Calories',
          'Fat',
          'Carbs',
          'Protein'
        ],
        items: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7
          },
        ],
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.items.length / this.itemsPerPage)
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
      },
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
    },
}
</script>

<style>

</style>