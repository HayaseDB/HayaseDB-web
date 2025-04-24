<template>
  <div class="bg-gray-50 py-16 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-center space-x-3 mb-4">
        <h2 class="text-5xl text-center font-semibold">The Team</h2>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-13 h-13 text-red-500 animate-pulse"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
          <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
             2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3
             19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </div>
      <p class="text-xl text-gray-700 text-center font-light max-w-3xl mx-auto mb-16">
        We are proud to offer HayaseDB to you. As passionate young developers and designers, we dedicate ourselves to this project to provide value to our community.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
            v-for="(member, index) in teamMembers"
            :key="index"
            class="flex flex-col items-center"
        >
          <div class="rounded-lg border-1 border-gray-200 overflow-hidden mb-4">
            <img :src="member.image" :alt="member.name" class="w-40 h-full object-cover" />
          </div>
          <h3 class="text-2xl font-bold text-black mb-1">{{ member.name }}</h3>
          <p class="text-gray-700 mb-3">{{ member.role }}</p>
          <div class="flex space-x-3">
            <a v-if="member.socials.x" :href="member.socials.x" class="text-blue-400 ">
              <XIcon class="w-5 h-5" />
            </a>
            <a v-if="member.socials.github" :href="member.socials.github" class="text-black">
              <GitHubIcon class="w-5 h-5" />
            </a>
            <a v-if="member.socials.website" :href="member.socials.website" class="text-green-400">
              <Globe class="w-5 h-5" />
            </a>
            <a v-if="member.socials.tiktok" :href="member.socials.tiktok" class="text-black">
              <TikTokIcon class="w-5 h-5" />
            </a>
            <a v-if="member.socials.instagram" :href="member.socials.instagram" class="text-pink-500">
              <InstagramIcon class="w-5 h-5" />
            </a>
            <a v-if="member.socials.youtube" :href="member.socials.youtube" class="text-red-500 ">
              <YouTubeIcon class="w-5 h-5" />
            </a>
            <a v-if="member.socials.twitch" :href="member.socials.twitch" class="text-purple-500 ">
              <TwitchIcon class="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  XIcon,
  GitHubIcon,
  YouTubeIcon,
  InstagramIcon,
  TikTokIcon,
  TwitchIcon,
} from 'vue3-simple-icons'
import { Globe } from 'lucide-vue-next'
const teamMembers = [
  {
    name: 'AIO',
    role: 'Developer',
    image: new URL('@/assets/team/AIO.gif', import.meta.url).href,
    socials: {
      github: 'https://github.com/aiomayo',
      website: 'https://aio-web.xyz',
      instagram: 'https://instagram.com/aio_dev',
    },
  },
  {
    name: 'Garfield',
    role: 'Moderator',
    image: new URL('@/assets/team/GarfieldTV.gif', import.meta.url).href,
    socials: {
      github: 'https://github.com/GarfieldTV',
    },
  },
  {
    name: 'SirRezi',
    role: 'Moderator',
    image: new URL('@/assets/team/SirRezi.webp', import.meta.url).href,
    socials: {
      github: 'https://github.com/GarfieldTV',
      twitch: 'https://www.twitch.tv/bobbycardealer'
    },
  },
  {
    name: 'Lukas',
    role: 'Moderator',
    image: new URL('@/assets/team/Lukas.webp', import.meta.url).href,
    socials: {
      github: 'https://github.com/Brainlesslukas',
      website: 'https://brainlesslukas.xyz/',
    },
  },
]

</script>
