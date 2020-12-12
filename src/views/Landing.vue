<template>
  <div class="landing p-3">
    <Navbar></Navbar>

    <v-fab-transition>
      <v-btn
        fab
        dark
        bottom
        right
        fixed
        @click="$vuetify.goTo('#navbar')"
        v-scroll="onScroll"
        v-show="offsetTop > 200"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-fab-transition>

    <!-- <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" :height="500"></v-img> -->
    <div class="presentation d-flex align-center">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-sheet light height="25vh" color="transparent">
              <p class="title">Teste</p>
              <p class="subtitle">Subtitulo</p>
            </v-sheet>
          </v-col>
          <v-col cols="12" md="6">
            <v-img src="../assets/cellphone.png" width="10vw"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="section">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="3"
            v-for="(resource, index) in resources"
            :key="index"
            class="mx-auto"
          >
            <v-sheet>
              <v-img
                :src="require(`../assets/svg/${resource.icon}.svg`)"
                width="5vw"
                class="mb-4 mx-auto"
              ></v-img>
              <p class="title text-center">{{ resource.title }}</p>
              <p class="body-2 font-weight-light text-center text--secondary">
                {{ resource.description }}
              </p>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-parallax
      height="300"
      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    ></v-parallax>
    <Footer></Footer>
  </div>
</template>

<script>
const Navbar = () => import("@/components/Landing/Navbar.vue");
const Footer = () => import("@/components/Landing/Footer.vue");

export default {
  name: "Landing",
  components: {
    Navbar,
    Footer,
  },

  data: () => ({
    resources: [
      {
        title: "Dietas",
        description:
          "Crie e manipule dietas e treinos com os alimentos/treinos da nossa base de dados",
        icon: "021-diet",
      },
      {
        title: "Calculadoras Fit",
        description:
          "Obtenha dados precisos sobre seu corpo, e sobre como proceder com sua alimentação e atividades físicas",
        icon: "001-scale",
      },
      {
        title: "Guia Nutricional",
        description:
          "Alimentos e seus valores nutricionais detalhados, contendo informações adicionais",
        icon: "011-apple-1",
      },
      {
        title: "Treinos",
        description: "Gerencie seus treinos",
        icon: "002-heart-rate",
      },
    ],

    offsetTop: 0,
  }),

  methods: {
    onScroll() {
      this.offsetTop = window.scrollY;
    },
  },

  computed: {
    getScroll() {
      return this.offsetTop;
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  padding-top: 50px;
  padding-bottom: 50px;
}

.presentation {
  height: 75vh;
  background: whitesmoke;
}
</style>
