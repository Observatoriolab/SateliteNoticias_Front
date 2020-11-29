<template>
  <v-row >
    <v-col cols="4">
        <v-img  :contain="true" src="https://zgot96v0sy7nu3esdgzyza-on.drv.tw/newsServer/imagenes/OT1.jpeg"  :max-height="'100%'"  :max-width="'20%'">

       </v-img>
    </v-col>
    <v-col cols="5" align-self="end">
      <v-row align="center" justify="end" class="mr-3">
        <h3 style="color:#005aa1" class="display-3 font-weight-bold mb-7 ">
           SATELITE DE NOTICIAS
         </h3>
      </v-row>

    </v-col>

    <v-col cols="3" class="pb-0" align-self="center">
      <v-row align="center" justify="end" class="mr-3 pt-3">
            <h3 class="pr-3" style="color:#005aa1">Usuario:  </h3>
          
          <v-menu transition="slide-y-transition" bottom :offset-y="true">
            <template v-slot:activator="{ on, attrs }">
              
              <v-btn class="purple" color="primary" dark v-bind="attrs" v-on="on">
                <v-icon>mdi-account</v-icon>
                {{ username }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="item in items" :key="item.title">
                <v-btn @click="logouto"
                  ><v-icon> {{ item.icon }} </v-icon> {{ item.title }}
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>

      </v-row>

    </v-col>
    
   <!-- <v-menu bottom :offset-y="true" :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Dropdowns
        </v-btn>
      </template>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-account</v-icon>
          <a href="/">Option 1</a>
        </v-tab>
        <v-tab>
          <v-icon left>mdi-lock</v-icon>
          Option 2
        </v-tab>
        <v-tab>
          <v-icon left>mdi-access-point</v-icon>
          Option 3
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Contenido, botones, etc
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Contenido, botones, etc
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Contenido, botones, etc
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-menu>
    -->
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "App",

  components: {},

  data: () => ({
    categories: [
      "Big Data",
      "Pagos Digitales",
      "CBCD",
      "Criptoactivos",
      "Banca abierta",
      "Ciberseguridad",
      "Monitoreo tecnologico",
      "DLT"
    ],
    accountToggle: false,
    items: [
      { title: "Configuracion", icon: "mdi-cog-outline" },
      { title: "Logout", icon: "mdi-logout-variant" }
    ],
    requestUser: null,
    credential: null

    //
  }),
  computed: {
    ...mapState(["username"])
  },
  methods: {
    ...mapActions(["setUserInfo", "logout"]),
    ...mapGetters({
      usernameUserState: "username_user_state"
    }),
    logouto() {
      this.logout();
      this.$router.push("/");
    }
  },

  created() {
    if (window.sessionStorage.getItem("credential") === null) {
      this.requestUser = window.sessionStorage.getItem("username");
    }
  }
};
</script>
