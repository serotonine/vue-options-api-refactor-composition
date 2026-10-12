<script setup>
import StoredResources from "./components/StoredResources.vue";
import BaseResourceForm from "./components/BaseResourceForm.vue";
import { ref, provide, readonly } from "vue";

const tabs = {
  "stored-resources": StoredResources,
  "base-resource-form": BaseResourceForm,
};

// Methods. //
/* isEmpty resets the edited resource when switching to the "Add" tab manually. */
const selectTab = (tab, isEmpty = false) => {
  if (isEmpty) resource.value = null;
  activeTab.value = tab;
};
const loadResources = () => {
  const localResources = localStorage.getItem("resources");
  return JSON.parse(localResources) ?? [];
};
const saveResources = () => {
  localStorage.setItem("resources", JSON.stringify(resources.value));
};
const addResource = (resource) => {
  /* unshift places the new resource at the top of the list */
  resources.value.unshift({ ...resource, id: crypto.randomUUID() });
  saveResources();
  selectTab("stored-resources");
};
const updateResources = (resource) => {
  /*   splice replaces in-place to keep the same list position */
  const index = resources.value.findIndex((r) => r.id === resource.id);
  resources.value.splice(index, 1, { ...resource });
  resource.value = null;
  selectTab("stored-resources");
  saveResources();
};
const editResource = (resource) => {
  // Sets the resource to edit, then switches to the form tab
  resource.value = resource;
  selectTab("base-resource-form");
};
const removeResource = (resource) => {
  const index = this.resources.findIndex((r) => r.id === resource.id);
  resources.value.splice(index, 1);
  saveResources();
};
// Refs. //
const activeTab = ref("stored-resources");
const resources = ref(loadResources());
/* Holds the resource being edited; null means we're in "add" mode. */
const resource = ref(null);
// Provide. //
provide("res", {
  resources: readonly(resources),
  updateResources,
  addResource,
  editResource,
  removeResource,
});
</script>

<template>
  <div class="container">
    <the-header><h1>Vue Composition API</h1></the-header>
  </div>

  <main>
    <div class="container">
      <button
        type="button"
        @click="selectTab('stored-resources')"
        :class="{ active: activeTab === 'stored-resources' }"
        role="tablist"
      >
        Stored resources
      </button>
      <button
        type="button"
        @click="selectTab('base-resource-form', true)"
        :class="{ active: activeTab === 'base-resource-form' }"
        role="tablist"
      >
        Add resource
      </button>
      <component
        :is="tabs[activeTab]"
        v-bind="activeTab === 'base-resource-form' ? { resource } : {}"
      >
      </component>
    </div>
  </main>
</template>
