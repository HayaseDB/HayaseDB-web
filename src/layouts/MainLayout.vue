<template>
  <div class="flex min-h-screen w-screen flex-col bg-gray-50 overflow-hidden">
    <header
      class="flex border-b h-16 border-gray-200 items-center justify-center bg-white px-4"
    >
      <div class="flex items-center max-w-7xl w-screen justify-between">
        <div class="flex items-center space-x-4">
          <button
            v-if="isMobile"
            class="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            aria-label="Toggle Menu"
            @click="toggleMobileMenu"
          >
            <component :is="mobileMenuOpen ? X : Menu" class="h-6 w-6" />
          </button>
          <RouterLink to="/" class="flex items-center space-x-3">
            <img
              src="@/assets/hayasedb.svg"
              alt="HayaseDB Logo"
              class="h-8 w-auto"
            />
            <span class="text-2xl font-extrabold">HayaseDB</span>
          </RouterLink>
        </div>
        <div class="flex items-center space-x-1 sm:space-x-4">
          <nav class="hidden md:flex items-center space-x-3">
            <RouterLink
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="px-4 py-2 border border-transparent text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-colors"
              :class="{
                'bg-blue-50 text-blue-700 border-blue-200': isActiveRoute(
                  item.path,
                ),
              }"
            >
              {{ item.title }}
            </RouterLink>
          </nav>
          <ProfileMenu v-if="isAuthenticated" />
          <div v-else class="flex items-center space-x-2">
            <RouterLink
              to="/register"
              class="hidden box-border sm:inline-flex px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-lg transition bg-white"
            >
              Register
            </RouterLink>
            <RouterLink
              to="/login"
              class="hidden box-border sm:inline-flex px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 border border-blue-200 hover:border-blue-300 rounded-lg transition"
            >
              Login
            </RouterLink>
          </div>
        </div>
      </div>
    </header>

    <div
      v-if="mobileMenuOpen"
      class="md:hidden inset-0 relative border-b border-gray-200 z-30"
    >
      <div
        class="absolute top-0 left-0 right-0 border-b border-gray-200 bg-white px-4 py-3 z-40"
      >
        <nav class="flex flex-col space-y-1">
          <RouterLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-gray-700 hover:text-blue-600 text-base font-medium transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
            :class="{ 'bg-blue-50 text-blue-600': isActiveRoute(item.path) }"
            @click="mobileMenuOpen = false"
          >
            {{ item.title }}
          </RouterLink>
          <div v-if="!isAuthenticated" class="pt-3 flex flex-col space-y-2">
            <RouterLink
              to="/register"
              class="w-full px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 bg-white rounded-lg transition text-center"
              @click="mobileMenuOpen = false"
            >
              Register
            </RouterLink>
            <button
              class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              @click="goToLogin"
            >
              Login
            </button>
          </div>
        </nav>
      </div>
    </div>

    <main class="flex-1 overflow-auto">
      <div>
        <router-view />
      </div>
    </main>

    <footer class="bg-white border-t border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
      <div
        class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
      >
        <div class="flex items-center space-x-2">
          <img
            src="@/assets/hayasedb.svg"
            alt="HayaseDB Logo"
            class="h-6 w-auto"
          />
          <span class="text-sm font-semibold text-gray-700"
            >HayaseDB © {{ currentYear }}</span
          >
        </div>
        <div class="flex items-center space-x-6">
          <a href="#" class="text-sm text-gray-500 hover:text-gray-700"
            >Terms</a
          >
          <a href="#" class="text-sm text-gray-500 hover:text-gray-700"
            >Privacy</a
          >
          <a href="#" class="text-sm text-gray-500 hover:text-gray-700"
            >Contact</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter, RouterLink, useRoute } from "vue-router";
import ProfileMenu from "@/components/common/ProfileMenu.vue";
import { AuthService } from "@/services/endpoints/auth.service.ts";
import { X, Menu } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const isAuthenticated = ref(false);
const mobileMenuOpen = ref(false);
const currentYear = new Date().getFullYear();
const isMobile = ref(false);

onMounted(() => {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  isMobile.value = mediaQuery.matches;

  const mediaQueryHandler = (e) => {
    isMobile.value = e.matches;
  };

  mediaQuery.addEventListener("change", mediaQueryHandler);

  onBeforeUnmount(() => {
    mediaQuery.removeEventListener("change", mediaQueryHandler);
  });

  checkAuth();
});

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;

  if (mobileMenuOpen.value) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
};

const goToLogin = () => {
  mobileMenuOpen.value = false;
  document.body.classList.remove("overflow-hidden");
  router.push("/login");
};

const isActiveRoute = (path) => {
  if (path === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(path);
};

const checkAuth = async () => {
  try {
    isAuthenticated.value = await AuthService.isAuthenticated();
  } catch {
    isAuthenticated.value = false;
  }
};

const navigationItems = [
  { title: "Home", path: "/" },
  { title: "Docs", path: "/docs" },
  { title: "Pricing", path: "/pricing" },
];
</script>
