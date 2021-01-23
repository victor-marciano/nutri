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
    
    <v-btn class="my-3" small width="100%" @click="googleLogin">
      Login com google 
      <v-icon small class="mx-2">mdi-google</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
import { auth } from "../../firebase";
import firebase from 'firebase/app'

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
    },

    async googleLogin () {
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        await firebase.auth().signInWithPopup(provider)
        this.$router.replace({ path: "/dashboard/home"})
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<style></style>
