<template>
  <div>
    <v-menu
      light
      eager
      offset-y
      :close-on-content-click="false"
      max-width="400"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          solo
          dark
          color="green lighten-3"
          v-on="on"
          v-bind="attrs"
          v-if="$vuetify.breakpoint.mdAndUp"
        >
          Login
        </v-btn>
        <v-btn large light v-on="on" v-bind="attrs" v-else icon>
          <v-icon>
            mdi-menu
          </v-icon>
        </v-btn>
      </template>
      <v-tabs light grow centered color="green" v-model="tab">
        <v-tab>Login</v-tab>
        <v-tab>Cadastro</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="pa-3">
        <v-tab-item><AuthForm></AuthForm></v-tab-item>
        <v-tab-item><RegisterForm></RegisterForm></v-tab-item>
      </v-tabs-items>
    </v-menu>
  </div>
</template>

<script>
const RegisterForm = () => import("@/components/Landing/RegisterForm.vue");
const AuthForm = () => import("@/components/Landing/AuthForm.vue");

export default {
  name: "AuthMenu",
  components: {
    RegisterForm,
    AuthForm
  },

  data: () => ({
    tab: 1
  })
};
</script>

<style></style>
