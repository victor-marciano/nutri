<template>
  <div>
    <v-snackbar
      app
      elevation="10"
      rounded="xl"
      :timeout="3000"
      top
      right
      v-model="notification.show"
      :color="notification.color"
    >
      <v-icon size="24" class="mx-3">{{ notification.icon }}</v-icon>
      {{ notification.text }}
    </v-snackbar>

    <v-data-table
      :headers="headers"
      :items="userDiets"
      class="elevation-0"
      :dense="$vuetify.breakpoint.mobile"
      no-data-text="Você não possui nenhuma dieta cadastrada"
      no-results-text="Nenhum resultado para a sua busca"
      disable-sort
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Minhas dietas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>

          <v-tooltip open-on-hover activator="#btnDietRefresh">
            <span>Atualizar</span>
          </v-tooltip>

          <v-btn
            id="btnDietRefresh"
            color="orange darken-4"
            dark
            class="mb-2"
            icon
          >
            <v-icon>
              mdi-refresh
            </v-icon>
          </v-btn>

          <DietForm @submited="showNotification($event)"></DietForm>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <DietActive
          :diet="item"
          @complete="showNotification($event)"
        ></DietActive>
        <DietInfo :diet="item"></DietInfo>
        <DietExport :diet="item"></DietExport>
        <DietDelete
          :diet="item"
          @complete="showNotification($event)"
        ></DietDelete>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const DietInfo = () => import("@/components/Dashboard/Diets/DietInfo.vue");
const DietActive = () => import("@/components/Dashboard/Diets/DietActive.vue");
const DietDelete = () => import("@/components/Dashboard/Diets/DietDelete.vue");
const DietForm = () => import("@/components/Dashboard/Diets/DietForm.vue");
const DietExport = () => import("@/components/Dashboard/Diets/DietExport.vue");

export default {
  components: {
    DietInfo,
    DietDelete,
    DietActive,
    DietForm,
    DietExport
  },

  data: () => ({
    notification: {
      show: false,
      text: "",
      icon: "",
      color: ""
    },
    dialog: false,

    headers: [
      { text: "Nome", value: "name" },
      { text: "Objetivo", value: "objective" },
      { text: "Início", value: "start" },
      { text: "Término", value: "finish" },
      { text: "Ações", value: "actions", sortable: false }
    ]
  }),

  computed: {
    ...mapGetters(["userDiets"])
  },

  methods: {
    showNotification(v) {
      this.notification = v;
    }
  }
};
</script>
