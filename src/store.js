import { reactive, watch } from "vue";
import { createToast } from "mosha-vue-toastify";
import {
  onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut
} from "firebase/auth";
import { auth, db } from "./firebase";
import router from "./router";

const state = reactive({
  user: JSON.parse(localStorage.getItem("user")) || undefined,
});

const mutations = {
  setUser: user => state.user = user,
};

const actions = {
  login: async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.log("LOG IN ERROR", error);
      actions.errorToast(error.message);
    }
  },
  logout: async () => {
    try {
      mutations.setUser(null);
      await signOut(auth);
      router.push("/");
      actions.infoToast("You are now logged out.");
    } catch (error) {
      console.log("LOG OUT ERROR", error);
      actions.errorToast(error.message);
    }
  },
  errorToast: msg => {
    createToast(msg, {
      type: "danger",
      transition: "slide",
    });
  },
  infoToast: msg => {
    createToast(msg, {
      type: "info",
      transition: "slide",
    });
  },
  successToast: msg => {
    createToast(msg, {
      type: "success",
      transition: "slide",
    });
  },
};

watch(
  () => state,
  v => localStorage.setItem("user", JSON.stringify(v.user)),
  { deep: true }
);

onAuthStateChanged(auth, async user => {
  if (user) {
    if (!state.user) {
      const usr = { id: user.uid, name: user.displayName, email: user.email };
      // TODO: Check if user is authorized to manipulate the app
        // Create /users/{email} with field for edit rights boolean
      mutations.setUser(usr);
      actions.successToast(`Welcome back ${usr.name}.`);
    }
  } else if (!user && state.user) {
    mutations.setUser(null);
    actions.infoToast("You have been logged out.");
  } else {
    mutations.setUser(null);
  }
});

export default { state, mutations, actions };
