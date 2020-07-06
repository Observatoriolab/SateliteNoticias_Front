<template>
  <div>
    <v-card class="flex-column mx-auto mt-6 mb-6" width="50%">
      <v-container
        :class="{ highlight: selectedNews[indice], noHighlight: reRenderNews }"
      >
        <v-row>
          <v-col cols="12" class="text-center pl-0 px-0 py-0">
            <NewsInfo
              :news="news"
              :indice="indice"
              v-on:edition-opened="openEdition"
              v-on:metadata-toggled="toggleMetadata"
            />
          </v-col>
          <v-col cols="12" class="py-0">
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <Metadata />
              </div>
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import NewsInfo from "./NewsInfo.vue";
import Metadata from "./Metadata.vue";

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
  components: {
    NewsInfo,
    Metadata
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
  data() {
    return {
      search: null,
      activator: null,
      attach: null,
      rating: null,
      editing: null,
      item: null,
      show: false,
      isLoading:false,
      count:0,
      entries:null,
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
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
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
      date1: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState([
      "credential",
      "pageNumbersNews",
      "newsFeedNews",
      "selectedNews",
      "disableButtonEdit",
      "disableButtonLoadMore",
      "newsHighlighterIndex",
      "reRenderNews"
    ])
  },
  methods: {
    openEdition(news, indice) {
      this.$emit("edition-opened", news, indice);
    },
    toggleMetadata() {
      this.show = !this.show;
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
    }
  }
};
</script>
<style lang="scss"></style>
