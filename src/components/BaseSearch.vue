<script setup>
// Search bar component. Filters a data list and emits the results.
import { defineProps, defineEmits, ref, computed } from "vue";
import { cleanTxt } from "@/utilities/string-utilities";
import { Search, X } from "@lucide/vue";
// Pass resources by props in order to make this search component polyvalent.
const props = defineProps({
  resources: { type: Array },
});
// Emits. //
const emit = defineEmits(["search-results"]);
// Ref. //
const inputEl = ref(null);
const searchInput = ref("");
const searchResults = ref(null);
const noResult = ref(false);
const isResult = ref(false);

// Computed. //
const resultMessage = computed(() => {
  const lg = searchResults.value?.length ?? 0;
  if (isResult.value) {
    return `Your search has ${lg} result${lg > 1 ? "s" : ""}.`;
  } else if (noResult.value) {
    return "No results.";
  } else {
    return "\u00A0";
  }
});
// Methods. //
const search = () => {
  const motif = cleanTxt(searchInput.value);
  searchResults.value = props.resources.filter((resource) => {
    return (
      cleanTxt(resource?.title).includes(motif) ||
      cleanTxt(resource?.description).includes(motif)
    );
  });
  if (searchResults.value.length) {
    noResult.value = false;
    isResult.value = true;
  } else {
    /* No match: restore the full list so the parent doesn't show an empty view */
    searchResults.value = null;
    inputEl.value.blur();
    noResult.value = true;
    isResult.value = false;
  }
  emit("search-results", searchResults.value);
};
/* Clears UI state only (called on focusin to start a fresh search) */
const resetInput = () => {
  noResult.value = false;
  isResult.value = false;
  searchInput.value = "";
};
/* Full reset: restores the full list and emits it to the parent */
const resetSearch = () => {
  searchResults.value = null;
  resetInput();
  emit("search-results", searchResults.value);
};
</script>

<template>
  <fieldset>
    <button class="btn-neutral btn-icon search-reset" @click="resetSearch" aria-label="Search">
      <X :size="14">reset</X>
    </button>
    <input
      type="search"
      name="search-input"
      v-model="searchInput"
      @focusin="resetInput()"
      @keydown.enter="search"
      ref="inputEl"
      placeholder="Search..."
      aria-label="search"
    />
    <button type="button" name="search" class="btn-cta b-0" @click="search" aria-label="Search reset">
      <Search size="20">Search</Search>
    </button>
  </fieldset>
  <h4 :class="{ error: noResult }">{{ resultMessage }}</h4>
</template>

<style scoped>
fieldset {
  display: flex;
  align-items: stretch;
  margin-top: 1.5em;
  border: none;
  padding: 0;
  position: relative;
}
label {
  flex-grow: 1;
}
input[type="search"] {
  appearance: none;
  border-radius: 0;
  margin-bottom: 0;
  padding-left: 0.25em;
  padding-right: 1em;
  border: 2px solid gainsboro;
  border-right: none;
  box-shadow: none;
}
input[type="search"]:focus-visible {
  outline: none;
  border-color: cornflowerblue;
}
/* Reset */
input[type="search"]::-webkit-search-cancel-button {
  appearance: none;
}
.search-reset {
  position: absolute;
  /* The inset-block CSS property defines the logical block start and end offsets of an element, 
  * which maps to physical offsets depending on the element's writing mode, 
  * directionality, and text orientation. It corresponds to the top and bottom, 
  * or right and left properties depending on the values defined for writing-mode, direction, and text-orientation.
  */
  inset-block: 0;
  right: 3.25em;
  /* Vertical centering between top: 0 and bottom: 0 */
  margin-block: auto;
  padding: 0;
  width: 1.5em;
  height: 1.5em;
  opacity: 0.8;
  background-color: white;
  transition: background-color 0.2s ease-out;
  &:hover,
  &:focus,
  &:focus-within {
    background-color: gainsboro;
  }
}
.btn-cta.b-0 {
  border-radius: initial;
  margin-bottom: 0;
}
</style>
