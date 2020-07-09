<template>
  <div class="">
    <v-col class="px-0 text-center">
      <v-card-title class="">
        {{ news.title }}
      </v-card-title>
    </v-col>

    <v-col class="px-4 py-2 text-start">
      <v-col>

      Por: {{this.localEdition.author}}

      </v-col>
      {{ news.created_at }}
      <div style="float:right">
        <v-btn color="pink" dark @click="allowEditing = !allowEditing">
          <v-icon>{{ allowEditing ? "mdi-pencil" : "mdi-pencil-off" }}</v-icon>
        </v-btn>
      </div>
    </v-col>

    <v-col class="px-0 mb-0">
      <v-textarea
        outlined
        name="input"
        label="Edicion"
        v-model="editionText"
        :disabled="allowEditing"
      ></v-textarea>
    </v-col>

    <v-col class="px-0 mb-0">
      <div class="content" v-html="news.content"></div>
    </v-col>
  </div>
</template>
<script>
import { mapMutations, mapGetters} from "vuex";
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
      localEdition: null
    };
  },
  computed: {
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
    this.localEdition = this.editionGet
    if(this.localEdition !== undefined){
         this.editionText = this.localEdition.body;

    }
  }
};
</script>
<style lang="scss"></style>
