<template>
  <div>
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

    <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" :height="500"></v-img>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card light outlined v-for="(resource, index) in resources" :key="index" class="mb-4">
            <v-card-title>{{ resource.title }}</v-card-title>
            <v-card-text>{{ resource.description }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"></v-img>
        </v-col>
      </v-row>
    </v-container>

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
    Footer
  },

  data: () => ({
    resources: [
      { title: 'Gerenciamento de Dietas e Treinos', description: 'Crie e manipule dietas e treinos com os alimentos/treinos da nossa base de dados', icon: '' },
      { title: '2', description: 'Teste', icon: '' },
      { title: '3', description: 'Teste 2', icon: '' },
    ],
    
    offsetTop: 0,
  }),

  methods: {
    onScroll () {
      this.offsetTop = window.scrollY
    },
  },

  computed: {
    getScroll () {
      return this.offsetTop
    }
  }
};
</script>

<style></style>
