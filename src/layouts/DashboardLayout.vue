<template>
  <div class="flex min-h-screen w-screen overflow-hidden bg-gray-50">
    <Transition name="fade">
      <div
          v-if="isSidebarExpandedOnMobile"
          class="fixed inset-0 z-20 bg-opacity-75 md:hidden"
          @click="toggleSidebar"
          aria-hidden="true"
      ></div>
    </Transition>

    <aside
        :class="sidebarClasses"
        aria-label="Sidebar navigation"
    >
      <div
          class="flex border-b border-gray-200 items-center h-16 bg-white p-4"
          :class="(!isMobile && !sidebarStore.isSidebarExpanded) ? 'justify-center' : 'justify-between'"
      >
        <div class="flex items-center overflow-hidden">
          <span v-if="isMobile || sidebarStore.isSidebarExpanded" class="text-xl font-medium">Dashboard</span>
        </div>

        <button
            @click="toggleSidebar"
            class="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
            :aria-label="sidebarToggleTitle"
            :title="sidebarToggleTitle"
        >
          <X
              v-if="isMobile"
              class="h-5 w-5"
          />
          <span v-else>
                <ChevronsLeft
                    v-if="sidebarStore.isSidebarExpanded"
                    class="h-5 w-5"
                />
          <ChevronsRight
              v-else
              class="h-5 w-5"
          />
          </span>

        </button>
      </div>

      <nav class="flex-1 space-y-1 overflow-y-auto px-2 py-4" aria-label="Main navigation">
        <template v-for="(item, index) in navigationItems" :key="index">
          <RouterLink
              :to="item.path"
              v-slot="{ isActive, href }"
          >
            <a
                :href="href"
                :aria-current="isActive ? 'page' : undefined"
                :title="(!isMobile && !sidebarStore.isSidebarExpanded) ? item.title : ''"
                :class="[
          isActive
            ? 'bg-gray-200 text-gray-900'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
          'group mb-2 flex items-center rounded-md h-12 text-sm font-medium transition-colors duration-150',
          (!isMobile && !sidebarStore.isSidebarExpanded) ? 'justify-center px-3 h-12 aspect-square' : 'px-3'
        ]"
            >
              <template v-if="item.icon">
                <component
                    :is="item.icon"
                    class="h-5 w-5 text-gray-500 transition-colors duration-150 group-hover:text-gray-600"
                    aria-hidden="true"
                />
              </template>
              <span v-if="isMobile || sidebarStore.isSidebarExpanded" class="truncate ml-3">{{ item.title }}</span>
            </a>
          </RouterLink>
        </template>
      </nav>

      <div
          v-if="$slots.bottom"
          :class="(!isMobile && !sidebarStore.isSidebarExpanded) ? 'border-t border-gray-200 p-4 flex justify-center' : 'border-t border-gray-200 p-4'"
      >
        <slot name="bottom"></slot>
      </div>
    </aside>

    <div class="flex flex-1 flex-col overflow-hidden">
      <header class="flex border-b h-16 border-gray-200 items-center justify-between bg-white p-4">
        <div class="flex items-center space-x-4">
          <button
              v-if="isMobile"
              @click="toggleSidebar"
              class="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-label="Open sidebar"
          >
            <Menu
                class="h-6 w-6"
            />
          </button>
          <div class="flex items-center space-x-3">
            <img src="@/assets/hayasedb.svg" class="h-8" alt="HayaseDB Logo" />
            <span class="text-2xl font-extrabold">HayaseDB</span>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <ProfileMenu />
        </div>
      </header>

      <main
          class="relative flex-1 overflow-auto"
      >
        <div class="max-w-full px-4 py-6 sm:px-6 lg:px-8">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed, ref } from 'vue';
import { useSidebarStore } from '@/stores/sidebar.store';
import {
  X,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  User,
  HomeIcon,
  SettingsIcon,
  UserIcon,
  KeyIcon,
  SquarePen,
  ChevronDown,
  LogOut
} from 'lucide-vue-next';
import {AuthService} from "@/services/auth.service.js";
import { useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth.store.js";
import ProfileMenu from "@/components/common/ProfileMenu.vue";
const router = useRouter();
const sidebarStore = useSidebarStore();
const authStore = useAuthStore();

const isMobile = ref(false);
let mediaQuery;

const user = computed(() => authStore.user);



onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 768px)');
  isMobile.value = mediaQuery.matches;

  const mediaQueryHandler = (e) => {
    isMobile.value = e.matches;
  };

  mediaQuery.addEventListener('change', mediaQueryHandler);

  onBeforeUnmount(() => {
    mediaQuery.removeEventListener('change', mediaQueryHandler);
  });
});

const isSidebarExpandedOnMobile = computed(() => isMobile.value && sidebarStore.isSidebarExpanded);

const sidebarClasses = computed(() => [
  'fixed inset-y-0 left-0 z-30 flex flex-col bg-white shadow-md transition-all duration-300',
  isMobile.value && !sidebarStore.isSidebarExpanded ? '-translate-x-full' : 'translate-x-0',
  !isMobile.value && !sidebarStore.isSidebarExpanded ? 'w-16' : 'w-64',
  'md:static'
]);

const sidebarToggleTitle = computed(() =>
    sidebarStore.isSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'
);

const toggleSidebar = () => {
  sidebarStore.toggle();
};

const navigationItems = [
  { title: 'Home', path: '/dashboard/home', icon: HomeIcon },
  { title: 'Contributions', path: '/dashboard/contributions', icon: SquarePen },
  { title: 'API Keys', path: '/dashboard/key', icon: KeyIcon },
  { title: 'Profile', path: '/dashboard/profile', icon: User },
  { title: 'Settings', path: '/dashboard/settings', icon: SettingsIcon },
];
</script>