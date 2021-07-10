<template>
  <v-row class="py-0" >
    <v-col cols="12" class="py-0">
      <v-row >
        <v-col  class="text-left pt-4 my-0" cols="12">
           <div style="color:darkblue" class="text-left py-0">    
                <h3>Fuente deteccion</h3>
          </div>
        </v-col>
        <v-col class="text-left py-0 my-0" cols="12">
          <v-row>
              <v-col  class="text-left py-0 my-0" cols="3">
                  <v-text-field
                    label="Eje"
                    placeholder="Ej: Pagos digitales"
                    solo
                    dense
                    readonly
                    v-model="news.source"
                  ></v-text-field>          
              </v-col>
              <v-col class="d-flex flex-row justify-start px-0 pt-0 mr-5" cols="1">
                <v-subheader style="font-size:1em"> Publicado originalmente en: </v-subheader>
              </v-col>
              <v-col class="px-0 pt-0"  cols="3">
                  <v-text-field
                    label="Eje"
                    placeholder="Ej: Pagos digitales"
                    solo
                    dense
                    readonly
                    :value="changeDateFormat(news.date)"
                  ></v-text-field>          
              </v-col>

          </v-row>
          
        </v-col>
  
      </v-row>
    </v-col>

    <div  v-if= "news.type !== 'Informe Diario BC'">
        <v-col style="color:darkblue" class="text-left py-0" cols="12">
          <h3>Otras Bibliografias</h3>
        </v-col>

        <v-col cols="10" class="py-0 px-3" > 
              <v-chip-group
              mandatory
            >
              <v-chip
                v-for="bio in modelo2" v-bind:key="bio.id"
                @click="goToPage(bio.link)"
              >
                {{ bio.text }}
              </v-chip>
            </v-chip-group>
        </v-col>    
    
    </div>    
    

    <!--


            <v-combobox
                  v-model="modelo2"
                  hide-selected
                  label=""
                  multiple
                  solo
                  readonly
                >
                  <template v-slot:selection="{ attrs, item, selected }">
                    <v-chip
                      v-if="item === Object(item)"
                      v-bind="attrs"
                      :color="`${item.color} lighten-5`"
                      :input-value="selected"
                      @click="goToPage(item.link)"
                      label
                    >
                      <span style="color:darkblue" class="pr-2">
                        {{ item.text }}
                      </span>
                      
                    </v-chip>
                  </template>
                 
            </v-combobox>

     -->
    <!--
    <div v-else style="width:100%" justify="center"  >
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
        v-if="bioArray.length !== 0"
        :class="{ biodrawer: bioArray.length !== 0 }"
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
    -->
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

    newMetadata(){
      console.log("dfsdsffds")
      if(this.disableEdit){
        this.localBioNamesArray.splice(0)
        this.localBioLinksArray.splice(0)
        this.modelo.splice(0)
        this.bioFormat(this.newMetadata.bibliography)
        this.tagsFormat(this.newMetadata)
      }
    },    
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
    },
    bioNameSelected(val){
      this.assignedLink = this.localBioLinksArray[this.localBioNamesArray.indexOf(val)]
    }
  },
  data() {
    return {
      assignedLink: '',
      localBioNamesArray:[],
      localBioLinksArray:[],
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
      bioNameSelected: null,
      modelo2: [],
      modelo4: null,
      modelo5: null,
      date1: new Date().toISOString().substr(0, 10),
    };
  },

  computed: {
    ...mapState(["bioArray","secondaryTags", "openedNewsAtEdition"]),
    ...mapGetters({
        editionGet: 'edition_full_state',
        newMetadata: 'metadata_news'

    })
  },
  methods: {
    ...mapMutations({
      setTags: "SECONDARY_TAGS_SET", // map `this.add()` to `this.$store.commit('increment')`      
      secondaryTagSet: 'SECONDARY_TAGS_SET',            
      bioSet: 'BIBLIOGRAPHY_ARRAY_SET',
    }),

    changeDateFormat(date){
      console.log(date)
      let newsDate = new Date(date)
      let dia = newsDate.getDate()+1
      let mes = newsDate.getMonth() 
      let año = newsDate.getFullYear()
      /*let monthPattern = /([A-Z])\w+/i;
      let month = date.match(monthPattern)[0]
      let monthString = null
      let digitsPatt = /-?\d(?:[,\d]*\.\d+|[\d]*)/g;
      let digitsArray = date.match(digitsPatt)
      console.log(month)
      */
      let monthString = ' '
 
      switch (mes) { 
        case 0: 
          monthString = ' ENERO '          
        break; 
        case 1: 
          monthString = ' FEBRERO '
        break; 
        case 2: 
          monthString = ' MARZO '
        break; 
        case 3: 
          monthString = ' ABRIL '
        break; 
        case 4: 
          monthString = ' MAYO '
        break; 
        case 5: 
          monthString = ' JUNIO '
        break; 
        case 6: 
          monthString = ' JULIO '
        break; 
        case 7: 
          monthString = ' AGOSTO '
        break; 
        case 8: 
          monthString = ' SEPTIEMBRE '
        break; 
        case 9: 
          monthString = ' OCTUBRE '
        break; 
        case 10: 
          monthString = ' NOVIEMBRE '
        break; 
        case 11: 
          monthString = ' DICIEMBRE '
        break; 
      } 
      return dia + monthString + año
      
    },
    /*
      SOLO PARA NOTICIAS FINTECH
    changeDateFormat(date){
      console.log(date)
      let monthPattern = /(?:[^\d]*)/g;
      let month = date.match(monthPattern)[3]
      let month2 = null
      let digitsPatt = /-?\d(?:[,\d]*\.\d+|[\d]*)/g;
      let digitsArray = date.match(digitsPatt)
      console.log(month)     
      console.log(digitsArray)
      switch (month) {
        case ' Jan ':
          month2 = 'ENERO'          
        break;
        case ' Feb ':
          month2 = 'FEBRERO'
        break;
        case ' Mar ':
          month2 = 'MARZO'
        break;
        case ' Apr ':
          month2 = 'ABRIL'
        break;
        case ' May ':
          month2 = 'MAYO'
        break;
        case ' Jun ':
          month2 = 'JUNIO '
        break;
        case ' Jul ':
          month2 = 'JULIO'
        break;
        case ' Aug ':
          month2 = 'AGOSTO'
        break;
        case ' Sep ':
          month2 = 'SEPTIEMBRE'
        break;
        case ' Oct ':
          month2 = 'OCTUBRE'
        break;
        case ' Nov ':
          month2 = 'NOVIEMBRE'
        break;
        case ' Dec ':
          month2 = 'DICIEMBRE'
        break;
      }
      return digitsArray[0] + ' ' + month2 + ' ' + digitsArray[1]
    },*/
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
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 
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
    tagsFormat(tagsToFormat) {
      if(tagsToFormat !== null ){
          console.log(tagsToFormat.tags[0])
          for(let i = 0; i<tagsToFormat.tags.length; i++){
            this.modelo.push({
              text: tagsToFormat.tags[i],
              color: this.colors[Math.ceil(Math.random() * this.colors.length)]
            });
          }
          console.log(this.modelo)
          this.setTags(this.modelo)
          
          
          
      }
      else{
        console.log(this.editionGet.tags)
        console.log(this.editionGet)
        if(this.editionGet.tags !== undefined){
            for(let i = 0; i<this.editionGet.tags.length; i++){
              this.modelo.push({
                text: this.editionGet.tags[i],
                color: this.colors[Math.ceil(Math.random() * this.colors.length)]
              });
            }
            console.log(this.modelo)
            this.setTags(this.modelo)         
          }

        
        
          
      }
    
    },
    goToPage(link){
      console.log(link.length)
      if (link !== undefined){ 
        var win = window.open(link, '_blank')
        win.focus()
      };
    },
    
    bioFormat(bioToFormat) {
            console.log(bioToFormat.bibliography_name.length)

      if(bioToFormat.bibliography_name.length === 0){
          console.log(bioToFormat.bibliography_name.length)
          if(this.disableEdit){
              this.localBioNamesArray.push('')
              this.localBioLinksArray.push('')

          }
          else{
              this.editBioEntry.push(true);
          }
        return;

      }
      console.log(bioToFormat)
      if(bioToFormat !== null && bioToFormat.bibliography_name !== undefined){
          let nameArray = bioToFormat.bibliography_name.split(";");
          let linkArray = bioToFormat.bibliography_link.split(";");
          console.log(nameArray)
          console.log(linkArray)
          if( nameArray !== undefined){
            console.log(nameArray.length)
            for (let i = 0; i < nameArray.length - 1; i++) {
                console.log(nameArray[0])
                let bioEntry = {
                  name: nameArray[i],
                  link: linkArray[i]
                };
                let bioEntry2 = {
                  text: nameArray[i],
                  color: 'lightgray',
                  link: linkArray[i]
                };
                if(this.disableEdit){
                    this.modelo2.push(bioEntry2)
                    this.localBioNamesArray.push(nameArray[i])
                    this.localBioLinksArray.push(linkArray[i])

                }
                else{
                    this.bioArray.push(bioEntry)
                    this.editBioEntry.push(true);
                }
          }

          }
          
      }
      else{
          let nameArray = this.editionGet.bibliography_name.split(";");
          let linkArray = this.editionGet.bibliography_link.split(";");
          for (let i = 0; i < nameArray.length - 1; i++) {
              let bioEntry = {
                name: nameArray[i],
                link: linkArray[i]
              };
              if(this.disableEdit){
                  this.localBioNamesArray.push(nameArray[i])
                  this.localBioLinksArray.push(linkArray[i])

              }
              else{
                  this.bioArray.push(bioEntry)
              }
              this.editBioEntry.push(true);
          }
          
          

      }
     
    },
  },
  created() {
    console.log(this.news)
    console.log(this.editionGet)
    console.log(this.openedNewsAtEdition)
    console.log(this.editionGet)
    if(this.editionGet !== undefined && !this.disableEdit){
      this.tagsFormat(this.editionGet)   
      this.bioFormat(this.editionGet)
    }
    else if(this.disableEdit){
      this.tagsFormat(this.news)   
      this.bioFormat(this.news)
    }
    else{

      this.tagsFormat(this.news)   
      this.bioFormat(this.news)
    }

    

    
    
  }
};
</script>
<style lang="scss">
.biodrawer {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 20vh;
}
.biodrawerNewsPiece{
  
  width:60vw;
}
</style>
