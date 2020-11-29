<template>
  <div v-if="loading" class="">
    <v-col class="px-0 text-center">
      <v-card-title style="font-family: Interstate-Bold" class="title-font">
          <a  style="text-decoration:none;font-family: Interstate-Bold" target="_blank" :href="openedNewsAtEdition.fullContent">{{ openedNewsAtEdition.title }}</a>
      </v-card-title>
    </v-col>
     <v-col style="font-family: Interstate-Light-Condensed; color:#079df0" class="px-4 py-0 text-start">
      {{ changeDateFormat(news.created_at) }}
    </v-col>


    <v-col style="font-family: Interstate-Light-Condensed" class="px-0 mb-0">
      <div class="content" v-html="openedNewsAtEdition.content"></div>
    </v-col>

    <v-row class="px-4 py-0 text-start">
      <v-col cols="6" style="font-size: 1.3em; font-family: Interstate-Light-Condensed">

          {{this.localEdition === undefined || this.localEdition === null ? '':'Ultimo editor: '+ this.localEdition.author}}

      </v-col>
      <v-col cols="6">
        <div style="float:right">
            <v-btn color="pink" dark @click="allowEditing = !allowEditing">
              <v-icon>{{ allowEditing ? "mdi-pencil" : "mdi-pencil-off" }}</v-icon>
            </v-btn>
        </div>
        
      </v-col>
    </v-row>

    <v-col cols="12" class="px-0 mb-0">
      <v-textarea
        outlined
        name="input"
        label="Edicion"
        v-model="editionText"
        :disabled="allowEditing"
      ></v-textarea>
    </v-col>

    
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState} from "vuex";
export default {
  name: "EditionInfo",
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  watch: {
    editionText(val) {
      this.editionSet(val);
    }
  },
  data() {
    return {
      allowEditing: true,
      editionText: "",
      localEdition: null,
      loading: false
    };
  },
  computed: {
    ...mapState(["openedNewsAtEdition"]),
    ...mapGetters({
         editionGet: 'edition_full_state'
    })
  },
  methods: {
    ...mapMutations({
      editionSet: "EDITION_BODY_SET" // map `this.add()` to `this.$store.commit('increment')`
    }),
    changeDateFormat(date){
      let monthPattern = /([A-Z])\w+/i;
      let month = date.match(monthPattern)[0]
      let month2 = null
      let digitsPatt = /-?\d(?:[,\d]*\.\d+|[\d]*)/g;
      let digitsArray = date.match(digitsPatt)
      console.log(month)
      switch (month) {
        case 'January':
          month2 = 'ENERO'          
        break;
        case 'February':
          month2 = 'FEBRERO'
        break;
        case 'March':
          month2 = 'MARZO'
        break;
        case 'April':
          month2 = 'ABRIL'
        break;
        case 'May':
          month2 = 'MAYO'
        break;
        case 'June':
          month2 = 'JUNIO '
        break;
        case 'July':
          month2 = 'JULIO'
        break;
        case 'August':
          month2 = 'AGOSTO'
        break;
        case 'September':
          month2 = 'SEPTIEMBRE'
        break;
        case 'October':
          month2 = 'OCTUBRE'
        break;
        case 'November':
          month2 = 'NOVIEMBRE'
        break;
        case 'Dicember':
          month2 = 'DICIEMBRE'
        break;
      }
      return digitsArray[0] + ' ' + month2 + ' ' + digitsArray[1]
    },
  },
  created() {
    console.log("Por aqui pasan las noticias")
  
    this.localEdition = this.editionGet
    if(this.localEdition !== undefined && this.localEdition !== null){
         this.editionText = this.localEdition.body;

    }
    this.loading = true
  }
};
</script>
<style scoped>
a:hover {
    color: rgb(59, 130, 245);
}

</style>
