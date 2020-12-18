<template>
  <div>
    <v-container>
      <v-card flat>
        <v-card-title>Criar dieta</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field dense placeholder="Refeição"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field dense placeholder="Qtd"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn text>Cancelar</v-btn>
          <v-btn text>Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "DietForm"
};
</script>

<style></style>
