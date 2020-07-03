<template>
  <div class="">
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
        <v-btn color="pink" dark @click="allowEditing = !allowEditing">
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
  </div>
</template>
<script>
export default {
  name: "EditionInfo",
  props: {
    editionInfo: Object
  },
  data() {
    return {
      allowEditing: false
    };
  }
};
</script>
<style lang="scss"></style>
