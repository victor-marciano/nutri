<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-0"
    :dense="$vuetify.breakpoint.mobile"
    disable-sort
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Minhas dietas</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-spacer></v-spacer>

        <v-btn color="orange darken-4" dark class="mb-2" icon>
          <v-icon>
            mdi-refresh
          </v-icon>
        </v-btn>
        <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.mobile">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="orange darken-4"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              icon
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <v-card flat>
              <v-card-title>Criar dieta</v-card-title>

              <v-card-text>
                <div class="d-flex justify-space-between align-center my-3">
                  <p class="title">Refeição</p>
                  <v-btn icon>
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
                <v-row>
                    <v-col cols="6">
                      <v-text-field dense placeholder="Nome"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="200px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="time"
                            label="Horario"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="time"
                          full-width
                          @click:minute="$refs.menu.save(time)"
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field dense placeholder="Qtd"></v-text-field>
                    </v-col>
                </v-row>
              </v-card-text>

              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="dialog = false">Cancelar</v-btn>
                  <v-btn text>Salvar</v-btn>
              </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>

export default {
  data: () => ({
    dialog: false,
    menu2: false,
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    newDiet: [
      { 
        meals: [
          { name: '', time: null, food: {}}
        ] 
      }
    ]
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
        }
      ];
    }
  },
};
</script>

<style></style>
