<template>
  <v-app>
      <v-app-bar id="home-app-bar" app
                 color="white" elevation="1" 
                 height="80" width="100vw">  
                         
                   <AppBar />    
      </v-app-bar>
      <v-main>
          <router-view />
      </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/Banner/AppBar.vue"
import { apiService } from "@/common/api.service.js";

export default {
  name: "App",

  components: {
    AppBar
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
