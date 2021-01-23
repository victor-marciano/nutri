<template>
  <div>
    <v-app-bar id="navbar" app light>
      <v-toolbar-title>
        <v-img
          src="../../assets/horizontalLogo2.png"
          :width="$vuetify.breakpoint.mobile ? '200px' : ''"
        ></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
