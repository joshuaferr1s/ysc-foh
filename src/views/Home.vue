<script setup>
  import { useRouter } from "vue-router";
  import store from "../store";

  const router = useRouter();
</script>

<template>
  <main class="min-h-screen w-screen py-32 px-4 text-center">
    <h1 class="text-8xl font-bold mb-2">
      <span class="text-teal-400">YSC</span>
      <span class="text-slate-400">FoH</span>
    </h1>
    <p class="text-gray-600 text-md">York Student Cinema's ticketing system.</p>
    <p>Made with 💜 by <a href="https://jajjferris.com" target="_blank" rel="nofollow noreferrer noopener" title="Go to Joshua Ferris's website" class="text-cyan-500 hover:text-cyan-700 duration-200">Joshua Ferris</a></p>
    <button v-if="store.state.user" @click="() => router.push({ name: 'Dashboard' })" class="mt-4 w-64 bg-transparent text-cyan-500 hover:bg-cyan-700 hover:text-white border-2 border-cyan-700 py-1 px-2 rounded duration-200">Enter app</button>
    <button v-else @click="store.actions.login" class="mt-4 w-64 bg-transparent text-cyan-500 hover:bg-cyan-700 hover:text-white border-2 border-cyan-700 py-1 px-2 rounded duration-200">Log in with Google</button>
  </main>
</template>
