<template>
  <div class="calculators">
    <div v-if="$vuetify.breakpoint.mobile">
      <v-tabs
        v-model="tab"
        :vertical="$vuetify.breakpoint.mdAndUp"
        :show-arrows="$vuetify.breakpoint.mobile"
        :grow="$vuetify.breakpoint.mobile"
        :centered="$vuetify.breakpoint.mobile"
        color="green lighten-3"
      >
        <v-tab>IMC</v-tab>
        <v-tab>TMB</v-tab>
        <v-tab>Gasto calórico</v-tab>
        <v-tab>Peso ideal</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="pa-3">
        <v-tab-item><IMC></IMC></v-tab-item>
        <v-tab-item><TMB></TMB></v-tab-item>
        <v-tab-item>4</v-tab-item>
        <v-tab-item><PesoIdeal></PesoIdeal></v-tab-item>
      </v-tabs-items>
    </div>

    <div v-else>
      <v-row>
        <v-col cols="3">
          <v-treeview
            :active.sync="active"
            :items="items"
            activatable
            color="success"
            open-on-click
            transition
            hoverable
            item-key="name"
          >
            <template v-slot:prepend="{ item }">
              <v-icon v-if="!item.children">
                mdi-calculator
              </v-icon>
            </template>
          </v-treeview>
        </v-col>

        <v-divider vertical inset></v-divider>

        <v-col cols="4" class="d-flex justify-center text-center">
          <v-scroll-y-transition mode="out-in">
            <div
              v-if="!selected"
              class="title grey--text text--lighten-1 font-weight-light"
              style="align-self: center;"
            >
              Selecione uma calculadora
            </div>

            <component
              v-else
              v-bind:is="selected.name"
              :key="selected.name"
            ></component>
          </v-scroll-y-transition>
        </v-col>

        <v-divider vertical inset></v-divider>

        <v-col cols="3" class="d-flex text-center">
          <v-scroll-y-transition mode="out-in">
            a
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
const IMC = () => import("@/components/Dashboard/Calculators/IMC.vue");
const TMB = () => import("@/components/Dashboard/Calculators/TMB.vue");
const PesoIdeal = () =>
  import("@/components/Dashboard/Calculators/PesoIdeal.vue");

export default {
  name: "Calculadoras",
  components: {
    IMC,
    TMB,
    PesoIdeal
  },

  data: () => ({
    tab: 0,
    open: [],
    active: [],
    calculators: [{ name: "IMC" }, { name: "PesoIdeal" }, { name: "TMB" }]
  }),

  created() {
    this.active[0] = "IMC";
  },

  computed: {
    items() {
      return [
        {
          name: "Calculadoras",
          children: this.calculators
        }
      ];
    },
    selected() {
      if (!this.active.length) return undefined;
      const name = this.active[0];

      return this.calculators.find(calculator => calculator.name === name);
    }
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 991px) {
  .calculators {
    height: 100vh;
  }
}
</style>
