<template>
  <v-app>
    <v-app-bar id="home-app-bar" app color="white" elevation="1" height="80">
      <v-spacer />

      <div>
        <v-menu bottom :offset-y="true" :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Dropdown
            </v-btn>
          </template>
          <v-tabs vertical>
            <v-tab>
              <v-icon left>mdi-account</v-icon>
              Option 1
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
      </div>
      <v-spacer />

      <v-menu transition="slide-y-transition" bottom :offset-y="true">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="purple" color="primary" dark v-bind="attrs" v-on="on">
            <v-icon>mdi-account</v-icon>
            {{ requestUser }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="item in accountItems" :key="item.title">
            <v-btn @click="logout(item.title)"
              ><v-icon> {{ item.icon }} </v-icon> {{ item.title }}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <HelloWord />
    </v-main>
  </v-app>
</template>

<script>
import HelloWord from "@/components/HelloWorld";
import { apiService } from "@/common/api.service.js";

export default {
  name: "App",

  components: {
    HelloWord
  },

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
    accountItems: [
      { title: "My Account", icon: "mdi-account", ref: "" },
      { title: "Log in", icon: "mdi-logout", ref: "" },
      { title: "Log out", icon: "mdi-logout", ref: "" }
    ],
    items: [
      { title: "Configuracion", icon: "mdi-cog-outline" },
      { title: "Logout", icon: "mdi-logout-variant" }
    ],
    requestUser: null,
    credential: null

    //
  }),
  methods: {
    //En ves de usar .then, dejarlo asincrono
    async setUserInfo() {
      let endpoint =
        "http://satelite-de-noticias.herokuapp.com/api/rest-auth/login/ ";
      await apiService(endpoint, "POST", {
        username: "admin",
        password: "adminpass"
      }).then(data => {
        this.credential = data["key"];
        console.log(this.credential);

        //Lo deje en el local storage del browser para ser usado y corroborar que es el usuario
        window.localStorage.setItem("credential", this.credential);
        this.getUsername();
      });
    },
    async logout(title) {
      var endpoint;
      if (title == "Log out") {
        endpoint =
          "http://satelite-de-noticias.herokuapp.com/api/rest-auth/logout/";
        await apiService(endpoint, "POST", undefined, this.credential).then(
          data => {
            console.log("me sali chavos ", data);
          }
        );
      } else if (title == "Log in") {
        this.setUserInfo();
      } else {
        endpoint = "http://satelite-de-noticias.herokuapp.com/api/news/";
        await apiService(endpoint, "GET", undefined, this.credential).then(
          data => {
            console.log("la data v8");
            console.log(data);
          }
        );
      }
    },
    async getUsername() {
      const data = await apiService(
        "http://satelite-de-noticias.herokuapp.com/api/user/",
        false,
        undefined,
        this.credential
      );
      this.requestUser = data["username"];
      console.log("este es el username: ", this.requestUser);
    }
  },
  created() {
    this.setUserInfo();
  }
};
</script>
