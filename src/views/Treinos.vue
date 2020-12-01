<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <TrainingTable></TrainingTable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const TrainingTable = () =>
  import("@/components/Dashboard/Tables/TrainingTable.vue");

export default {
  components: {
    TrainingTable,
  },
};
</script>

<style></style>
