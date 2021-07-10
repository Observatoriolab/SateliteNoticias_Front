<template>
  <v-col cols="12" justify="center" align="center" class="auth-box login-font">
    <h1>Crea tu propia cuenta en Satelite de Noticias</h1>
    <div>
      <v-text-field
        v-model="name"
        label="Nombre"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
        outlined
      ></v-text-field>
      <v-text-field
        outlined
        v-model="pass"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPassword ? 'text' : 'password'"
        name="input-10-2"
        label="Contraseña"
        value=""
        class="input-group--focused"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <v-text-field
        outlined
        v-model="pass2"
        :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="showPassword2 ? 'text' : 'password'"
        name="input-10-2"
        label="Confirmar contraseña"
        value=""
        class="input-group--focused"
        @click:append="showPassword2 = !showPassword2"
      ></v-text-field>
      <v-btn color="primary" type="submit" @click="registerAccountLocal"
        >Crear cuenta</v-btn
      >
      <p class="mt-2">O <a href="/">Devuelvete al login</a></p>
    </div>
    <br />
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Registration",

  components: {},
  data: () => ({
    name: "",
    pass: "",
    pass2: "",

    email: "",
    showPassword: false,
    showPassword2: false,
    variable: null,
    items: [
      { icon: "mdi-contacts", text: "Contacts" },
      { icon: "mdi-history", text: "Frequently contacted" },
      { icon: "mdi-content-copy", text: "Duplicates" }
    ],
    rules: {
      required: value => !!value || "Requerido",
      min: v => v.length >= 8 || "Min 8 caracteres"
    },
    emailRules: [
      v => !!v || "El email es requerido",
      v => /.+@.+\..+/.test(v) || "Email debe ser valido"
    ]
  }),
  created() {},
  beforeUpdate() {},
  computed: {
     ...mapGetters({
         userErrorState: "error_user_state"
    }),
  },
  methods: {
    ...mapActions(["registerAccount"]),
    registerAccountLocal() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.pass
      };
      console.log(this.pass,this.pass2)
      if(this.pass === this.pass2){
        this.registerAccount(user);
      }
      else{
        alert('Las contraseñas no corresponden')
      }
    }
  }
};
</script>
<style lang="scss">
.login-font {
  font-family: "Playfair Display", serif;
}
</style>
