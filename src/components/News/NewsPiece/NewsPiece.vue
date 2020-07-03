<template>
    <div>
    <v-card
          class="flex-column mx-auto mt-6 mb-6 elevation-12"
          width="60%"
        >
          <v-container :class="{ highlight: selectedNews[indice] }" :key="reRenderNews">
            <v-row>
              <v-col cols="12" class="text-center pl-0 px-0 py-0">
                  <NewsInfo :news="news" :indice="indice" v-on:edition-opened="openEdition" v-on:metadata-toggled="toggleMetadata"/>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>
                    <v-row class="px-4 py-0" justify="center" align="center">
                      <v-col cols="12" class="py-0">
                        <v-row justify="space-between">
                          <v-col cols="12">
                            <h5>Etiquetas</h5>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              label="Eje"
                              placeholder="Ej: Pagos digitales"
                              outlined
                            ></v-text-field>
                            <v-text-field
                              label="Pais/Region"
                              placeholder="Ej: Rusia"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              label="Organismo"
                              placeholder="Ej: FinTech"
                              outlined
                            ></v-text-field>
                            <v-text-field
                              label="Fecha"
                              placeholder="Placeholder"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col align-self="start" cols="12" class="py-0">
                        <v-combobox
                          v-model="modelo"
                          :filter="filter"
                          :hide-no-data="!search"
                          :items="comboItems"
                          :search-input.sync="search"
                          hide-selected
                          label="Search for an option"
                          multiple
                          small-chips
                          solo
                        >
                          <template v-slot:no-data>
                            <v-list-item>
                              <span class="subheading">Create</span>
                              <v-chip
                                :color="`${colors[nonce - 1]} lighten-3`"
                                label
                                small
                              >
                                {{ search }}
                              </v-chip>
                            </v-list-item>
                          </template>
                          <template
                            v-slot:selection="{ attrs, item, parent, selected }"
                          >
                            <v-chip
                              v-if="item === Object(item)"
                              v-bind="attrs"
                              :color="`${item.color} lighten-3`"
                              :input-value="selected"
                              label
                              small
                            >
                              <span class="pr-2">
                                {{ item.text }}
                              </span>
                              <v-icon small @click="parent.selectItem(item)"
                                >close</v-icon
                              >
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
                            <v-chip
                              v-else
                              :color="`${item.color} lighten-3`"
                              dark
                              label
                              small
                            >
                              {{ item.text }}
                            </v-chip>
                            <v-spacer></v-spacer>
                            <v-list-item-action @click.stop>
                              <v-btn
                                icon
                                @click.stop.prevent="edit(index, item)"
                              >
                                <v-icon>{{
                                  editing !== item ? "mdi-pencil" : "mdi-check"
                                }}</v-icon>
                              </v-btn>
                            </v-list-item-action>
                          </template>
                        </v-combobox>
                      </v-col>
                      <v-col class="text-center py-0" cols="12">
                        <h5>Bibliografia</h5>
                      </v-col>
                      <v-col cols="6">
                        <v-autocomplete
                          v-model="modelo2"
                          :items="states"
                          :filter="customFilter"
                          item-text="name"
                          label="Nombre"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field label="Link"></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                </v-expand-transition>
              </v-col>
            </v-row>
          </v-container>
        </v-card> 
    </div>
    
</template>
<script>
import { mapState } from 'vuex'
import NewsInfo from '@/components/News/NewsPiece/NewsInfo.vue'

export default {
    name:'NewsPiece',
    props: {
      news: {
        type: Object,
        required: true
      },
      indice:{
        type:Number,
        required:true
      }
    },
    components:{
        NewsInfo
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
    data(){
        return{
            search: null,
            activator: null,
            attach: null,
            rating:null,
            editing: null,
            item: null,
            show: false,
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
            date1: new Date().toISOString().substr(0, 10),
        }
    },
    computed: {
    // mix this into the outer object with the object spread operator
    ...mapState([
        'credential',
        'pageNumbersNews',
        'newsFeedNews',
        'selectedNews',
        'disableButtonEdit',
        'disableButtonLoadMore',
        'newsHighlighterIndex',
        'reRenderNews'
    ])
  },
    methods:{
        openEdition(news,indice){
            this.$emit('edition-opened',news,indice)

        },
        toggleMetadata(){
            this.show = !this.show
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
        expand() {
            console.log("I was clicked");
            console.log(this.show);
            this.show = !this.show
        },
    }
}
</script>
<style lang="scss">

</style>