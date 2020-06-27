import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: "#005aa1",
        secondary: "#079df0",
        accent: "#720062",
        error: "#C10016",
        info: "#00CFB4",
        success: "#279F00",
        warning: "#e8bc0e"
      }
    }
  }
});
