<script>
// Displays a single resource card with edit and delete actions.
// editResource and removeResource are injected from App.vue (avoid prop-drilling).
import { Pencil, Trash } from  "@lucide/vue";
export default {
  components: { Pencil, Trash },
  props: ["resource", "hr"],
  inject: ["editResource", "removeResource"],
  methods: {
    edit() {
      this.editResource(this.resource);
    },
    remove() {
      const ok = confirm(
        `are you sure to delete ${this.resource.title ?? "this resource"} ?`,
      );
      if (ok) {
        this.removeResource(this.resource);
      } else {
        // btn-delete loss focus on confirm cancel.
        this.$refs.deleteButton.blur();
      }
    },
  },
};
</script>

<template>
  <article class="resource_item">
    <div>
      <header class="resource_item-header">
        <h3>{{ resource.title }}</h3>
        <div class="item_cta">
          <button class="btn-icon btn-edit" @click="edit">
            <Pencil :size="12" stroke-width="4">Edit</Pencil>
          </button>
          <button
            class="btn-icon btn-delete"
            @click="remove"
            ref="deleteButton"
          >
            <Trash :size="12" stroke-width="4">Delete</Trash>
          </button>
        </div>
      </header>

      <p>{{ resource.description }}</p>
      <a :href="resource.link" target="_blank" rel="noopener noreferrer"
        >Read more...</a
      >
    </div>
  </article>
</template>

<style scoped>
.resource_item {
  padding: 1em;
  border-top: 1px dashed lightslategray;
}
.resource_item-header {
  display: flex;
  align-items: center;
  h3{
    flex-grow: 1;
    margin-bottom: 0.5em;
  }
}
.item_cta {
  display: flex;
  justify-content: flex-end;
  gap: 0.25em;
  margin: 0;
}
a {
  display: block;
  margin-bottom: 1em;
}
</style>
