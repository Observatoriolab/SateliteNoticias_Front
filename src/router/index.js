import Vue from "vue";
import VueRouter from "vue-router";
import MainFeed from "@/views/MainFeed.vue";
import SentimentAnalysis from "@/views/SentimentAnalysis.vue";

import Login from "@/components/UserAdmin/Login.vue";
import Registration from "@/components/UserAdmin/Registration.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Registration",
    component: Registration
  },
  {
    path: "/sentiment-analysis",
    name: "SentimentAnalysis",
    component: SentimentAnalysis
  },
  {
    path: "/main-feed",
    name: "MainFeed",
    component: MainFeed,
    beforeEnter: (to, from, next) => {
      if (window.sessionStorage.getItem('username')) {
        next();
        return;
      }
      else{
        router.push("/")
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
