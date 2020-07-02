import Vue from "vue";
import Vuex from "vuex";
import { apiService } from "@/common/api.service.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    BASE_URL:'http://satelite-de-noticias.herokuapp.com',
    LOGIN_URL:'/api/rest-auth/login/',
    LOGOUT_URL:'/api/rest-auth/logout/',
    USER_NAME_URL:'/api/user/',
    NEWS_FIRST_PAGE_URL:'/api/news/',
    NEWS_GENERAL_PAGE_URL:'/api/news/?page=',



    credential: null,
    errorUser:false,
    username:'',
    endpointNews: 'http://satelite-de-noticias.herokuapp.com/api/news/',
    pageNumbersNews: [],
    newsFeedNews:[],
    selectedNews:[false,false,false,false],
    disableButtonEdit:[false,false,false,false],
    nextPageNews:null,
    disableButtonLoadMore:false,
    lastPageNumber: 0
  },
  getters:{
    error_user_state(state){
      return state.errorUser
    },
    username_user_state(state){
      return state.username
    },
    last_digit_news_page(payload) {
      let regex = /=+\d*/.exec(payload);
      let newPage = /\d+$/.exec(regex[0]);
      return parseInt(newPage[0]) - 1;
    },

  },
  mutations: {
    
    STORE_CREDENTIAL (state,payload) {
      state.credential = payload
    },
    ERROR_USER_SET (state) {
      state.errorUser = !state.errorUser
    },
    ENDPOINT_NEWS_SET (state,payload) {
      state.endpointNews =  payload
    },    
    NEWS_SET(state,payload) {
      state.newsFeedNews.push(...payload);
    },
    NEWS_PAGE_SET(state,payload) {
      state.nextPageNews = payload;
    },
    DISABLE_LOAD_MORE_NEWS(state,payload) {
      state.disableButtonLoadMore = payload;
    },
    NEWS_SELECTED_STATES(state) {
      for (let i = 0; i < 4; i++) {
        state.selectedNews.push(false);
        state.disableButtonEdit.push(false);
      }
    },
    NEWS_LAST_PAGE(state,payload){
      state.lastPageNumber = payload
    },
    NEWS_NEXT_PAGE(state,payload) {
      state.pageNumbersNews.push(state.NEWS_GENERAL_PAGE_URL+payload)
    },
  },
  actions: {
    async checkLogin ({state,dispatch},payload) {      
       await apiService(state.BASE_URL+state.LOGIN_URL, "POST", {
            username: payload.user,
            password: payload.pass
        }).then(data => {
          dispatch('setUserInfo',data["key"])
            
        });
    },
    async setUserInfo ({commit,state},payload) {      
      if(payload !== undefined){
        commit('STORE_CREDENTIAL', payload)
      }
      else{
        commit('ERROR_USER_SET')
      }
      const data = await apiService(state.BASE_URL+state.USER_NAME_URL,false,undefined,state.credential)         
      window.sessionStorage.setItem('username',data['username'])
    },
    logout ({state}) {      
      apiService(state.BASE_URL+state.LOGOUT_URL, "POST", undefined, state.credential)
     
    },    
    async getnewsLoadMore({commit,state,dispatch}) {
      console.log(state.credential)
      commit('DISABLE_LOAD_MORE_NEWS',true)
      if(state.nextPageNews){
        commit('ENDPOINT_NEWS_SET', state.nextPageNews)
      }
      await apiService(state.endpointNews,"GET",undefined,state.credential)
            .then(data => {
                commit('NEWS_SET',data.results)
                commit('NEWS_SELECTED_STATES')
                if (data.next) {
                  commit('NEWS_PAGE_SET', data.next)
                  dispatch('pushPageNumberURLS',true)                  
                  commit('DISABLE_LOAD_MORE_NEWS',false)
                } 
                else if (data.count <= 4) {
                    dispatch('pushPageNumberURLS',false)
                } else {
                  commit('NEWS_PAGE_SET', null)
                }

      });
    },
    pushPageNumberURLS({commit,state,getters},payload){
      var pageNumber;
      if(payload){
        pageNumber = getters['last_digit_news_page', state.nextPageNews]
      }
      else{
        pageNumber='1'
      }
      commit('NEWS_NEXT_PAGE', pageNumber)
      commit('NEWS_LAST_PAGE', pageNumber)

    }

  },
  modules: {},
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});

