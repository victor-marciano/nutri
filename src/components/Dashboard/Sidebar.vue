<template>
  <div>
    <v-navigation-drawer
      v-model="sidebar"
      floating
      :mini-variant="$vuetify.breakpoint.mobile"
      app
      light
      :bottom="$vuetify.breakpoint.mobile"
      dense
      v-if="$vuetify.breakpoint.mdAndUp"
    >
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-content>
            <v-list-title>{{ item.title }}</v-list-title>
          </v-list-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-bottom-navigation
      dark
      hide-on-scroll
      horizontal
      v-else
      app
      shift
      grow
      mandatory
    >
      <v-btn
        x-small
        v-for="(item, index) in items"
        :key="index"
        :to="item.path"
        @click="item.action"
      >
        <span class="green--text">{{ item.title }}</span>
        <v-icon color="green">{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data: () => ({
    sidebar: false,
    items: [
      { title: "Inicio", icon: "mdi-home", path: "/dashboard/home" },
      {
        title: "Calculadoras",
        icon: "mdi-calculator",
        path: "/dashboard/calculadoras",
      },
      { title: "Dietas", icon: "mdi-food-apple", path: "/dashboard/dietas" },
      { title: "Treinos", icon: "mdi-weight-lifter", path: "/dashboard/treinos" },
    ],
  }),

  methods: {
    activateDrawer() {
      this.sidebar = true;
    },
  },
};
</script>

<style></style>
