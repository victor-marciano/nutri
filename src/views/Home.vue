<template>
  <div class="home">
    
  </div>
</template>

<script>
import { auth } from "../firebase";

export default {
  name: "Home",
  components: {},

  methods: {
    async logout() {
      try {
        await auth.signOut();
        this.$router.replace({ name: "landing" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
