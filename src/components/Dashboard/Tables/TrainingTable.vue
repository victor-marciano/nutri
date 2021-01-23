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
      <v-icon size="28" class="mx-3">{{ notification.icon }}</v-icon>
      {{ notification.text }}
    </v-snackbar>

    <v-data-table
      :headers="headers"
      :items="userTrainings"
      class="elevation-0"
      :dense="$vuetify.breakpoint.mobile"
      disable-sort
      :loading="loading"
      loading-text="Carregando seus treinos... aguarde!"
      no-data-text="Você ainda não possui nenhum treino cadastrado"
      no-results-text="Nenhum resultado para sua busca"
      locale="pt-BR"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Meus Treinos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <v-spacer></v-spacer>

          <v-tooltip open-on-hover activator="#btnTrainingRefresh">
            <span>Atualizar</span>
          </v-tooltip>

          <v-btn
            id="btnTrainingRefresh"
            color="orange darken-4"
            dark
            class="mb-2"
            icon
            @click="updateTable"
          >
            <v-icon>
              mdi-refresh
            </v-icon>
          </v-btn>

          <TrainingForm @submited="showNotification($event)"></TrainingForm>
          <TrainingGenerator></TrainingGenerator>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <TrainingActive
          :training="item"
          @complete="showNotification($event)"
        ></TrainingActive>
        <TrainingInfo :training="item"></TrainingInfo>
        <TrainingExport :training="item"></TrainingExport>
        <TrainingDelete
          :training="item"
          @complete="showNotification($event)"
        ></TrainingDelete>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const TrainingForm = () =>
  import("@/components/Dashboard/Trainings/TrainingForm.vue");
const TrainingInfo = () =>
  import("@/components/Dashboard/Trainings/TrainingInfo.vue");
const TrainingDelete = () =>
  import("@/components/Dashboard/Trainings/TrainingDelete.vue");
const TrainingActive = () =>
  import("@/components/Dashboard/Trainings/TrainingActive.vue");
const TrainingExport = () =>
  import("@/components/Dashboard/Trainings/TrainingExport.vue");
const TrainingGenerator = () =>
  import("@/components/Dashboard/Trainings/TrainingGenerator.vue");

export default {
  components: {
    TrainingInfo,
    TrainingDelete,
    TrainingActive,
    TrainingForm,
    TrainingExport,
    TrainingGenerator
  },

  data: () => ({
    dialog: false,
    notification: {
      show: false,
      text: "",
      icon: "",
      color: ""
    },
    loading: false,

    headers: [
      { text: "Nome", value: "name" },
      { text: "Objetivo", value: "objective" },
      { text: "Início", value: "start" },
      { text: "Término", value: "finish" },
      { text: "Ações", value: "actions", sortable: false }
    ]
  }),

  methods: {
    async updateTable() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },

    showNotification(v) {
      this.notification = v;
    }
  },

  computed: {
    ...mapGetters(["user", "userTrainings", "activeTraining"])
  }
};
</script>

<style lang="scss"></style>
