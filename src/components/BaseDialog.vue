<script setup>
// Generic modal dialog built on the native <dialog> element.
// showModal() gives us a free backdrop and focus trap without extra libraries.
// Content is injected via the default slot.
import { ref, onMounted } from "vue";
import { X } from "@lucide/vue";
// Emits. //
const emit = defineEmits(["close"]);
// Ref. //
const dialog = ref(null);
// Methods. //
// Emits "close" so the BaseResourceForm can toggle its v-if and unmount this component.
const close = () => {
  emit("close");
};
// onMounted. //
onMounted(() => {
  dialog.value.showModal();
  dialog.value.focus();
});
</script>

<template>
  <dialog ref="dialog" @click.self="close">
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
