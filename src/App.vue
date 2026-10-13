<script setup>
import StoredResources from "./components/StoredResources.vue";
import BaseResourceForm from "./components/BaseResourceForm.vue";
import { ref, provide } from "vue";
/** @import { Resource } from '@/utilities/types.js' */

const tabs = {
  "stored-resources": StoredResources,
  "base-resource-form": BaseResourceForm,
};
// Refs. //
const activeTab = ref("stored-resources");
/* Holds the resource being edited; null means we're in "add" mode. */
const resource = ref(null);

// Methods. //
/* isEmpty resets the edited resource when switching to the "Add" tab manually. */
const selectTab = (tab, isEmpty = false) => {
  if (isEmpty) resource.value = null;
  activeTab.value = tab;
};
const dummyResource = () => {
  /** @type {Resource} */
  const dummy = {
    id: crypto.randomUUID(),
    title: "Welcome !",
    description:
      "A sample resource to get you started. Feel free to search, add, edit or delete resources.\nEach entry needs a title, a description and a valid URL.\nEnjoy!",
    link: "https://serotonine.netlify.app/",
  };
  const resources = [dummy];
 
  localStorage.setItem("resources", JSON.stringify(resources));
  return resources;
};
const loadResources = () => {
  const localResources = localStorage.getItem("resources");
  return JSON.parse(localResources) ?? dummyResource();
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
const updateResources = (res) => {
  /*   splice replaces in-place to keep the same list position */
  const index = resources.value.findIndex((r) => r.id === res.id);
  resources.value.splice(index, 1, { ...res });
  resource.value = null;
  selectTab("stored-resources");
  saveResources();
};
const editResource = (res) => {
  // Sets the resource to edit, then switches to the form tab
  resource.value = res;
  selectTab("base-resource-form");
};
const removeResource = (res) => {
  const index = resources.value.findIndex((r) => r.id === res.id);
  resources.value.splice(index, 1);
  saveResources();
};
// Refs. //
const resources = ref(loadResources());

// Provide. //
provide("res", {
  resources,
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
        v-bind="
          activeTab === 'base-resource-form' ? { resource: resource } : {}
        "
      >
      </component>
    </div>
  </main>
</template>
