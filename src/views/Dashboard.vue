<template>
  <div>
    <v-overlay :value="overlay" :opacity="1" color="white">
      <v-img :src="require('@/assets/horizontalLogo2.png')"></v-img>

      <v-progress-linear
        color="green lighten-3"
        indeterminate
        height="5"
      ></v-progress-linear>
    </v-overlay>

    <Sidebar></Sidebar>

    <v-fade-transition>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-fade-transition>
  </div>
</template>

<script>
const Sidebar = () => import("@/components/Dashboard/Sidebar.vue");

export default {
  name: "Dashboard",
  data: () => ({
    overlay: true
  }),

  components: {
    Sidebar
  },

  beforeCreate() {
    setTimeout(() => {
      this.overlay = false;
    }, 2500);
  },

  created() {
    this.$store.dispatch("fetchFood");
    this.$store.dispatch("fetchDiets");
    this.$store.dispatch("fetchTrainings");
  }
};
</script>

<style></style>
