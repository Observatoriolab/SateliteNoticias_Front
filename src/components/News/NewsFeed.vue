<template>
  <div>
    <h3 style="color:#005aa1" class="display-2 font-weight-bold mb-7">
      {{ title }}
    </h3>
    <div v-if="loadingDailyNews"> 
        <div      
          v-show="title === 'INFORME DIARIO'"
          v-for="(item, i) in dailyNews"
          v-bind:key="i"
        >
        <!-- :actualCols='12' columnas significa que usa todo el espacio-->
           <NewsPiece :news="item" :indice="i" v-on:edition-opened="openEdition" :actualCols="actualCols" />
        </div>
    </div>

    <div v-else-if="loadingNews"> 
        <div      
          v-show="title === 'NOTICIAS DETECTADAS POR EL SATELITE'"
          v-for="(item, i) in allNews"
          v-bind:key="i"
        >
        <!-- :actualCols='12' columnas significa que usa todo el espacio-->
           <NewsPiece :news="item" :indice="i" v-on:edition-opened="openEdition" :actualCols="actualCols" />
        </div>
    </div>
    <div v-else-if="loadingTrendingNews">
        <div
          v-show="title === 'NOTICIAS EN TENDENCIA'"
          v-for="(item, i) in trendingNews"
          v-bind:key="i * -1 - 1"
        >
          <NewsPiece :news="item" :indice="i" v-on:edition-opened="openEdition" :actualCols="actualCols"/>
        </div>
    </div>
   
    <div class="text-center">
      <v-btn
        v-show="title === 'NOTICIAS DETECTADAS POR EL SATELITE'"
        rounded
        color="primary"
        dark
        @click="getnewsLoadMore"
        :disabled="disableButtonLoadMore"
        >Cargar mas
      </v-btn>
      <v-btn
        v-show="title === 'INFORME DIARIO'"
        rounded
        color="primary"
        dark
        @click="getDailyNewsLoadMore(infoDailyNews)"
        :disabled="disableButtonLoadMoreDaily"
        >Cargar mas
      </v-btn>
      <v-btn
        v-show="title === 'NOTICIAS EN TENDENCIA'"
        rounded
        color="primary"
        dark
        @click="getTrendingNewsLoadMore"
        :disabled="disableButtonLoadMoreTrending"
        >Cargar mas
      </v-btn>
    </div>
  </div>
</template>

<script>
import { apiService } from "@/common/api.service.js";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";

import NewsPiece from "@/components/News/NewsPiece/NewsPiece.vue";
export default {
  name: "NewsFeed",
  props: {
    title: String,
    actualCols: Number
  },
  components: {
    NewsPiece
  },
  watch: {
    search() {
      // Items have already been loaded
      if (this.items.length > 0) return;

      // Items have already been requested
      if (this.isLoading) return;

      this.isLoading = true;

      // Lazily load input items
      fetch("https://api.publicapis.org/entries")
        .then(res => res.json())
        .then(res => {
          const { count, entries } = res;
          this.count = count;
          this.entries = entries;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },

    modelo(val, prev) {
      if (val.length === prev.length) return;

      this.modelo = val.map(v => {
        if (typeof v === "string") {
          v = {
            text: v,
            color: this.colors[this.nonce - 1]
          };

          this.comboItems.push(v);

          this.nonce++;
        }

        return v;
      });
    }
  },

  data: () => ({

    infoDailyNews:{type:'Informe Diario BC', newsPerPage:10},
    localNews: [
      {
        title: "1",
        content: "content1"
      },
      {
        title: "2",
        content: "content2"
      },
      {
        title: "3",
        content: "content3"
      },
      {
        title: "4",
        content: "content4"
      }
    ],
    search: null,
    show: [],
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
    activator: null,
    attach: null,
    colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
    editing: null,
    item: null,
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
    modelo2: null,
    modelo3: null,
    modelo4: null,
    modelo5: null,
    date1: new Date().toISOString().substr(0, 10),

    itemIndexPrior: -1
  }),
  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState([
      "credential",

      "trendingNewsFeedNews",

      "selectedNews",
      "disableButtonEdit",

      "disableButtonLoadMoreDaily",
      "disableButtonLoadMore",
      "disableButtonLoadMoreTrending",

      "newsHighlighterIndex",
      "reRenderNews",
      "pageNumbersNews",
      
      "loadingDailyNews",
      "loadingNews",
      "loadingTrendingNews"
    ]),
    ...mapGetters({
        dailyNews:'all_daily_news',
        allNews: 'all_mainfeed_news',
        trendingNews: 'all_trendingfeed_news'
    })
  },
  methods: {
    ...mapActions([
        "getDailyNewsLoadMore", 
        "getnewsLoadMore", 
        "getTrendingNewsLoadMore",
        "getUpdatedNews",
        "getUpdatedTrendingNews",
        "getUpdatedDailyNews"
        ]),
    ...mapMutations({
      store: "STORE_CREDENTIAL", // map `this.add()` to `this.$store.commit('increment')`
      updateIndex: "UPDATE_HIGHLIGHTER_INDEX"
    }),

    highlighter(index) {
      console.log(index);
      if (this.selectedNews[index] == false) {
        this.$set(this.selectedNews, index, true);
        this.$set(this.disableButtonEdit, index, true);
      }
      console.log(this.newsHighlighterIndex);
      if (
        index !== this.newsHighlighterIndex &&
        this.newsHighlighterIndex !== -1
      ) {
        this.$set(this.selectedNews, this.newsHighlighterIndex, false);
        this.$set(this.disableButtonEdit, this.newsHighlighterIndex, false);
      }
      this.updateIndex(index);
    },
    openEdition(item, index) {
      console.log("abri la edicion");
      this.$emit("open-edition", item);
      this.highlighter(index);
    },

    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
    save() {
      this.hasSaved = true;
    },
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.index = index;
      } else {
        this.editing = null;
        this.index = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = val => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    },
    expand(i) {
      console.log("I was clicked");
      console.log(this.show[i]);
      this.$set(this.show, i, !this.show[i]);
    },
    async delayedNews(item) {
      await apiService(item).then(data => {
        this.updatedNews.push(...data.results);
      });
    },
    async getnews() {
      for (const [idx, url] of this.pageNumbers.entries()) {
        console.log(idx);
        await this.delayedNews(url);
      }
      for (var i = 0; i < this.updatedNews.length; i++) {
        this.$set(this.news, i, this.updatedNews[i]);
      }
      this.updatedNews.splice(0);
      console.log(this.news);
      this.updateNews += 1;
    }
  },
  created() {
    window.sessionStorage.setItem("credential", this.credential);
    console.log(this.pageNumbersNews)
    console.log(this.title)
    if(this.title === 'NOTICIAS DETECTADAS POR EL SATELITE'){
        this.getUpdatedNews()

    }
    else if(this.title === 'INFORME DIARIO'){
        this.getUpdatedDailyNews()
    }
    else{
        this.getUpdatedTrendingNews()

    }
  },
  beforeMount(){
    
    /*if (window.sessionStorage.getItem("credential") === null) {
      window.sessionStorage.setItem("credential", this.credential);

      this.getnewsLoadMore();
      this.getTrendingNewsLoadMore();
    }*/

  },
  destroyed(){
  },
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
