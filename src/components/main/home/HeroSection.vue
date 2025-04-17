<template>
  <section class="flex justify-center pt-10 max-w-4xl m-auto bg-gray-50">
    <div
      class="container flex flex-col-reverse md:flex-row justify-between px-4"
    >
      <div class="md:max-w-1/2 md:mt-20 mt-0 space-y-8 text-left">
        <div class="flex flex-col space-y-4">
          <h1 class="text-5xl font-light text-gray-800">Welcome to</h1>
          <h2 class="text-5xl font-semibold text-indigo-600">HayaseDB</h2>
        </div>

        <p class="text-gray-700 sm:text-lg font-light">
          HayaseDB is a free, open source anime database that provides
          comprehensive details through a user friendly web platform and a
          powerful API for developers.
        </p>

        <div class="flex justify-start space-x-6 mb-8">
          <a
            href="https://github.com/hayasedb"
            class="text-black hover:text-indigo-600 transition duration-300"
          >
            <GitHubIcon class="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com/hayasedb"
            class="text-black hover:text-indigo-600 transition duration-300"
          >
            <InstagramIcon class="w-5 h-5" />
          </a>
          <a
            href="https://discord.hayasedb.com"
            class="text-black hover:text-indigo-600 transition duration-300"
          >
            <DiscordIcon class="w-5 h-5" />
          </a>
          <a
            href="https://x.com/hayasedb"
            class="text-black hover:text-indigo-600 transition duration-300"
          >
            <XIcon class="w-5 h-5" />
          </a>
          <a
            href="https://tiktok.com/@hayasedb"
            class="text-black hover:text-indigo-600 transition duration-300"
          >
            <TikTokIcon class="w-5 h-5" />
          </a>
        </div>

        <div class="flex sm:justify-start mb-20 space-x-6">
          <router-link to="/login">
            <button
              class="bg-indigo-600 hover:cursor-pointer hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-md font-semibold transition duration-300"
            >
              Get Started
            </button>
          </router-link>
          <router-link to="/docs">
            <button
              class="bg-indigo-100 hover:cursor-pointer hover:bg-indigo-200 text-indigo-600 px-6 py-3 rounded-md text-md font-semibold transition duration-300"
            >
              Learn More
            </button>
          </router-link>
        </div>
      </div>

      <div class="flex md:justify-end justify-center items-center">
        <img
          src="@/assets/mascot.webp"
          alt="Anime illustration"
          class="max-w-3xs md:max-w-2xs"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  XIcon,
  DiscordIcon,
  InstagramIcon,
  GitHubIcon,
  TikTokIcon,
} from "vue3-simple-icons";
</script>
