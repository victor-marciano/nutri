<template>
  <div>
    <v-app-bar id="navbar" absolute light color="transparent" dense flat>
        <v-spacer></v-spacer>

        <AuthMenu></AuthMenu>
    </v-app-bar>
  </div>
</template>

<script>

const AuthMenu = () => import("@/components/Landing/AuthMenu.vue");

export default {
  name: "NavbarLanding",
  components: {
      AuthMenu
  }
};
</script>

<style></style>
