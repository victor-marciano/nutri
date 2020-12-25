<template>
  <div>
    <v-navigation-drawer
      v-model="sidebar"
      floating
      :mini-variant="$vuetify.breakpoint.mdAndUp"
      app
      dark
      :bottom="$vuetify.breakpoint.mobile"
      dense
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img
            :src="user.photoURL || require('../../assets/user.png')"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{ user.displayName }}</v-list-item-title>

        <v-spacer></v-spacer>

        <ProfileDialog></ProfileDialog>
      </v-list-item>

      <template v-slot:append>
        <v-list :dense="$vuetify.breakpoint.mdAndUp" class="px-2">
          <v-tooltip open-on-hover right transition="slide-x-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item
                class="px-2"
                ripple
                to="/dashboard/alimentos"
                v-on="on"
                v-bind="attrs"
              >
                <v-list-item-icon>
                  <v-icon color="green lighten-2">mdi-fruit-cherries</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="'Alimentos'"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>

            <span>Alimentos</span>
          </v-tooltip>
          

          <v-dialog 
            v-model="configDialog" 
            :fullscreen="$vuetify.breakpoint.mobile"
            :width="$vuetify.breakpoint.mobile ? '100%' : '500px'"
          >
            <template v-slot:activator="{ on, attrs }">              
              <v-tooltip activator="#configListItem" open-on-hover right transition="slide-x-transition">
                <span>Configurações</span>
              </v-tooltip>

              <v-list-item id="configListItem" class="px-2" ripple v-on="on" v-bind="attrs">
                <v-list-item-icon>
                  <v-icon color="green lighten-2">mdi-cog</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="'Configurações'"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            
            <v-toolbar color="green lighten-3">
              <v-toolbar-title>Configurações</v-toolbar-title>
            </v-toolbar>
              <v-card>
                <v-card-text>
                  Tema
                  <v-switch v-model="$vuetify.theme.dark">
                    <template v-slot:label>
                      Escuro
                    </template>
                  </v-switch>
                </v-card-text>
              </v-card>
          </v-dialog>

          <v-tooltip open-on-hover right transition="slide-x-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item
                class="px-2"
                @click="logout"
                ripple
                v-on="on"
                v-bind="attrs"
              >
                <v-list-item-icon>
                  <v-icon color="green lighten-2">mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="'Sair da conta'"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <span>Sair da conta</span>
          </v-tooltip>
        </v-list>
      </template>

      <v-list
        v-if="!$vuetify.breakpoint.mobile"
        :dense="$vuetify.breakpoint.mdAndUp"
      >
        <v-tooltip
          open-on-hover
          right
          transition="slide-x-transition"
          v-for="item in items"
          :key="item.name"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on" :to="item.path">
              <v-list-item-icon>
                <v-icon color="green lighten-2" >{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <span>{{ item.title }}</span>
        </v-tooltip>
      </v-list>
    </v-navigation-drawer>

    <v-bottom-navigation
      dark
      hide-on-scroll
      v-if="$vuetify.breakpoint.mobile"
      app
      shift
      grow
      mandatory
    >
      <template v-slot:default>
        <v-btn x-small to="/dashboard/home">
          <span class="green--text">Inicio</span>
          <v-icon size="20" color="green">mdi-home</v-icon>
        </v-btn>
        <v-btn x-small to="/dashboard/calculadoras">
          <span class="green--text">Calculadora</span>
          <v-icon size="20" color="green">mdi-calculator</v-icon>
        </v-btn>
        <v-btn x-small to="/dashboard/dietas">
          <span class="green--text">Dieta</span>
          <v-icon size="20" color="green">mdi-food-apple</v-icon>
        </v-btn>
        <v-btn x-small to="/dashboard/treinos">
          <span class="green--text">Treino</span>
          <v-icon size="20" color="green">mdi-weight-lifter</v-icon>
        </v-btn>
        <v-btn x-small @click="teste">
          <v-icon size="20" color="green">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { auth } from "../../firebase";
import { mapGetters } from "vuex";

const ProfileDialog = () =>
  import("@/components/Dashboard/Dialogs/ProfileDialog.vue");

export default {
  name: "Sidebar",
  components: {
    ProfileDialog
  },

  data: () => ({
    sidebar: false,
    items: [
      { title: "Inicio", icon: "mdi-home", path: "/dashboard/home" },
      {
        title: "Calculadora",
        icon: "mdi-calculator",
        path: "/dashboard/calculadoras"
      },
      { title: "Dietas", icon: "mdi-food-apple", path: "/dashboard/dietas" },
      {
        title: "Treinos",
        icon: "mdi-weight-lifter",
        path: "/dashboard/treinos"
      }
    ]
  }),

  created() {
    if (this.$vuetify.breakpoint.mdAndUp) {
      this.sidebar = true;
    }
  },

  methods: {
    teste() {
      this.sidebar = true;
    },

    async logout() {
      try {
        await auth.signOut();
        this.$router.replace({ name: "landing" });
      } catch (error) {
        console.log(error);
      }
    }
  },

  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style lang="scss">
.v-item-group.v-bottom-navigation .v-btn {
  min-width: 70px;
}

@media (max-width: 990px) {
  .v-navigation-drawer {
    height: auto !important;
  }
}
</style>
