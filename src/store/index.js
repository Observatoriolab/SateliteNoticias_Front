import Vue from "vue";
import Vuex from "vuex";
import { apiService } from "@/common/api.service.js";
import createPersistedState from "vuex-persistedstate";
import router from '@/router/index.js'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    BASE_URL: "https://satelite-noticias-api.herokuapp.com",
    LOGIN_URL: "/login",
    LOGOUT_URL: "/logout",
    USER_NAME_URL: "/user",
    NEWS_FIRST_PAGE_URL: "/api/news/",
    NEWS_DAILY_PAGE_URL: "/get_news/",
    NEWS_GENERAL_PAGE_URL: "/api/news/?page=",
    TRENDING_NEWS_GENERAL_PAGE_URL: "/api/news/trending/new/?page=",

    NEWS_RATING_URL: "/rating/",
    endpointRegister:
      "https://satelite-noticias-api.herokuapp.com/registration",

    endpointNews: "https://satelite-noticias-api.herokuapp.com/get_news/1",
    endpointTrendingNews:
      "https://satelite-noticias-api.herokuapp.com/get_trending_news",

    credential: null,
    errorUser: false,
    username: "",
    
    pageNumbersDailyNews: ["https://satelite-noticias-api.herokuapp.com/get_news/1"],


    pageNumbersNews: ["https://satelite-noticias-api.herokuapp.com/api/news/"],
    pageNumbersTrendingNews: ["https://satelite-noticias-api.herokuapp.com/api/news/trending/new/"],

    newsFeedDailyNews: [],
    updatedDailyNews:[],
    loadingDailyNews: false,
    
    newsFeedNews: [],
    updatedNews:[],
    loadingNews: false,

    trendingNewsFeedNews: [],
    updatedTrendingNews:[],
    loadingTrendingNews: false,

    nextPageDailyNews: "",
    nextPageNews: "",
    nextPageTrendingNews: "",

    disableButtonLoadMoreDaily: false,
    disableButtonLoadMore: false,
    disableButtonLoadMoreTrending: false,

    selectedNews: [false,false,false,false],
    disableButtonEdit: [false,false,false,false],

    newsHighlighterIndex: -1,
    reRenderNews: false,
    reRenderMetadata: false,

    bioArray: [],
    editionBody: "",
    editionCountry: "",
    editionAxis: "",
    editionSecondaryAxis: "",
    secondaryTags: null,
    singleEdition: undefined,
    loadingEdition:false,

    trendingDrawer: false,
    editionDrawer:false,
    mainfeedColumns: 12,
    alreadyOpenedEdition: false,
    openedNewsAtEdition: null,
    newMetadata:null,

    dailyNewsShowToggle: false
  },
  getters: {
    edition_toggle_state(state) {
      return state.editionDrawer;
    },
    error_user_state(state) {
      return state.errorUser;
    },
    username_user_state(state) {
      return state.username;
    },
    secondary_tags_state(state) {
      return state.secondaryTags;
    },
    edition_full_state(state) {
      return state.singleEdition;
    },
    all_daily_news(state){
      return state.newsFeedDailyNews
    },
    all_mainfeed_news(state){
      return state.newsFeedNews
    },
    all_trendingfeed_news(state){
      return state.trendingNewsFeedNews
    },
    metadata_news(state){
      return state.newMetadata 
    },
    edition_body_state(state){
      return state.editionBody
    },
    edition_country_state(state){
      return state.editionCountry
    },
    edition_axis_state(state){
      return state.editionAxis
    },
    edition_secondaryAxis_state(state){
      return state.editionSecondaryAxis
    }
  },
  mutations: {
    RESET_ALL(state) {
      state.credential = null
      state.errorUser = false
      state.username = ""
      state.pageNumbersDailyNews = ["https://satelite-noticias-api.herokuapp.com/get_news/1"]
      state.pageNumbersNews = ["https://satelite-noticias-api.herokuapp.com/get_news/1"]
      state.pageNumbersTrendingNews = ["https://satelite-noticias-api.herokuapp.com/api/news/trending/new/"]
      state.newsFeedDailyNews.splice(0)
      state.newsFeedNews.splice(0)
      state.trendingNewsFeedNews.splice(0)
      state.updatedDailyNews.splice(0)
      state.updatedNews.splice(0)
      state.selectedNews = [false,false,false,false]   
      state.disableButtonEdit = [false,false,false,false]
      state.updatedTrendingNews.splice(0)

      state.disableButtonEdit.splice(0)
      state.nextPageNews = ""
      state.nextPageTrendingNews = ""
      state.disableButtonLoadMoreDaily = false
      state.disableButtonLoadMore = false
      state.disableButtonLoadMoreTrending = false
      state.endpointNews = "https://satelite-noticias-api.herokuapp.com/api/news/"
      state.endpointTrendingNews = "https://satelite-noticias-api.herokuapp.com/api/news/trending/new/"
      state.newsHighlighterIndex = -1
      state.reRenderNews = false      
      state.reRenderMetadata = false
      state.bioArray.splice(0)
      state.secondaryTags = null
      state.editionBody = "",      
      state.singleEdition = null,
      state.loadingEdition = false

      state.dailyNewsShowToggle = false
      
      state.trendingDrawer = false,
      state.editionDrawer = false,
      state.mainfeedColumn = 12,
      state.alreadyOpenedEdition = false,
      state.openedNewsAtEdition = null,
      state.newMetadata = null
      sessionStorage.clear()
    },
    DAILY_NEWS_SHOW_TOGGLE(state, payload) {
      state.dailyNewsShowToggle = payload;
    },
    STORE_CREDENTIAL(state, payload) {
      state.credential = payload;
    },
    ERROR_USER_SET(state) {
      state.errorUser = !state.errorUser;
    },
    USERNAME_USER_SET(state, payload) {
      state.username = payload;
    },
    ENDPOINT_NEWS_SET(state, payload) {
      state.endpointNews = payload;
    },
    ENDPOINT_TRENDING_NEWS_SET(state, payload) {
      state.endpointTrendingNews = payload;
    },
    DAILY_NEWS_SET(state, payload) {
      state.newsFeedDailyNews.push(...payload);
    },
    NEWS_SET(state, payload) {
      state.newsFeedNews.push(...payload);
    },
    UPDATED_DAILY_NEWS_SET(state) {
      state.updatedDailyNews.splice(0);
    },
    UPDATED_NEWS_SET(state) {
      state.updatedNews.splice(0);
    },
    UPDATED_TRENDING_NEWS_SET(state) {
      state.updatedTrendingNews.splice(0);
    },
    UPDATED_DAILY_NEWS_PUSH(state,payload){
      state.updatedDailyNews.push(...payload)
    },
    UPDATED_NEWS_PUSH(state,payload){
      state.updatedNews.push(...payload)
    },
    UPDATED_TRENDING_NEWS_PUSH(state,payload){
      state.updatedTrendingNews.push(...payload)
    },
    NEW_DAILY_NEWS_SET(state) {
      for (var i = 0; i < state.updatedDailyNews.length; i++) {
        Vue.set(state.newsFeedDailyNews, i, state.updatedDailyNews[i]);
      }
    },
    NEW_NEWS_SET(state) {
      for (var i = 0; i < state.updatedNews.length; i++) {
        Vue.set(state.newsFeedNews, i, state.updatedNews[i]);
      }
    },
    NEW_TRENDING_NEWS_SET(state) {
      for (var i = 0; i < state.updatedTrendingNews.length; i++) {
        Vue.set(state.trendingNewsFeedNews, i, state.updatedTrendingNews[i]);
      }
    },
    TRENDING_NEWS_SET(state, payload) {
      state.trendingNewsFeedNews.push(...payload);
    },
    DAILY_NEWS_PAGE_SET(state, payload) {
      state.nextPageDailyNews = payload;
    },
    NEWS_PAGE_SET(state, payload) {
      state.nextPageNews = payload;
    },
    TRENDING_NEWS_PAGE_SET(state, payload) {
      state.nextPageTrendingNews = payload;
    },
    DISABLE_LOAD_MORE_DAILY_NEWS(state, payload) {
      state.disableButtonLoadMoreDaily = payload;
    },
    DISABLE_LOAD_MORE_NEWS(state, payload) {
      state.disableButtonLoadMore = payload;
    },
    DISABLE_LOAD_MORE_TRENDING_NEWS(state, payload) {
      state.disableButtonLoadMoreTrending = payload;
    },
    NEWS_SELECTED_STATES(state) {
      for (let i = 0; i < 4; i++) {
        state.selectedNews.push(false);
        state.disableButtonEdit.push(false);
      }
    },
    DAILY_NEWS_PAGENUMBERS_ARRAY(state, payload) {
      state.pageNumbersDailyNews.push(payload);
    },
    NEWS_PAGENUMBERS_ARRAY(state, payload) {
      state.pageNumbersNews.push(payload);
    },
    TRENDING_NEWS_PAGENUMBERS_ARRAY(state, payload) {
      state.pageNumbersTrendingNews.push(payload);
    },
    SET_HIGHLIGHTER(state, payload) {
      console.log(payload);
      console.log(state.selectedNews);
      console.log(state.disableButtonEdit);

      state.selectedNews[payload.index] = payload.truth;
      state.disableButtonEdit[payload.index] = payload.truth;

      console.log(state.selectedNews);
      console.log(state.disableButtonEdit);

      //state.reRenderNews = !state.reRenderNews
    },
    RERENDER_UPDATE(state) {
      state.reRenderNews = !state.reRenderNews;
    },
    RERENDER_METADATA_UPDATE(state) {
      state.reRenderMetadata = !state.reRenderNews;
    },
    UPDATE_HIGHLIGHTER_INDEX(state, payload) {
      state.newsHighlighterIndex = payload;
    },
    SECONDARY_TAGS_SET(state, payload) {
      state.secondaryTags = payload;
    },
    BIBLIOGRAPHY_ARRAY_SET(state, payload) {
      state.bioArray = payload;
    },
    EDITION_BODY_SET(state, payload) {
      state.editionBody = payload;
    },
    EDITION_FULL_SET(state, payload) {
      state.singleEdition = payload;
      console.log(state.singleEdition)
    },
    LOADING_EDITION_SET(state,payload) {
      state.loadingEdition = payload;
    },
    TRENDING_TOGGLE_SET(state,payload) {
      state.trendingDrawer = payload;
    },
    EDITION_TOGGLE_SET(state,payload) {
      state.editionDrawer = payload;
    },
    EDITION_ALREADY_OPENED_SET(state,payload) {
      state.alreadyOpenedEdition = payload;
    },
    MAINFEED_COLUMNS_SET(state,payload) {
      state.mainfeedColumns = payload;
    },
    PIECE_OF_NEWS_WHEN_EDITION_SET(state,payload) {
      state.openedNewsAtEdition = payload;
    },
    LOADING_DAILY_NEWS_TOGGLE(state,payload) {
      state.loadingDailyNews = payload;
    },
    LOADING_NEWS_TOGGLE(state,payload) {
      state.loadingNews = payload;
    },
    LOADING_TRENDING_NEWS_TOGGLE(state,payload) {
      state.loadingTrendingNews = payload;
    },
    METADATA_NEWS_UPDATE(state,payload) {
      state.newMetadata = payload
    },
    EDITION_COUNTRY_SET(state,payload) {
      state.editionCountry = payload
    },
    EDITION_SECONDARY_AXIS_SET(state,payload) {
      state.editionSecondaryAxis = payload
    },
    EDITION_AXIS_SET(state,payload) {
      state.editionAxis = payload
    }

  },
  actions: {
    async checkLogin({state,commit}, payload) {
      console.log('hola')
      
      await apiService(state.BASE_URL + state.LOGIN_URL, "post", {
        email: payload.user,
        password: payload.pass
      }).then(response => {
        console.log(response)
        if(response.confirmation){
          
          commit("USERNAME_USER_SET", response.username);
          window.sessionStorage.setItem("username", response.username);
          router.push('/main-feed')
        }
        else {
          alert('Nombre y/o contraseña incorrectas')
        }
      });
      
    },
    logout({ state, commit }) {
      apiService(
        state.BASE_URL + state.LOGOUT_URL,
        "POST",
        undefined
      );
      commit("RESET_ALL");
    },
    async ratingNews({ state }, payload) {
      const datos = {
        localRelevance: payload.rating,
        type: payload.truth
      };
      await apiService(
        state.BASE_URL +
          state.NEWS_FIRST_PAGE_URL +
          payload.id +
          state.NEWS_RATING_URL,
        "POST",
        datos,
        state.credential
      ).then(data => {
        console.log(data);
      });
    },
    async registerAccount({ state }, payload) {
      console.log(payload);
      await apiService(state.endpointRegister, "POST", {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        is_staff: false
      }).then(data => {
        console.log(data)
        if(data.confirmation){         
           alert('Ya existe un usuario con ese nombre y/o mail')
        }
        else{
           router.push("/");
        }
        
      });
    },
    async getTrendingNewsLoadMore({ commit, state }) {
      console.log(state.credential);
      commit("DISABLE_LOAD_MORE_TRENDING_NEWS", true);
      if (state.nextPageTrendingNews) {
        commit("ENDPOINT_TRENDING_NEWS_SET", state.nextPageTrendingNews);
      }
      await apiService(
        state.endpointTrendingNews,
        "GET",
        undefined
      ).then(data => {
        commit("TRENDING_NEWS_SET", data.results);
        commit("NEWS_SELECTED_STATES");
        if (data.next) {
          commit("TRENDING_NEWS_PAGE_SET", data.next);
          commit("TRENDING_NEWS_PAGENUMBERS_ARRAY", data.next);
          commit("DISABLE_LOAD_MORE_TRENDING_NEWS", false);
        } else {
          commit(
            "TRENDING_NEWS_SET",
            state.BASE_URL + state.NEWS_GENERAL_PAGE_URL + "1"
          );
        }
      });
    },
    async getDailyNewsLoadMore({ commit, state }, payload) {
      console.log('Estoy pasando esta informacions')
      console.log(payload);
      commit("DISABLE_LOAD_MORE_DAILY_NEWS", true);
      if (state.nextPageDailyNews) {
        commit("DAILY_NEWS_PAGENUMBERS_ARRAY",  state.nextPageDailyNews);
      }
      await apiService(
        state.nextPageDailyNews,
        "POST",
        {
          type: payload.type,
          newsPerPage: payload.newsPerPage
        }
      ).then(data => {
        console.log('Linea 423')
        console.log(data);
        commit("DAILY_NEWS_SET", data.news);
        commit("NEWS_SELECTED_STATES");
        if (data.next !== -1) {
          commit("DAILY_NEWS_PAGE_SET", state.BASE_URL + state.NEWS_DAILY_PAGE_URL+ data.next);
          commit("DISABLE_LOAD_MORE_DAILY_NEWS", false);
        } else {
          commit(
            "DAILY_NEWS_PAGE_SET",
            state.BASE_URL + state.NEWS_GENERAL_PAGE_URL + "1"
          );
        }
      });
    },
    async getnewsLoadMore({ commit, state }) {
      console.log(state.credential);
      commit("DISABLE_LOAD_MORE_NEWS", true);
      if (state.nextPageNews) {
        commit("ENDPOINT_NEWS_SET", state.nextPageNews);
        commit("NEWS_PAGENUMBERS_ARRAY",  state.nextPageNews);
      }
      await apiService(
        state.endpointNews,
        "GET",
        undefined
      ).then(data => {
        console.log(data);
        commit("NEWS_SET", data.results);
        commit("NEWS_SELECTED_STATES");
        if (data.next) {
          commit("NEWS_PAGE_SET", data.next);
          commit("DISABLE_LOAD_MORE_NEWS", false);
        } else {
          commit(
            "NEWS_PAGE_SET",
            state.BASE_URL + state.NEWS_GENERAL_PAGE_URL + "1"
          );
        }
      });
    },
    async saveEdition({ state }, payload) {
      console.log("aca va el payload ", payload);
      await apiService(
        state.BASE_URL +
          state.NEWS_FIRST_PAGE_URL +
          payload.newsSlug +
          "/edition/",
        "POST",
        {
          title: state.editionBody,
          body: state.editionBody,
          tags: payload.tags,
          bibliography_name: payload.bibliographyNames,
          bibliography_link: payload.bibliographyLink
        },
        state.credential
      ).then(data => {
        console.log(data.length);
      });
    },
    async getEdition({ state, commit }, payload) {
      console.log("aca va el payload ", payload);
      await apiService(
        state.BASE_URL + state.NEWS_FIRST_PAGE_URL + payload + "/editions",
        "GET",
        undefined,
      ).then(data => {
          console.log(data);
          commit("EDITION_FULL_SET", data.results[0]);
          commit("LOADING_EDITION_SET",true)
      });
    },
    async editNews({ state }, payload) {
      console.log("aca va el payload ", payload);
      
      
      await apiService(
        state.BASE_URL + state.NEWS_FIRST_PAGE_URL + payload.newsSlug + "/",
        "PUT",
        {
          authors: payload.accumulatedAuthors,
          author_count:payload.accumulatedAuthor_count,
          tags: payload.tags,
          bibliography_name: payload.bibliographyNames,
          bibliography_link: payload.bibliographyLink,
          country: payload.country,
          axis: payload.axis,
          secondaryAxis: payload.secondaryAxis
        },
        state.credential
      ).then(data => {
          console.log(data);
      });
    },
    async delayedDailyNews({state,commit},payload) {
      await apiService(payload, "POST", {
        newsPerPage:10,
        type: "Informe Diario BC"

      }).then(data => {
        console.log('Linea 493 noticias nuevas son: ')
        console.log(data)
        commit('UPDATED_DAILY_NEWS_PUSH',data.news)
        if (data.next !== -1) {
          commit("DAILY_NEWS_PAGE_SET",  state.BASE_URL + state.NEWS_DAILY_PAGE_URL + data.next);
        } else {
          commit(
            "DAILY_NEWS_PAGE_SET",
            state.BASE_URL + state.NEWS_GENERAL_PAGE_URL + "1"
          );
        }
      });
    },
    async delayedNews({state,commit},payload) {
      await apiService(payload, "GET", undefined, state.credential).then(data => {
        commit('UPDATED_NEWS_PUSH',data.results)
        if (data.next) {
          commit("NEWS_PAGE_SET", data.next);
        } else {
          commit(
            "NEWS_PAGE_SET",
            state.BASE_URL + state.NEWS_GENERAL_PAGE_URL + "1"
          );
        }
      });
    },
    async delayedTrendingNews({state,commit},payload) {
      await apiService(payload, "GET", undefined, state.credential).then(data => {
        commit('UPDATED_TRENDING_NEWS_PUSH',data.results)
        if (data.next) {
          commit("TRENDING_NEWS_PAGE_SET", data.next);
        } else {
          commit(
            "TRENDING_NEWS_PAGE_SET",
            state.BASE_URL + state.TRENDING_NEWS_GENERAL_PAGE_URL + "1"
          );
        }
      });
    },
    async getUpdatedDailyNews({state,dispatch,commit}) {
      commit('LOADING_DAILY_NEWS_TOGGLE',false)

      for (const [idx, url] of state.pageNumbersDailyNews.entries()) {
        console.log(idx);
        console.log(url)
        console.log('linea 579')
        await dispatch("delayedDailyNews",url);
      }
      //Se tienen las noticias nuevas y se debe ser cuales son las diferencias
      //Podrian haber diferencias en cuanto al metadata (secondaryTags, bibliografia) y el rating
      commit('NEW_DAILY_NEWS_SET')
      commit('LOADING_DAILY_NEWS_TOGGLE',true)

      commit('UPDATED_DAILY_NEWS_SET')
    },
    async getUpdatedNews({state,dispatch,commit}) {
      commit('LOADING_NEWS_TOGGLE',false)

      for (const [idx, url] of state.pageNumbersNews.entries()) {
        console.log(idx);
        await dispatch("delayedNews",url);
      }
      //Se tienen las noticias nuevas y se debe ser cuales son las diferencias
      //Podrian haber diferencias en cuanto al metadata (secondaryTags, bibliografia) y el rating
      commit('NEW_NEWS_SET')
      commit('LOADING_NEWS_TOGGLE',true)

      commit('UPDATED_NEWS_SET')
    },
    async getUpdatedTrendingNews({state,dispatch,commit}){
      commit('LOADING_TRENDING_NEWS_TOGGLE',false)
      for (const [idx, url] of state.pageNumbersTrendingNews.entries()) {
        console.log(idx);
        await dispatch("delayedTrendingNews",url);
      }
      commit('NEW_TRENDING_NEWS_SET')
      commit('LOADING_TRENDING_NEWS_TOGGLE',true)

      commit('UPDATED_TRENDING_NEWS_SET')

      
    }
  },
  modules: {},
  plugins: [createPersistedState({ storage: window.sessionStorage })]
});
