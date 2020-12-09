<template>

        <div >       
      
           <v-card class="flex-column mx-auto mt-6 mb-6" width="75%">
        
            <v-container>
                <v-row >
                    <v-col cols="12">

                    </v-col>
            
                    <v-col
                        v-for="(item, i) in items"
                        :key="i"
                        cols="12"
                    >
                        <v-card
                            
                            :id="item.id"      
                        >
                            <div class="d-flex flex-no-wrap justify-space-between">
                                <div>
                                    <v-card-title
                                        class="headline"
                                        v-text="item.title"
                                    ></v-card-title>
                    
                                    <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                                </div>
                               
                            </div>
                        </v-card>
                         <v-radio-group v-model="radioGroup">
                                <v-radio
                                    v-for="n in 3"
                                    :key="n"
                                    :label="`Radio ${n}`"
                                    :value="n"
                                ></v-radio>
                        </v-radio-group>
                            
                    </v-col>
                </v-row>
            </v-container>
            </v-card>
        </div>

</template>
<script>
export default {
    name: "SentimentAnalysis",

    components: {},
    props: {
    
    },

    data: () => ({
                radioGroup: 1,

    items: [
      {
        color: '#4135e5',
        src: '',
        title: 'Card 1',
        artist: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: 'BkMk1'
      },
      {
        color: '#0e7222',
        src: '',
        title: 'Card 2',
        artist: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: 'BkMk2'
      },
       {
        color: '#1F7087',
        src: '',
        title: 'Card 3',
        artist: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: 'BkMk3'
      },
       {
        color: '#3c93cd',
        src: '',
        title: 'Card 4',
        artist: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: 'BkMk4'
      },
       {
        color: '#3eb5a3',
        src: '',
        title: 'Card 5',
        artist: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: 'BkMk5'
      },
    ],
  }),
    methods: {
    
        scroll(id) {  
        document.getElementById(id).scrollIntoView({
            behavior: "smooth"
        });
        }
    }
}

</script>
 