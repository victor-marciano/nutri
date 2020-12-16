<template>
  <div>
    <v-snackbar
      app
      elevation="5"
      top
      right
      :timeout="3000"
      v-model="notification"
    >
      {{ notificationText }}
    </v-snackbar>

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
              <v-dialog v-model="photoDialog">
                  <template v-slot:activator="{ on }">
                      <v-avatar size="164" color="green" v-on="on">
                          <img
                              :src="user.photoURL || require('../../../assets/user.png')"
                              width="100%"
                              contain
                          >
                      </v-avatar> 
                      <v-badge
                          bordered
                          color="orange darken-4"
                          icon="mdi-camera"
                          overlap
                          offset-y="60"
                          offset-x="25"
                      >
                      </v-badge>                   
                  </template>
                  <v-card>
                      <v-card-title>Foto do perfil</v-card-title>
                      <v-card-text>Formatos aceitos: JPG, PNG</v-card-text>
                      <v-form id="photoForm" @submit.prevent="updateUserPhoto">
                        <v-card-text>
                              <v-image-input 
                                  v-model="profilePhoto"
                                  clearable
                                  :imageHeight="100"
                                  imageFormat="jpg"
                                  imageMinScaling="contain"
                              >
                              </v-image-input>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text color="red" @click="photoDialog = false">Cancelar</v-btn>
                            <v-btn type="submit" text color="green lighten-3">Enviar</v-btn>
                        </v-card-actions>
                      </v-form>
                  </v-card>
              </v-dialog>
          </div>

          <v-list
            two-line
            subheader
          >
            <v-subheader>Dados</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Email</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                
              </v-list-item-content>
              
              <v-list-item-action>
                <v-btn x-small icon v-if="user.emailVerified">
                  <v-icon size="24" color="green lighten-2">mdi-check</v-icon>
                </v-btn>
                <v-btn x-small dark color="green lighten-2" v-else @click="verifyEmail">Verificar</v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item @click="resetPassword">
              <v-list-item-content>
                <v-list-item-title>Senha</v-list-item-title>
                <v-list-item-subtitle>Solicitar redefinição de senha</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            
            <v-divider></v-divider>

            <v-dialog v-model="removeDialog">
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
                          @click="removeDialog = false"
                      >
                          Cancelar
                      </v-btn>
                      <v-btn
                          color="red darken-1"
                          text
                          @click="deleteAccount"
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
  </div>
</template>

<script>
import { auth, storage } from "../../../firebase";
import { mapGetters } from "vuex";
import VImageInput from 'vuetify-image-input/a-la-carte';

export default {
    name: 'ProfileDialog',
    components: {
        VImageInput
    },

    data: () => ({
        dialog: false,
        removeDialog: false,
        photoDialog: false,
        profilePhoto: null,
        notification: false,
        notificationText: ''
    }),

    methods: {
        async resetPassword() {
          const user = auth.currentUser
          console.log(user.email)
            try {
                await auth.sendPasswordResetEmail(user.email)
            } catch (error) {
                console.log(error)
            }
        },
        
        async verifyEmail() {
          const user = auth.currentUser
            try {
                await user.sendEmailVerification()
                console.log('enviou')
            } catch (error) {
                console.log(error)
            }
        },
        
        async deleteAccount() {
            const user = auth.currentUser
            try {
                await user.delete()
            } catch (error) {
                console.log(error)
            }
        },

        async updateUserPhoto() {
            const user = auth.currentUser
            const that = this

            try {
                const file = await storage.ref('profile/').child(`${user.uid}.jpeg`).putString(that.profilePhoto, 'data_url', { contentType: 'image/jpeg'})
                await user.updateProfile({ photoURL: await file.ref.getDownloadURL() })
                this.photoDialog = false
            } catch (error) {
                console.log(error)
            }
        }
    },

    computed: {
      ...mapGetters([
        'user'
      ])
    }
}
</script>

<style>

</style>