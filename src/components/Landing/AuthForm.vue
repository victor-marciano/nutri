<template>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-model="email"
      outlined
      placeholder="Email"
      dense
    ></v-text-field>
    <v-text-field
      v-model="password"
      outlined
      placeholder="Senha"
      type="password"
      dense
    ></v-text-field>
    <v-btn :loading="loading" width="100%" small type="submit">Entrar</v-btn>
  </v-form>
</template>

<script>
import { auth } from "../../firebase";

export default {
  name: "AuthForm",
  data: () => ({
    email: "",
    password: "",
    loading: false
  }),

  methods: {
    async submit() {
      this.loading = true;

      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        this.$router.push({ path: "/dashboard/home" });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style></style>
