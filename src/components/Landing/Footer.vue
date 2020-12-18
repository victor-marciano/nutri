<template>
  <v-footer dark padless class="green lighten-3">
    <v-card flat tile width="100%" class="green lighten-3 text-center">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        @{{ new Date().getFullYear() }} — <strong>Nutrimars</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-instagram", "mdi-facebook", "mdi-whatsapp"]
  })
};
</script>

<style></style>
