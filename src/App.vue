<template>
  <v-app>
    <v-navigation-drawer    
      v-model="drawer"
       v-if="
        this.$router.currentRoute.name !== 'Login' &&
          this.$router.currentRoute.name !== 'Registration'
      "
      app
      clipped
      permanent
      class="pt-4"
      color="white"
    >
      <SidePanel />
    </v-navigation-drawer>

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
      height="150vh"
      clipped-left
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
import SidePanel from "@/components/Banner/SidePanel.vue";

export default {
  name: "App",

  components: {
    AppBar,
    SidePanel
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
      credential: null,
      drawer:null
    };
  },
  methods: {
    outOfDrawer(){

    }
  },
  created() {
    document.title = "Satelite de Noticias";
  },

};
</script>
<style lang="scss">

</style>