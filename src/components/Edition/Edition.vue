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
                      <v-col class="px-0 text-center">
                        <v-card-title class="">
                          {{ editionInfo.title }}
                        </v-card-title>
                      </v-col>

                      <v-col style="margin:0; padding:0" class="px-0 mb-0 mt-0">
                        <v-row class="px-0 mb-0 mt-0" justify="space-around">
                          <font>autor</font>
                          <font>fecha</font>
                        </v-row>
                      </v-col>
                      <v-col class="px-0 mb-0">
                        <div style="float:right">
                          <v-btn
                            color="pink"
                            dark
                            @click="allowEditing = !allowEditing"
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </div>
                      </v-col>

                      <v-col>
                        <v-textarea
                          outlined
                          name="input"
                          label="Edicion"
                          :disabled="allowEditing"
                        ></v-textarea>
                      </v-col>

                      <v-col class="px-0 mb-0">
                        <div class="content" v-html="editionInfo.content"></div>
                      </v-col>

                      <v-col cols="12">
                        <v-divider></v-divider>
                        <v-row class="pa-4" justify="center" align="center">
                          <v-col cols="12">
                            <v-row justify="space-between">
                              <v-col cols="12">
                                <h6>Primarias</h6>
                              </v-col>
                              <v-col cols="6">
                                <v-autocomplete
                                  v-model="modelo3"
                                  :items="ejes"
                                  :filter="customFilter"
                                  item-text="name"
                                  label="Eje"
                                ></v-autocomplete>
                                <v-autocomplete
                                  v-model="modelo4"
                                  :items="regiones"
                                  :filter="customFilter"
                                  item-text="name"
                                  label="Pais/Region"
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="6">
                                <v-autocomplete
                                  v-model="modelo5"
                                  :items="organismos"
                                  :filter="customFilter"
                                  item-text="name"
                                  label="Organismo"
                                ></v-autocomplete>
                                <v-menu 
                                  v-model="menu2"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      v-model="date1"
                                      label="Fecha"
                                      prepend-icon="event"
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="date1"
                                    @input="menu2 = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col align-self="start" cols="12">
                            <h6>Secundarias</h6>

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
                                v-slot:selection="{
                                  attrs,
                                  item,
                                  parent,
                                  selected
                                }"
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
                                      editing !== item
                                        ? "mdi-pencil"
                                        : "mdi-check"
                                    }}</v-icon>
                                  </v-btn>
                                </v-list-item-action>
                              </template>
                            </v-combobox>
                          </v-col>
                          <v-col class="text-center" cols="12">
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
                          <v-col cols="12">
                            <v-row justify="center">
                              <v-btn large color="primary">Publicar</v-btn>
                            </v-row>
                          </v-col>
                        </v-row>
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
export default {
    
    name:'Edition',
    props:{
        editionInfo:Object,


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

    components:{

    },
    data(){
        return{
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
            ],

        }
    },
    computed:{

    },
    methods:{
        closeEdition() {
            alert("asddasasdads")
            this.$emit('close-edition-child', false)
        
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
            },

    },
    created(){

    }


}
</script>