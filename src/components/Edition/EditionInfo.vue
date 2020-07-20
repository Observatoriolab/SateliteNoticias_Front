<template>
  <div v-if="loading" class="">
    <v-col class="px-0 text-center">
      <v-card-title class="">
        {{ openedNewsAtEdition.title }}
      </v-card-title>
    </v-col>
     <v-col class="px-4 py-0 text-start">
      {{ news.created_at }}
    </v-col>


    <v-col class="px-0 mb-0">
      <div class="content" v-html="openedNewsAtEdition.content"></div>
    </v-col>

    <v-row class="px-4 py-0 text-start">
      <v-col cols="6">

          {{this.localEdition === undefined || this.localEdition === null ? '':'Ultimo editor: '+ this.localEdition.author}}

      </v-col>
      <v-col cols="6">
        <div style="float:right">
            <v-btn color="pink" dark @click="allowEditing = !allowEditing">
              <v-icon>{{ allowEditing ? "mdi-pencil" : "mdi-pencil-off" }}</v-icon>
            </v-btn>
        </div>
        
      </v-col>
    </v-row>

    <v-col cols="12" class="px-0 mb-0">
      <v-textarea
        outlined
        name="input"
        label="Edicion"
        v-model="editionText"
        :disabled="allowEditing"
      ></v-textarea>
    </v-col>

    
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapState} from "vuex";
export default {
  name: "EditionInfo",
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  watch: {
    editionText(val) {
      this.editionSet(val);
    }
  },
  data() {
    return {
      allowEditing: true,
      editionText: "",
      localEdition: null,
      loading: false
    };
  },
  computed: {
    ...mapState(["openedNewsAtEdition"]),
    ...mapGetters({
         editionGet: 'edition_full_state'
    })
  },
  methods: {
    ...mapMutations({
      editionSet: "EDITION_BODY_SET" // map `this.add()` to `this.$store.commit('increment')`
    })
  },
  created() {
    console.log("Por aqui pasan las noticias")
  
    this.localEdition = this.editionGet
    if(this.localEdition !== undefined && this.localEdition !== null){
         this.editionText = this.localEdition.body;

    }
    this.loading = true
  }
};
</script>
<style lang="scss"></style>
