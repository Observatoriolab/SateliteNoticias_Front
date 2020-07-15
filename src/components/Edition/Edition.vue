<template>
  <div v-if="loadingEdition"
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
                <EditionInfo :news="news"  />
                <v-col cols="12">
                  <v-divider></v-divider>
                  <Metadata :news="news" :disableEdit="false"  />
                  <v-btn
                    class="purple"
                    color="primary"
                    dark
                    @click="saveEditionPrep"
                  >
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
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "Edition",
  props: {
    news: Object
  },
  components: {
    Metadata,
    EditionInfo
  },
  watch: {
    
  },
  data() {
    return {
      bibliographyNameInternal: "",
      bibliographyLinkInternal: "",
      singleEditionLocal: null
    };
  },
  computed: {
    ...mapState(["bioArray", "secondaryTags", "singleEdition","loadingEdition","username"]),
    ...mapGetters({
         editionGet: 'edition_full_state',
         editionBody: 'edition_body_state'
    })
  },
  methods: {
    ...mapMutations({
        secondaryTagSet: 'SECONDARY_TAGS_SET',            
        bioSet: 'BIBLIOGRAPHY_ARRAY_SET',
        editionBodySet : 'EDITION_BODY_SET',
        editionFullSet : 'EDITION_FULL_SET',
        loadingEditionToggle : 'LOADING_EDITION_SET'
      }
    ),
    ...mapActions(["saveEdition", "getEdition","editNews"]),

    saveEditionPrep() {
      //Formatear las bibliografias y tags
      this.bibliographyNameInternal = "";
      this.bibliographyLinkInternal = "";
      this.createStrings();
      //Se tienen las bibliografias reformateadas

      console.log(this.bioArray);
      console.log(this.secondaryTags);
      var tagsAux = [];
      if(this.editionBody.length !== 0){

          for (var i = 0; i < this.secondaryTags.length; i++) {
            this.$set(tagsAux, i, this.secondaryTags[i].text);
          }
          let newAuthor = this.news.authors + ';' + this.username
          let newCounter = this.news.author_count + 1
          console.log(newAuthor)
          const editionData = {
            newsSlug: this.news.slug,
            accumulatedAuthors: newAuthor,
            accumulatedAuthor_count: newCounter,
            tags: tagsAux,
            bibliographyNames: this.bibliographyNameInternal,
            bibliographyLink: this.bibliographyLinkInternal
          };
          this.saveEdition(editionData);
          this.editNews(editionData)
          this.closeEdition();
          console.log(newAuthor)

          console.log(this.bibliographyNameInternal);
          console.log(this.bibliographyLinkInternal);
      }
      else{
        alert('No puedes publicar una edicion sin haber escrito el cuerpo de esta')
      }
    },

    createStrings() {
      for (var i = 0; i < this.bioArray.length; i++) {
        this.bibliographyNameInternal =
          this.bibliographyNameInternal + this.bioArray[i].name + ";";
        this.bibliographyLinkInternal =
          this.bibliographyLinkInternal + this.bioArray[i].link + ";";
      }
    },

    closeEdition() {
      
      this.bibliographyNameInternal = "";
      this.bibliographyLinkInternal = "";
      this.secondaryTagSet(null)
      this.bioSet([])
      this.editionBodySet("")
      this.editionFullSet(null)
      this.loadingEditionToggle(false)
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
  beforeMount() {
      this.bioSet([])
      this.getEdition(this.news.slug)
      

      
  }
};
</script>
