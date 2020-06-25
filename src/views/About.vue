<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 class="theStylish">This is an about page2</h1>
    <button @click="callingAxios">un boton mas</button>

  </div>
</template>
<script>
// @ is an alias to /src
import { apiService } from "@/common/api.service.js";

export default {
  name: "Home",
  components: {
    
  },
  methods:{
    callingAxios(){
      alert("me apretaron owo")
      apiService('https://satelite-de-noticias.herokuapp.com/api/news/','GET','511689fa91844a15910736215dcf0ac07cbce4ad').then(data => {
        console.log(data)
      });
    
    }
  }
};
</script>

<style lang="scss">
.theStylish{
  color:blue,
}
</style>