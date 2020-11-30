import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    children: [
      { path: "/home", name: "home" }
    ],
    meta: {
      needsAuth: true
    }
  },
  {
    path: "/",
    name: "landing",
    component: () => import("../views/Landing.vue"),
    meta: {
      needsAuth: false
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((from, to, next) => {
  next();
});

export default router;
