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
import { auth, db } from "../../firebase";

export default {
  name: "RegisterForm",
  data: () => ({
    loading: false,
    email: "",
    password: "",
    name: "",
  }),

  methods: {
    submit() {
      this.loading = true;

      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async (response) => {
          await Promise.all([
            response.user.updateProfile({ displayName: name }),
            db
              .collection("users")
              .doc(response.user.uid)
              .set({
                name: name,
              }),
          ]);

          this.$router.push({ path: "/dashboard/home" });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style></style>
