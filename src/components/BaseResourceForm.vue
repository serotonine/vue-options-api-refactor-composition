<script setup>
// Dual-purpose form: "Add" mode when no resource prop is passed, "Edit" mode when one is.
// Validation errors are collected and shown in a modal dialog (BaseDialog).
import BaseDialog from "./BaseDialog.vue";
import { isValidLink } from "../utilities/form-validators";
import { ref, inject, defineProps } from "vue";

const props = defineProps({
  resource: { type: Object, required: false },
});
// Inject. //
const { updateResources, addResource } = inject("res");

// Ref. //
const data = ref({ title: "", description: "", link: "", ...props.resource });
const form = ref(null);
const formIsInvalid = ref(false);
const error = ref([]);

// Methods. //
const submit = () => {
  // Reset
  formIsInvalid.value = false;
  const errors = [];
  error.value = [];
  // FormData reads field values by their name attribute — no need to list them manually
  const data = Object.fromEntries(new FormData(form.value));
  for (const [key, value] of Object.entries(data)) {
    if (value === "") {
      errors.push(`${key} field is empty,`);
    }
  }

  if (data.link !== "" && !isValidLink(data.link)) {
    errors.push("link is not valid");
  }
  if (data.description.length > 600) {
    errors.push("The description must have max 600 characters");
  }

  if (errors.length) {
    for (const err of errors) {
      error.value.push(err);
    }
    formIsInvalid.value = true;
    return;
  }
  props.resource
    ? updateResources({ id: resource.value.id, ...data })
    : addResource(data);
  form.value.reset();
};
</script>

<template>
  <section class="tab">
    <form ref="form" @submit.prevent="submit" novalidate>
      <label>
        <span class="label"><small>Title</small></span>
        <input type="text" name="title" required v-model="data.title" />
      </label>
      <label>
        <span class="label"><small>Description</small></span>
        <textarea
          name="description"
          id=""
          rows="10"
          required
          v-model="data.description"
        ></textarea>
        <p class="info"><small>Max 600 characters.</small></p>
      </label>
      <label>
        <span class="label"><small>Link</small></span>
        <input type="url" name="link" required v-model="data.link" />
      </label>
      <button class="btn-cta" type="submit">
        {{ resource ? "Update resource" : "Add resource" }}
      </button>
    </form>
    <!-- Teleport renders the dialog directly in <body> to avoid z-index/stacking issues -->
    <Teleport to="body">
      <base-dialog v-if="formIsInvalid" @close="formIsInvalid = false">
        <h3 class="error">Please fix:</h3>
        <ul class="error">
          <li v-for="e in error" :key="e">{{ e }}</li>
        </ul>
      </base-dialog>
    </Teleport>
  </section>
</template>

<style scoped>
form {
  padding: 0.25em 0.5em;
  margin-top: 1em;
}

ul.error {
  padding-left: 0;
  li {
    margin: 0;
    padding: 0;
    list-style-position: inside;
  }
}
.info {
  color: lightslategray;
  margin-top: -1em;
}
</style>
