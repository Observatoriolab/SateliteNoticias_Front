<template>
  <v-container fluid>
    <v-row fluid class="mt-3">      
      <v-col v-show="trendingDrawer" :cols="mainfeedColumns" class="text-center mb-4">
        <NewsFeed :title="'NOTICIAS EN TENDENCIA'" v-on:open-edition="openEditionNews" :actualCols="mainfeedColumns" />
      </v-col>

      <v-col
        v-show="(!trendingDrawer && !editionDrawer) || (!trendingDrawer && editionDrawer)"
        :cols="mainfeedColumns"
        class="text-center mb-4"
      >
        <NewsFeed :title="'NOTICIAS DETECTADAS POR EL SATELITE'" v-on:open-edition="openEditionNews" :actualCols="mainfeedColumns" />
      </v-col>
      <v-col v-if="editionStateToggle" class="text-center" cols="6" :key="reRenderKey">
        <Edition
          :news="item"
          v-on:close-edition-child="closeEditionChild"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewsFeed from "@/components/News/NewsFeed.vue";
import Edition from "@/components/Edition/Edition.vue";

import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "MainFeed",
  components: {
    NewsFeed,
    Edition
  },

  data: () => ({
    menu2: false,
    show: [],
    show2: [],
    rating: null,
    endpoint: "https://satelite-de-noticias.herokuapp.com/api/news/",
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
    item: { title: "", content: "" },
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
    reRenderKey:0,
    drawerMenu: false
  }),
  computed: {
    ...mapState(["newsHighlighterIndex","editionDrawer","trendingDrawer","mainfeedColumns"]),
    ...mapGetters({
        editionStateToggle : 'edition_toggle_state'
    })
  },

  methods: {
    ...mapMutations({
      unhighlightNews: "SET_HIGHLIGHTER",
      reRender: "RERENDER_UPDATE",
      editionToggle:"EDITION_TOGGLE_SET" ,
      trendingToggle: "TRENDING_TOGGLE_SET",
      columnsToggle:"MAINFEED_COLUMNS_SET",
      alreadyOpened: "EDITION_ALREADY_OPENED_SET",
      setNewsAtEdition: "PIECE_OF_NEWS_WHEN_EDITION_SET"
    }),
    ...mapActions(["getEdition"]),
    async openEditionNews(itemData) {
      if(this.editionDrawer){
        await this.getEdition(itemData.slug)
        await this.editionToggle(false)
      }
      console.log("paso por aqui");
      console.log(itemData);

      this.item = itemData;
      this.setNewsAtEdition(itemData)
      //this.newsFeedColumn = 6;
      this.columnsToggle(6)
      console.log(this.editionDrawer)
      
      this.editionToggle(true)
      //this.editionDrawer = true;

      console.log(this.editionDrawer);
    },
    outOfDrawer(value){
      this.drawerMenu = value
    },
    closeEditionChild(closingDrawer) {
      console.log(closingDrawer);
      //this.editionDrawer = closingDrawer;
      this.editionToggle(closingDrawer)

      console.log(this.actualIndex);
      //this.newsFeedColumn = 12;
      this.columnsToggle(12)
      this.unhighlightNews({ index: this.newsHighlighterIndex, truth: false });
      this.reRender();
    },
    trendingDrawerOpen() {
      this.trendingToggle(true)
      //this.trendingDrawer = true;
      if (this.editionDrawer) {
        this.editionToggle(false)
        //this.editionDrawer = false;
      }
      
    },
    trendingDrawerClose() {
      this.trendingToggle(false)
      //this.trendingDrawer = false;
      //this.newsFeedColumn = 12;
      this.columnsToggle(12)

    },
    openSideMenu() {
      this.drawerMenu = !this.drawerMenu

    }
    
  },
  created() {}
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
