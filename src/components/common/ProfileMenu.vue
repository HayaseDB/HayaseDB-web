<template>
  <div class="relative">
    <button
        @click="isProfileMenuOpen = !isProfileMenuOpen"
        class="relative flex items-center p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
        aria-label="Account profile"
        :aria-expanded="isProfileMenuOpen"
    >
      <span class="sr-only">Profile</span>
      <span class="flex items-center">
      <img
          :src="userPfpUrl"
          alt="User profile picture"
          class="h-8 w-8 rounded-full object-cover bg-indigo-600"
      />
        <ChevronDown class="h-4 w-4 ml-1" :class="isProfileMenuOpen ? 'rotate-180' : ''" />
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
          class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          @blur="isProfileMenuOpen = false"
          tabindex="-1"
      >
        <div class="px-4 py-3 border-b border-gray-100">
          <p class="text-sm">Signed in as</p>
          <p class="text-sm font-medium text-gray-900 truncate">@{{ user.username }}</p>
        </div>

        <RouterLink to="/dashboard/profile" v-slot="{ href }">
          <a
              :href="href"
              @click="isProfileMenuOpen = false"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
          >
            <div class="flex items-center">
              <UserIcon class="h-4 w-4 mr-2" />
              Your Profile
            </div>
          </a>
        </RouterLink>

        <RouterLink to="/dashboard/settings" v-slot="{ href }">
          <a
              :href="href"
              @click="isProfileMenuOpen = false"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
          >
            <div class="flex items-center">
              <SettingsIcon class="h-4 w-4 mr-2" />
              Settings
            </div>
          </a>
        </RouterLink>

        <button
            @click="handleLogout"
            class="block hover:cursor-pointer w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600"
            role="menuitem"
        >
          <span class="flex items-center">
            <LogOut class="h-4 w-4 mr-2" />
            Sign out
          </span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '@/stores/auth.store.js';
import { User, ChevronDown, UserIcon, SettingsIcon, LogOut } from 'lucide-vue-next';
import { AuthService } from '@/services/auth.service.js';
import { useRouter } from 'vue-router';
import { UserService } from '@/services/user.service.js';

const router = useRouter();
const isProfileMenuOpen = ref(false);
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const userPfpUrl = ref('');

const handleLogout = () => {
  isProfileMenuOpen.value = false;
  AuthService.logout();
  router.push('/');
};

const handleClickOutside = (event) => {
  const profileButton = document.querySelector('[aria-label="Account profile"]');
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
  document.addEventListener('click', handleClickOutside);

  if (user.value?.userId) {
    try {
      userPfpUrl.value = await UserService.getUserProfilePictureUrl(user.value.userId);
    } catch (err) {
      console.error('Failed to load profile picture:', err);
      userPfpUrl.value = '/default-avatar.png';
    }
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
