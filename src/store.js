import { reactive, watch } from "vue";

const state = reactive({
  user: JSON.parse(localStorage.getItem("user")) || undefined,
});

const mutations = {
  setUser: user => state.user = user,
};

const actions = {};

watch(
  () => state,
  v => localStorage.setItem("user", JSON.stringify(v.user)),
  { deep: true }
);

export default { state, mutations, actions };
