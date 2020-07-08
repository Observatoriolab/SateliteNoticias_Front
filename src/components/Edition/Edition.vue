<template>
  <div
    style="display:flex; flex-flow:column; position:fixed;width:auto; height:85vh"
  >
    <h1 class="display-2 font-weight-bold mb-7">
      EDITION
      <v-btn
        icon
        style="float:right"
        x-large
        color="pink"
        dark
        @click.stop="closeEdition"
      >
        <v-icon>mdi-close-box</v-icon>
      </v-btn>
    </h1>

    <div
      class="overflowForY"
      style="overflow-y:auto"
      color="grey lighten-5"
      height="100vh"
    >
      <v-card class="flex-column mx-auto mt-2 mb-6 elevation-12">
        <v-container>
          <v-row>
            <v-col cols="12" class="text-center pl-0">
              <v-row class="flex-column ma-0 " justify="center">
                <EditionInfo :editionInfo="editionInfo" />
                <v-col cols="12">
                  <v-divider></v-divider>
                  <Metadata :news="editionInfo" :disableEdit="false"/>
                  <v-btn class="purple" color="primary" dark >
                        Publicar
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import Metadata from "@/components/News/NewsPiece/Metadata.vue";
import EditionInfo from "./EditionInfo.vue";

export default {
  name: "Edition",
  props: {
    editionInfo: Object
  },
  components: {
    Metadata,
    EditionInfo
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
      colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],

      modelo: [
        {
          text: "Foo",
          color: "blue"
        }
      ],
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
      search: null,
      menu2: false,
      allowEditing: false,
      modelo2: null,
      modelo3: null,
      modelo4: null,
      modelo5: null,
      date1: new Date().toISOString().substr(0, 10),
      showEdition: false,
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
      ]
    };
  },
  computed: {},
  methods: {
    closeEdition() {
      this.$emit("close-edition-child", false);
    },
    customFilter(item, queryText) {
      const textOne = item.name.toLowerCase();
      const textTwo = item.abbr.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
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
  },
  created() {}
};
</script>
