import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      name: "NotFound",
      component: () => import("./views/NotFound.vue"),
    },
  ],
});

export default router;
