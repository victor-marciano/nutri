<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="green lighten-3" dark v-bind="attrs" v-on="on" icon>
        <v-icon size="28">
          mdi-account-plus
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="green lighten-3">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <v-toolbar-title>Acessar Plataforma</v-toolbar-title>
      </v-toolbar>

      <v-tabs light grow centered color="green" v-model="tab">
        <v-tab>Login</v-tab>
        <v-tab>Cadastro</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="pa-3">
        <v-tab-item><AuthForm></AuthForm></v-tab-item>
        <v-tab-item><RegisterForm></RegisterForm></v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
const AuthForm = () => import("@/components/Landing/AuthForm.vue");
const RegisterForm = () => import("@/components/Landing/RegisterForm.vue");

export default {
  name: "AuthMobileMenu",
  components: {
    RegisterForm,
    AuthForm
  },

  data: () => ({
    dialog: false,
    tab: 0
  })
};
</script>

<style></style>
