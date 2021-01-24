<template>
  <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.mobile" width="500px">
    <template v-slot:activator="{ on, attrs }">
    <v-btn text small color="green lighten-2" dark v-on="on" v-bind="attrs">
        Registrar refeição
    </v-btn>
    </template>
     <v-card>
         <v-card-title>
             Registro de refeição
             <v-spacer></v-spacer>
             <v-icon @click="dialog = false">mdi-close</v-icon>
        </v-card-title>

        <v-card-text>
            <v-btn @click="addField" x-small>Adicionar alimento <v-icon size="14" class="mx-1">mdi-plus</v-icon></v-btn>

            <v-row v-for="(foodComplete, index) in foodsComplete" :key="index">
                <v-col cols="7">
                <v-autocomplete
                    v-model="foodComplete.food"
                    label="Alimento"
                    :items="foods"
                    item-text="name"
                    cache-items
                    return-object
                    no-data-text="Nenhum alimento cadastrado"
                    append-icon
                    single-line
                ></v-autocomplete>
                </v-col>
                <v-col cols="3">
                <v-text-field
                    placeholder="Qtd(g)"
                    v-model="foodComplete.qtd"
                ></v-text-field>
                </v-col>
                <v-col cols="1" class="d-inline-flex my-auto">
                    <v-btn icon x-small @click="removeField(index)" :disabled="index === 0">
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="green lighten-2" @click="registerFood">
                Registrar
            </v-btn>
        </v-card-actions>
    </v-card> 

  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '../../../firebase'
import firebase from "firebase/app";

export default {
    name: 'FoodRegister',

    props: {
        diet: Object
    },

    data: () => ({
        dialog: false,
        foodsComplete: [
            { food: {}, qtd: 100}
        ]
    }),

    methods: {
        addField() {
            this.foodsComplete.push({ food: {}, qtd: 100 })
        },
        
        removeField(index) {
            this.foodsComplete.splice(index, 1)
        },

        async registerFood() {
            try {    
                await db.collection("diets").doc(this.diet.uid).update({
                    progress: firebase.firestore.FieldValue.arrayUnion(...this.foodsComplete)
                })

                this.dialog = false
                setTimeout(() => {
                    this.$store.dispatch('fetchDiets')
                }, 2000)
            } catch (error) {
                console.log(error)
            }
        }
    },

    computed: {
        ...mapGetters(['foods'])
    }
}
</script>

<style>

</style>