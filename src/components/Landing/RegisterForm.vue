<template>
  <v-form @submit.prevent="submit">
    <v-text-field
      v-model="email"
      outlined
      placeholder="Email"
      dense
      type="email"
    ></v-text-field>
    <v-text-field
      v-model="password"
      outlined
      placeholder="Senha"
      dense
      type="password"
    ></v-text-field>
    <v-text-field
      v-model="name"
      outlined
      placeholder="Nome"
      dense
    ></v-text-field>
    <v-btn :loading="loading" type="submit" width="100%" small>Registrar</v-btn>
  </v-form>
</template>

<script>
import { auth } from "../../firebase";

export default {
  name: "RegisterForm",
  data: () => ({
    loading: false,
    email: "",
    password: "",
    name: ""
  }),

  methods: {
    async submit() {
      this.loading = true;
      const that = this;

      try {
        const response = await auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        await response.user.updateProfile({ displayName: that.name });
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
