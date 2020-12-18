import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "../firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/dashboard/home",
        name: "home",
        component: () => import("@/views/Home.vue")
      },
      {
        path: "/dashboard/dietas",
        name: "dietas",
        component: () => import("@/views/Dietas.vue")
      },
      {
        path: "/dashboard/treinos",
        name: "treinos",
        component: () => import("@/views/Treinos.vue")
      },
      {
        path: "/dashboard/calculadoras",
        name: "calculadoras",
        component: () => import("@/views/Calculadoras.vue")
      },
      {
        path: "/dashboard/alimentos",
        name: "alimentos",
        component: () => import("@/views/Food.vue")
      }
    ]
  },
  {
    path: "*",
    redirect: { name: "landing" }
  },
  {
    path: "/",
    name: "landing",
    component: () => import("../views/Landing.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((from, to, next) => {
  if (to.meta.requiresAuth) {
    if (!auth.currentUser) {
      next({ path: "/login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
