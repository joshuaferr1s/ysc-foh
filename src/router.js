import { createRouter, createWebHistory } from "vue-router";
import store from "./store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("./views/Dashboard.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)",
      name: "NotFound",
      component: () => import("./views/NotFound.vue"),
    },
  ],
});

router.beforeEach((to, _) => {
  const loggedIn = store.state.user;
  const requiresAuth = to.matched.some(r => r.meta.requiresAuth);
  if (requiresAuth && !loggedIn) {
    store.actions.errorToast(`You are not authorized to view the ${to.name} page.`);
    return "/";
  }
});

export default router;
