

<template>
  <div class="">
      <v-list >            
          <v-list-group
            
            prepend-icon="mdi-access-point-network"
            sub-group
            color="primary"
            no-action
            ripple
          >
            <template v-slot:activator>
              <v-list-item-title>Noticias Fintech</v-list-item-title>
            </template>
            <v-list-item-group
                    v-model="selectedItem"
                    color="primary"
            >
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    
                    @click.stop="newsToggler(item.title)"
                    
                >
                      <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item-content>
                </v-list-item>
            
                          

            </v-list-item-group>
             
            
        </v-list-group>
        <v-list-item
                :href="'/sentiment-analysis'"
                :height="'300px'"
                v-model="selectedItem2"
                                    color="primary"

              >
                      <v-list-item-icon>
                        <v-icon>{{ sentiment.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{ sentiment.title }}</v-list-item-title>
                      </v-list-item-content>

             </v-list-item>
      </v-list>

  </div>
     
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "App",

  components: {},
  props: {
    
  },
  watch:{
    activate(val){
      console.log(val)
      this.drawer = val
    },
    drawer(val){
      console.log(val)
      this.$emit('send-message', val)

    }
  },

  data: () => ({
        drawer: true,
        items: [
            { title: 'Radar de noticias', icon: 'mdi-view-dashboard' },
            { title: 'Tendencias', icon: 'mdi-forum' },
        ],
        sentiment:{
          title:'Sistema colaborativo de diccionarios',
          icon: 'mdi-checkbox-marked-circle-outline'
        },
        selectedItem:0,
        selectedItem2:0

    //
  }),
  computed: {
    ...mapState(["username","editionDrawer","trendingDrawer","mainfeedColumns"]),
     currentRouteName() {
        return this.$route.name;
    }
  },
  methods: {
    ...mapActions(["setUserInfo", "logout"]),
    ...mapGetters({
      usernameUserState: "username_user_state"
    }),
    ...mapMutations({
      editionToggle:"EDITION_TOGGLE_SET" ,
      trendingToggle: "TRENDING_TOGGLE_SET",
      columnsToggle:"MAINFEED_COLUMNS_SET",
      alreadyOpened: "EDITION_ALREADY_OPENED_SET",
      setNewsAtEdition: "PIECE_OF_NEWS_WHEN_EDITION_SET",
    }),
    newsToggler(title){
      console.log(title)
      console.log(this.selectedItem)
      if(this.currentRouteName !== 'MainFeed'){
        
        this.$router.push({
            path: `/main-feed`
        })
      }
      
      switch (title) { 
        case "Radar de noticias":
            this.trendingDrawerClose()
            break;        
        case "Tendencias":
            this.trendingDrawerOpen()
            break;    
      }

    },
    trendingDrawerOpen() {
      this.trendingToggle(true)
      //this.trendingDrawer = true;
      if (this.editionDrawer) {
        this.editionToggle(false)
        //this.editionDrawer = false;
      }
      
    },
    trendingDrawerClose() {
      this.trendingToggle(false)
      //this.trendingDrawer = false;
      //this.newsFeedColumn = 12;
      this.columnsToggle(12)

    },
    logouto() {
      this.logout();
      this.$router.push("/");
    }
  },
  beforeMount() {
    console.log(this.selectedItem)
    console.log(this.currentRouteName)
    if(this.currentRouteName !== 'MainFeed'){
        this.selectedItem = undefined
        this.selectedItem2 = 1
    }
    else{
      this.selectedItem2 = 0
    }

  },
  beforeUpdate(){
    console.log('me cambie')
    this.selectedItem2 = undefined
  }
};
</script>