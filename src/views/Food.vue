<template>
  <div>
    <FoodIterator></FoodIterator>
  </div>
</template>

<script>
const FoodIterator = () =>
  import("@/components/Dashboard/Tables/FoodIterator.vue");
export default {
  name: "Food",
  components: {
    FoodIterator
  }
};
</script>

<style></style>
