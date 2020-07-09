import Vue from "vue";
import Vuex from "vuex";
import { apiService } from "@/common/api.service.js";
import createPersistedState from "vuex-persistedstate";
import router from '@/router/index.js'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    BASE_URL: "https://satelite-de-noticias.herokuapp.com",
    LOGIN_URL: "/api/rest-auth/login/",
    LOGOUT_URL: "/api/rest-auth/logout/",
    USER_NAME_URL: "/api/user/",
    NEWS_FIRST_PAGE_URL: "/api/news/",
    NEWS_GENERAL_PAGE_URL: "/api/news/?page=",
    NEWS_RATING_URL: "/rating/",
    endpointRegister:
      "https://satelite-de-noticias.herokuapp.com/api/rest-auth/registration/",

    endpointNews: "https://satelite-de-noticias.herokuapp.com/api/news/",
    endpointTrendingNews:
      "https://satelite-de-noticias.herokuapp.com/api/news/",

    credential: null,
    errorUser: false,
    username: "",

    pageNumbersNews: [],
    pageNumbersTrendingNews: [],

    newsFeedNews: [],
    trendingNewsFeedNews: [],

    nextPageNews: "",
    nextPageTrendingNews: "",

    disableButtonLoadMore: false,
    disableButtonLoadMoreTrending: false,

    selectedNews: [],
    disableButtonEdit: [],

    newsHighlighterIndex: -1,
    reRenderNews: false,

    bioArray: [],
    editionBody: "",
    secondaryTags: null,
    singleEdition: null,
    loadingEdition:false
  },
  getters: {
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
    }
  },
  mutations: {
    RESET_ALL(state) {
      state.credential = null
      state.errorUser = false
      state.username = ""
      state.pageNumbersNews = []
      state.pageNumbersTrendingNews = []
      state.newsFeedNews = []
      state.trendingNewsFeedNews = []
      state.selectedNews = []        
      state.disableButtonEdit = []
      state.nextPageNews = ""
      state.nextPageTrendingNews = ""
      state.disableButtonLoadMore = false
      state.disableButtonLoadMoreTrending = false
      state.endpointNews = "https://satelite-de-noticias.herokuapp.com/api/news/"
      state.endpointTrendingNews = "https://satelite-de-noticias.herokuapp.com/api/news/"
      state.newsHighlighterIndex = -1
      state.reRenderNews = false
      state.bioArray = []
      state.secondaryTags = null
      state.editionBody = "",      
      state.singleEdition = null,
      state.loadingEdition =false
      sessionStorage.clear()
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
    NEWS_SET(state, payload) {
      state.newsFeedNews.push(...payload);
    },
    TRENDING_NEWS_SET(state, payload) {
      state.trendingNewsFeedNews.push(...payload);
    },
    NEWS_PAGE_SET(state, payload) {
      state.nextPageNews = payload;
    },
    TRENDING_NEWS_PAGE_SET(state, payload) {
      state.nextPageTrendingNews = payload;
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
    }
  },
  actions: {
    async checkLogin({ state, dispatch }, payload) {
      await apiService(state.BASE_URL + state.LOGIN_URL, "POST", {
        username: payload.user,
        password: payload.pass
      }).then(data => {
        dispatch("setUserInfo", data["key"]);
      });
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
    async setUserInfo({ commit, state }, payload) {
      if (payload !== undefined) {
        commit("STORE_CREDENTIAL", payload);
        const data = await apiService(
          state.BASE_URL + state.USER_NAME_URL,
          false,
          undefined,
          payload
        );
        commit("USERNAME_USER_SET", data["username"]);
        window.sessionStorage.setItem("username", data["username"]);
        router.push('/main-feed')
      } else {
        alert('Nombre y/o contraseña incorrectas')
      }
      
    },
    logout({ state, commit }) {
      apiService(
        state.BASE_URL + state.LOGOUT_URL,
        "POST",
        undefined,
        state.credential
      );
      commit("RESET_ALL");
    },
    async registerAccount({ state }, payload) {
      console.log(payload);
      await apiService(state.endpointRegister, "POST", {
        username: payload.username,
        email: payload.email,
        password1: payload.password,
        password2: payload.password2,
        is_staff: false
      }).then(data => {
        console.log(data)
        if(data["key"] === undefined){         
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
        undefined,
        state.credential
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
    async getnewsLoadMore({ commit, state }) {
      console.log(state.credential);
      commit("DISABLE_LOAD_MORE_NEWS", true);
      if (state.nextPageNews) {
        commit("ENDPOINT_NEWS_SET", state.nextPageNews);
      }
      await apiService(
        state.endpointNews,
        "GET",
        undefined,
        state.credential
      ).then(data => {
        console.log(data);
        commit("NEWS_SET", data.results);
        commit("NEWS_SELECTED_STATES");
        if (data.next) {
          commit("NEWS_PAGE_SET", data.next);
          commit("NEWS_PAGENUMBERS_ARRAY", data.next);
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
        console.log(data);
      });
    },
    async getEdition({ state, commit }, payload) {
      console.log("aca va el payload ", payload);
      await apiService(
        state.BASE_URL + state.NEWS_FIRST_PAGE_URL + payload + "/editions/",
        "GET",
        undefined,
        state.credential
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
          tags: payload.tags,
          bibliography_name: payload.bibliographyNames,
          bibliography_link: payload.bibliographyLink
        },
        state.credential
      ).then(data => {
          console.log(data);
         
      });
    }
  },
  modules: {},
  plugins: [createPersistedState({ storage: window.sessionStorage })]
});
