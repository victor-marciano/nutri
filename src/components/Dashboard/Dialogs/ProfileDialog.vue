<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="green lighten-2"
          v-bind="attrs"
          v-on="on"
          text
          small
        >
          Editar perfil
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="green lighten-3"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>Perfil</v-toolbar-title>
        </v-toolbar>

        <div class="d-flex justify-center align-center my-5">
            <v-avatar size="128" color="green">
                <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                >
            </v-avatar>
        </div>
        <v-file-input>
        </v-file-input>
        <v-list
          two-line
          subheader
        >
          <v-subheader>Dados</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Email</v-list-item-title>
              <v-list-item-subtitle>Altere seu email</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          
          <v-list-item @click="resetPassword">
            <v-list-item-content>
              <v-list-item-title>Senha</v-list-item-title>
              <v-list-item-subtitle>Solicitar redefinição de senha</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          
          <v-divider></v-divider>

          <v-dialog>
              <template v-slot:activator="{ on }">
                <v-list-item v-on="on">
                    <v-list-item-content>
                    <v-list-item-title>Excluir conta</v-list-item-title>
                    <v-list-item-subtitle>Remove completamente sua conta</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
              </template>
              <v-card>
                  <v-card-title>Confirmar exclusão</v-card-title>
                  <v-card-text>
                    <p class="body-1">Deseja realmente excluir sua conta?</p>
                    <small>Esta ação não poderá ser desfeita.</small><br>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="red darken-1"
                        text
                        @click="dialog = false"
                    >
                        Excluir
                    </v-btn>
                    </v-card-actions>
              </v-card>
          </v-dialog>
        </v-list>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { auth } from "../../../firebase";

export default {
    name: 'ProfileDialog',
    data: () => ({
        dialog: false,
        removeDialog: false
    }),

    methods: {
        async resetPassword() {
            const user = auth.currentUser
            try {
                await auth.sendPasswordResetEmail(user.email)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>

</style>