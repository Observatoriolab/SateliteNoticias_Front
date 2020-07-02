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
            <v-btn color="primary" type="submit" @click="login" >Login</v-btn>

      
        <br>
        <p class="mt-2"> Si no,   <a href="/register">Create una cuenta</a></p>

    </v-col>

</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'

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
        ...mapActions([
            'checkLogin'

        ]),
        ...mapGetters({
            userErrorState: 'error_user_state'
        }),
        async login(){
            const userData = {
              user: this.name,
              pass: this.pass
            }
            await this.checkLogin(userData)
            if(this.userErrorState){
                alert('alert1')
                this.$router.push('/main-feed')
            }
            else{
                alert('El nombre de usuario y/o contraseña no se corresponden')
            }
        }
    }
}
</script>
<style lang="scss">
.login-font {
    font-family: "Playfair Display", serif;
}

</style>