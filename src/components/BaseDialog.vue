<script>
// Generic modal dialog built on the native <dialog> element.
// showModal() gives us a free backdrop and focus trap without extra libraries.
// Content is injected via the default slot.
import { X } from "@lucide/vue";
export default {
  components: { X },
  methods: {
    open() {
      this.$refs.dialog.showModal();
    },
    // Emits "close" so the parent can toggle its v-if and unmount this component
    close() {
      this.$emit("close");
    },
  },
  emits: ["close"],
  mounted() {
    this.$refs.dialog.showModal();
  },
};
</script>

<template>
  <dialog ref="dialog">
    <button class="btn-neutral btn-icon" @click="close">
      <X :size="24" />
    </button>
    <slot></slot>
  </dialog>
</template>

<style scoped>
dialog {
  padding: 0 1em 1em 1em;
  width: 40%;
  background-color: white;
  border-radius: 6px;
  border-color: crimson;
}
.btn-neutral.btn-icon {
  margin-top: 1em;
  float: right;
  &:hover,
  &:focus {
    background-color: gainsboro;
  }
}
</style>
