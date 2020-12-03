<template>
  <v-row class="flex-column ma-0 fill-height text-center" justify="center">
    <v-col class="px-0 py-0 text-start">
      <v-card-title class="title-font " style="color:blue">

        <a  style="text-decoration:none;font-family: Interstate-Bold" target="_blank" :href="news.fullContent">{{ news.title }}</a>
      </v-card-title>
    </v-col>

    <v-col style="color:#079df0" class="px-5 py-0 text-start">
      {{ changeDateFormat(news.created_at) }}
    </v-col>

    <v-col class="px-0 py-0">
          <div class="content" style="font-family: Interstate-Light-Condensed" v-html="news.content"></div>

    </v-col>
    <v-col class="py-0" cols="12" >
      <v-row >
        <v-col class="d-flex flex-row justify-center " :lg="actualCols===12 ? 1: 1" :md="actualCols===12 ? 1: 1" :sm="4">
          <v-subheader style="font-size:1em"> Eje</v-subheader>
        </v-col>
        <v-col class="" :lg="actualCols===12 ? 4: 5"  :md="actualCols===12 ? 4: 3" :sm="1">
          <v-text-field
            label="Eje"
            placeholder="Ej: Pagos digitales"
            solo
            dense
            readonly
            v-model="news.axis"
          ></v-text-field>          
        </v-col>
        <v-col class="d-flex flex-row justify-center "  :lg="actualCols===12 ? 2: 3"  :md="3" :sm="4">
          <v-subheader style="font-size:1em"> Pais/Region</v-subheader>
        </v-col>
        <v-col  lg="3" :md="actualCols===12 ? 3: 4" :sm="4">
          <v-text-field
            label="Pais/Region"
            placeholder="Ej: Rusia"
            solo
            dense
            readonly
            v-model="news.country"
          ></v-text-field>
        </v-col>
        
      </v-row>
    </v-col>
    <v-col class="py-0" cols="12">
          <v-row>
                <v-col class="d-flex flex-row  px-0" :lg="actualCols===12 ? 1: 3" :md="actualCols===12 ? 3: 4" :sm="4">
                    <v-subheader style="font-size:1em">Eje secundario</v-subheader>
                </v-col>
                <v-col  :lg="actualCols===12 ? 4: 7" :md="actualCols===12 ? 8: 7" :sm="1">
                    <v-text-field
                                    label="Eje"
                                    placeholder="Ej: Pagos digitales"
                                    solo
                                    dense
                                    readonly
                                    v-model="news.secondaryAxis"
                        ></v-text-field>   
                </v-col>
            </v-row>


    </v-col>
    <v-row>
          <v-col  :lg="actualCols===12 ? 1: 2" :md="actualCols===12 ? 2: 3" > 
            <v-subheader style="font-size:1em"> Otros tags: {{this.actualCols}}</v-subheader>
          </v-col>
          <v-col :lg="actualCols===12 ? 10: 9" :md="actualCols===12 ? 9: 7"> 
            <v-combobox
                  v-model="modelo"
                  hide-selected
                  label=""
                  multiple
                  solo
                  readonly
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <span class="subheading">Create</span>
                      <v-chip  label >
                      </v-chip>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attrs, item, selected }">
                    <v-chip
                      v-if="item === Object(item)"
                      v-bind="attrs"
                      :color="`${item.color} lighten-3`"
                      :input-value="selected"
                      label
                    >
                      <span class="pr-2">
                        {{ item.text }}
                      </span>
                      
                    </v-chip>
                  </template>
                  <template v-slot:item="{ index, item }">
                    <v-text-field
                      v-if="editing === item"
                      v-model="editing.text"
                      autofocus
                      flat
                      background-color="transparent"
                      hide-details
                      solo
                      @keyup.enter="edit(index, item)"
                    ></v-text-field>
                    <v-chip v-else :color="`${item.color} lighten-3`" dark label >
                      {{ item.text }}
                    </v-chip>
                    <v-spacer></v-spacer>
                    <v-list-item-action @click.stop>
                      <v-btn icon @click.stop.prevent="edit(index, item)">
                        <v-icon>{{
                          editing !== item ? "mdi-pencil" : "mdi-check"
                        }}</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </template>
            </v-combobox>
          </v-col>    
        
    </v-row>   
      <v-col v-if="showEditionBody" class="py-0  my-0" >
        <v-textarea
          outlined
          name="input"
          label="Edicion"
          v-model="editionBody"
          class="disable-events"
          style="font-size:1.1em"
        ></v-textarea>
    </v-col>
      <v-col v-if="showEditionBody" class="px-4 mb-0">
      <div  style="float:left;  font-size: 1.3em; font-family: Interstate-Light-Condensed" >
          Ultimo editor: {{editionAuthor}} 

      </div>
      <div  style="float:right;font-size: 1.3em;  font-family: Interstate-Light-Condensed">
       
          Numero de ediciones : {{news.author_count}}
       
          
      </div>
    </v-col>
    <v-col cols="12" class="ml-2 my-0 py-0" >
      <v-row>
        <v-col cols="1" class="px-0" style="color:#079df0">
            <p style="font-size:1em"> Relevancia</p>
        </v-col>
        <v-col cols="2" class="px-0">
          <v-rating
              half-increments
              hover
              ripple
              dense
              background-color='blue'
              v-model="rating"
              @input="setRating"
              :readonly="disabling"
            >
            </v-rating>
        </v-col>
        <v-col cols="2" class="px-0">
            <div class="text-left">              
                <p v-if="news.relevance_count !== 0" style="font-size:1em">
                  Basada en {{ news.relevance_count }} lectores
                </p>
            </div>

          </v-col>
          <v-spacer></v-spacer>
      </v-row>
       
    </v-col>
    <v-col cols="12" class="ml-0 my-0 py-0">
        <v-row class="mx-0" >
          <v-col cols="2">
              <v-btn  color="primary" dark  @click="expand">
                  {{ show ? 'Menos informacion' : 'Mas informacion' }}  
              </v-btn>      
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="2">
              <v-btn
                color="primary" dark 
                @click="openEdition(news, indice)"
                :disabled="disableButtonEdit[indice]"
                :key="reRender"
              >
                Editar
              </v-btn>
            
          </v-col>
          
         </v-row>

    </v-col>

  
  </v-row>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "NewsPiece",
  props: {
    news: {
      type: Object,
      required: true
    },
    indice: {
      type: Number,
      required: true
    },
    actualCols:{
      type:Number,
      required: true
    }
  },
  data() {
    return {
      modelo: [],
      rating: 0,
      show: false,
      reRender: 0,
      disabling: false,
      editionBody: '',
      editionAuthor: '',
      showEditionBody: false,
      disableEdit:false,
      colour: "lightgray"
    };
  },
  watch: {
    reRenderNews() {
      this.reRender++;
    }
  },
  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState(["disableButtonEdit", "reRenderNews"]),
    ...mapGetters({
         editionGet: 'edition_full_state'
    }),
    cols () {
      const { lg, sm } = this.$vuetify.breakpoint
      return lg ? [3, 9] : sm ? [9, 3] : [6, 6]
    },
    
  },
  methods: {
    ...mapActions(["ratingNews","getEdition"]),
    ...mapMutations({
      setTags: "SECONDARY_TAGS_SET", // map `this.add()` to `this.$store.commit('increment')`   
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
        case 'December':
          month2 = 'DICIEMBRE'
        break;
      }
      return digitsArray[0] + ' ' + month2 + ' ' + digitsArray[1]
    },
    tagsFormat(tagsToFormat) {
      if(tagsToFormat !== undefined){
          console.log(tagsToFormat.tags[0])
          if(tagsToFormat.tags[0] !== "[]"){
            for(let i = 0; i<tagsToFormat.tags.length; i++){
               this.modelo.push({
                text: tagsToFormat.tags[i],
                color: this.colour
              });
            }
            this.setTags(this.modelo)
            console.log(this.modelo)
          }
          else{
             this.modelo.push({
                text: '',
                color: 'white'
              });
          }
          
      }
      else{
        console.log(this.editionGet.tags)
        console.log(this.editionGet)
        if(this.editionGet.tags !== undefined){
            for(let i = 0; i<this.editionGet.tags.length; i++){
              this.modelo.push({
                text: this.editionGet.tags[i],
                color: this.colour
              });
            }
            console.log(this.modelo)
            this.setTags(this.modelo)         
          }
      }
    },
    setRating() {
      const newsInfo = {
        id: this.news.id,
        rating: this.rating,
        truth: true
      };
      this.ratingNews(newsInfo);
      this.disabling = true;
    },
    openEdition(news, indice) {
      this.$emit("edition-opened", news, indice);
    },
    expand() {
      this.show = !this.show;
      this.$emit("metadata-toggled");
    },
   async getEditionAsync(){
      await this.getEdition(this.news.slug)     
      await this.settingInfo()
      

    },
    async settingInfo(){
      this.editionBody = this.editionGet
      console.log(this.news)
      console.log(this.editionBody)
      if(this.editionBody !== null && this.editionBody !== undefined && this.editionBody.length !== 0){
        this.editionAuthor = this.editionBody.author
        this.editionBody = this.editionBody.body
        this.showEditionBody = true
      }
      if (this.news.user_has_relevanced) {
        this.disabling = true;
      }

    }
  },
  beforeMount() {
    this.rating = this.news.relevance_average    
    this.getEditionAsync()
    console.log(this.news)
    console.log(this.editionGet)
    if(this.editionGet !== undefined ){
      this.tagsFormat(this.editionGet)   
    }
    else{
      this.tagsFormat(this.news)   
    }
    
  }
};
</script>
<style scoped>
.content >>> p {
  color: #414447;
}
a:hover {
    color: rgb(59, 130, 245);
}
</style>
