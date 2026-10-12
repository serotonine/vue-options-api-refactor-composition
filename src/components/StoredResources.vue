<script setup>
  import BaseSearch from "./BaseSearch.vue";
  import BaseResource from "./BaseResource.vue";
  import { ref, inject } from "vue";

  // Inject. //
  const {resources} = inject('res');
  // Ref. //
  const data = ref(resources);
  // Methods. //
  /* Receives filtered results emitted by BaseSearch and updates the displayed list */
  const displaySearchResults = (results) => {
    data.value = results;
  };
</script>

<template>
  <section class="tab">
    <div v-if="data.length > 0">
      <base-search
        :resources="resources"
        @search-results="displaySearchResults"
      ></base-search>
      <div class="resources">
        <!-- hr prop is false on the last item to avoid a trailing separator -->
        <base-resource
          v-for="(resource, index) in data"
          :key="resource?.id"
          :resource="resource"
          :hr="index < data.length - 1"
        ></base-resource>
      </div>
    </div>
    <div v-else><h4>No resources actually...</h4></div>
  </section>
</template>
<style scoped>
.resources {
  /* max-height: 500px;
  overflow-y:auto;
  padding-right: 1em;; */
}
</style>
