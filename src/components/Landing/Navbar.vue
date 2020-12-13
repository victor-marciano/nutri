<template>
  <div>
    <v-app-bar id="navbar" absolute light color="transparent" dense flat>
        <v-spacer></v-spacer>

        <AuthMenuMobile v-if="$vuetify.breakpoint.mobile"></AuthMenuMobile>
        <AuthMenu v-else></AuthMenu>
    </v-app-bar>
  </div>
</template>

<script>

const AuthMenu = () => import("@/components/Landing/AuthMenu.vue");
const AuthMenuMobile = () => import("@/components/Landing/AuthMenuMobile.vue");

export default {
  name: "NavbarLanding",
  components: {
      AuthMenu,
      AuthMenuMobile
  }
};
</script>

<style></style>
