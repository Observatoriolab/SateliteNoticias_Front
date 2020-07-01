<template>
  <v-container fluid >
    <v-row fluid class="mt-3">
      <div v-show="!drawer && !edition">
        <v-btn
          contained
          fab
          fixed
          color="primary"
          dark
          x-large
          width="8%"
          class="rounded-0"
          @click.stop="trendingDrawerOpen"
        >
          TRENDING
        </v-btn>
      </div>
      <v-btn
        v-show="drawer && !edition"
        contained
        fab
        fixed
        right
        color="pink"
        dark
        large
        @click.stop="trendingDrawerClose"
      >
        <v-icon>mdi-window-minimize</v-icon>
      </v-btn>
      <v-btn
        v-show="drawer && edition"
        contained
        fab
        fixed
        left
        color="pink"
        dark
        large
        @click.stop="trendingDrawerClose"
      >
        <v-icon>mdi-window-minimize</v-icon>
      </v-btn>
      <v-col v-show="drawer" :cols="newsFeedColumn" class="text-center mb-4">
     
           <NewsFeed :title="'TRENDING'" />

      </v-col>

      <v-col
        v-show="(!drawer && !edition) || (!drawer && edition)"
        :cols="newsFeedColumn"
        class="text-center mb-4"
      >
      
           <NewsFeed :title="'NEWS FEED'" v-on:open-edition="openEditionNews" />
        
      </v-col>
      <v-col v-show="edition" class="text-center" cols="6">
          <Edition :editionInfo="item"  v-on:close-edition-child="closeEditionChild" />      
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewsFeed from '@/components/News/NewsFeed.vue'
import Edition from '@/components/Edition/Edition.vue'

export default {
  name: "MainFeed",
  components:{
        NewsFeed,
        Edition
  },

  data: () => ({
    menu2: false,
    show: [],
    show2: [],
    rating: null,
    endpoint: "http://satelite-de-noticias.herokuapp.com/api/news/",
    news: [],
    updateNews: 0,
    updatedNews: [],
    pageNumbers: [],
    next: null,
    content: null,
    contentFlag: false,
    disableButton: false,
    drawer: false,
    drawer2: false,
    edition: false,
    edit2: false,
    activator: null,
    attach: null,
    colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
    editing: null,
    index: -1,
    item: {title: '', content:''},
    item2: null,
    comboItems: [
      { header: "Select an option or create one" },
      {
        text: "Foo",
        color: "blue"
      },
      {
        text: "Bar",
        color: "red"
      }
    ],
    nonce: 1,
    menu: false,
    modelo: [
      {
        text: "Foo",
        color: "blue"
      }
    ],
    x: 0,
    search: null,
    y: 0,
    allowEditing: true,

    model: null,
    states: [
      { name: "Florida", abbr: "FL", id: 1 },
      { name: "Georgia", abbr: "GA", id: 2 },
      { name: "Nebraska", abbr: "NE", id: 3 },
      { name: "California", abbr: "CA", id: 4 },
      { name: "New York", abbr: "NY", id: 5 }
    ],
    ejes: [
      { name: "Big Data", abbr: "BD", id: 1 },
      { name: "Pagos Digitales", abbr: "PD", id: 2 },
      { name: "CBCD", abbr: "CBCD", id: 3 },
      { name: "Criptoactivos", abbr: "CA", id: 4 },
      { name: "Banca abierta", abbr: "OB", id: 5 },
      { name: "Ciberseguridad", abbr: "CS", id: 5 },
      { name: "Monitoreo Tecnologico", abbr: "MT", id: 5 },
      { name: "DLT", abbr: "DLT", id: 5 }
    ],
    regiones: [
      { name: "Florida", abbr: "FL", id: 1 },
      { name: "Georgia", abbr: "GA", id: 2 },
      { name: "Nebraska", abbr: "NE", id: 3 },
      { name: "California", abbr: "CA", id: 4 },
      { name: "New York", abbr: "NY", id: 5 }
    ],
    organismos: [
      { name: "Florida", abbr: "FL", id: 1 },
      { name: "Georgia", abbr: "GA", id: 2 },
      { name: "Nebraska", abbr: "NE", id: 3 },
      { name: "California", abbr: "CA", id: 4 },
      { name: "New York", abbr: "NY", id: 5 }
    ],
    modelo2: null,
    modelo3: null,
    modelo4: null,
    modelo5: null,
    date1: new Date().toISOString().substr(0, 10),
    showEdition: false,
    newsFeedColumn: 12,
    selected: [],
    disabling: [],
    selected2: [],
    disabling2: [],
    itemIndexPrior: -1,
    itemIndexActual: 0,

    itemIndexPrior2: -1,
    itemIndexActual2: 0,
    actualIndex: -1,
    trendingScrollingPosition: 0,
    normalFeedScrollingPosition: 0
  }),

  methods: {
    openEditionNews: function(itemData){
        console.log("paso por aqui")
        console.log(itemData)
        
        this.item = itemData
        this.newsFeedColumn = 6
        this.edition = true
        console.log(this.edition)
    },
    closeEditionChild(closingDrawer) {
        console.log(closingDrawer)
        this.edition = closingDrawer;
        console.log(closingDrawer)
        console.log(this.actualIndex);
        this.newsFeedColumn = 12;
        this.$set(this.selected, this.actualIndex, false);
        this.$set(this.disabling, this.actualIndex, false);
      
    },
    trendingDrawerOpen() {
      this.drawer = true;
      if (this.edition) {
        this.edition = false;
      }
    },
    trendingDrawerClose() {
      this.drawer = false;
      this.closeEditionChild(true);
    }
    
   
  },
  created() {
    
    document.title = "Satelite de Noticias";
  }
 
};
</script>
<style lang="scss">
.content {
  padding: 1em;
  font-size: 2rem;
  text-align: justify;
  text-justify: inter-cluster;
}
.acolor {
  color: black;
}
</style>
