<template>
  <v-dialog v-model="dialog" :width="$vuetify.breakpoint.mobile ? '' : '500px'">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" icon :disabled="training.active">
        <v-icon>
          mdi-check-circle
        </v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title
        >Você gostaria de trocar para {{ training.name }}</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false">Não</v-btn>
        <v-btn @click="setActiveTraining">Sim</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { db } from "../../../firebase";

export default {
  name: "TrainingActive",
  props: {
    training: Object
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    async setActiveTraining() {
      try {
        await Promise.all([
          db
            .collection("trainings")
            .doc(this.activeTraining.uid)
            .update({ active: false }),
          db
            .collection("trainings")
            .doc(this.training.uid)
            .update({ active: true })
        ]);

        this.$emit("complete", {
          show: true,
          color: "success",
          icon: "mdi-check-circle",
          text: `${this.training.name} agora é o seu treino ativo`
        });

        this.dialog = false;
        this.$store.dispatch("fetchTrainings");
      } catch (error) {
        this.$emit("complete", {
          show: true,
          color: "error",
          icon: "mdi-close",
          text: `Falha ao trocar de treino`
        });
      }
    }
  },

  computed: {
    ...mapGetters(["activeTraining"])
  }
};
</script>
