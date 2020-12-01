import Vue from "vue";
import VueRouter from "vue-router";
import MainFeed from "@/views/MainFeed.vue";
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
