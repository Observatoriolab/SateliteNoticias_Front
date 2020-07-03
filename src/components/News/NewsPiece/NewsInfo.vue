<template>
    <v-row
        class="flex-column ma-0 fill-height text-center"
        justify="center"
    >
        <v-col class="px-0 py-0 text-center">
            <v-card-title style="display:flex; justify-content:center">
                {{ news.title }}
            </v-card-title>
        </v-col>

        <v-col class="px-0 py-0">
            <v-row justify="space-around">
                <font class="lighto">autor</font>
                <font>fecha</font>
            </v-row>
        </v-col>

        <v-col class="px-0 py-0 mb-0">
            <div class="content" v-html="news.content"></div>
        </v-col>

        <v-col class="px-0 py-0">
            <v-row justify="space-around" align="center">
                <div class="text-center">
                    <v-rating
                        half-increments
                        hover
                        ripple
                        dense
                        v-model="rating"
                    ></v-rating>
                </div>
                <v-btn
                    color="blue"
                    @click="openEdition(news, indice)"
                    :disabled="disableButtonEdit[indice]"
                >
                     <v-icon>mdi-square-edit-outline</v-icon>
                </v-btn>
                <v-btn color="darkGray" @click="expand">
                    <v-icon>{{show ? "mdi-chevron-up" : "mdi-chevron-down"}}</v-icon>
                </v-btn>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import { mapState } from 'vuex'

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
    data(){
        return{
            rating:null,
            show: false,
        }
    },
    computed: {
        // mix this into the outer object with the object spread operator
        ...mapState([
            'disableButtonEdit'
        ])
    },
    methods:{
        openEdition(news,indice){
            this.$emit('edition-opened',news,indice)

        },
        expand() {
            this.show = !this.show
            this.$emit('metadata-toggled')
        }
    }
}
</script>
<style lang="scss">

</style>