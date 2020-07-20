<template>
  <v-row class="flex-column ma-0 fill-height text-center" justify="center">
    <v-col class="px-0 py-0 text-start">
      <v-card-title class="title-font" style="color:blue">

        <a   target="_blank" :href="news.fullContent">{{ news.title }}</a>
      </v-card-title>
    </v-col>

    <v-col class="px-4 py-0 text-start">
      {{ news.created_at }}
    </v-col>

    <v-col class="px-0 py-0 mb-0">
      <div class="content" v-html="news.content"></div>
    </v-col>
    <v-col v-if="showEditionBody" class="px-4 mb-0">
      <div style="float:left">
          Ultimo editor: {{editionAuthor}} 

      </div>
      <div style="float:right">
        Numero de ediciones : {{news.author_count}}
      </div>
    </v-col>
    
    <v-col v-if="showEditionBody" class="px-0 mb-0">
        <v-textarea
          outlined
          name="input"
          label="Edicion"
          v-model="editionBody"
          class="disable-events"
        ></v-textarea>
    </v-col>
    <v-col class="px-0 py-0">
      <v-row justify="space-around" align="center">
        <div class="text-center ma-0">
          <v-rating
            half-increments
            hover
            ripple
            dense
            v-model="rating"
            @input="setRating"
            :readonly="disabling"
          >
          </v-rating>
          <p v-if="news.relevance_count !== 0">
            Basada en {{ news.relevance_count }} usuarios
          </p>
        </div>
        <v-btn
          color="blue"
          @click="openEdition(news, indice)"
          :disabled="disableButtonEdit[indice]"
          :key="reRender"
        >
          <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>
        <v-btn color="darkGray" @click="expand">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";

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
    }
  },
  data() {
    return {
      rating: 0,
      show: false,
      reRender: 0,
      disabling: false,
      editionBody: '',
      editionAuthor: '',
      showEditionBody: false
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
    })
  },
  methods: {
    ...mapActions(["ratingNews","getEdition"]),

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
    
  }
};
</script>
<style lang="scss"></style>
