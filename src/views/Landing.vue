<template>
  <div class="landing">
    <Navbar></Navbar>

    <v-fab-transition>
      <v-btn
        fab
        dark
        bottom
        right
        fixed
        color="orange darken-4"
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
              <v-sheet light class="transparent text-center py-5">
                <v-img src="../assets/fullLogo.png" width="250" class="mx-auto"></v-img>
                <br>
                <p class="body-2 text--secondary">
                  Somos a tecnologia impactando positivamente na sua saúde e estética, faça seu cadastro e conheça nossa plataforma Web.
                </p><br>
                <v-btn @click="$vuetify.goTo('.resources')" :width="$vuetify.breakpoint.mdAndUp ? '50%' : '100%'" :large="$vuetify.breakpoint.mdAndUp" class="green lighten-3" dark> 
                  Saiba mais
                </v-btn>
              </v-sheet>
          </v-col> 
          <v-col cols="12" md="6">            
            <v-img src="../assets/6569.jpg" :height="$vuetify.breakpoint.mobile ? 200 : 400"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="section resources">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="3"
            v-for="(resource, index) in resources"
            :key="index"
            class="mx-auto"
          >
            <v-sheet class="transparent">
              <v-img
                :src="require(`../assets/svg/${resource.icon}.svg`)"
                :width="$vuetify.breakpoint.mobile ? '20vw' : '5vw'"
                class="mb-5 mx-auto"
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

    <div class="section contact">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-img src="../assets/5964.jpg"></v-img>
            <p class="body text-center text--secondary">Alguma dúvida? Envie uma mensagem para nós!</p>
          </v-col>
          <v-col cols="12" md="6">
            <ContactForm></ContactForm>
          </v-col>
        </v-row>
      </v-container>
    </div>
    
    <Footer></Footer>
  </div>
</template>

<script>
const Navbar = () => import("@/components/Landing/Navbar.vue");
const Footer = () => import("@/components/Landing/Footer.vue");
const ContactForm = () => import("@/components/Landing/ContactForm.vue");

export default {
  name: "Landing",
  components: {
    Navbar,
    Footer,
    ContactForm
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

@media (max-width: 990px) {
  .resources {
    padding-top: 25px;
    padding-bottom: 25px;
  }
  
  .section {
    padding-top: 50px;
    padding-bottom: 50px;
  }
}

@media (min-width: 991px) {
  .section {
    padding-top: 75px;
    padding-bottom: 75px;
  }

  .presentation {
    height: 75vh;
  }

  .resources {
    background: whitesmoke;
  }
}
</style>
