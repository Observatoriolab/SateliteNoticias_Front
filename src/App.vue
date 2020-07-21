<template>
  <v-app>
    <v-app-bar
      v-show="
        this.$router.currentRoute.name !== 'Login' &&
          this.$router.currentRoute.name !== 'Registration'
      "
      id="home-app-bar"
      app
      color="white"
      elevation="1"
      width="100vw"
      height="84vh"
    >
      <AppBar />
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/Banner/AppBar.vue";

export default {
  name: "App",

  components: {
    AppBar
  },

  data() {
    return {
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
    };
  },
  methods: {},
  created() {
    document.title = "Satelite de Noticias";
  },

};
</script>
<style lang="scss">
#app {
  font-family: 'Neoteric', serif;
}
</style>