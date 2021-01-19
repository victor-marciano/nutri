<template>
  <v-card shaped elevation="4">
    <v-card-title>{{ training.name }}</v-card-title>

    <v-card-text>
    <v-chip class="ma-2" ripple>
        <v-icon class="mr-2">
            mdi-dumbbell
        </v-icon>
        {{
        training.trainings.length
        }} Treinos por semana
    </v-chip>
    <v-chip ripple class="ma-2">
        <v-icon class="mr-2">
            {{ trainingGenderIcon }}
        </v-icon>
        Treino {{ training.gender || "Unissex" }}
    </v-chip>
    <v-chip ripple class="ma-2">
        <v-icon class="mr-2">
            {{ trainingTypeIcon.icon }}
        </v-icon>
        {{ training.type }}
    </v-chip>
    </v-card-text>
    <v-card-actions>
        <v-chip
      class="ma-2"
      color="orange darken-3"
      text-color="white"
      x-small
      v-if="training.editorChoice"
    >
      <b>Escolha do editor</b>
      <v-icon right size="12">
        mdi-star
      </v-icon>
    </v-chip>
    <v-spacer></v-spacer>

    <TrainingInfo :training="training" system></TrainingInfo>
    <TrainingSave
        :training="training"
        @complete="showNotification"
    ></TrainingSave>
    </v-card-actions>

    </v-card>
</template>

<script>
const TrainingInfo = () => import('@/components/Dashboard/Trainings/TrainingInfo.vue')
const TrainingSave = () => import('@/components/Dashboard/Trainings/TrainingSave.vue')

export default {
    name: 'TrainingCard',
    components: {
        TrainingInfo,
        TrainingSave,
    },

    props: {
        training: Object
    },

    data: () => ({
        gender: '',
        types: [
            { name: 'Musculação', icon: 'mdi-weight-kilogram' },
            { name: 'Aeróbico', icon: 'mdi-run-fast' },
        ]
    }),

    mounted() {
        this.gender = this.training.gender
    },

    computed: {
        trainingGenderIcon (){
            if (this.gender === 'Masculino') {
                return 'mdi-gender-male'
            } else if (this.gender === 'Feminino') {
                return 'mdi-gender-female'
            } else {
                return 'mdi-gender-male-female'
            }
        },

        trainingTypeIcon () {
            return this.types.find(type => this.training.type === type.name)
        }

    }

}
</script>

<style>

</style>