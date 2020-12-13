<template>
  <div>
      <v-form @submit.prevent="submit">
          <v-row>
              <v-col cols="12" md="12">
                  <v-text-field dense placeholder="Email"></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                  <v-text-field dense placeholder="Nome"></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                  <v-text-field dense placeholder="Assunto"></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                  <v-textarea rows="3" placeholder="Mensagem"></v-textarea>
              </v-col>
          </v-row>
          <v-btn dark type="submit" solo class="green lighten-3">
              Enviar
          </v-btn>
      </v-form>
  </div>
</template>

<script>
export default {
    name: 'ContactForm',

    methods: {
        submit() {
            console.log('submitou')
        }
    }
}
</script>

<style>

</style>