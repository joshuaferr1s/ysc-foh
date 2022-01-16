<script setup>
  import AppBar from "../components/AppBar.vue";
</script>

<template>
  <app-bar />
  <main class="w-screen py-6 px-4">
    <div class="px-5 w-full mx-auto bg-white shadow-lg rounded-md border border-gray-200">
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
            <th class="p-2 whitespace-nowrap">Total</th>
            <th class="p-2 whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody class="text-sm divide-y divide-gray-100">
          <tr>
            <td class="p-2 whitespace-nowrap font-medium text-gray-800">The Lighthouse</td>
            <td>2021-06-21</td>
            <td>5</td>
            <td>2</td>
            <td>10</td>
            <td>0</td>
            <td class="font-medium text-red-500">£26.00</td>
            <td class="cursor-pointer text-cyan-500 hover:text-cyan-700 duration-200">Track tickets</td>
          </tr>
          <tr>
            <td class="p-2 whitespace-nowrap font-medium text-gray-800">Encanto</td>
            <td>2021-05-21</td>
            <td>100</td>
            <td>60</td>
            <td>30</td>
            <td>0</td>
            <td class="font-medium text-green-500">£580.00</td>
            <td class="cursor-pointer text-cyan-500 hover:text-cyan-700 duration-200">Track tickets</td>
          </tr>
        </tbody>
      </table>
      <footer class="pb-4 border-t border-gray-100">
        <div class="bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
          <div class="inline-flex mt-4 xs:mt-0">
            <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
              Prev
            </button>
            <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  </main>
</template>