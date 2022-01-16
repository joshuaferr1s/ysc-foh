<script setup>
  import { useRouter } from "vue-router";
  import store from "../store";
  
  const router = useRouter();
</script>

<template>
  <nav class="flex justify-between py-3 px-4 w-screen bg-slate-700 shadow-lg">
    <div class="flex items-center justify-center">
      <h1 class="text-2xl font-light">
        <span class="text-teal-400">YSC</span>
        <span class="text-slate-400">FoH</span>
      </h1>
    </div>
    <div class="flex items-center justify-center">
      <router-link to="/dashboard" @click="() => router.push({ name: 'Dashboard' })" class="bg-transparent hover:bg-blue-400 text-blue-400 font-semibold hover:text-white py-1 px-4 border border-blue-400 hover:border-transparent rounded-full duration-200">
        Dashboard
      </router-link>
      <button @click="store.actions.logout" class="ml-2 py-1 px-4 text-red-400 hover:text-white hover:bg-red-400 border border-red-400 hover:border-red-400 rounded-full duration-200">Log out</button>
    </div>
  </nav>
</template>
