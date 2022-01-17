<script setup>
  import { ref } from "vue";
  import {
    query, collection, orderBy, limit, getDocs, startAfter, endBefore, limitToLast
  } from "firebase/firestore";
  import { db } from "../firebase";
  import AppBar from "../components/AppBar.vue";
  import store from "../store";

  const PAGE_LENGTH = 10;
  let movies = ref([]);
  let searching = ref(true);
  let moreToBack = ref(false);
  let moreToCome = ref(true);
  let firstVisible = ref(null);
  let lastVisible = ref(null);

  const docToMovies = el => {
    const data = el.data();
    const date = new Date(data.date.seconds * 1000);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    movies.value.push({
      id: el.id,
      title: data.title,
      date: dd + "/" + mm + "/" + yyyy,
      dateRaw: data.date,
      full: data.full,
      member: data.member,
      free: data.free,
      misc: data.misc,
      totalTickets: data.full + data.member + data.free + data.misc,
      totalPounds: 4*data.full + 3*data.member,
    });
  };

  const getMovies = async direction => {
    searching.value = true;
    
    try {
      if (movies.value.length == 0) {
        const q = query(
          collection(db, "movies"),
          orderBy("date", "desc"),
          limit(PAGE_LENGTH)
        );
        const docSnaps = await getDocs(q);
        if (docSnaps.size == 0) {
          moreToCome.value = false;
          store.actions.errorToast("There are no movies in the database");
        } else {
          firstVisible.value = docSnaps.docs[0];
          lastVisible.value = docSnaps.docs[docSnaps.docs.length-1];
          if (docSnaps.size < PAGE_LENGTH) {
            moreToCome.value = false;
          }
          docSnaps.forEach(docToMovies);
        }
      } else {
        if (direction > 0) {
          const q = query(
            collection(db, "movies"),
            orderBy("date", "desc"),
            startAfter(lastVisible.value),
            limit(PAGE_LENGTH)
          );
          const docSnaps = await getDocs(q);
          if (docSnaps.size == 0) {
            moreToCome.value = false;
            store.actions.infoToast("No more older movies to load.");
          } else {
            moreToBack.value = true;
            firstVisible.value = docSnaps.docs[0];
            lastVisible.value = docSnaps.docs[docSnaps.docs.length-1];
            if (docSnaps.size < PAGE_LENGTH) {
              moreToCome.value = false;
            }
            movies.value = [];
            docSnaps.forEach(docToMovies);
          }
        } else {
          const q = query(
            collection(db, "movies"),
            orderBy("date", "desc"),
            endBefore(firstVisible.value),
            limitToLast(PAGE_LENGTH)
          );
          const docSnaps = await getDocs(q);
          if (docSnaps.size == 0) {
            moreToBack.value = false;
            store.actions.infoToast("No more newer movies to load.");
          } else {
            firstVisible.value = docSnaps.docs[0];
            lastVisible.value = docSnaps.docs[docSnaps.docs.length-1];
            if (docSnaps.size < PAGE_LENGTH) {
              moreToBack.value = false;
            }
            movies.value = [];
            docSnaps.forEach(docToMovies);
          }
        }
      }
    } catch (error) {
      console.log("GET MOVIE ERROR", error);
      store.actions.errorToast(error.message);
    } finally {
      searching.value = false;
    }
  };

  getMovies();
</script>

<template>
  <app-bar />
  <main class="w-screen py-6 px-4">
    <div class="px-5 w-full mx-auto bg-white shadow-lg rounded-md border border-gray-200 overflow-scroll">
      <header class="py-4 border-b border-gray-100">
        <h2 class="font-semibold text-gray-800">Movies</h2>
      </header>
      <table class="w-full">
        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
          <tr class="text-left">
            <th class="p-2 whitespace-nowrap">Title</th>
            <th class="p-2 whitespace-nowrap">Date</th>
            <th class="p-2 whitespace-nowrap">£4</th>
            <th class="p-2 whitespace-nowrap">£3</th>
            <th class="p-2 whitespace-nowrap">Free</th>
            <th class="p-2 whitespace-nowrap">Misc.</th>
            <th class="p-2 whitespace-nowrap">Total (Tickets)</th>
            <th class="p-2 whitespace-nowrap">Total (Pounds)</th>
            <th class="p-2 whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody class="text-sm divide-y divide-gray-100">
          <tr v-if="movies.length > 0" v-for="movie in movies" :key="movie.id">
            <td class="p-2 whitespace-nowrap font-medium text-gray-800">{{ movie.title }}</td>
            <td>{{ movie.date }}</td>
            <td>{{ movie.full }}</td>
            <td>{{ movie.member }}</td>
            <td>{{ movie.free }}</td>
            <td>{{ movie.misc }}</td>
            <td>{{ movie.totalTickets }}</td>
            <td class="font-medium" :class="movie.totalPounds > 0 ? 'text-green-500' : 'text-red-500'">£{{ movie.totalPounds }}</td>
            <td class="cursor-pointer text-cyan-500 hover:text-cyan-700 duration-200">Track tickets</td>
          </tr>
          <tr v-else-if="movies.length == 0 && searching">
            <td colspan="9" class="text-gray-800 p-2 text-center">Searching the database...</td>
          </tr>
          <tr v-else>
            <td colspan="9" class="text-gray-800 p-2 text-center">No movies in the databse.</td>
          </tr>
        </tbody>
      </table>
      <footer class="pb-4 border-t border-gray-100">
        <div class="bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <div class="inline-flex mt-4 xs:mt-0">
            <button
              @click="getMovies(-1)"
              :disabled="!moreToBack || searching"
              class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
            >
              Prev
            </button>
            <button
              @click="getMovies(1)"
              :disabled="!moreToCome || searching"
              class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  </main>
</template>
