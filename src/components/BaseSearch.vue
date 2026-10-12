<script>
// Search bar component. Filters the resource list and emits the results
// to the parent (StoredResources) via the "search-results" event.
import { Search, X } from "@lucide/vue";

export default {
  components: { Search, X },
  props: {
    // The full unfiltered list, used as the search source and to restore on reset
    resources: { type: Array, required: true },
  },
  emits: ["search-results"],
  data() {
    return {
      searchInput: "",
      searchResults: [],
      noResult: false,
      isResult: false,
    };
  },
  computed: {
    resultMessage() {
      const lg = this.searchResults.length;
      if (this.isResult) {
        return `Your search has ${lg} result${lg > 1 ? "s" : ""}.`;
      } else if (this.noResult) {
        return "No results.";
      } else {
        return "\u00A0";
      }
    },
  },
  methods: {
    // Normalizes text for case-insensitive, whitespace-trimmed comparison
    cleanTxt(txt) {
      return txt.toLowerCase().trim();
    },
    search() {
      const motif = this.cleanTxt(this.searchInput);
      this.searchResults = this.resources.filter((resource) => {
        return (
          this.cleanTxt(resource?.title).includes(motif) ||
          this.cleanTxt(resource?.description).includes(motif)
        );
      });
      if (this.searchResults.length) {
        this.noResult = false;
        this.isResult = true;
      } else {
        // No match: restore the full list so the parent doesn't show an empty view
        this.searchResults = this.resources;
        this.$refs.searchInput.blur();
        this.noResult = true;
        this.isResult = false;
      }
      this.$emit("search-results", this.searchResults);
    },
    // Clears UI state only (called on focusin to start a fresh search)
    resetInput() {
      this.noResult = false;
      this.isResult = false;
      this.searchInput = "";
    },
    // Full reset: restores the full list and emits it to the parent
    resetSearch() {
      this.searchResults = this.resources;
      this.resetInput();
      this.$emit("search-results", this.searchResults);
    },
  },
};
</script>
<template>
  <fieldset>
    <button class="btn-neutral btn-icon search-reset" @click="resetSearch">
      <X size="14">reset</X>
    </button>
    <input
      type="search"
      name="search-input"
      v-model="searchInput"
      @focusin="resetInput()"
      @keydown.enter="search"
      ref="searchInput"
      placeholder="Search..."
      aria-label="search"
    />
    <button type="button" name="search" class="btn-cta b-0" @click="search">
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
