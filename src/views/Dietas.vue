<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <DietTable></DietTable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const DietTable = () => import("@/components/Dashboard/Tables/DietTable.vue");

export default {
  components: {
    DietTable
  }
};
</script>

<style></style>
