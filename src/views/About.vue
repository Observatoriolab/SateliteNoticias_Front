<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 class="theStylish">This is an about page2</h1>
    <h1 class="theStylish">{{ credentials }}</h1>

    <button @click="callingAxios">Hacer login</button>
    <button @click="callingAxios0">Crear usuario</button>
    <button @click="callingAxios2">Sacar noticias</button>
  </div>
</template>
<script>
// @ is an alias to /src
import { apiService } from "@/common/api.service.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      credentials: null
    };
  },
  methods: {
    callingAxios0() {
      alert("me apretaron 0  owo");
      let endpoint =
        "https://satelite-de-noticias.herokuapp.com/api/rest-auth/registration/";
      apiService(endpoint, "POST", {
        username: "admin10",
        email: "admin10@gmail.com",
        password1: "passwordodes2",
        password2: "passwordodes2",
        is_staff: false
      }).then(data => {
        alert(data.key);
        this.credentials = data.key;
      });
    },
    callingAxios() {
      alert("me apretaron owo");
      let endpoint =
        "https://satelite-de-noticias.herokuapp.com/api/rest-auth/login/";
      apiService(endpoint, "POST", {
        username: "admin10",
        password: "passwordodes2"
      }).then(data => {
        alert(data.key);
        this.credentials = data.key;
      });
    },
    callingAxios2() {
      alert("me apretaron2 owo");
      let endpoint2 = "https://satelite-de-noticias.herokuapp.com/api/news/";
      apiService(endpoint2, "GET", undefined, this.credentials).then(data => {
        console.log(data);
      });
    }
  }
};
</script>

<style lang="scss"></style>
