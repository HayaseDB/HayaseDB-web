import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { Ref } from "vue";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isExpanded: useStorage<boolean>("sidebar", true) as Ref<boolean>,
  }),

  actions: {
    toggle() {
      this.isExpanded = !this.isExpanded;
    },
  },

  getters: {
    isSidebarExpanded: (state) => state.isExpanded,
    setSidebarExpanded: (state) => (value: boolean) => {
      state.isExpanded = value;
    },
  },
});
