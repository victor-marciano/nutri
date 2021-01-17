<template>
  <v-card shaped elevation="4">
    <v-card-title class="text-center">{{ diet.name }}</v-card-title>
    
    <v-card-subtitle>
        <v-rating
            color="orange darken-3"
            background-color="orange darken-3"
            empty-icon="$ratingFull"
            half-increments
            small
            dense
        ></v-rating>
    </v-card-subtitle>

    <v-card-subtitle>Descrição da dieta Descrição da dieta Descrição da dieta Descrição da dieta Descrição da dieta Descrição da dieta Descrição da dieta Descrição da dieta Descrição da dieta </v-card-subtitle>

    <v-card-text>
        <v-divider></v-divider>
        <p class="body-1 my-2">Total de Macros</p>
        <div class="d-flex justify-space-around my-4 text-center">
            <div>
                <p>Calorias</p>
                <v-chip  color="green lighten-1" dark>
                    200kcal
                </v-chip>
            </div>
            <div>
                <p>Carbohidrato</p>
                <v-chip color="green lighten-1" dark>
                    200g
                </v-chip>
            </div>
            <div>
                <p>Proteínas</p>
                <v-chip color="green lighten-1" dark>
                    200g
                </v-chip>
            </div>
            <div>
                <p>Gorduras</p>
                <v-chip color="green lighten-1" dark>
                    200g
                </v-chip>
            </div>
        </div>

        <v-divider></v-divider>
    </v-card-text>

    <v-card-actions>
        <v-spacer></v-spacer>

        <DietInfo :diet="diet" system></DietInfo>
        <DietSave :diet="diet"></DietSave>
    </v-card-actions>
    </v-card>
</template>

<script>
const DietInfo = () => import('@/components/Dashboard/Diets/DietInfo.vue')
const DietSave = () => import('@/components/Dashboard/Diets/DietSave.vue')

export default {
    name: 'DietCard',
    components: {
        DietInfo,
        DietSave
    },

    props: {
        diet: Object
    },
}
</script>

<style>

</style>