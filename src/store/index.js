import Vue from "vue";
import Vuex from "vuex";
import { apiService } from "@/common/api.service.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    BASE_URL: "http://satelite-de-noticias.herokuapp.com",
    LOGIN_URL: "/api/rest-auth/login/",
    LOGOUT_URL: "/api/rest-auth/logout/",
    USER_NAME_URL: "/api/user/",
    NEWS_FIRST_PAGE_URL: "/api/news/",
    NEWS_GENERAL_PAGE_URL: "/api/news/?page=",
    endpointRegister:
      "https://satelite-de-noticias.herokuapp.com/api/rest-auth/registration/",

    endpointNews: "http://satelite-de-noticias.herokuapp.com/api/news/",

    credential: null,
    errorUser: false,
    username: "",
    pageNumbersNews: [],
    newsFeedNews: [],
    trendingNewsFeedNews:[],
    selectedNews: [],
    disableButtonEdit: [],
    nextPageNews: "",
    disableButtonLoadMore: false,
    lastPageNumber: 0,

    newsHighlighterIndex: -1,
    reRenderNews: 0
  },
  getters: {
    error_user_state(state) {
      return state.errorUser;
    },
    username_user_state(state) {
      return state.username;
    }
  },
  mutations: {
    RESET_ALL(state) {
      (state.credential = null),
      (state.errorUser = false),
      (state.username = ""),
      (state.pageNumbersNews = []),
      (state.newsFeedNews = []),
      (state.selectedNews = []),
      (state.disableButtonEdit = []),
      (state.nextPageNews = ""),
      (state.disableButtonLoadMore = false),
      (state.lastPageNumber = 0),
      (state.endpointNews = "http://satelite-de-noticias.herokuapp.com/api/news/"),
      (state.newsHighlighterIndex= -1),
      (state.reRenderNews= 0);
      
      sessionStorage.clear();
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
    NEWS_SET(state, payload) {
      state.newsFeedNews.push(...payload);
    },
    TRENDING_NEWS_SET(state, payload) {
      state.trendingNewsFeedNews.push(...payload);
    },
    NEWS_PAGE_SET(state, payload) {
      state.nextPageNews = payload;
    },
    DISABLE_LOAD_MORE_NEWS(state, payload) {
      state.disableButtonLoadMore = payload;
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
    SET_HIGHLIGHTER(state, payload) {
      console.log(payload);
      console.log(state.selectedNews);
      console.log(state.disableButtonEdit);

      state.selectedNews[payload.index] = payload.truth;
      state.disableButtonEdit[payload.index] = payload.truth;

      console.log(state.selectedNews);
      console.log(state.disableButtonEdit);

      state.reRenderNews++;
      //this.$set(state.selectedNews, payload.index, payload.truth);
      //this.$set(state.disableButtonEdit, payload.index, payload.truth);
    },
    UPDATE_HIGHLIGHTER_INDEX(state, payload) {
      state.newsHighlighterIndex = payload;
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
    async setUserInfo({ commit, state }, payload) {
      if (payload !== undefined) {
        commit("STORE_CREDENTIAL", payload);
      } else {
        commit("ERROR_USER_SET");
      }
      const data = await apiService(
        state.BASE_URL + state.USER_NAME_URL,
        false,
        undefined,
        payload
      );
      commit("USERNAME_USER_SET", data["username"]);
      window.sessionStorage.setItem("username", data["username"]);
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
    newsHighlighter({ state, commit }, payload) {
      console.log(payload);
      if (state.selectedNews[payload] == false) {
        commit("SET_HIGHLIGHTER", { index: payload, truth: true });
      }
      if (payload !== state.newsHighlighterIndex) {
        commit("SET_HIGHLIGHTER", {
          index: state.newsHighlighterIndex,
          truth: false
        });
      }
      commit("UPDATE_HIGHLIGHTER_INDEX", payload);
    }
  },
  modules: {},
  plugins: [createPersistedState({ storage: window.sessionStorage })]
});
