<template>
    <v-col cols="12" justify="center" align="center" class="auth-box login-font">
        <h1>Satelite de noticias</h1>
        <p class="lead text-muted"> Comparte tu opinion!</p>

            <v-text-field
                v-model="name"
                label="Nombre"
                required
                outlined
            ></v-text-field>
            <v-text-field
                 outlined
                v-model="pass"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-2"
                label="Contraseña"
                value=""
                class="input-group--focused"
                @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-btn color="primary" type="submit" @click="checkLogin" >Login</v-btn>

      
        <br>
        <p class="mt-2"> Si no,   <a href="/register">Create una cuenta</a></p>

    </v-col>

</template>

<script>
import { apiService } from "@/common/api.service.js";

export default {
    name: 'Login',

    components: {

    },
    data: () => ({
        name:'',
        pass:"",
        showPassword: false,
        variable: null,
        items: [
            { icon: 'mdi-contacts', text: 'Contacts' },
            { icon: 'mdi-history', text: 'Frequently contacted' },
            { icon: 'mdi-content-copy', text: 'Duplicates' },
        ],
        rules: {
          required: value => !!value || 'Requerido'
        },
    }),
    created(){
    },
    beforeUpdate(){
    },
    computed:{
    },
    methods:{

         checkLogin(){
             let endpoint = "http://satelite-de-noticias.herokuapp.com/api/rest-auth/login/ ";
             apiService(endpoint, "POST", {
                username: this.name,
                password: this.pass
            }).then(data => {
                this.credential = data["key"];
                if(this.credential !== undefined){
                    alert('ola')
                    window.localStorage.setItem("credential", this.credential);
                    this.$router.push('/main-feed')
                }
                else{
                    alert("error usuario")
                }

                //Lo deje en el local storage del browser para ser usado y corroborar que es el usuario
                
            });

            
        }
    }

}
</script>
<style lang="scss">
.login-font {
    font-family: "Playfair Display", serif;
}

</style>