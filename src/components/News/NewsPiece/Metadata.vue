<template>
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
            v-model="news.axis"
            :disabled="disableEdit"
          ></v-text-field>
          <v-text-field
            label="Pais/Region"
            placeholder="Ej: Rusia"
            outlined
            v-model="news.country"
            :disabled="disableEdit"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Organismo"
            placeholder="Ej: FinTech"
            outlined
            v-model="news.source"
            :disabled="disableEdit"
          ></v-text-field>
          <v-text-field
            label="Fecha"
            placeholder="Placeholder"
            outlined
            v-model="news.date"
            :disabled="disableEdit"
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
        :disabled="disableEdit"
      >
        <template v-slot:no-data>
          <v-list-item>
            <span class="subheading">Create</span>
            <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
              {{ search }}
            </v-chip>
          </v-list-item>
        </template>
        <template v-slot:selection="{ attrs, item, parent, selected }">
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
            <v-icon small @click="parent.selectItem(item)">close</v-icon>
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
          <v-chip v-else :color="`${item.color} lighten-3`" dark label small>
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
    <v-col class="text-center py-0" cols="12">
      <h5>Bibliografia</h5>
    </v-col>
    <v-row v-if="disableEdit">
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
    <div style="width:100%" justify="center" v-else>
      <v-row justify="center" align="center">
        <v-spacer />

        <v-col cols="3">
          <v-text-field label="Nombre" v-model="bioName"></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field label="Link" v-model="bioLink"> </v-text-field>
        </v-col>

        <v-btn class="purple" color="primary" dark @click="addBibliography">
          Agregar
        </v-btn>
        <v-spacer />
      </v-row>
      <v-row
        v-if="bioArray.lenght !== 0"
        :class="{ biodrawer: bioArray.lenght !== 0 }"
      >
        <v-row v-for="(item, i) in bioArray" v-bind:key="i" align="center">
          <v-spacer />
          <v-col cols="3">
            <v-text-field
              label="Nombre"
              v-model="bioArray[i].name"
              :disabled="editBioEntry[i]"
            ></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-text-field
              label="Link"
              v-model="bioArray[i].link"
              :disabled="editBioEntry[i]"
            ></v-text-field>
          </v-col>
          <v-btn @click="editItem(i)">
            <v-icon>{{ editBioEntry[i] ? "mdi-pencil" : "mdi-check" }}</v-icon>
          </v-btn>
          <v-btn @click="removeItem(i)">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
          <v-spacer />
        </v-row>
      </v-row>
    </div>
  </v-row>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "Metadata",
  props: {
    news: {
      type: Object,
      required: true
    },
    disableEdit: {
      type: Boolean,
      required: true
    }
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
      this.setTags(this.modelo);
    }
  },
  data() {
    return {
      editBioEntry: [],
      bioName: "",
      bioLink: "",
      search: null,
      activator: null,
      attach: null,
      rating: null,
      editing: null,
      item: null,
      show: false,
      isLoading: false,
      count: 0,
      items: [],
      entries: [],
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
      modelo: [],
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
    ...mapState(["bioArray"]),
    ...mapGetters({
         editionGet: 'edition_full_state'
    })
  },
  methods: {
    ...mapMutations({
      setTags: "SECONDARY_TAGS_SET" // map `this.add()` to `this.$store.commit('increment')`
    }),
    addBibliography() {
      console.log(this.modelo);
      if (this.bioName.length !== 0 && this.bioLink.length !== 0) {
        const bioEntry = {
          name: this.bioName,
          link: this.bioLink
        };
        this.bioArray.push(bioEntry);
        this.editBioEntry.push(true);
        this.bioLink = "";
        this.bioName = "";
      }
    },
    editItem(index) {
      this.$set(this.editBioEntry, index, !this.editBioEntry[index]);
    },
    removeItem(index) {
      this.bioArray.splice(index, 1);
      console.log(this.bioArray);
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
    tagsFormat() {
      console.log(Math.random() * this.colors.length)
      console.log(this.colors[Math.random() * 4])
      for(let i = 0; i<this.localEdition.tags.length; i++){
        this.modelo.push({
          text: this.localEdition.tags[i],
          color: this.colors[Math.ceil(Math.random() * this.colors.length)]
        });
      }
      this.setTags(this.modelo)
    },
    
    bioFormat() {
      if (this.localEdition.bibliography_name.length !== 0) {
        var nameArray = this.localEdition.bibliography_name.split(";");
        var linkArray = this.localEdition.bibliography_link.split(";");
 
        for (var i = 0; i < nameArray.length - 1; i++) {
          let bioEntry = {
            name: nameArray[i],
            link: linkArray[i]
          };
          this.bioArray.push(bioEntry)
          this.editBioEntry.push(true);
        }
      }
    },
  },
  created() {
     
    if(!this.disableEdit){        
      this.localEdition = this.editionGet
      if(this.localEdition !== undefined){
            this.tagsFormat()   
            this.bioFormat()
            console.log(this.localEdition.tags)
      }
    }
    
  }
};
</script>
<style lang="scss">
.biodrawer {
  overflow-y: auto;
  overflow-x: hidden;
  height: 30vh;
}
</style>
