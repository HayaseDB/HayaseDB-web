<template>
  <div class="relative">
    <button
      class="relative flex items-center p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
      aria-label="Account profile"
      :aria-expanded="isProfileMenuOpen"
      @click="isProfileMenuOpen = !isProfileMenuOpen"
    >
      <span class="sr-only">Profile</span>
      <span class="flex items-center">
        <span
          v-if="!user.pfp"
          class="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center text-white font-semibold"
        >
          {{ user.username.charAt(0).toUpperCase() || "U" }}
        </span>
        <img
          v-else
          :src="user.pfp.url"
          alt="User profile picture"
          class="h-8 w-8 rounded-md object-cover bg-indigo-600"
        />
        <ChevronDown
          class="h-4 w-4 ml-1"
          :class="isProfileMenuOpen ? 'rotate-180' : ''"
        />
      </span>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isProfileMenuOpen"
        class="absolute right-0 mt-6 w-48 rounded-md shadow-lg py-1 bg-white border-gray-200 border z-50"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
        @blur="isProfileMenuOpen = false"
      >
        <div class="px-4 py-3 border-b border-gray-100">
          <p class="text-sm">Signed in as</p>
          <p class="text-sm font-medium text-gray-900 truncate">
            @{{ user.username }}
          </p>
        </div>

        <RouterLink v-slot="{ href }" to="/dashboard/profile">
          <a
            :href="href"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            @click="isProfileMenuOpen = false"
          >
            <div class="flex items-center">
              <UserIcon class="h-4 w-4 mr-2" />
              Your Profile
            </div>
          </a>
        </RouterLink>

        <RouterLink v-slot="{ href }" to="/dashboard/settings">
          <a
            :href="href"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            @click="isProfileMenuOpen = false"
          >
            <div class="flex items-center">
              <SettingsIcon class="h-4 w-4 mr-2" />
              Settings
            </div>
          </a>
        </RouterLink>

        <RouterLink v-slot="{ href }" to="/dashboard">
          <a
            :href="href"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            @click="isProfileMenuOpen = false"
          >
            <div class="flex items-center">
              <LayoutDashboard class="h-4 w-4 mr-2" />
              Dashboard
            </div>
          </a>
        </RouterLink>

        <RouterLink
          to="/logout"
          class="block hover:cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
          role="menuitem"
        >
          <span class="flex items-center">
            <LogOut class="h-4 w-4 mr-2" />
            Sign out
          </span>
        </RouterLink>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "@/stores/auth.store.js";
import {
  ChevronDown,
  UserIcon,
  SettingsIcon,
  LogOut,
  LayoutDashboard,
} from "lucide-vue-next";

const isProfileMenuOpen = ref(false);
const authStore = useAuthStore();
const user = computed(() => authStore.user);

const handleClickOutside = (event) => {
  const profileButton = document.querySelector(
    '[aria-label="Account profile"]',
  );
  const profileMenu = document.querySelector('[role="menu"]');

  if (
    isProfileMenuOpen.value &&
    profileButton &&
    profileMenu &&
    !profileButton.contains(event.target) &&
    !profileMenu.contains(event.target)
  ) {
    isProfileMenuOpen.value = false;
  }
};

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
