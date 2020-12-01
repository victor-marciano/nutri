<template>
  <div>
    <Sidebar></Sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
const Sidebar = () => import("@/components/Dashboard/Sidebar.vue");

export default {
  name: "Dashboard",
  components: {
    Sidebar,
  },
};
</script>

<style></style>
