<script setup>
  import BaseSearch from "./BaseSearch.vue";
  import BaseResource from "./BaseResource.vue";
  import { ref, inject } from "vue";

  // Inject. //
  const {resources} = inject('res');
  // Ref. //
  /* beware ! ref() return a ref argument. */
  const data = ref(resources.value);
  // Methods. //
  /* Receives filtered results emitted by BaseSearch and updates the displayed list */
  const displaySearchResults = (results) => {
    data.value = results?.length ? results : resources.value;
  };
</script>

<template>
  <section class="tab">
    <div v-if="data">
      <base-search
        :resources="resources"
        @search-results="displaySearchResults"
      ></base-search>
      <div class="resources">
        <!-- hr prop is false on the last item to avoid a trailing separator -->
        <base-resource
          v-for="resource in data"
          :key="resource?.id"
          :resource="resource"
        ></base-resource>
      </div>
    </div>
    <div v-else><h4>No resources actually...</h4></div>
  </section>
</template>
