<template>
  <div style="display:flex ; justify-content:space-between; width:100%">
    <v-spacer />
    <v-menu bottom :offset-y="true" :close-on-content-click="false">
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
    <v-spacer />
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
  </div>
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
