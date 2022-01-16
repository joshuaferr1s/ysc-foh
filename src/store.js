import { reactive, watch } from "vue";

const state = reactive({
  user: JSON.parse(localStorage.getItem("user")) || undefined,
});

const mutations = {
  setUser: user => state.user = user,
};

const actions = {
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

export default { state, mutations, actions };
