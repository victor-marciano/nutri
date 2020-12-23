<template>
  <div class="home">
    <v-container>
      <p class="title">Bem vindo {{ user.displayName }}.</p>
      <p class="subtitle">
        Acompanhe seu progresso e o andamento das suas dietas e treinos.
      </p>
      <v-row>
        <v-col cols="12" md="6">
          <v-card color="orange darken-4" dark>
            <v-card-title class="headline">
              Sua dieta atual
            </v-card-title>

            <v-card-subtitle
              >Você não possui nenhuma dieta ativa, crie ja a
              sua!</v-card-subtitle
            >

            <v-card-actions>
              <v-btn text>
                Criar dieta
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-divider class="py-3"></v-divider>

      <p class="headline">Dietas populares</p>
      <v-row>
        <v-col cols="6" v-for="(diet, index) in diets" :key="index">
          <v-card>
            <v-img
              :src="'https://cdn.vuetifyjs.com/images/cards/road.jpg'"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="150px"
            >
              <v-card-title>{{ diet.name }}</v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-book-plus-multiple-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="py-3"></v-divider>

      <p class="headline">Treinos populares</p>
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-img
              :src="'https://cdn.vuetifyjs.com/images/cards/road.jpg'"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="150px"
            >
              <v-card-title v-text="'Teste'"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-img
              :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="150px"
            >
              <v-card-title v-text="'Teste 2'"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  created () {
    this.$store.dispatch('fetchDiets')
  },

  computed: {
    ...mapGetters(["user", "diets"])
  }
};
</script>
